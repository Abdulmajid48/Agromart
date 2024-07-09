// Hooks
import { useContext, useState } from "react";
// Material Icons
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// createContext Components---- Matches
import { ResponsiveWidth } from "./App";
// NavLink
import { NavLink } from "react-router-dom";

// -------------Navbar Section --------------------------
function Navbar() {
  // -------------------- Toggle Services --------------------
  const [service, setService] = useState(false);
  const [options, setOptions] = useState(false);
  // ---------------Matches---Adjust width--------------------
  const { matches } = useContext(ResponsiveWidth);
  const responsiveWidth = matches;

  // -----------Toggle Services Options-----------------------
  function displayServices() {
    setService((prevValue) => {
      return !prevValue;
    });
  }
  // ------------ Toggle Menu and Close icon for small Screen ----------------
  function toggleOptions() {
    setOptions((prevValue) => {
      return !prevValue;
    });
  }
  return (
    <div>
      <div className="bg-[#FFFFFF] h-16 w-auto flex flex-row sm:gap-6 md:gap-16 lg:gap-56 px-8 sm:px-16 items-center relative mx-3">
        {/* Page Title  */}
        <div className="text-[#218225] text-3xl font-['Odor_Mean_Chey'] font-semibold">
          Agromart
        </div>

        {/* ------------ Toggle Large and Small Screen ------------- */}
        {!responsiveWidth ? (
          // -----Small Screen--------
          <>
            {/* Close and menu Icon */}
            <div onClick={toggleOptions} className="absolute right-4">
              {options ? <CloseIcon /> : <MenuIcon />}
            </div>
            {options && (
              <SmallScreenMenu
                displayServices={displayServices}
                service={service}
              />
            )}
          </>
        ) : (
          // -----Large Screen--------
          <LargeScreenMenu
            displayServices={displayServices}
            service={service}
          />
        )}
      </div>
    </div>
  );
}

// -------------Small Screen Section--------------
const SmallScreenMenu = () => {
  // const { displayServices} = props;
  return (
    <div className="flex flex-row justify-center text-center items-center gap-16 text-xs absolute top-16 -right-3 w-40 h-auto py-5 bg-white rounded z-10">
      <div className="flex flex-col text-center items-center gap-4">
        <NavLink to="/">
          <div>Home</div>
        </NavLink>
        <NavLink to="aboutus">
          <div>About us</div>
        </NavLink>
        <div>
          <button
            //onClick={displayServices}
            className="flex flex-row justify-center items-center gap-1"
          >
            <div>Services</div>
            {/* <img
              src="./images/arrow.svg"
              alt=""
              className="h-3 ml-1"
              style={{ transform: service ? "rotate(180deg)" : null }}
            /> */}
          </button>
          {/* <div
            className=" absolute"
            style={{ display: service ? "block" : "none" }}
          >
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
          </div> */}
        </div>
        <div>Product</div>
        <NavLink to="signin">
          <button className="h-9 w-20 text-xs border-solid border border-[#218225] text-[#218225] rounded-md">
            Sign In
          </button>
        </NavLink>
        <NavLink to="signup">
          <button className="h-9 w-20 text-xs border-solid border bg-[#218225] text-[#FFFFFF] rounded-md">
            Sign Up
          </button>
        </NavLink>
      </div>
    </div>
  );
};

// -----------------Large Screen Section---------------------
const LargeScreenMenu = (props) => {
  const { displayServices, service } = props;
  return (
    <div className="flex flex-row justify-start items-center gap-40 md:gap-20">
      {/* navbar contents */}
      <div className="flex flex-row gap-4 ">
        <NavLink to="/">
          <div>Home</div>
        </NavLink>
        <NavLink to="aboutus">
          <div>About us</div>
        </NavLink>
        <div>
          <button
            onClick={displayServices}
            className="flex flex-row justify-center items-center gap-1"
          >
            <div>Services</div>
            <img
              src="./images/arrow.svg"
              alt=""
              className="h-3 ml-1"
              style={{ transform: service ? "rotate(180deg)" : null }}
            />
          </button>
          {/* Services Content */}
          <div
            className=" absolute z-10 bg-white rounded h-auto w-20 py-5 text-center"
            style={{ display: service ? "block" : "none" }}
          >
            <p>hello</p>
            <p>hello</p>
            <p>hello</p>
          </div>
        </div>
        <div>Product</div>
      </div>
      <div className="flex flex-row gap-4 justify-end items-center absolute lg:right-8 md:right-4">
        {/* Shopping Cart */}
        <div className="text-sm lg:mr-6">
          <ShoppingCartCheckoutIcon /> Cart
        </div>
        {/* Sign In */}
        <NavLink to="signin">
          <button className="h-9 w-20 text-xs border-solid border border-[#218225] text-[#218225] rounded-md">
            Sign In
          </button>
        </NavLink>
        {/* Sign Up */}
        <NavLink to="signup">
          <button className="h-9 w-20 text-xs border-solid border bg-[#218225] text-[#FFFFFF] rounded-md">
            Sign Up
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
