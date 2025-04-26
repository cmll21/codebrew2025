import "../styles/LandingPage.css";
import InstructionCard from "../components/InstructionCard";
import OutlineButton from "../components/OutlineButton";
import ProduceCard from "../components/ProduceCard";
import SeasonalProduceHeader from "../components/SeasonalProduceHeader";

import Instruction1Sticker from "../../assets/images/instruction1.png";
import Instruction2Sticker from "../../assets/images/instruction2.png";
import Instruction3Sticker from "../../assets/images/instruction3.png";
import InstructionBackground from "../../assets/images/instruction-background.png";
import { useNavigate } from "react-router-dom";
import LandingPageGraphic from "../../assets/images/LandingPageGraphic.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/shop");
  };

  return (
    <div>
      <div className="landing-page-part1">
        <h1 className="landing-page-heading">
          Funky, Fresh and Proudly Aussie.
        </h1>
        <div className="landing-page-part1-image">
          <img src={LandingPageGraphic} />
        </div>
        <div className="part1-text-container">
          <p className="landing-page-body-text">
            Join us in saving{" "}
            <b>
              <em>perfectly</em>
            </b>{" "}
            edible produce, supporting local Aussie farmers, and cutting food
            waste one bite at a time.
          </p>
        </div>
        <div className={"button-container"}>
          <OutlineButton text={"Shop Now"} handleClick={handleClick} />
        </div>
      </div>
      <div className="seasonal-produce-section">
        <SeasonalProduceHeader />
        <div className="seasonal-produce-grid">
          <ProduceCard name={"Test"} cardColour={"beige"} />
          <ProduceCard name={"Test"} cardColour={"beige"} />
          <ProduceCard name={"Test"} cardColour={"beige"} />
          <ProduceCard name={"Test"} cardColour={"beige"} />
          <ProduceCard name={"Test"} cardColour={"beige"} />
        </div>
      </div>
      <div className="landing-page-part1">
        <h1
          style={{
            color: "#B5BD89",
            fontSize: "80px",
            textShadow: "4px 4px 0px #3C3C3B",
          }}
          className="landing-page-heading"
        >
          From Farm to Fork
        </h1>
        <div className="external-container">
          <img src={Instruction1Sticker} className="instruction1-sticker" />
          <img src={Instruction2Sticker} className="instruction2-sticker" />
          <img src={Instruction3Sticker} className="instruction3-sticker" />
          <div className="instructions-container">
            <InstructionCard text={"Pick your favourite funky fruit & veg"} />
            <InstructionCard text={"Add your favourites into your cart"} />
            <InstructionCard text={"Get it delivered or pick up nearby"} />
          </div>
        </div>
        <img src={InstructionBackground} className="instruction-background" />
      </div>
      <div className="landing-page-part2">
        <div className="left-section">
          <h2
            className="landing-page-heading"
            style={{
              color: "#82A36B",
              fontSize: "80px",
              textShadow: "4px 4px 0px #3C3C3B",
              textAlign: "left",
            }}
          >
            Why We're Here
          </h2>
          <p
            className="landing-page-body-text"
            style={{ fontSize: "28px", textAlign: "left" }}
          >
            We’re on a mission to fight food waste and give funky-looking
            produce the love it deserves. By backing local Aussie farmers, we’re
            helping cut down on wasted water, fuel, and labour — all while
            keeping good food out of landfill and on Aussie plates. It’s good
            for people, great for growers, and even better for the planet.
          </p>
        </div>
        <div className="right-section">
          <div className="landing-page-part2-image"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
