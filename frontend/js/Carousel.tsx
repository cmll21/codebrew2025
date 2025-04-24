import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type SliderType = {
  slickNext: () => void;
  slickPrev: () => void;
};

const Carousel = () => {
  const seasonalItems = [
    "WHAT'S ON SPECIAL THIS SEASON:",
    "KALE",
    "SILVERBEET",
    "SPINACH",
    "LETTUCE",
    "ENDIVE",
    "BROCCOLI",
    "CAULIFLOWER",
    "BRUSSELS SPROUTS",
    "CARROTS",
    "BEETROOT",
    "PARSNIPS",
    "TURNIPS",
  ];

  // Double the array for better looping
  const doubledItems = [...seasonalItems, ...seasonalItems, ...seasonalItems];

  const sliderRef = useRef<SliderType | null>(null); 

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 150); 

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500, 
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: false,
    variableWidth: true,
    swipe: false,
    touchMove: false,
    draggable: false,
  };

  return (
    <div className="seasonal-specials" style={{ overflow: "hidden" }}>
      <Slider ref={sliderRef} {...settings}>
        {doubledItems.map((item, index) => (
          <div
            key={index}
            className="special-item"
            style={{
              margin: "0 15px",
              whiteSpace: "nowrap",
            }}
          >
            <h3
              style={{
                display: "inline-block",
                padding: "0 10px",
                fontSize: "1.2rem",
              }}
            >
              {item}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
