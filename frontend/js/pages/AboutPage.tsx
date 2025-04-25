import AboutPageTitle from "../../assets/images/AboutPageTitle.svg";
import Carrot from "../../assets/images/Carrot.svg";
import Apple from "../../assets/images/Apple.svg";
import "../styles/About.css";

function AboutPage() {
  return (
    <>
      <div className="about-page-part1">
        <div className="about-page-part1-header">
          <div className="about-page-title">
            <img src={AboutPageTitle} />
          </div>
          <div className="about-page-header">
            Fighting <span style={{ fontStyle: "italic" }}>Waste</span>
            &nbsp;with Taste
          </div>
        </div>
        <div className="about-page-three-column-layout">
          <img src={Carrot} alt="Left" className="about-page-carrot-image" />
          <p className="about-page-text">
            We’re here to shake things up and we’re not afraid to get a little
            wonky doing it.{" "}
            <span style={{ fontStyle: "italic" }}>Every year</span>, Aussie
            farmers are <span style={{ fontStyle: "italic" }}>forced</span> to
            toss out
            <span style={{ fontStyle: "italic" }}>
              perfectly edible fruits and veggies
            </span>{" "}
            just because they don’t meet supermarket beauty standards. Twisty
            carrots, freckled apples, bumpy tomatoes? Still delicious. Still
            nutritious. Still worthy. We’re building a better way — connecting
            farmers and wholesalers straight to people who care more about taste
            than looks. By embracing the weird, we’re making fresh, healthy food
            more accessible and affordable for everyone. Because food belongs on
            plates, not in landfills — and the future of food should be full of
            flavor, fairness, and a little bit of funk.
          </p>
          <img src={Apple} alt="Right" className="about-page-apple-image" />
        </div>
      </div>
      <div className="about-page-part2">hi</div>
    </>
  );
}

export default AboutPage;
