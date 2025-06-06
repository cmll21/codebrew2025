import { useEffect, useState } from "react";
import axios from "axios";

import "../styles/LandingPage.css";
import InstructionCard from "../components/InstructionCard";
import OutlineButton from "../components/OutlineButton";
import ProduceCard from "../components/ProduceCard";
import SeasonalProduceHeader from "../components/SeasonalProduceHeader";
import ProduceCardCarousel from "../components/ProduceCardCarousel";

import Instruction1Sticker from "../../assets/images/instruction1.png";
import Instruction2Sticker from "../../assets/images/instruction2.png";
import Instruction3Sticker from "../../assets/images/instruction3.png";
import InstructionBackground from "../../assets/images/instruction-background.png";
import { useNavigate } from "react-router-dom";

import LandingPageGraphic from "../../assets/images/LandingPageGraphic.png";
import Instruction1Graphic from "../../assets/images/Instruction1Graphic.png";
import Instruction2Graphic from "../../assets/images/Instruction2Graphic.png";
import Instruction3Graphic from "../../assets/images/Instruction3Graphic.png";
import LandingPageImage from "../../assets/images/LandingPageImage.png";

import { CURR_SEASON } from "./ShopProducePage";
import { ProduceType } from "./ShopProducePage";

const LandingPage = () => {
  const [produceItems, setProduceItems] = useState<ProduceType[]>([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/shop");
  };

  // Ideally you'd get this from App.tsx
  useEffect(() => {
    const fetchProduceItems = async () => {
      try {
        const response = await axios.get("/api/produce/types/");
        console.log("Fetched produce data:", response.data.results);
        setProduceItems(response.data.results);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchProduceItems();
  }, []);

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
        <div className="section">
          <div className="produce-carousel-container">
            <ProduceCardCarousel
              produceList={produceItems
                .filter((item) => {
                  return item.season === CURR_SEASON;
                })
                .map((type) => ({
                  name: type.name,
                  image: type.image,
                  cardColour: "#E2D7C3",
                }))}
            />
          </div>
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
            <InstructionCard
              text={"Pick your favourite funky fruit & veg"}
              image={Instruction1Graphic}
            />
            <InstructionCard
              text={"Add your favourites into your cart"}
              image={Instruction2Graphic}
            />
            <InstructionCard
              text={"Get it delivered or pick up nearby"}
              image={Instruction3Graphic}
            />
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
          <div className="landing-page-part2-image">
            <img
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={LandingPageImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
