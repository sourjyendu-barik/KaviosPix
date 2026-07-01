import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";

import { type User } from "../Types/types";
import { getMe, logoutUser } from "../api";
interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  logout: () => void;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //console.log(user);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await getMe();
        console.log("loaduser running", data);
        setUser(data.user);
      } catch (err) {
        setUser(null);
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
      setUser(null);
      setError(null);
      setLoading(false);
    }
  };
  const value: UserContextType = {
    user,
    loading,
    error,
    setUser,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
