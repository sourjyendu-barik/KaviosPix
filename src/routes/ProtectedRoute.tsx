import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/AuthProvider";
import Loader from "../components/Loader";
const ProtectedRoute = () => {
  const { user, loading } = useUserContext();
  if (loading) {
    return <Loader message="checking authentication...." />;
  }
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  //console.log("protected page render");

  return <Outlet />;
};

export default ProtectedRoute;
