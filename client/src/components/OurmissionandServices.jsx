// ----------------- OurmissionandServices Section ---------------------
const OurmissionandServices = () => {
  return (
    <>
      {OurMissionContents.map((content, index) => {
        const {
          img1,
          img2,
          orangecontent,
          greencontent,
          blackcontent,
          button,
          reverse,
        } = content;
        return (
          <OurMission
            key={index}
            img1={img1}
            img2={img2}
            orangecontent={orangecontent}
            greencontent={greencontent}
            blackcontent={blackcontent}
            button={button}
            reverse={reverse}
          />
        );
      })}
    </>
  );
};

// ----------------OurMission Box -------------------------
const OurMission = (props) => {
  const {
    img1,
    img2,
    orangecontent,
    greencontent,
    blackcontent,
    button,
    reverse,
  } = props;
  return (
    <>
      {/* Mission Box */}
      <div
        className={`h-[530px] sm:h-[410px] pt-10 w-full ${
          reverse && " h-[480px] md:h-[400px] lg:h-[480px] pt-0"
        }`}
      >
        <div
          className={`relative flex sm:flex-row flex-col justify-center lg:gap-32 md:gap-16 sm:gap-56 sm:pr-10 pl-8 ${
            reverse && "sm:flex-row-reverse"
          }`}
        >
          <div className="w-1/3 flex flex-row gap-4">
            {/* image one (Under) */}
            <img
              src={img1}
              alt=""
              className={`sm:absolute h-40 sm:h-64 md:h-72 lg:h-80  top-10 md:top-10 lg:top-10 ${
                reverse
                  ? "sm:right-16 md:right-36 lg:right-64"
                  : "sm:left-10 md:left-20 lg:left-16"
              }`}
            />
            {/* image two (above) */}
            <img
              src={img2}
              alt=""
              className={`sm:absolute h-40 sm:h-64 md:h-72 lg:h-80  ${
                reverse
                  ? "sm:right-0 md:right-12 lg:right-32 sm:top-28 lg:top-32"
                  : "sm:left-20 md:left-32 lg:left-44"
              }`}
            />
          </div>
          {/* Side Contents */}
          <div className="flex flex-col gap-3 md:gap-2 items-start justify-center md:w-1/2 lg:w-1/2 pt-5 sm:pt-0 lg:pt-16 font-['Open_Sans']">
            <p className="text-[#C76001] text-xl sm:text-3xl font-['Odor_Mean_Chey'] font-bold">
              {orangecontent}
            </p>
            <p className="text-[#218225] text-xl sm:text-3xl font-bold md:pr-6">
              {greencontent}
            </p>
            <p className="text-[#2A303E] font-normal text-xs pr-10 sm:pr-0 lg:pr-20">
              {blackcontent}
            </p>
            <p className="text-[#2A303E] font-normal text-xs pr-10 lg:pr-0 sm:pr-36"></p>
            {!reverse && (
              <button className="bg-[#218225] w-32 text-xs h-8 rounded mt-6 text-[#FFFFFF]">
                {button}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ------------------------OurMissionAndServices Content-------------------
const OurMissionContents = [
  {
    img1: "./images/tomatoes.svg",
    img2: "./images/onions.svg",
    orangecontent: " Our Mission",
    greencontent: "Creating a sustainable future",
    blackcontent: (
      <div>
        Agromart is on a mission to create a sustainable future by connecting
        consumers with small-scale farmers. We believe in the power of local
        food systems to promote healthy eating, support rural communities, and
        protect our environment.
        <div className="mt-1">
          By using our platform, you are joining us in this mission and
          supporting a better food system for all.
        </div>
      </div>
    ),
    button: "Learn more",
  },
  {
    img1: "./images/grass.svg",
    img2: "./images/twopeople.svg",
    orangecontent: "Our Services",
    greencontent:
      "Designed for everyone to participate in a healthy food system with ease.",
    blackcontent:
      "At Agromart, we provide the perfect service for connecting farmers with customers looking for the freshiest, healthiest, and most sustainable produce. Our platform is designed to make it easy for everyone to participate in a sustainable and healthy food system. With our services, you can support local farmers and get the highest quality fruits and vegetables directly from the source. Whether you're a farmer looking to expand your customer base or for expert consultation or a customer looking for the best produce, we're here to help you.",
    button: "",
    reverse: true,
  },
];
export default OurmissionandServices;
export { OurMission };
