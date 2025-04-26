import React, { useState } from "react";
import "../styles/Card.css";
import DownArrow from "../../assets/images/arrow-down-light.svg";
import Line from "../../assets/images/DropdownLine.svg";

const PriceDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Default");
  const items = ["50g", "100g", "150g", "200g"];

  const handleSelect = (item: string) => {
    setSelected(item);
    setOpen(false);
  };

  return (
    // <div className="dropdownContainer">
    //   <div className="dropdownButtonContainer">
    //     <div className="dropdownButton" onClick={() => setOpen(!open)}>
    //       {selected}
    //       <div className="dropdownArrow">
    //         <img src={DownArrow} />
    //       </div>
    //     </div>
    //     <div className="price">| $Price</div>
    //   </div>
    //   {open && (
    //     <div className="dropdownMenu">
    //       {items.map((item) => (
    //         <div
    //           key={item}
    //           className="dropdownItem"
    //           onClick={() => handleSelect(item)}
    //         >
    //           {item}
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className="buttonContainer">
      <div className="dropdownContainer" onClick={() => setOpen(!open)}>
        <div className="dropdownFont downContainer">
          {/* Placeholder text and arrow */}
          {selected}
          <div className="dropdownArrow ">
            <img src={DownArrow} />
          </div>
        </div>

        <div className="lineContainer">
          {/* Vertical line */}
          <img src={Line} />
        </div>

        <div className="priceContainer priceFont">$ Price</div>
      </div>

      <div
        className="dropdownMenu"
        style={{ display: open ? "block" : "none" }}
      >
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
    </div>
  );
};

export default PriceDropdown;
