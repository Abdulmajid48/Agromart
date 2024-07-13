// Hooks
import { useState } from "react";
import { useContext } from "react";
// React-router
import { useNavigate } from "react-router-dom";
//  createRouter for axios and localhost
import { ResponsiveWidth } from "./App";
// Material Icons
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Signpage(props) {
  const { display, sign, btn, account, google } = props;
  // import axios and localhost
  const { url } = useContext(ResponsiveWidth);
  // navigate to another page
  const navigate = useNavigate();
  //-------------------------------------//
  // toggle password visibility
  const [visible, setVisible] = useState(false);
  // Controlled Input for the page
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  // ------------------------------------------//
  // handlechange for input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // change visibility icon for password
  function changeVisible() {
    setVisible((preValue) => {
      return !preValue;
    });
  }

  // ---------------------------------------------------------------------------------------//
  // Handle Submit for Signup ---- Register
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const { fullname, email, password } = formData;
    try {
      const res = await axios.post(
        `${url}/register`,
        {
          fullname,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const { isLoggedIn } = res.data;
      if (isLoggedIn) {
        navigate("/products");
      } else {
        navigate("/signup");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Handle Submit for Signin ---- Login
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const { email: username, password } = formData;
    try {
      const res = await axios.post(
        `${url}/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const { isLoggedIn } = res.data;
      if (isLoggedIn) {
        navigate("/products");
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    window.location.href = `${url}/auth/google`;
  };
  // --------------------------------------------------------------------------//
  return (
    <div className="h-dvh w-dvw flex justify-center items-center ">
      {/* Background div image */}
      <div
        className="  flex justify-center items-center h-full sm:w-full w-dvw m-auto bg-cover relative"
        style={{
          backgroundImage: 'url("./images/fruitbg.png")',
        }}
      >
        {/* Website Name */}
        <NavLink to="/">
          <p className="text-white absolute lg:top-10 md:top-[70px] top-16 left-5 sm:left-16 md:left-24 text-sm lg:text-3xl md:text-2xl sm:text-xl font-bold font-['Odor_Mean_Chey']">
            Agromart
          </p>
        </NavLink>
        {/* Sign in/up div */}
        <div className="w-5/6 sm:w-3/4 md:w-2/3 lg:w-1/3 h-2/3 sm:h-5/6 m-auto lg:pb-10 bg-white rounded-lg flex justify-center items-center">
          <div className="sm:h-full pt-4 w-5/6 m-auto">
            <p className="text-black text-2xl mb-3 font-['Open_Sans'] font-semibold">
              {sign}
            </p>
            <div className="flex flex-col m-auto">
              {/* Name input and label */}
              <div
                className="flex flex-col"
                style={{ display: !display && "none" }}
              >
                <label
                  className="mb-2 text-sm text-[#575E6F] font-['Open_Sans']"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  id="name"
                  className="px-2 w-full mb-5 focus:outline-none border border-[#E1E2E5] rounded-md h-9 font-['poppins']"
                />
              </div>
              {/* Email input and label */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-[#575E6F] font-['Open_Sans']"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={formData.email}
                  id="email"
                  className="px-2 w-full mb-5 focus:outline-none border border-[#E1E2E5] rounded-md h-9 font-['poppins']"
                />
              </div>
              {/* Password input and Label */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-[#575E6F] font-['Open_Sans']"
                >
                  Password
                </label>
                <div className="flex flex-row justify-between items-center gap-2 w-full h-9 border border-[#E1E2E5] px-2  mb-5 rounded-md">
                  <input
                    onChange={handleChange}
                    type={visible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    id="password"
                    className=" border-hidden focus:outline-none w-11/12 font-['poppins']"
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}"
                    required
                  />
                  {/* Visibility Icon for password */}
                  <div onClick={changeVisible}>
                    {visible ? (
                      <VisibilityRoundedIcon style={{ color: "#666666CC" }} />
                    ) : (
                      <VisibilityOffRoundedIcon
                        style={{ color: "#666666CC" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* sign up/in and google buttons */}
              <div className="flex flex-col gap-3">
                {/* sign up/in button */}
                <div>
                  <button
                    onClick={display ? handleSubmitRegister : handleSubmitLogin}
                    className="bg-[#218225] h-9 w-full rounded-md text-center text-white text-sm font-['Open_Sans']"
                  >
                    {btn}
                  </button>
                </div>
                {/* Remember me and Forget Password */}
                <div
                  className="flex flex-row justify-between text-xs pb-3"
                  style={{ display: !display ? null : "none" }}
                >
                  <div className="flex flex-row gap-1">
                    <input type="checkbox" className="accent-[#333333]" />
                    <div className=" text-[#333333]">Remember me</div>
                  </div>
                  <div className="text-[#C76001]">Forgot password?</div>
                </div>
                {/* OR div */}
                <div className="flex flex-row justify-center items-center gap-2 w-full">
                  <div className="flex flex-grow w-7 border border-b-[#E1E2E5] h-0 "></div>
                  <div className="text-[#E1E2E5] font-['Avenir']">OR</div>
                  <div className="flex flex-grow w-7 border border-b-[#E1E2E5] h-0 "></div>
                </div>
                {/* Sign up/in with google */}
                <div className="">
                  <button
                    onClick={handleGoogle}
                    className="flex flex-row justify-center items-center gap-3 bg-white h-9 w-full rounded-md text-center text-sm border border-[#218225]"
                  >
                    {/* google icon */}
                    <img src="./images/google.svg" alt="" className="h-5" />
                    <div className="text-[#218225] font-['Open_Sans']">
                      {google}
                    </div>
                  </button>
                </div>
                {/* Redirect to sign in/up */}
                <div className="text-center text-xs mb-10 font-['poppins']">
                  {account}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signpage;
