import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated.isLoggedIn) <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
