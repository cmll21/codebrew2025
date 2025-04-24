type ButtonProps = {
    text: string;
    backgroundColor: string;
};

const Button = (props: ButtonProps) => {
    return <button className="button" style={{ backgroundColor: props.backgroundColor}}>{props.text}</button>
}

export default Button;