import { Link } from "react-router-dom";

function CheckoutPage() {
  return (
    <>
      Look at you saving money and the planet :)
      <button>
        <Link to="/">Go back</Link>
      </button>
    </>
  );
}

export default CheckoutPage;
