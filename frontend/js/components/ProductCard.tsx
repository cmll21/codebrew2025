import React from "react";

import ProductImageWrapper from "./ProductImageWrapper";
import PriceDropdown from "./PriceDropdown";

const ProductCard = () => {
  return (
    <div>
      <ProductImageWrapper />
      <PriceDropdown />
    </div>
  );
};

export default ProductCard;
