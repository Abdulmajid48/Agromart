import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Teammembers = () => {
  return (
    <>
      <div className=" ml-8 mb-20">
        <p className="text-[#C76001] font-['Odor_Mean_Chey'] text-2xl sm:text-3xl mb-2">Team Member</p>
        <div className="flex flex-row flex-wrap gap-8 sm:gap-16 font-['Inter']">
          {TeammemberContent.map((content, index) => {
            const { img, name, position } = content;
            return (
              <Teammember
                key={index}
                img={img}
                name={name}
                position={position}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const Teammember = (props) => {
  const { img, name, position } = props;
  return (
    <>
      <div
        className="h-72 w-44 sm:w-56 bg-[#FFFFFF] rounded-b-md"
        style={{
          boxShadow:
            " 13.61px 21.38px 50.54px -11.66px rgba(127, 127, 127, 0.1)",
        }}
      >
        <img
          src={img}
          alt=""
          className="h-2/3 w-full object-cover rounded-t-lg"
        />
        <div className="mt-5 text-xs sm:text-sm align-middle flex flex-col gap-2 p-2 text-[#222124]">
          <p className="font-semibold">{name}</p>
          <div className="flex flex-row justify-between items-center">
            <p className="font-light">{position}</p>
            <div className="flex flex-row gap-1">
              <XIcon />
              <LinkedInIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TeammemberContent = [
  {
    img: "./images/ceo.jpeg",
    name: "Mayor Mayor",
    position: "CEO of Agromart",
  },
  {
    img: "./images/ceo.jpeg",
    name: "Mayor Mayor",
    position: "CEO of Agromart",
  },
  {
    img: "./images/ceo.jpeg",
    name: "Mayor Mayor",
    position: "CEO of Agromart",
  },
  {
    img: "./images/ceo.jpeg",
    name: "Mayor Mayor",
    position: "CEO of Agromart",
  },
  {
    img: "./images/ceo.jpeg",
    name: "Mayor Mayor",
    position: "CEO of Agromart",
  },
  {
    img: "./images/ceo.jpeg",
    name: "Mayor Mayor",
    position: "CEO of Agromart",
  },
  {
    img: "./images/ceo.jpeg",
    name: "Mayor Mayor",
    position: "CEO of Agromart",
  },
  {
    img: "./images/ceo.jpeg",
    name: "Mayor Mayor",
    position: "CEO of Agromart",
  },
];

export default Teammembers;
