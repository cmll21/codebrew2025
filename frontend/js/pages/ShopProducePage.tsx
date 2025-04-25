import React, { useEffect, useState } from "react";

import "../styles/ShopProduce.css";
import { Link } from "react-router-dom";
import ProduceCardCarousel from "../components/ProduceCardCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ProduceItem = {
  id: number;
  produce_type: {
    id: number;
    name: string;
    image: string;
  };
  supplier_profile: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      user_type: string;
    };
  };
  weight: number;
  price: number;
  created_time: string;
  expiry_time: string;
  quality: string;
};

const ShopProducePage = () => {
  const [produceItems, setProduceItems] = useState<ProduceItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/produce/items/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched produce data:", data.results);
        setProduceItems(data.results);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <div>
      <div className="section-header">
        <h1 className="section-title">Peculiar Produce</h1>
        {/* Category filters go here */}
      </div>
      <div className="section" style={{ backgroundColor: "#E9B44C" }}>
        <h2 className="section-subtitle" style={{ color: "#E2D7C3" }}>
          Produce in Season
        </h2>
        <div
          className="produce-carousel-container"
          style={{ backgroundColor: "#E9B44C" }}
        >
          <ProduceCardCarousel
            produceList={[
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
            ]}
          />
        </div>
      </div>
      <div className="section" style={{ backgroundColor: "#E2D7C3" }}>
        <h2 className="section-subtitle" style={{ color: "#E9B44C" }}>
          Wonky and Wonderful Vegetables
        </h2>
        <div
          className="produce-carousel-container"
          style={{ backgroundColor: "#E2D7C3" }}
        >
          <ProduceCardCarousel
            produceList={[
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
            ]}
          />
        </div>
      </div>
      <div className="section" style={{ backgroundColor: "#F4F1E6" }}>
        <h2 className="section-subtitle" style={{ color: "#82A36B" }}>
          Funky and Fresh Fruits
        </h2>
        <div
          className="produce-carousel-container"
          style={{ backgroundColor: "#F4F1E6" }}
        >
          <ProduceCardCarousel
            produceList={[
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
            ]}
          />
        </div>
      </div>
      <div className="section" style={{ backgroundColor: "#E2D7C3" }}>
        <h2 className="section-subtitle" style={{ color: "#82A36B" }}>
          Wild and Wavy Greens
        </h2>
        <div
          className="produce-carousel-container"
          style={{ backgroundColor: "#E2D7C3" }}
        >
          <ProduceCardCarousel
            produceList={[
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
            ]}
          />
        </div>
      </div>
      <div className="section" style={{ backgroundColor: "#F4F1E6" }}>
        <h2 className="section-subtitle" style={{ color: "#E9B44C" }}>
          Wild and Whimsical Mushies
        </h2>
        <div
          className="produce-carousel-container"
          style={{ backgroundColor: "#F4F1E6" }}
        >
          <ProduceCardCarousel
            produceList={[
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
            ]}
          />
        </div>
      </div>
      <div className="section" style={{ backgroundColor: "#E2D7C3" }}>
        <h2 className="section-subtitle" style={{ color: "#C87A3F" }}>
          Lumpy Root Legends
        </h2>
        <div
          className="produce-carousel-container"
          style={{ backgroundColor: "#E2D7C3" }}
        >
          <ProduceCardCarousel
            produceList={[
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
              { name: "Carrot" },
              { name: "Tomato" },
              { name: "Potato" },
              { name: "Eggplant" },
              { name: "Lettuce" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopProducePage;

{
  /* <div className="produce-grid">
  <Link key={"carrot"} to={"/produce/carrot"}>
    <ProduceCard name={"Carrot"} />
  </Link>
  <ProduceCard name={"Tomato"} />
  <ProduceCard name={"Potato"} />
  <ProduceCard name={"Eggplant"} />
  <ProduceCard name={"Lettuce"} />
</div>; */
}
