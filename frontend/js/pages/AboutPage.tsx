import AboutPageTitle from "../../assets/images/AboutPageTitle.svg";
import "../styles/About.css";

function AboutPage() {
  return (
    <>
      <div className="about-page-part1">
        <div className="about-page-title">
          <img src={AboutPageTitle} />
        </div>
        <div className="about-page-header">
        Fighting <span style={{ fontStyle: "italic" }}>Waste</span>&nbsp;with Taste
        </div>
      </div>
      <div className="about-page-part2">
hi
      </div>
    </>
  );
}

export default AboutPage;
