//------------------SubServices Section ----------------------------
const SubServices = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center m-auto grow gap-4 h-[700px] sm:h-80 w-5/6 sm:ml-7 md:ml-16 sm:mr-3 overflow-hidden">
        {SubServicesContent.map((content, index) => {
          const { img, greencontent, blackcontent, bluecontent } = content;
          return (
            <SubService
              key={index}
              img={img}
              greencontent={greencontent}
              bluecontent={bluecontent}
              blackcontent={blackcontent}
            />
          );
        })}
      </div>
    </>
  );
};

// ------------ Subservices Box--------------
const SubService = (props) => {
  const { img, greencontent, blackcontent, bluecontent } = props;

  return (
    <>
      <div
        className="flex flex-col gap-5 w-96 sm:w-2/3 h-56 sm:h-72 lg:h-64 pl-5 sm:pl-4 pt-5 sm:pt-2 md:mt-20 lg:mt-10 pr-5 sm:pr-2 bg-{#FFFFFF} font-['Open_Sans'] rounded-xl relative"
        style={{ boxShadow: "14px 22px 52px -12px rgba(127, 127, 127, 0.1)" }}
      >
        <div className="flex flex-row justify-start items-center gap-3">
          <img src={img} alt="" className="h-10" />
          <p className="text-[#218225] text-xl sm:text-lg md:text-2xl font-bold">
            {greencontent}
          </p>
        </div>
        <p className="text-xs text-[#2A303E] ">{blackcontent}</p>
        <p className="text-xs text-[#1A78C2] absolute bottom-4 sm:bottom-10 lg:bottom-4">
          {bluecontent}
        </p>
      </div>
    </>
  );
};
// ------------------- Subservices Contents------------------
const SubServicesContent = [
  {
    img: "./images/connect.svg",
    greencontent: "Connecting farmers & Customers",
    blackcontent:
      "Shop with us for the freshiest, healthiest, and most sustainable produce directly from local farmers and enjoy the benefits of a healthy food system.",
    bluecontent: "Explore available products",
  },
  {
    img: "./images/expert.svg",
    greencontent: "Expert Consultations for farmers",
    blackcontent:
      "Get expert advice and consultation services from our experienced professionals to improve your farming practices and increase your profitability.",
    bluecontent: "Get Expert consultations",
  },
  {
    img: "./images/grow.svg",
    greencontent: "Grow your farming business",
    blackcontent:
      "Partner with us to expand your customer base, rent farming equipment, and access resources to help you succeed.",
    bluecontent: "Partner with us",
  },
];


export default SubServices;
