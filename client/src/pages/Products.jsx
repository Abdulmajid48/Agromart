import { useState, useEffect, useContext } from "react";
import { GuestUser } from "./Signpage";

const Products = () => {
  const { guest } = useContext(GuestUser);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (guest && guest.name) {
      try {
        const parsedName = JSON.parse(guest.name);
        setDisplayName(`${parsedName.givenName} ${parsedName.familyName}`);
      } catch (error) {
        setDisplayName(guest.name);
      }
    } else {
      setDisplayName("");
    }
  }, [guest]);

  return <div>Hello Mr. {displayName}</div>;
};

export default Products;
