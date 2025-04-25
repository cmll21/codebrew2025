import React from "react";

import ProductImageWrapper from "./ProductImageWrapper";
import PriceDropdown from "./PriceDropdown";
import Button from "./Button";
import LightButton from "./LightButton";

const ProductCard = () => {
  return (
    <div style={{ width: "265px" }}>
      <ProductImageWrapper />
      <PriceDropdown />
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
