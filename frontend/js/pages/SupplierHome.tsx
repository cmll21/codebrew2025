import { useEffect, useState } from 'react';
import '../styles/SupplierHome.css';
import axios from 'axios';
import ProduceCard from '../components/ProduceCard';
import AddItemForm from '../components/AddItemForm';

type Category = {
  id: number;
  name: string;
};

type ProduceItem = {
  id: number;
  produce_type: {
    id: number;
    name: string;
    image: string;
    category: Category;
  };
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

const StoreProfile = () => {
  return (
    <div className="store-profile">
      <h2>Store Front Name</h2>
      <p>Joined in 2025</p>
      <div className="store-stats">
        <p>Produce Saved: 1000000 kg</p>
        <p>Water Saved: 10000 L</p>
        <p>Fule Saved: 10000 L</p>
      </div>
    </div>
  );
};

const StoreFront = ({ userInfo, categories }: { userInfo: any, categories: Category[] }) => {
  const [products, setProducts] = useState<ProduceItem[]>([]);
  const [allProducts, setAllProducts] = useState<ProduceItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | null>(null);

  const qualities = ['Value', 'Select', 'Premium'];

  const fetchProducts = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get('/api/produce/items/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      const supplierProducts = response.data.results.filter(
        (product: ProduceItem) => product.supplier_profile.id === userInfo?.id
      );
      setAllProducts(supplierProducts);
      setProducts(supplierProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchProducts();
    }
  }, [userInfo]);

  useEffect(() => {
    let filteredProducts = [...allProducts];

    // Apply category filters
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedCategories.includes(product.produce_type.category.id)
      );
    }

    // Apply quality filters
    if (selectedQualities.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedQualities.includes(product.quality)
      );
    }

    // Apply price sorting
    if (priceSort) {
      filteredProducts.sort((a, b) => {
        return priceSort === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }

    setProducts(filteredProducts);
  }, [selectedCategories, selectedQualities, priceSort, allProducts]);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleQuality = (quality: string) => {
    setSelectedQualities(prev => 
      prev.includes(quality)
        ? prev.filter(q => q !== quality)
        : [...prev, quality]
    );
  };

  const handlePriceSort = (order: 'asc' | 'desc') => {
    setPriceSort(prev => prev === order ? null : order);
  };

  return (
    <div className="storefront-section">
      <h1 className="storefront-title">Your StoreFront</h1>
      <div className="filter-buttons">
        {categories.map(category => (
          <button
            key={category.id}
            className={selectedCategories.includes(category.id) ? 'active' : ''}
            onClick={() => toggleCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
        {qualities.map(quality => (
          <button
            key={quality}
            className={selectedQualities.includes(quality.toLowerCase()) ? 'active' : ''}
            onClick={() => toggleQuality(quality.toLowerCase())}
          >
            {quality}
          </button>
        ))}
        <button
          className={priceSort === 'asc' ? 'active' : ''}
          onClick={() => handlePriceSort('asc')}
        >
          Ascending Price
        </button>
        <button
          className={priceSort === 'desc' ? 'active' : ''}
          onClick={() => handlePriceSort('desc')}
        >
          Descending Price
        </button>
        <input type="text" placeholder="Search" />
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-details">
            <ProduceCard
              name={product.produce_type.name}
              image={product.produce_type.image}
              cardColour="white"
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
    setShouldRefresh(prev => prev + 1);
  };

  return (
    <div className="supplier-home">
      <StoreProfile />
      <StoreFront userInfo={userInfo} categories={categories} key={shouldRefresh} />
      <AddItemForm userInfo={userInfo} onItemAdded={handleItemAdded} categories={categories} />
    </div>
  );
};

export default SupplierHome;