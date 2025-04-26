import PriceDropdown from "./PriceDropdown";
import LightButton from "./LightButton";
import "../styles/Card.css";
import { toTitleCase } from "../utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type ProductCardProps = {
  id: number;
  name: string;
  image?: string;
  cardColour: string;
  cartId?: number;
};

const ProductCard = (props: ProductCardProps) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState<number | undefined>(undefined);

  console.log(props.cartId);

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

  const handleClick = async () => {
    if (props.cartId === -1) {
      navigate("/auth");
      return;
    }

    // try {
    //   await axios.post(`/api/carts/${props.cartId}/add_item/`, {
    //     item_id: props.id,
    //     quantity: 1,
    //   });
    //   console.log("Item added to cart!");
    // } catch (error) {
    //   console.error("Failed to add item to cart:", error);
    // }
    console.log("added");
  };

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
        <LightButton text={"Add to Cart"} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default ProductCard;
