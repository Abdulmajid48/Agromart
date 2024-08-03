import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(() => ({
    LoggedIn: false,
  }));

  useEffect(() => {
    try {
      const result = axios.get("https://agromart-uyly.onrender.com/products", {
        withCredentials: true,
      });
      console.log(result);
      setUser({ ...result.data });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default ProtectedRoute;
