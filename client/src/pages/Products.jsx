import { useState, useEffect } from "react";

const Products = ({ isAuthenticated }) => {
  const userName = isAuthenticated?.user?.name;
  const [displayName, setDisplayName] = useState("");

  const updateName = (userName) => {
    if (userName) {
      try {
        // Try to parse the name as JSON
        const parsedName = JSON.parse(userName);
        // If the parsing is successful, use the givenName and familyName
        const loginName = `${parsedName.givenName} ${parsedName.familyName}`;
        setDisplayName(loginName);
      } catch (error) {
        // If parsing fails, use the name directly
        setDisplayName(userName);
      }
    } else {
      setDisplayName(""); // Reset display name if userName is undefined or null
    }
  };

  useEffect(() => {
    updateName(userName);
  }, [userName]);

  return <div>Hello Mr. {displayName}</div>;
};

export default Products;
