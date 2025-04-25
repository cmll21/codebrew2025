import AboutPageTitle from "../../assets/images/AboutPageTitle.svg";
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
        <div className="about-page-text1-box">
          <p className="about-page-text">
            We’re here to shake things up and we’re not afraid to get a little
            wonky doing it. Every year, Aussie farmers are forced to toss out
            perfectly edible fruits and veggies just because they don’t meet
            supermarket beauty standards. Twisty carrots, freckled apples, bumpy
            tomatoes? Still delicious. Still nutritious. Still worthy. We’re
            building a better way — connecting farmers and wholesalers straight
            to people who care more about taste than looks. By embracing the
            weird, we’re making fresh, healthy food more accessible and
            affordable for everyone. Because food belongs on plates, not in
            landfills — and the future of food should be full of flavor,
            fairness, and a little bit of funk.
          </p>
        </div>
      </div>
      <div className="about-page-part2">hi</div>
    </>
  );
}

export default AboutPage;
