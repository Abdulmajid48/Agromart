import { Navigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = UseAuth();

  if (!isAuthenticated?.isLoggedIn) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
