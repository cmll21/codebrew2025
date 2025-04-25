import "../styles/Button.css";

type LightButtonProps = {
  text: string;
  handleClick: () => void;
};

const LightButton = (props: LightButtonProps) => {
  return (
    <button className="lightButton" onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

export default LightButton;
