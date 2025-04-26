import { useEffect, useState } from "react";
import "../styles/SupplierHome.css";
import axios from "axios";
import ProduceCard from "../components/ProduceCard";
import AddItemForm from "../components/AddItemForm";
import FilterButtons from "../components/FilterButtons";

type Category = {
  id: number;
  name: string;
};

export type ProduceItem = {
  id: number;
  produce_type: {
    id: number;
    name: string;
    image: string;
    category: number;
  };
  species: string;
  supplier_profile: {
    id: number;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      user_type: string;
    };
  };
  weight: number;
  price: number;
  created_time: string;
  expiry_time: string;
  quality: string;
};

type SupplierHomeProps = {
  userInfo: any;
  categories: Category[];
};

const StoreFront = ({
  userInfo,
  categories,
}: {
  userInfo: any;
  categories: Category[];
}) => {
  const [products, setProducts] = useState<ProduceItem[]>([]);
  const [allProducts, setAllProducts] = useState<ProduceItem[]>([]);

  const fetchProducts = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get("/api/produce/items/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const supplierProducts = response.data.results.filter(
        (product: ProduceItem) => product.supplier_profile.id === userInfo?.id,
      );
      setAllProducts(supplierProducts);
      setProducts(supplierProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleRemoveProduct = async (productId: number) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.delete(`/api/produce/items/${productId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      // Update the products list by removing the deleted product
      setProducts(products.filter(product => product.id !== productId));
      setAllProducts(allProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchProducts();
    }
  }, [userInfo]);

  return (
    <div className="storefront-section">
      <h1 className="storefront-title">Your StoreFront</h1>
      <div className="wrap-filter-buttons">
      <FilterButtons 
        categories={categories}
        products={allProducts}
        onFilteredProducts={setProducts}
      />
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-details">
            <ProduceCard
              name={`${product.species} ${product.produce_type.name}`}
              image={product.produce_type.image}
              cardColour="beige"
              onRemove={() => handleRemoveProduct(product.id)}
            />
            <div className="product-info">
              <p>Weight: {product.weight}kg</p>
              <p>Price: ${product.price}/kg</p>
              <p>Quality: {product.quality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SupplierHome = ({ userInfo, categories }: SupplierHomeProps) => {
  const [shouldRefresh, setShouldRefresh] = useState(0);

  const handleItemAdded = () => {
    setShouldRefresh((prev) => prev + 1);
  };

  return (
    <div className="supplier-home">
      <StoreFront
        userInfo={userInfo}
        categories={categories}
        key={shouldRefresh}
      />
      <AddItemForm
        userInfo={userInfo}
        onItemAdded={handleItemAdded}
        categories={categories}
      />
    </div>
  );
};

export default SupplierHome;
