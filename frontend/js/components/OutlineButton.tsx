import React from "react";
import "../styles/Button.css";

type OutlineButtonProps = {
  text: string;
  handleClick: () => void;
};

const OutlineButton = (props: OutlineButtonProps) => {
  return (
    <button className="outlineButton" onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

export default OutlineButton;
