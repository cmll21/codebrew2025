import { useParams } from "react-router-dom";
import "../styles/ProducePage.css";
import ProductCard from "../components/ProductCard";

type Category = {
  id: number;
  name: string;
};

type ProducePageProps = {
  categories: Category[];
};

const ProducePage = ({ categories }: ProducePageProps) => {
  const { produceName } = useParams();
  const products = [
    "tomato1",
    "tomato2",
    "tomato3",
    "tomato4",
    "tomato5",
    "tomato1",
    "tomato1",
    "tomato2",
    "tomato3",
    "tomato4",
    "tomato5",
    "tomato1",
  ];

  const capitalizeEachWord = (str: string | undefined) => {
    console.log("Categories", JSON.stringify(categories));
    if (!str) return ""; // Handle undefined/null
    return str
      .split(" ") // Split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "); // Rejoin with spaces
  };

  return (
    <div className="section-header">
      <h1 className="section-title">{capitalizeEachWord(produceName)}</h1>
      <p>Insert filtering for {produceName}</p>
      <div className='product-card-boxes'>
        <div className="grid-container">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <ProductCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProducePage;
