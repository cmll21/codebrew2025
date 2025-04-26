import "../styles/Card.css";

const ProductImageWrapper = () => {
  return <div className="productImage">
    <img src={props.image} className="produce-image" />
  </div>;
};

export default ProductImageWrapper;
