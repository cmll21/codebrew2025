import React from "react";
import "../styles/ProductCard.css";

const PriceDropdown = () => {
  return (
    <div className="priceDropdownContainer">
      <select className="priceDropdown">
        <option>50g</option>
        <option>100g</option>
      </select>
    </div>
  );
};

export default PriceDropdown;
