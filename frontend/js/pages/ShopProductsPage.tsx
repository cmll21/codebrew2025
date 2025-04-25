import React, { useEffect, useState } from "react";

import ProduceCard from "../components/ProduceCard";
import "../styles/ShopProduce.css";

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

const ShopProductsPage = () => {
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
          <ProduceCard />
          <ProduceCard />
          <ProduceCard />
          <ProduceCard />
          <ProduceCard />
        </div>
      </div>
    </div>
  );
};

export default ShopProductsPage;
