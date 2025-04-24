import React from "react";

import ProductImageWrapper from "./ProductImageWrapper";
import PriceDropdown from "./PriceDropdown";
import Button from "./Button";

const ProductCard = () => {
  return (
    <div style={{ width: "265px" }}>
      <ProductImageWrapper />
      <PriceDropdown />
      <div className="marginTop">
        <Button text={"Add to Cart"} handleClick={() => console.log("hi")} />
      </div>
    </div>
  );
};

export default ProductCard;
