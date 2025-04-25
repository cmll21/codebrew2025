import "../styles/Checkout.css";
import QuantitySelector from "./QuantitySelector";
import RemoveItemLogo from "../../assets/images/remove-item-logo.svg";

const CheckoutItem = () => {
  return (
    <div className="checkout-item">
      <div className="item-image"></div>
      <div className="item-right">
        <div className="top-right-container">
          <div className="item-text">
            <p className="item-name">Product Name</p>
            <p className="item-details">$00.00 / 100g</p>
          </div>
          <div>
            <img src={RemoveItemLogo} />
          </div>
        </div>
        <QuantitySelector />
        <hr className="dotted-line" />
        <p className="price">$00.00</p>
      </div>
    </div>
  );
};

export default CheckoutItem;
