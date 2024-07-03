// Our Mission as box structure
import { OurMission } from "./OurmissionandServices";

// ----------------------- Join Us Section ----------------------
const JoinUs = () => {
  return (
    <>
      {joinUsContent.map((content, index) => {
        const {
          img1,
          img2,
          orangecontent,
          greencontent,
          blackcontent,
          button,
        } = content;
        return (
          <OurMission
            key={index}
            img1={img1}
            img2={img2}
            orangecontent={orangecontent}
            greencontent ={greencontent}
            blackcontent={blackcontent}
            button={button}
          />
        );
      })}
    </>
  );
};

// ---------------- Join Us Contents --------------------
const joinUsContent = [
  {
    img1: "./images/menwalking.svg",
    img2: "./images/atfield.svg",
    orangecontent: "Join Us",
    greencontent: "Join our professional team",
    blackcontent:
      "Join our team and help us connect farmers directly with customers. We're constantly looking for dedicated individuals who share our passion for sustainable agriculture and local communities. You'll work with a supportive team and have the opportunity to make a meaningful impact while gaining valuable experience in the industry. You are just a step away to join us in supporting local farmers and creating a more sustainable future.",
    button: "Join Us",
  },
];

export default JoinUs;
