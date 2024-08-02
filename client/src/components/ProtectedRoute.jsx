// // import { useContext, useEffect, useState } from "react";
// // import { Navigate } from "react-router-dom";
// // import { GuestUser } from "./Signpage";

// // const ProtectedRoute = ({ children }) => {
// //   const { guest } = useContext(GuestUser);
// //   const [isAuthenticated, setIsAuthenticated] = useState(null);

// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       try {
// //         if (!guest) return setIsAuthenticated(false);
// //         return setIsAuthenticated(true);
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };
// //     checkAuth();
// //   }, [guest]);

// //   if (isAuthenticated === false) return <div>Loading...</div>;
// //   return isAuthenticated ? children : <Navigate to="/login" />;
// // };
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// //import { AuthContext } from "./AuthContext";

// const ProtectedRoute = ({ children }) => {
//   //const { user } = useContext(AuthContext);

//   if (!user) return <Navigate to="/login" />;
//   return children;
// };
// export default ProtectedRoute;
