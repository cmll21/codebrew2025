import { useParams } from "react-router-dom";
import "../styles/ProducePage.css";
import ProductCard from "../components/ProductCard";
import FilterButtons from "../components/FilterButtons";
import { ProduceItem } from "./SupplierHome";

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

  const allProducts: ProduceItem[] = [
    {
      id: 1,
      produce_type: {
        id: 101,
        name: "Organic Apples",
        image: "/images/apples.jpg",
        category: 1,
      },
      supplier_profile: {
        id: 201,
        user: {
          id: 301,
          first_name: "John",
          last_name: "Doe",
          user_type: "supplier",
        },
      },
      weight: 5, // in kg
      price: 10.99, // in dollars
      created_time: "2023-10-01T09:00:00Z",
      expiry_time: "2023-10-15T09:00:00Z",
      quality: "Premium",
    },
    {
      id: 2,
      produce_type: {
        id: 102,
        name: "Fresh Carrots",
        image: "/images/carrots.jpg",
        category: 2,
      },
      supplier_profile: {
        id: 202,
        user: {
          id: 302,
          first_name: "Jane",
          last_name: "Smith",
          user_type: "supplier",
        },
      },
      weight: 3,
      price: 5.49,
      created_time: "2023-10-02T10:00:00Z",
      expiry_time: "2023-10-16T10:00:00Z",
      quality: "Standard",
    },
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
      <div>
        <FilterButtons
          categories={categories}
          products={allProducts}
          onFilteredProducts={() => console.log()}
        />
      </div>

      <div className="product-card-boxes">
        <div className="grid-container">
          {allProducts.map((product, index) => (
            <div key={index} className="product-details">
              <ProductCard
                name={product.produce_type.name}
                image={product.produce_type.image}
                cardColour="beige"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProducePage;
