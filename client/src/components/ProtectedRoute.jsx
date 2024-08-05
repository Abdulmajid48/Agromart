import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          "https://agromart-uyly.onrender.com/products",
          {
            withCredentials: true,
          }
        );
        const data = [result.data];
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default ProtectedRoute;
