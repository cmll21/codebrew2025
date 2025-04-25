import AboutPageTitle from "../../assets/images/AboutPageTitle.svg";
import Carrot from "../../assets/images/Carrot.svg";
import Apple from "../../assets/images/Apple.svg";
import Vine from "../../assets/images/Vine.svg";
import Footer from "../../assets/images/Footer.svg";
import "../styles/About.css";
import "../styles/AuthPage.css";

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
      <div className="about-page-part2--three-column-layout">
        <div className="left-about-box">
          <div className="about-page-dummy-img" />

          <div className="about-page-left-align-text">
            <div className="about-page-header-2-box">
              <h2 className="about-page-header-right-align">
                Support our Aussie Farmers
              </h2>
            </div>

            <p>
              We support Aussie farmers by connecting them directly with
              consumers, reducing waste from discarded produce that doesn’t meet
              supermarket standards. This helps cut labour, water, and fuel
              waste, boosts farmers' income, and reduces the environmental
              impact, making our food system more sustainable.
            </p>
          </div>
          <div className="about-page-dummy-img" />
        </div>
        <img src={Vine} alt="Vine" className="center-vine-image" />

        <div className="right-about-box">
          <div className="about-page-right-align-text-box">
            <h2 className="about-page-header-left-align">
              More Bites, Less Bin
            </h2>
            <p>
              Everyone deserves access to real, affordable, nutritious food —
              not just the glossy stuff that makes it to the shelves.
            </p>
          </div>
          
          <div className="about-page-dummy-img2" />

          <div className="about-page-right-align-text-box">
            <h2 className="about-page-header-left-align">
              Community over Cosmetic
            </h2>
            <p>
              By rethinking cosmetic standards, we reduce waste, save resources,
              and keep food where it belongs, in bellies, not bins. We celebrate
              food in all its quirky, lovable forms.
            </p>
          </div>
        </div>
      </div>

      <div className="about-page-part3">
      <img src={Footer} alt="Footer"/>
      
      </div>
    </>
  );
}

export default AboutPage;

<div className="about-page-part2">
  <div className="left-about-box">Left</div>
  <div className="right-about-box">
    <img src={Vine} alt="Left" className="about-page-vine-image" />
    Right
  </div>
</div>;
