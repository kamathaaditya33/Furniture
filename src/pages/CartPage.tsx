import React from 'react';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <div className="text-6xl">🛒</div>
          </motion.div>
          <h2 className="text-3xl mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Start adding some furniture to your cart!
          </p>
          <Link to="/catalog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Shop Now
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
          <h1 className="text-5xl mb-4">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">{cart.length} items in your cart</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row gap-6"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="text-xl mb-1 hover:underline">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600">{item.product.category}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Color: {item.selectedColor}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-black transition-colors flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-black transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <span className="text-xl">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearCart}
              className="w-full py-3 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition-colors"
            >
              Clear Cart
            </motion.button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping === 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <Sparkles className="w-4 h-4" />
                    Free shipping on orders over $1000!
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl">Total</span>
                    <span className="text-2xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <Link to="/catalog">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border-2 border-gray-200 py-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
