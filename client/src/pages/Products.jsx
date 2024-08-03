import AuthProvider from "../components/AuthContext";
import { useContext } from "react";
const Products = () => {
  const { user } = useContext(AuthProvider);
  return <div>Hello Mr.{user}</div>;
};

export default Products;
