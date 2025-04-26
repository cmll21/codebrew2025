import React from "react";
import "../styles/Home.css";
import "../styles/App.css";

import { toTitleCase } from "../utils";
import { Link } from "react-router-dom";

export type ProduceCardProps = {
  name: string;
  image?: string;
  cardColour: string;
  onRemove?: () => void;
};

const ProduceCard = (props: ProduceCardProps) => {
  return (
    <Link key={props.name} to={`/produce/${props.name}`}>
      <div
        className="seasonal-produce-card"
        style={{ backgroundColor: props.cardColour }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="produce-image-container">
            <img src={props.image} className="produce-image" />
          </div>
        </div>
        <h3 className="seasonal-produce-card-label">
          {toTitleCase(props.name) || "ProducePlaceholder"}
        </h3>
        {props.onRemove && (
          <div className="produce-card-overlay">
            <button
              className="remove-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.onRemove?.();
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProduceCard;
