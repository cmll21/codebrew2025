import React, { useState, useEffect } from 'react';

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

type FilterButtonsProps = {
  categories?: Category[];
  products: ProduceItem[];
  onFilteredProducts: (filteredProducts: ProduceItem[]) => void;
};

const FilterButtons = ({
  categories,
  products,
  onFilteredProducts,
}: FilterButtonsProps) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | null>(null);

  const qualities = ['Value', 'Select', 'Premium'];

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

  useEffect(() => {
    let filteredProducts = [...products];

    // Apply category filters
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedCategories.includes(product.produce_type.category)
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

    onFilteredProducts(filteredProducts);
  }, [selectedCategories, selectedQualities, priceSort, products, onFilteredProducts]);

  return (
    <div className="filter-buttons">
      {categories?.map(category => (
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
  );
};

export default FilterButtons; 