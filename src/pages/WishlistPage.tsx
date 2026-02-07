import React from 'react';
import { motion } from 'motion/react';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleAddToCart = (productId: string) => {
    const product = wishlist.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1, product.colors[0]);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <div className="text-6xl">❤️</div>
          </motion.div>
          <h2 className="text-3xl mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Save your favorite furniture items here!
          </p>
          <Link to="/catalog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Browse Catalog
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl mb-4">My Wishlist</h1>
          <p className="text-gray-600 text-lg">{wishlist.length} saved items</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </motion.button>
              </div>

              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="mb-2 line-clamp-1 hover:underline">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
