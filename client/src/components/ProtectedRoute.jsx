import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a proper loading spinner or component if needed
  }

  if (!isAuthenticated?.isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
