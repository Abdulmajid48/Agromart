import { useState, useEffect } from "react";

const Products = ({ isAuthenticated }) => {
  const userName = isAuthenticated?.user?.name || "";
  const [displayName, setDisplayName] = useState("");

  // Function to update the display name
  const updateName = (userName) => {
    if (userName) {
      try {
        // Try to parse the name as JSON
        const parsedName = JSON.parse(userName);
        const loginName = `${parsedName.givenName} ${parsedName.familyName}`;
        setDisplayName(loginName);
      } catch (error) {
        // If parsing fails, use the name directly
        setDisplayName(userName);
      }
    } else {
      // Reset display name if userName is undefined or null
      setDisplayName("");
    }
  };

  // Update displayName whenever userName changes
  useEffect(() => {
    updateName(userName);
  }, [userName]);

  return <div>Hello Mr. {displayName}</div>;
};

export default Products;
