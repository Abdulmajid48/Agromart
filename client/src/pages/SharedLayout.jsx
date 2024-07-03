// React-router
import { Outlet } from "react-router-dom";
// Navbar and Footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sharedlayout for sharing navbar and footer across multiple pages
function SharedLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
export default SharedLayout;
