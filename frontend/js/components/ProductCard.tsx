import PriceDropdown from "./PriceDropdown";
import LightButton from "./LightButton";
import "../styles/Card.css";
import Carrot from "../../assets/images/Carrot.svg";
import { toTitleCase } from "../utils";
import axios from "axios";
import { useEffect, useState } from "react";

export type ProductCardProps = {
  name: string;
  image?: string;
  cardColour: string;
};

const ProductCard = (props: ProductCardProps) => {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get("/api/produce/items/", {
          params: { name: props.name },
        });
        const items = response.data.results;
        if (items.length > 0) {
          setPrice(items[0].price);
        }
      } catch (error) {
        console.error("Failed to fetch price:", error);
      }
    };

    fetchPrice();
  }, [props.name]);

  return (
    <div
      style={{
        width: "265px",
        display: "flex",
        flexDirection: "column",
        margin: "10px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <div className="productImage">
          <img src={props.image} className="produce-image" />
        </div>
        <div className="product-card-text">{toTitleCase(props.name)}</div>
      </div>

      <div style={{ position: "relative", marginBottom: "50px" }}>
        <PriceDropdown price={price} />
      </div>

      <div className="marginTop">
        <LightButton
          text={"Add to Cart"}
          handleClick={() => console.log("hi")}
        />
      </div>
    </div>
  );
};

export default ProductCard;
