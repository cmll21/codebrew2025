import React, { useEffect, useState } from "react";

import ProduceCard from "../components/ProduceCard";

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
      <h1>Peculiar Produce</h1>
      <ul>
        {produceItems.map((item) => (
          <li key={item.id}>
            <h3>{item.produce_type.name}</h3>
            <img
              src={item.produce_type.image}
              alt={item.produce_type.name}
              style={{ width: "200px" }}
            />
            <p>
              Supplier: {item.supplier_profile.user.first_name}{" "}
              {item.supplier_profile.user.last_name}
            </p>
            <p>Weight: {item.weight}kg</p>
            <p>Price: ${item.price}</p>
            <p>Quality: {item.quality}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopProductsPage;
