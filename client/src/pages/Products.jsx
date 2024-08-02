import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Products = () => {
  const { user } = useContext(AuthContext);

  return <div>Hello Mr. {user?.name || "Guest"}</div>;
};

export default Products;
