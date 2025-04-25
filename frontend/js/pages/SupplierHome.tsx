import { useEffect, useState } from 'react';
import '../styles/SupplierHome.css';
import axios from 'axios';
import ProduceCard from '../components/ProduceCard';

type ProduceItem = {
  id: number;
  produce_type: {
    id: number;
    name: string;
    image: string;
    category: string;
  };
  supplier_profile: {
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

const StoreFront = () => {
  const [products, setProducts] = useState<ProduceItem[]>([]);

  const fetchProducts = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get('/api/produce/items/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setProducts(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="storefront-section">
      <h1 className="storefront-title">Your StoreFront</h1>
      <div className="filter-buttons">
        <button>Vegetables</button>
        <button>Fruits</button>
        <button>Mushrooms</button>
        <button>Herbs & Greens</button>
        <button>Roots & Tubers</button>
        <button>Grains & Legumes</button>
        <button>Value</button>
        <button>Select</button>
        <button>Premium</button>
        <button>Ascending Price</button>
        <button>Descending Price</button>
        <input type="text" placeholder="Search" />
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-details">
            <ProduceCard
              name={product.produce_type.name}
              image={product.produce_type.image}
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

const AddItemForm = ({ userInfo, onItemAdded }: { userInfo: any; onItemAdded: () => void }) => {
  const initialFormState = {
    weight: 0,
    price: 0,
    quality: 'Value',
    produce_type: {
      id: 0,
      name: '',
      image: '',
      category: ''
    }
  };

  const [newItem, setNewItem] = useState<Partial<ProduceItem>>(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const productCategories = [
    'Vegetables',
    'Fruits',
    'Mushrooms',
    'Herbs & Greens',
    'Roots & Tubers',
    'Grains & Legumes'
  ];

  const qualityLevels = ['Value', 'Select', 'Premium'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      
      const produceTypeFormData = new FormData();
      
      produceTypeFormData.append('name', newItem.produce_type?.name || '');
      produceTypeFormData.append('category', '1'); // ← replace with a valid ProduceCategory ID
      produceTypeFormData.append('season', 'spring');
      if (imageFile) {
        produceTypeFormData.append('image', imageFile);
      }

      // First, create a new ProduceType with the image
      const produceTypeResponse = await axios.post('/api/produce/types/', produceTypeFormData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('ProduceType created:', produceTypeResponse.data);

      // Then create the ProduceItem using the new ProduceType
      const produceItemResponse = await axios.post('/api/produce/items/', {
        produce_type_id: produceTypeResponse.data.id,
        supplier_profile_id: userInfo.id,
        weight: newItem.weight,
        price: newItem.price,
        quality: newItem.quality?.toLowerCase() // backend expects lowercase
      }, {
        headers
      });

      console.log('ProduceItem created:', produceItemResponse.data);

      // Reset form after successful submission
      setNewItem(initialFormState);
      setImageFile(null);
      
      // Clear the file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      alert('Item added successfully!');
      onItemAdded();
    } catch (error: any) {
      console.error('Error creating produce item:', error.response?.data || error.message);
      alert('Failed to add item. Please try again.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Create a preview URL for the image
      setNewItem({
        ...newItem,
        produce_type: {
          ...newItem.produce_type!,
          image: URL.createObjectURL(file)
        }
      });
    }
  };

  return (
    <div className="add-item-form">
      <h3>Add Item</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={newItem.produce_type?.name || ''}
            onChange={(e) => setNewItem({
              ...newItem,
              produce_type: {
                ...newItem.produce_type!,
                name: e.target.value
              }
            })}
            placeholder="Heirloom Tomato"
          />
        </div>

        <div className="form-group">
          <label>Product Category</label>
          <select 
            value={newItem.produce_type?.category || ''}
            onChange={(e) => setNewItem({
              ...newItem,
              produce_type: {
                ...newItem.produce_type!,
                category: e.target.value
              }
            })}
            className="form-select"
          >
            <option value="" disabled>Select a category</option>
            {productCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Product Quality</label>
          <select
            value={newItem.quality || 'Value'}
            onChange={(e) => setNewItem({
              ...newItem,
              quality: e.target.value
            })}
            className="form-select"
          >
            {qualityLevels.map((quality) => (
              <option key={quality} value={quality}>
                {quality}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={newItem.weight || ''}
            onChange={(e) => setNewItem({
              ...newItem,
              weight: parseFloat(e.target.value)
            })}
            placeholder="100"
          />
        </div>

        <div className="form-group">
          <label>Selling Price ($/kg)</label>
          <input
            type="number"
            value={newItem.price || ''}
            onChange={(e) => setNewItem({
              ...newItem,
              price: parseFloat(e.target.value)
            })}
            placeholder="20"
          />
        </div>

        <div className="image-upload">
          <input
            type="file"
            id="image-upload"
            hidden
            onChange={handleImageUpload}
            accept="image/*"
          />
          <label htmlFor="image-upload" className="button">Select Image</label>
          <button type="submit">Add Item</button>
        </div>
      </form>
    </div>
  );
};

const SupplierHome = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [shouldRefresh, setShouldRefresh] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    axios
      .get("/api/users/me/")
      .then((res) => setUserInfo(res.data))
      .catch(() => setUserInfo(null));
  }, []);

  const handleItemAdded = () => {
    setShouldRefresh(prev => prev + 1);
  };

  return (
    <div className="supplier-home">
      <StoreProfile />
      <StoreFront key={shouldRefresh} />
      <AddItemForm userInfo={userInfo} onItemAdded={handleItemAdded} />
    </div>
  );
};

export default SupplierHome;