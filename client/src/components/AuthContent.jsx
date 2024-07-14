import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children, backendUrl }) => {
  const [isAuthenticated, setIsAuthenticated] = useState({
    isLoggedIn: null,
    user: null,
  });

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUrl}/products`, {
        withCredentials: true,
      });
      const { isLoggedIn, user } = res.data;
      setIsAuthenticated({
        isLoggedIn: isLoggedIn,
        user: isLoggedIn ? user : null,
      });
    } catch (error) {
      console.error(error);
      setIsAuthenticated({ isLoggedIn: false, user: null });
    }
  }, [backendUrl]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);
