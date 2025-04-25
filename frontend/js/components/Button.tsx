<<<<<<< HEAD
import React from "react";
import "../styles/Button.css";

=======
>>>>>>> main
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
