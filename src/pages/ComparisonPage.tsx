import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useParams } from 'react-router-dom';
import { Sparkles, TrendingUp, TrendingDown, Star, DollarSign, Package } from 'lucide-react';
import { products } from '../data/products';
import { ComparisonProduct } from '../types';

export function ComparisonPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id) || products[0];
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock comparison data
  const comparisonProducts: ComparisonProduct[] = [
    {
      brand: 'ArFurnish',
      name: product.name,
      price: product.price,
      rating: product.rating,
      features: ['AR Ready', 'Premium Materials', 'Free Shipping', 'Easy Assembly'],
      pros: ['Best value for money', 'Excellent customer service', 'Modern design'],
      cons: ['Limited color options'],
    },
    {
      brand: 'IKEA',
      name: 'Similar Modern Sofa',
      price: product.price + 200,
      rating: 4.5,
      features: ['In-store pickup', 'Eco-friendly', 'Modular design'],
      pros: ['Sustainable materials', 'Wide availability', 'Brand reputation'],
      cons: ['Higher price', 'Assembly required', 'No AR feature'],
    },
    {
      brand: 'West Elm',
      name: 'Contemporary Sofa',
      price: product.price + 500,
      rating: 4.7,
      features: ['Premium fabric', 'Handcrafted', 'Warranty included'],
      pros: ['Luxury quality', 'Timeless design', 'Excellent warranty'],
      cons: ['Expensive', 'Limited stock', 'Long delivery time'],
    },
    {
      brand: 'Wayfair',
      name: 'Modern Comfort Sofa',
      price: product.price - 100,
      rating: 4.3,
      features: ['Budget-friendly', 'Multiple colors', 'Quick delivery'],
      pros: ['Affordable', 'Fast shipping', 'Good reviews'],
      cons: ['Lower quality materials', 'No AR', 'Limited warranty'],
    },
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Comparison
          </motion.div>
          <h1 className="text-5xl mb-4">Smart Product Comparison</h1>
          <p className="text-gray-600 text-lg">
            Compare across brands and make informed decisions with AI insights
          </p>
        </motion.div>

        {/* Selected Product */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 mb-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-2xl"
            />
            <div className="flex-1">
              <h2 className="text-3xl mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl">${product.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating}</span>
                </div>
              </div>
              {!showResults && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-shadow flex items-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5" />
                  {isAnalyzing ? 'Analyzing...' : 'Start AI Comparison'}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Loading Animation */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 mb-8 shadow-lg text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-lg text-gray-600">
              Analyzing products across multiple brands...
            </p>
          </motion.div>
        )}

        {/* Comparison Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-2xl">AI Recommendation</h3>
              </div>
              <p className="text-lg mb-4">
                Based on our analysis of price, features, ratings, and user reviews across
                4 major brands, <strong>{product.name}</strong> from ArFurnish offers the
                best value proposition.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm">Best Value</span>
                  </div>
                  <p className="text-2xl">92%</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5" />
                    <span className="text-sm">Quality Score</span>
                  </div>
                  <p className="text-2xl">4.8/5</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm">Price Advantage</span>
                  </div>
                  <p className="text-2xl">-$250</p>
                </div>
              </div>
            </motion.div>

            {/* Comparison Table */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left">Brand</th>
                      <th className="px-6 py-4 text-left">Product</th>
                      <th className="px-6 py-4 text-left">Price</th>
                      <th className="px-6 py-4 text-left">Rating</th>
                      <th className="px-6 py-4 text-left">Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonProducts.map((item, index) => (
                      <motion.tr
                        key={item.brand}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-t border-gray-100 ${
                          index === 0 ? 'bg-purple-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.brand}</span>
                            {index === 0 && (
                              <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">{item.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">${item.price}</span>
                            {item.price < product.price + 100 && index !== 0 && (
                              <TrendingDown className="w-4 h-4 text-green-500" />
                            )}
                            {item.price > product.price + 100 && (
                              <TrendingUp className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {item.features.slice(0, 2).map((feature) => (
                              <span
                                key={feature}
                                className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {comparisonProducts.map((item, index) => (
                <motion.div
                  key={item.brand}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`bg-white rounded-2xl p-6 shadow-lg ${
                    index === 0 ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl">{item.brand}</h4>
                    {index === 0 && (
                      <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                        Best Choice
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{item.name}</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price</span>
                      <span className="text-xl">${item.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        Pros
                      </h5>
                      <ul className="space-y-1">
                        {item.pros.map((pro) => (
                          <li key={pro} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-500 rounded-full" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm mb-2 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        Cons
                      </h5>
                      <ul className="space-y-1">
                        {item.cons.map((con) => (
                          <li key={con} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-1 h-1 bg-red-500 rounded-full" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
