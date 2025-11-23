import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0]);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <motion.img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Image Navigation Dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            {product.isNew && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded">
                NEW
              </span>
            )}
            {product.isTrending && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                TRENDING
              </span>
            )}
            {product.isOnSale && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                SALE
              </span>
            )}
            {product.rwnEligible && (
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded">
                RWN
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`} 
            />
          </button>

          {/* Quick Add Button */}
          <motion.button
            onClick={handleAddToCart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 right-3 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {product.brand}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* RWN Price */}
          {product.rwnEligible && (
            <div className="mt-1 text-sm text-blue-600">
              {Math.ceil(product.price * 0.9 * 100).toLocaleString()} RWN (10% off)
            </div>
          )}

          {/* Color Options */}
          {product.colors.length > 0 && (
            <div className="flex items-center space-x-1 mt-3">
              {product.colors.slice(0, 4).map((color, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded-full border border-gray-300"
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
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;