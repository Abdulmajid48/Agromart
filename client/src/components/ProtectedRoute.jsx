import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated.isLoggedIn === null) <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
