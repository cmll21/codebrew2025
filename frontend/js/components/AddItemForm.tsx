import { useState } from 'react';
import axios from 'axios';

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
    category: number;
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

type AddItemFormProps = {
  userInfo: any;
  onItemAdded: () => void;
  categories: Category[];
};

const AddItemForm = ({ userInfo, onItemAdded, categories }: AddItemFormProps) => {
  const initialFormState = {
    weight: 0,
    price: 0,
    quality: 'Value',
    produce_type: {
      id: 0,
      name: '',
      image: '',
      category: 0
    }
  };

  const [newItem, setNewItem] = useState<Partial<ProduceItem>>(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);

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
      produceTypeFormData.append('category', newItem.produce_type?.category?.toString() || '');
      // HARD CODED SPRING LOL
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
                category: parseInt(e.target.value)
              }
            })}
            className="form-select"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
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

export default AddItemForm; 