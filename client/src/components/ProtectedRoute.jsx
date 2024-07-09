import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ResponsiveWidth } from "./App";

const ProtectedRoute = ({ children }) => {
  const { localhost } = useContext(ResponsiveWidth);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${localhost}/products`, {
          withCredentials: "include",
        });
        if (response.data === "user is certified") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [localhost]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a spinner/loader component
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
