import React, { useEffect, useState } from "react";

import ProduceCard from "../components/ProduceCard";
import "../styles/ShopProduce.css";
import { Link } from "react-router-dom";

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
      <div className="section">
        <h2 className="section-subtitle">Produce in Season</h2>
        <div className="produce-grid">
          <Link key={"carrot"} to={"/produce/carrot"}>
            <ProduceCard name={"Carrot"} />
          </Link>
          <ProduceCard name={"Tomato"} />
          <ProduceCard name={"Potato"} />
          <ProduceCard name={"Eggplant"} />
          <ProduceCard name={"Lettuce"} />
        </div>
      </div>
    </div>
  );
};

export default ShopProducePage;
