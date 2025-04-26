import { useParams } from "react-router-dom";
import "../styles/ProducePage.css";
import ProductCard from "../components/ProductCard";
import FilterButtons from "../components/FilterButtons";
import { ProduceItem } from "./SupplierHome";
import { useState, useEffect } from "react";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

type ProducePageProps = {
  categories: Category[];
};

const ProducePage = ({ categories }: ProducePageProps) => {
  const [products, setProducts] = useState<ProduceItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProduceItem[]>([]);
  const { produceName } = useParams();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get("/api/produce/items/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const listProducts = response.data.results.filter(
        (product: ProduceItem) => product.produce_type.name === produceName,
      );
      setProducts(listProducts);
      setFilteredProducts(listProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const capitalizeEachWord = (str: string | undefined) => {
    if (!str) return ""; // Handle undefined/null
    return str
      .split(" ") // Split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "); // Rejoin with spaces
  };

  return (
    <div className="section-header">
      <div className="body-container">
       <div className="produce-page-title">{capitalizeEachWord(produceName)}</div>
        <div>
          <FilterButtons
            products={products}
            onFilteredProducts={setFilteredProducts}
          />
        </div>

        <div className="product-card-boxes">
          <div className="grid-container">
            {filteredProducts.map((product, index) => (
              <div key={index} className="product-details">
                <ProductCard
                  name={product.species}
                  image={product.produce_type.image}
                  cardColour="beige"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducePage;
