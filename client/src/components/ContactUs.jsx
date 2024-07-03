// ------------------------Contact Us Section--------------------
const ContactUs = () => {
  return (
    <>
      <div className="flex flex-col gap-4 font-['Open_Sans'] text-[#C76001] ml-10 sm:ml-20 mt-10">
        <p className="font-['Odor_Mean_Chey'] text-xl font-semibold">
          Contact Us
        </p>
        <p className="text-[#218225] text-2xl font-bold">
          Get in touch with us
        </p>
        <p className="text-[#2A303E] text-xs">
          Let us know if there is anything we can do for you
        </p>
      </div>
      {/* Re interate the boxes */}
      <div className="bg-[url('/images/orangefield.png')] bg-cover rounded-lg h-auto sm:h-52 w-auto sm:w-3/4 ml-10 sm:ml-20 mt-10 mb-40 py-5 sm:py-0 px-3 sm:px-10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
        {ContactUsContent.map((content, index) => {
          const { img, name, description, address } = content;
          return (
            <Contact
              key={index}
              img={img}
              name={name}
              description={description}
              address={address}
            />
          );
        })}
      </div>
    </>
  );
};


// -----------------The box Structure--------------------------------
const Contact = (props) => {
  const { img, name, description, address } = props;
  return (
    <div className="bg-[#FFFFFF] w-3/4 sm:w-1/3 h-40 sm:h-3/4 rounded-lg flex flex-col items-start justify-end p-2 pr-0 text-xs relative">
      <img src={img} alt="" className="h-7 absolute top-3" />
      <div className="flex flex-col gap-2 font-['Open_Sans']">
        <p className="font-semibold text-[#2A303E]">{name}</p>
        <p className="font-['Inter'] text-[#717785] ">{description}</p>
        <p className="text-[#222124]">{address}</p>
      </div>
    </div>
  );
};

// -----------------Contents in the Section-----------------
const ContactUsContent = [
  {
    img: "./images/emailimg.svg",
    name: "Email",
    description: "Leave us an email",
    address: "agromart@gmail.com",
  },
  {
    img: "./images/emailimg.svg",
    name: "Phone",
    description: "Give us a call during office hours",
    address: "+234 906 594 1182",
  },
  {
    img: "./images/emailimg.svg",
    name: "Chat",
    description: "Use our live chat",
    address: "Start Chat",
  },
  {
    img: "./images/emailimg.svg",
    name: "Locations",
    description: "Come see us Mon - Fri 9am -5pm",
    address: "OAU farm, Ile-Ife, Osun State",
  },
];
export default ContactUs;
