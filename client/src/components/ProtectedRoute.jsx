import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated?.isLoggedIn) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
