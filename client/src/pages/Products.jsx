import { AuthContext } from "../components/ProtectedRoute";
import { useContext } from "react";
const Products = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  if (user.length > 0) {
    return (
      <>
        <div>Hello Mr. {user[0]}</div>
      </>
    );
  } else {
    return (
      <>
        <div></div>
      </>
    );
  }
};

export default Products;
