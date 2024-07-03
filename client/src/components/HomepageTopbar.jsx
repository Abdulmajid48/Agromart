// --------------Home Page Topbar ------------------------
const HomepageTopbar = () => {
  return (
    <div className="">
      {/* Background Image */}
      <div
        className="bg-cover w-full m-auto h-[700px] mx-2 relative overflow-hidden"
        style={{ backgroundImage: "url('./images/homebg.svg')" }}
      >
        {/* Left Contents */}
        <div className="sm:w-5/12 absolute top-40 left-10 sm:left-20 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <p className="text-[#C76001] text-3xl font-['Odor_Mean_Chey'] font-normal">
              Agromart
            </p>
            <p className="text-[#FFFFFF] font-bold text-4xl pr-4 md:pr-36 font-['Open_Sans']">
              Connecting You to Fresh, Local Produce
            </p>
            <p className="text-[#FFFFFF] text-xs sm:text-sm pr-10 sm:pr-14 font-['Open_Sans'] leading-loose">
              Our platform connects farmers and consumers for fresh, sustainable
              produce. Shop with us to support local farmers and enjoy
              high-quality fruits and vegetables straight from the source.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <button className="h-10 w-28 text-xs bg-[#FFFFFF] text-[#2A303E] rounded">
              Shop our Product
            </button>
            <button className="h-10 w-28 text-xs bg-[#FBC533] text-[#181C23] rounded">
              Partner with us
            </button>
          </div>
        </div>
      </div>
      {/* ---------------------------------------------------------------------- */}
    </div>
  );
};

export { HomepageTopbar };
