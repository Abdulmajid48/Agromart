import { AuthContext } from "../components/ProtectedRoute";
import { useContext } from "react";
const Products = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return <div>Hello Mr.{user}</div>;
};

export default Products;
