// Routes
import { Route, Routes } from "react-router-dom";
// React Hooks
import { createContext, useEffect, useState } from "react";
// Sign up and Sign In
import { Signup, Signin } from "../pages/Access";
// Mother Page for Home Page
import SharedLayout from "../pages/SharedLayout";
// Home page (index)
import Home from "../pages/Home";
// About Us Page
import AboutUs from "../pages/AboutUs";
import Products from "../pages/Products";
import ProtectedRoute from "./ProtectedRoute";

// createContext
export const ResponsiveWidth = createContext();

function App() {
  //const url = "https://agromart-uyly.onrender.com"; // backend

  // ------------------Responsive Width --------------------------//
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    window.matchMedia("(min-width: 768px)").addEventListener("change", handler);
    return () => {
      window
        .matchMedia("(min-width: 768px)")
        .removeEventListener("change", handler);
    };
  }, []);

  return (
    <ResponsiveWidth.Provider value={{ matches }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </ResponsiveWidth.Provider>
  );
}

export default App;
