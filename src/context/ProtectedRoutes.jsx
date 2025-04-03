import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContextProvider";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext); // Assuming `user` is stored in auth state

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
