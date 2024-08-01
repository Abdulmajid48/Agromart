import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
//import { ResponsiveWidth } from "./App";

// const ProtectedRoute = ({ children }) => {
//   //const { url } = useContext(ResponsiveWidth);
//   const [authState, setAuthState] = useState({
//     isLoggedIn: null,
//     user: null,
//     isLoading: true,
//     error: null,
//   });

//   // Function to check authentication status
//   const checkAuth = useCallback(async () => {
//     try {
//       const res = await axios.get(`api/products`, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         responseType: "json",
//       });
//       const { isLoggedIn, user } = res.data;
//       setAuthState({
//         isLoggedIn: !!isLoggedIn, // Ensure it's a boolean
//         user: user || null, // Ensure it's null if not provided
//         isLoading: false,
//         error: null,
//       });
//     } catch (error) {
//       setAuthState({
//         isLoggedIn: false,
//         user: null,
//         isLoading: false,
//         error: error.response?.data?.message || error.message,
//       });
//     }
//   }, []);

//   // Run the authentication check on component mount
//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   // If the authentication status is still loading, show a loading indicator
//   if (authState.isLoading) {
//     return <div>Loading...</div>;
//   }

//   // If there is an error during authentication, show an error message
//   if (authState.error) {
//     return <div>Error: {authState.error}</div>;
//   }

//   // If the user is authenticated, render the children components
//   if (authState.isLoggedIn) {
//     return children({ isAuthenticated: authState });
//   }

//   // If the user is not authenticated, redirect to the sign-in page
//   return <Navigate to="/signin" />;
// };

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("api/products");
        setIsAuthenticated(res.data.isLoggedIn);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
