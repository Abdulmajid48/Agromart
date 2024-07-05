import AboutusTopbar from "../components/AboutusTopbar";
import { JoinUsContent } from "../components/JoinUs";
import {
  OurMission,
  OurMissionContents,
} from "../components/OurmissionandServices";
import Teammembers from "../components/Teammember";

// About Us Page
const AboutUs = () => {
  return (
    <>
    <AboutusTopbar/>
      <Aboutusmission />
      <Aboutusteam />
      <Teammembers />
    </>
  );
};

const Aboutusmission = () => {
  return (
    <section>
      {OurMissionContents.map((content, index) => {
        const {
          img1,
          img2,
          orangecontent,
          greencontent,
          blackcontent,
          button,
          reverse,
          aboutus,
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
            aboutus={aboutus}
          />
        );
      })}
    </section>
  );
};

const Aboutusteam = () => {
  return (
    <section className="mb-10">
      {JoinUsContent.map((content, index) => {
        const {
          img1,
          img2,
          orangecontent,
          greencontent,
          blackcontent,
          button,
          reverse,
          ourteam,
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
            ourteam={ourteam}
          />
        );
      })}
    </section>
  );
};

export default AboutUs;
