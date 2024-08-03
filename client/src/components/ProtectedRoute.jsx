import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const ProtectedRoute = ({ children }) => {
  // const config = {
  //   withCredentials: true,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   responseType: "json",
  // };
  const [user, setUser] = useState(() => ({
    isLoggedIn: false,
  }));

  useEffect(() => {
    try {
      const result = axios.get("https://agromart-uyly.onrender.com/products", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "json",
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
