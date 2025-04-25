import React, { useState } from "react";
import "../styles/ProductCard.css";
import DownArrow from "../../assets/images/arrow-down-light.svg";

const PriceDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Default");
  const items = ["50g", "100g", "150g", "200g"];

  const handleSelect = (item: string) => {
    setSelected(item);
    setOpen(false);
  };

  return (
    <div className="dropdownContainer">
      <div className="dropdownButtonContainer">
        <div className="dropdownButton" onClick={() => setOpen(!open)}>
          {selected}
          <div className="dropdownArrow">
            <img src={DownArrow} />
          </div>
        </div>
        <div className="price">| $Price</div>
      </div>
      {open && (
        <div className="dropdownMenu">
          {items.map((item) => (
            <div
              key={item}
              className="dropdownItem"
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceDropdown;
