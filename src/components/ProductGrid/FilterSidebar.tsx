import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Product } from '../../types';

interface FilterSidebarProps {
  products: Product[];
  filters: {
    category: string;
    priceRange: [number, number];
    brands: string[];
    colors: string[];
    sizes: string[];
    isNew: boolean;
    isTrending: boolean;
    isOnSale: boolean;
    rwnEligible: boolean;
  };
  onFilterChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  products, 
  filters, 
  onFilterChange 
}) => {
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  const colors = [...new Set(products.flatMap(p => p.colors))];
  const sizes = [...new Set(products.flatMap(p => p.sizes))];

  const handleFilterUpdate = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleArrayToggle = (key: string, value: string) => {
    const currentArray = filters[key as keyof typeof filters] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleFilterUpdate(key, newArray);
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: '',
      priceRange: [0, 5000],
      brands: [],
      colors: [],
      sizes: [],
      isNew: false,
      isTrending: false,
      isOnSale: false,
      rwnEligible: false
    });
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value=""
                checked={filters.category === ''}
                onChange={(e) => handleFilterUpdate('category', e.target.value)}
                className="mr-2"
              />
              All Categories
            </label>
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => handleFilterUpdate('category', e.target.value)}
                  className="mr-2"
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="5000"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterUpdate('priceRange', [0, parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Brands */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {brands.map(brand => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleArrayToggle('brands', brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
          <div className="grid grid-cols-4 gap-2">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => handleArrayToggle('colors', color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  filters.colors.includes(color) 
                    ? 'border-black' 
                    : 'border-gray-300'
                }`}
                style={{ 
                  backgroundColor: color.toLowerCase().includes('white') ? '#ffffff' :
                                 color.toLowerCase().includes('black') ? '#000000' :
                                 color.toLowerCase().includes('blue') ? '#3b82f6' :
                                 color.toLowerCase().includes('red') ? '#ef4444' :
                                 color.toLowerCase().includes('green') ? '#10b981' :
                                 color.toLowerCase().includes('pink') ? '#ec4899' :
                                 color.toLowerCase().includes('purple') ? '#8b5cf6' :
                                 color.toLowerCase().includes('yellow') ? '#f59e0b' :
                                 color.toLowerCase().includes('gray') ? '#6b7280' :
                                 color.toLowerCase().includes('brown') ? '#92400e' :
                                 '#9ca3af'
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Sizes</h4>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => handleArrayToggle('sizes', size)}
                className={`px-2 py-1 text-sm border rounded ${
                  filters.sizes.includes(size)
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Special Filters */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Special</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.isNew}
                onChange={(e) => handleFilterUpdate('isNew', e.target.checked)}
                className="mr-2"
              />
              New Arrivals
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.isTrending}
                onChange={(e) => handleFilterUpdate('isTrending', e.target.checked)}
                className="mr-2"
              />
              Trending
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.isOnSale}
                onChange={(e) => handleFilterUpdate('isOnSale', e.target.checked)}
                className="mr-2"
              />
              On Sale
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.rwnEligible}
                onChange={(e) => handleFilterUpdate('rwnEligible', e.target.checked)}
                className="mr-2"
              />
              RWN Eligible
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;