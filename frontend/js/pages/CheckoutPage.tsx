import { Link } from "react-router-dom";
import "../styles/Checkout.css";
import CheckoutItem from "../components/CheckoutItem";
import Button from "../components/Button";
import CheckoutButton from "../components/CheckoutButton";

const handleClick = () => {
  console.log("clicked");
};

function CheckoutPage() {
  return (
    <div>
      <h3 className="checkout-text">
        Look at you saving money and the planet :)
      </h3>
      <div className="checkout-container">
        <div className="left-container">
          <div className="checkout-list-container">
            <p className="shopping-cart-text">Your Shopping Cart</p>
            <div>
              <CheckoutItem />
              <CheckoutItem />
              <CheckoutItem />
            </div>
          </div>
        </div>
        <div className="left-container">
          <div className="checkout-list-container">
            <p className="shopping-cart-text">Payment Details</p>

            <div className="payment-form-container">
              <label>First Name</label>
              <input style={{ width: "100%" }} type="text" placeholder="Mary" />

              <label>Last Name</label>
              <input
                style={{ width: "100%" }}
                type="text"
                placeholder="Stevenson"
              />

              <label>Street Name</label>
              <input
                style={{ width: "100%" }}
                type="text"
                placeholder="Stevenson"
              />

              <div className="postcode-state-row">
                <div className="half-width">
                  <label>PostCode</label>
                  <input type="text" placeholder="Stevenson" />
                </div>
                <div className="half-width">
                  <label>State</label>
                  <input type="text" placeholder="Stevenson" />
                </div>
              </div>
            </div>
            <div className="center-align">
              <div className="checkout-button">
                {/* TODO: Pass in cart total price into amount, and then "Name's cart" into name */}
                <CheckoutButton amount={50} cartName="Goat basket" cartId={1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
