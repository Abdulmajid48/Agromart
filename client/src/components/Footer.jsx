// --------------The footer section ----------------------
const Footer = () => {
  return (
    <>
      <div className="md:h-[32rem] lg:h-[25rem] h-[55rem] bg-[#131F0D] flex justify-center items-center">
        <div className="w-11/12 flex flex-col justify-center items-center md:mt-12 lg:mt-0">
          <div className=" border-b h-5/6 m-auto w-11/12 flex flex-col md:flex-row gap-6 justify-between md:pt-8 pb-8 md:pb-16">
            <Agromart />
            <Linkservice />
            <Subscribe />
          </div>
          <Copyright />
        </div>
      </div>
    </>
  );
};

// ---------The Logo Title and Description Column-------------------
const Agromart = () => {
  return (
    <>
      <div className="flex flex-col gap-4 md:w-1/3 w-2/3 pt-4">
        <p className="text-4xl font-['Odor_Mean_Chey'] text-[#FFFFFF] font-normal">
          Agromart
        </p>
        <p className="text-[#575E6F] text-sm md:pr-32">
          You are just one step away from revolutionizing the way you shop for
          fresh, locally sourced produce with our online platform that connects
          farmers directly to customers.{" "}
        </p>
      </div>
    </>
  );
};

//---------------------- The Links and Services Column ----------------------
const Linkservice = () => {
  return (
    <>
      <div className="text-[#575E6F] text-sm flex flex-col md:flex-row gap-10 md:w-1/3">
        <div>
          <ul className="flex flex-col gap-5">
            <li className="text-[#FFFFFF]">LINKS</li>
            <li>Home</li>
            <li>About Us</li>
            <li>Products</li>
            <li>Contact Us</li>
            <li>Join</li>
          </ul>
        </div>
        {/*-----------------Services-------------- */}
        <div>
          <ul className="flex flex-col gap-5">
            <li className="text-[#FFFFFF]">SERVICES</li>
            <li>Partner with us</li>
            <li>Consultations</li>
            <li>Rent farm equipments</li>
          </ul>
        </div>
      </div>
    </>
  );
};
// ------------- Subscribe to Our Newsletter Column ---------------------
const Subscribe = () => {
  return (
    <>
      <div className="flex flex-col gap-2 md:-mt-1 mt-10">
        <p className="text-[#FFFFFF] font-bold text-xl">
          Subscribe to our Newsletter
        </p>
        <p className="text-xs text-[#F0F1F2] font-['Open_Sans'] font-thin">
          Be the first to know the latest farm trends
        </p>
        <div className="mt-3 flex flex-row gap-2">
          <input
            type="text"
            placeholder="Email Address"
            className="text-xs h-7 pl-2 rounded-sm w-52 text-[#5F5F61] outline-none font-['Open_Sans']"
          />
          <button className="h-7 bg-[#218225] text-xs w-20 rounded-sm text-[#FFFFFF]">
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
};
// ---------- Copyright Section ---------------------
const Copyright = () => {
  // Copyright Year
  const date = new Date().getFullYear();
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-3 md:gap-0 w-11/12 mt-4 text-[#C4C6CC] text-xs font-normal font-['Open_Sans']">
        <p className="">© {date} Agromart - All rights reserved</p>
        <div className="flex flex-row gap-3">
          <button>Terms & Conditions</button>
          <button>Cookies</button>
          <button>Privacy Policy</button>
        </div>
      </div>
    </>
  );
};

export default Footer;
