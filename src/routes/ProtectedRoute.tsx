import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/AuthProvider";
const ProtectedRoute = () => {
  const { user } = useUserContext();
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  console.log("protected page render");

  return <Outlet />;
};

export default ProtectedRoute;
