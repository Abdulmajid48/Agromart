import { useCallback, useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { ResponsiveWidth } from "./App";

const ProtectedRoute = ({ children }) => {
  const { url } = useContext(ResponsiveWidth);
  const [authState, setAuthState] = useState({
    isLoggedIn: null,
    user: null,
    isLoading: true,
    error: null,
  });

 const checkAuth = useCallback(async () => {
   console.log("Checking auth...");
   try {
     const res = await axios.get(`${url}/products`, {
       withCredentials: true,
     });
     console.log("Server response:", res.data);
     const { isLoggedIn, user } = res.data;
     setAuthState({
       isLoggedIn: isLoggedIn === true, // Ensure it's a boolean
       user: user || null, // Ensure it's null if not provided
       isLoading: false,
       error: null,
     });
     console.log("Updated auth state:", { isLoggedIn, user });
   } catch (error) {
     console.error("Auth check error:", error);
     setAuthState({
       isLoggedIn: false,
       user: null,
       isLoading: false,
       error: error.response?.data?.message || error.message,
     });
   }
 }, [url]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Current auth state:", authState);

  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  if (authState.error) {
    return <div>Error: {authState.error}</div>;
  }

  console.log("Auth state before rendering:", authState);

  if (authState.isLoggedIn) {
    return children({ isAuthenticated: authState });
  }

  console.log("Navigating to signin");
  return <Navigate to="/signin" />;
};

export default ProtectedRoute;
