import React from "react";
import "../styles/Home.css";
import "../styles/App.css";

export type ProduceCardProps = {
  name: string;
};

const ProduceCard = (props: ProduceCardProps) => {
  return (
    <div className="seasonal-produce-card">
      <h3 className="seasonal-produce-card-label">
        {props.name || "ProducePlaceholder"}
      </h3>
    </div>
  );
};

export default ProduceCard;
