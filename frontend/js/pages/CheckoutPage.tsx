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
  item: CartItemDetails;
};

export type ProduceItem = {
  id: number;
  weight: number;
  price: number;
  created_time: string;
  expiry_time: string;
  quality: string;
  item_image: string | null;
  produce_type: number;
  supplier_profile: number;
};
type CartItemDetails = {
  id: number;
  produce_item: ProduceItem;
  cart_item_weight: number;
  cart_item_price: number;
  is_ordered: boolean;
};

type Cart = {
  id: number;
  customer: number;
  items: CartItem[];
};

type ProduceType = {
  id: number;
  name: string;
  image: string;
  category: number | null;
  season: number | null;
};

function CheckoutPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userCart, setUserCart] = useState<Cart[]>([]);
  const [produceTypes, setProduceTypes] = useState<ProduceType[]>([]);
  const [itemTotals, setItemTotals] = useState<{ id: number; price: number }[]>(
    [],
  );

  const accessToken = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios
    .get("/api/users/me/")
    .then((res) => setCurrentUser(res.data))
    .catch(() => setCurrentUser(null));

  useEffect(() => {
    if (!currentUser) return; // wait until currentUser is loaded

    const fetchUserCart = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/carts/"); // Not the right link
        if (!res.ok) {
          throw new Error("Failed to fetch carts");
        }
        const data = await res.json();
        const carts: Cart[] = data.results;

        const filteredCarts = carts.filter(
          (cart) => cart.customer === currentUser.id,
        );
        setUserCart(filteredCarts);
      } catch (error) {
        console.error("Error fetching carts:", error);
      }
    };

    fetchUserCart();
  }, [currentUser]);

  useEffect(() => {
    const fetchProduceTypes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/produce/types/",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch produce types");
        }
        const data = await response.json();
        setProduceTypes(data.results); // assuming the API returns { results: [...] }
      } catch (error) {
        console.error("Error fetching produce types:", error);
      }
    };

    fetchProduceTypes();
  }, []);

  const [formData, setFormData] = useState({
    firstName: currentUser?.first_name || "",
    lastName: currentUser?.last_name || "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.first_name || "",
        lastName: currentUser.last_name || "",
      });
    }
  }, [currentUser]);

  const updateItemTotal = (id: number, price: number) => {
    setItemTotals((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        // update existing
        return prev.map((item) => (item.id === id ? { ...item, price } : item));
      } else {
        // add new
        return [...prev, { id, price }];
      }
    });
  };

  const cartTotal = itemTotals
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);

  const handleRemove = async (cartItemId: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart-items/${cartItemId}/`);

      // After successful deletion on server, update the UI
      setUserCart((prevCarts) =>
        prevCarts.map((cart) => ({
          ...cart,
          items: cart.items.filter((item) => item.id !== cartItemId),
        })),
      );

      // Also remove its price from itemTotals
      setItemTotals((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  if (userCart.length !== 0) {
    console.log(userCart[0].id);
  }

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
              {userCart.length !== 0 ? (
                userCart[0].items.map((cartItem) => {
                  const produceType = produceTypes.find(
                    (type) =>
                      type.id === cartItem.item.produce_item.produce_type,
                  );

                  return (
                    <CheckoutItem
                      key={cartItem.item.produce_item.id}
                      produceType={produceType?.name || ""}
                      price={cartItem.item.produce_item.price}
                      weight={cartItem.item.produce_item.weight}
                      itemImage={cartItem.item.produce_item.item_image || ""}
                      onPriceChange={(price) =>
                        updateItemTotal(cartItem.item.produce_item.id, price)
                      }
                      onRemove={() => handleRemove(cartItem.id)}
                    />
                  );
                })
              ) : (
                <></>
              )}
              <h2 className="total-price">Total Price: ${cartTotal}</h2>
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
                name="firstName"
                value={formData.firstName}
                placeholder="Mary"
              />

              <label>Street Name</label>
              <input style={{ width: "100%" }} type="text" />

              <div className="postcode-state-row">
                <div className="half-width">
                  <label>PostCode</label>
                  <input type="text" />
                </div>
                <div className="half-width">
                  <label>State</label>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="center-align">
              <div className="checkout-button">
                {userCart.length !== 0 ? (
                  <CheckoutButton
                    amount={Number(cartTotal)}
                    cartName="Goat basket"
                    cartId={userCart[0].id.toString()}
                  />
                ) : (
                  <CheckoutButton />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
