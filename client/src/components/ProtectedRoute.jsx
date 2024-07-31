import axios from "axios";
import { useCallback, useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
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
    try {
      const res = await axios.get(`${url}/products`, {
        withCredentials: true,
      });
      const { isLoggedIn, user } = res.data;
      setAuthState({
        isLoggedIn,
        user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error(error);
      setAuthState({
        isLoggedIn: false,
        user: null,
        isLoading: false,
        error: error.message,
      });
    }
  }, [url]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  if (authState.error) {
    return <div>Error: {authState.error}</div>;
  }

  if (authState.isLoggedIn) {
    return children;
  }

  return <Navigate to="/signin" />;
};

export default ProtectedRoute;
