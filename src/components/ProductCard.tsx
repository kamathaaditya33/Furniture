import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1, product.colors[0]);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Discount Badge */}
          {product.originalPrice && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs"
            >
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </motion.div>
          )}

          {/* AR Badge */}
          {product.arAvailable && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
              AR Ready
            </div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistToggle}
              className={`p-3 rounded-full backdrop-blur-md transition-colors ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-800 hover:bg-white'
              }`}
            >
              <Heart className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/90 backdrop-blur-md rounded-full text-gray-800 hover:bg-white transition-colors"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          <h3 className="mb-2 line-clamp-1">{product.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}
