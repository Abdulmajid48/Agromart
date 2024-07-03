// Routes
import { Route, Routes } from "react-router-dom";
// React Hooks
import { createContext, useEffect, useState } from "react";
// Axios
import axios from "axios";
// Sign up and Sign In
import { Signup, Signin } from "../pages/Access";
// Mother Page for Home Page
import SharedLayout from "../pages/SharedLayout";
//  Home page (index)
import Home from "../pages/Home";
// About Us Page
import AboutUs from "../pages/AboutUs";

// createContext 
export const ResponsiveWidth = createContext();

function App() {
  // ------------------Responsive Width --------------------------//
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  const localhost = "http://localhost:3000";
  // ---------------------------------------------------//
  return (
    <ResponsiveWidth.Provider value={{ matches, axios, localhost }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="aboutus" element={<AboutUs />} />
          </Route>
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Routes>
      </div>
    </ResponsiveWidth.Provider>
  );
}

export default App;
