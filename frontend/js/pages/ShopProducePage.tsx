import React, { useEffect, useState } from "react";

import "../styles/ShopProduce.css";
import ProduceCardCarousel from "../components/ProduceCardCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CURR_SEASON = "winter";
const VEGETABLES = "vegetables";
const FRUITS = "fruits";
const LEAFY_GREENS = "leafy_greens";
const MUSHROOMS = "mushrooms";
const ROOTS = "roots";

type ProduceType = {
  id: number;
  name: string;
  image: string;
  category: number;
  season: string | null;
};

type Category = {
  id: number;
  name: string;
  types: string[];
}
const ShopProducePage = () => {
  const [produceItems, setProduceItems] = useState<ProduceType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // May not need this
  const [categoryMap, setCategoryMap] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    fetch("http://localhost:8000/api/produce/types/")
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

  // API Call to finding the categories by ID
  useEffect(() => {
    fetch("http://localhost:8000/api/produce/categories/")
      .then((response) => response.json())
      .then((data) => {
        const newCategories = data.results;
        setCategories(newCategories);
        
        // Build the map from the fresh data
        const newMap = new Map<number, string>();
        newCategories.forEach((category: Category) => {
          newMap.set(category.id, category.name);
        });
        setCategoryMap(newMap);
      })
      .catch(console.error);
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
            produceList={produceItems
              .filter(item => {
                return item.season == CURR_SEASON;
              })
              .map((type) => ({
              name: type.name,
              image: type.image,
              cardColour: "#E2D7C3",
            }))}
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
            produceList={produceItems
              .filter(item => {
                return categoryMap.get(item.category) == VEGETABLES;
              })
              .map((type) => ({ 
              name: type.name,
              image: type.image,
              cardColour: "#E9B44C",
            }))}
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
            produceList={produceItems
              .filter(item => {
                return categoryMap.get(item.category) == FRUITS;
              })
              .map((type) => ({
              name: type.name,
              image: type.image,
              cardColour: "#82A36B",
            }))}
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
            produceList={produceItems.filter(item => {
              return categoryMap.get(item.category) == LEAFY_GREENS;
            })
              .map((type) => ({
              name: type.name,
              image: type.image,
              cardColour: "#82A36B",
            }))}
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
            produceList={produceItems
              .filter(item => {
                return categoryMap.get(item.category) == MUSHROOMS;
              })
              .map((type) => ({
              name: type.name,
              image: type.image,
              cardColour: "#E9B44C",
            }))}
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
            produceList={produceItems.filter(item => {
              return categoryMap.get(item.category) == ROOTS;
            })
              .map((type) => ({
              name: type.name,
              image: type.image,
              cardColour: "#C87A3F",
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopProducePage;

