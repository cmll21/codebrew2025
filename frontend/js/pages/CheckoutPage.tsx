import { Link } from "react-router-dom";
import "../styles/Checkout.css";
import CheckoutItem from "../components/CheckoutItem";
import Button from "../components/Button";
import CheckoutButton from "../components/CheckoutButton";
import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  user_type: string;
};

type CartItem = {
  id: number;
  item: number;
};

type Cart = {
  id: number;
  customer: number;
  items: CartItem[];
};

function CheckoutPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userCart, setUserCart] = useState<Cart[]>([]);

  const accessToken = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios
    .get("/api/users/me/")
    .then((res) => setCurrentUser(res.data))
    .catch(() => setCurrentUser(null));

  useEffect(() => {
    fetch("http://localhost:8000/api/carts/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch carts");
        }
        return response.json();
      })
      .then((data) => {
        const carts: Cart[] = data.results;
        // Filter for customer 4 only
        const userCart = carts.filter(
          (cart) => cart.customer === currentUser?.id,
        );
        setUserCart(userCart);
      })
      .catch((error) => {
        console.error("Error fetching carts:", error);
      });
  }, []);

  console.log(userCart);

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
                <CheckoutButton amount={50} cartName="Goat basket" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
