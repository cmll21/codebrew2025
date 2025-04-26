import React, { useState } from "react";
import "../styles/QuantitySelector.css";

type QuantitySelectorProps = {
  initial: number;
  step?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initial,
  onChange,
  step = 10,
  min = 0,
  max = Infinity,
}) => {
  const increment = () => onChange(Math.min(initial + step, max));
  const decrement = () => onChange(Math.max(initial - step, min));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed)) {
      onChange(Math.min(Math.max(parsed, min), max));
    }
  };

  return (
    <div className="quantity-container">
      <button
        type="button"
        className="qty-button"
        onClick={decrement}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <div className="qty-input-wrapper">
        <input
          type="number"
          className="qty-input"
          value={initial}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
        />
        <span className="qty-unit">g</span>
      </div>
      <button
        type="button"
        className="qty-button"
        onClick={increment}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
