import { useState } from 'react';
import '../styles/SupplierHome.css';

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
      <div className="profile-image-placeholder"></div>
    </div>
  );
};

const StoreFront = () => {
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
        {/* Product placeholders will be populated here */}
      </div>
    </div>
  );
};

const AddItemForm = () => {
  const [newItem, setNewItem] = useState({
    name: '',
    weight: '',
    price: '',
    category: '',
    image: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement item submission logic
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewItem({ ...newItem, image: e.target.files[0] });
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
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Heirloom Tomato"
          />
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="text"
            value={newItem.weight}
            onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
            placeholder="100"
          />
        </div>

        <div className="form-group">
          <label>Selling Price ($/kg)</label>
          <input
            type="text"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            placeholder="20"
          />
        </div>

        <div className="category-buttons">
          <button type="button">Vegetables</button>
          <button type="button">Fruits</button>
          <button type="button">Mushrooms</button>
          <button type="button">Herbs & Greens</button>
          <button type="button">Roots & Tubers</button>
          <button type="button">Grains & Legumes</button>
        </div>

        <div className="image-upload">
          <button type="button">Select Image</button>
          <button type="button">Upload Image</button>
        </div>
      </form>
    </div>
  );
};

const SupplierHome = () => {
  return (
    <div className="supplier-home">
      <StoreProfile />
      <StoreFront />
      <AddItemForm />
    </div>
  );
};

export default SupplierHome; 