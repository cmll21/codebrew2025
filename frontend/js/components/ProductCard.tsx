import PriceDropdown from "./PriceDropdown";
import LightButton from "./LightButton";
import "../styles/Card.css";
import Carrot from "../../assets/images/Carrot.svg";
import { toTitleCase } from "../utils";

export type ProductCardProps = {
  name: string;
  image?: string;
  cardColour: string;
};

const ProductCard = (props: ProductCardProps) => {
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
        <PriceDropdown />
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
