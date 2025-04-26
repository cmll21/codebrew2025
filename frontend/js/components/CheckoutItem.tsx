import "../styles/Checkout.css";
import QuantitySelector from "./QuantitySelector";
import RemoveItemLogo from "../../assets/images/remove-item-logo.svg";
import { useEffect, useState } from "react";
import { toTitleCase } from "../utils";
import { Link } from "react-router-dom";

type CheckoutItemProps = {
  produceType: string;
  price: number;
  weight: number;
  itemImage: string;
  onPriceChange: (price: number) => void;
  onRemove: () => void;
};

const CheckoutItem = (props: CheckoutItemProps) => {
  const [grams, setGrams] = useState(props.weight * 1000);
  const price = (grams / 100) * props.price;

  useEffect(() => {
    const pricePerGram = props.price / 100;
    const totalPrice = grams * pricePerGram;
    props.onPriceChange(totalPrice);
  }, [grams]);

  return (
    <div className="checkout-item">
      <div className="item-image">
        <img className="item-image-actual" src={props.itemImage} />
      </div>
      <div className="item-right">
        <div className="top-right-container">
          <div className="item-text">
            <p className="item-name">
              {toTitleCase(props.produceType) || "Product Name"}
            </p>
            <p className="item-details">${props.price} / 100g</p>
          </div>
          <div>
            <img
              className="remove-item-logo"
              src={RemoveItemLogo}
              onClick={props.onRemove}
            />
          </div>
        </div>
        <QuantitySelector initial={grams} onChange={setGrams} />
        <hr className="dotted-line" />
        <p className="price">${price}</p>
      </div>
    </div>
  );
};

export default CheckoutItem;
