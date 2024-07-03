// Sections in Home Page
import ContactUs from "../components/ContactUs";
import { HomepageTopbar } from "../components/HomepageTopbar";
import JoinUs from "../components/JoinUs";
import { OurCustomers } from "../components/OurCustomers";
import { OurProducts } from "../components/OurProducts";
import OurmissionandServices from "../components/OurmissionandServices";
import SubServices from "../components/SubServices";

// ------------------- Home Page -----------------
const Home = () => {
  return (
    <>
      <HomepageTopbar />
      <OurmissionandServices />
      <SubServices />
      <OurProducts />
      <OurCustomers />
      <JoinUs />
      <ContactUs />
    </>
  );
};

export default Home;
