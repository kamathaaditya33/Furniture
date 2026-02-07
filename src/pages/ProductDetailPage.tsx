import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Box, Ruler, Star, ArrowLeft, Package, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <Link to="/catalog">
            <button className="px-6 py-3 bg-black text-white rounded-lg">
              Back to Catalog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/catalog">
            <motion.button
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Catalog
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.arAvailable && (
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                  <Box className="w-4 h-4" />
                  <span className="text-sm">AR Ready</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <h1 className="text-4xl mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="px-3 py-1 bg-black text-white rounded-full text-sm">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            </div>

            {/* Dimensions */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-5 h-5" />
                <h3 className="text-lg">Dimensions</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Width</p>
                  <p className="text-lg">{product.dimensions.width} cm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="text-lg">{product.dimensions.height} cm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Depth</p>
                  <p className="text-lg">{product.dimensions.depth} cm</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Material</p>
                <p className="text-lg">{product.material}</p>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-xl border-2 transition-colors ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
                >
                  -
                </motion.button>
                <span className="text-xl w-12 text-center">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-colors ${
                  inWishlist
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Heart
                  className="w-6 h-6"
                  fill={inWishlist ? 'currentColor' : 'none'}
                />
              </motion.button>
            </div>

            {/* AR View Button */}
            {product.arAvailable && (
              <Link to={`/ar-viewer?product=${product.id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border-2 border-black py-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Box className="w-5 h-5" />
                  View in AR
                </motion.button>
              </Link>
            )}

            {/* Compare Button */}
            <Link to={`/comparison/${product.id}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border-2 border-purple-500 text-purple-500 py-4 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Compare with AI
              </motion.button>
            </Link>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-green-600">
              <Package className="w-5 h-5" />
              <span>In Stock - Ships in 2-3 days</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}