import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState([]);

  const url = import.meta.VITE_BACKEND;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(`${url}/products`, {
          withCredentials: true,
        });
        const data = [result.data];
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [url]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default ProtectedRoute;
