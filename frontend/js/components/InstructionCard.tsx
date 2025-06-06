import "../styles/Card.css";

type InstructionCardProps = {
  text: string;
  image: string;
};

const InstructionCard = (props: InstructionCardProps) => {
  return (
    <div className="instruction-card-container">
      <div className="instruction-card-image">
        <img src={props.image} />
      </div>
      <p className="instruction-card-text">{props.text}</p>
    </div>
  );
};

export default InstructionCard;
