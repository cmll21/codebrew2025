import React, { useEffect, useState } from "react";

import "../styles/ShopProduce.css";
import ProduceCardCarousel from "../components/ProduceCardCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

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
};
const ShopProducePage = () => {
  const [produceItems, setProduceItems] = useState<ProduceType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // May not need this
  const [categoryMap, setCategoryMap] = useState<Map<number, string>>(
    new Map(),
  );

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

  // API Call to finding the categories by ID
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/produce/categories/");
        const newCategories = response.data.results;
        setCategories(newCategories);

        // Build the map from the fresh data
        const newMap = new Map<number, string>();
        newCategories.forEach((category: Category) => {
          newMap.set(category.id, category.name);
        });
        setCategoryMap(newMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
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
              .filter((item) => {
                if (item.category !== null) {
                  console.log(
                    `The type of ${item.name} is ${item.category} and ${categoryMap.get(item.category)}`,
                  );
                }
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
              .filter((item) => {
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
              .filter((item) => {
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
            produceList={produceItems
              .filter((item) => {
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
              .filter((item) => {
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
            produceList={produceItems
              .filter((item) => {
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
