import React from "react";

type ButtonProps = {
  text: string;
  handleClick: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <button className="button" onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

export default Button;
