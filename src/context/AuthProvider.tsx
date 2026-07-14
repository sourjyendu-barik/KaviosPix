import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";

import { type User, type UserDetails } from "../Types/types";
import { getMe, logoutUser, getUserDetails } from "../api";
import { useAppDispatch } from "../hooks/albumHooks";
interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  userDetails: UserDetails | null;
  setUserDetails: (details: UserDetails | null) => void;
  fetchUserDetails: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
};
const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  //console.log(user);

  const fetchUserDetails = async () => {
    try {
      const { data } = await getUserDetails();
      setUserDetails(data.userDetails);
    } catch (err) {
      // no details created yet, or fetch failed — not necessarily an app-breaking error
      setUserDetails(null);
      console.error(err);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await getMe();
        // console.log("me data is", data);
        // console.log("loaduser running", data);
        setUser(data.user);
        await fetchUserDetails();
      } catch (err) {
        setUser(null);
        setError(err instanceof Error ? err.message : "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "RESET_STORE" });
      setUser(null);
      setError(null);
      setLoading(false);
      setUserDetails(null);
    }
  };
  const value: UserContextType = {
    user,
    loading,
    error,
    setUser,
    logout,
    userDetails,
    setUserDetails,
    fetchUserDetails,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
