import React, { useState } from "react";
import "../styles/QuantitySelector.css";

type QuantitySelectorProps = {
  initial?: number;
  step?: number;
  min?: number;
  max?: number;
};

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initial = 100,
  step = 10,
  min = 0,
  max = Infinity,
}) => {
  const [value, setValue] = useState<number>(initial);

  const increment = () => setValue((prev) => Math.min(prev + step, max));
  const decrement = () => setValue((prev) => Math.max(prev - step, min));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // allow only integers
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed)) {
      setValue(Math.min(Math.max(parsed, min), max));
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
          value={value}
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
