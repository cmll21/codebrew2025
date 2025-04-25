import ProduceCard, { ProduceCardProps } from "./ProduceCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import "../styles/ShopProduce.css";

interface ProduceCardCarouselProps {
  produceList?: ProduceCardProps[];
}
const ProduceCardCarousel = ({
  produceList = [],
}: ProduceCardCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    centerMode: true, // Enables center positioning
    centerPadding: "0",
    dots: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: i === currentSlide ? "black" : "gray",
          borderRadius: "50%",
        }}
      ></div>
    ),
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
      <Slider {...settings}>
        {produceList.map((produce, index) => (
          <div key={index} className="carousel-item">
            <ProduceCard {...produce} />
          </div>
        ))}
      </Slider>
  );
};

export default ProduceCardCarousel;
