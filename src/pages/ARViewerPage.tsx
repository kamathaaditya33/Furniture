import React, { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, Box, Scan, Download, RotateCw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';

export function ARViewerPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const [selectedProduct, setSelectedProduct] = useState(
    products.find((p) => p.id === productId) || products[0]
  );
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-4">AR Furniture Viewer</h1>
          <p className="text-gray-600 text-lg">
            Visualize furniture in your space using augmented reality
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* AR Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src="https://images.unsplash.com/photo-1618062890251-66b15eb20fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzA0NTA0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Room"
                className="w-full h-full object-cover"
              />
              
              {/* AR Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-64 h-64 object-contain drop-shadow-2xl"
                  />
                  {/* Corner Markers */}
                  {[
                    'top-0 left-0',
                    'top-0 right-0',
                    'bottom-0 left-0',
                    'bottom-0 right-0',
                  ].map((position, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className={`absolute ${position} w-6 h-6 border-2 border-blue-500`}
                      style={{
                        borderTopWidth: position.includes('top') ? '2px' : '0',
                        borderBottomWidth: position.includes('bottom') ? '2px' : '0',
                        borderLeftWidth: position.includes('left') ? '2px' : '0',
                        borderRightWidth: position.includes('right') ? '2px' : '0',
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg"
                >
                  <RotateCw className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg"
                >
                  <Scan className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6"
            >
              <h3 className="text-lg mb-4">How to use AR View</h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">
                    1
                  </span>
                  <span>Select a product from the list</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">
                    2
                  </span>
                  <span>Scan the QR code with your mobile device</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">
                    3
                  </span>
                  <span>Point your camera at the floor to place furniture</span>
                </li>
              </ol>
            </motion.div>
          </motion.div>

          {/* Product Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Selected Product Info */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg mb-4">Selected Product</h3>
              <div className="flex gap-4 items-center mb-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h4 className="mb-1">{selectedProduct.name}</h4>
                  <p className="text-gray-600">${selectedProduct.price}</p>
                </div>
              </div>

              {/* QR Code Section */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowQR(!showQR)}
                className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-4"
              >
                <QrCode className="w-5 h-5" />
                {showQR ? 'Hide QR Code' : 'Show QR Code'}
              </motion.button>

              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-gray-50 rounded-xl p-6 flex flex-col items-center"
                >
                  <div className="w-48 h-48 bg-white rounded-lg p-4 mb-4">
                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Scan this code with your mobile device to view in AR
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download QR Code
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Product List */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg mb-4">Available AR Products</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {products
                  .filter((p) => p.arAvailable)
                  .map((product) => (
                    <motion.button
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProduct(product)}
                      className={`w-full flex gap-4 items-center p-4 rounded-xl transition-colors ${
                        selectedProduct.id === product.id
                          ? 'bg-gray-100 border-2 border-black'
                          : 'border-2 border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 text-left">
                        <h4 className="text-sm mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                      <Box className="w-5 h-5 text-gray-400" />
                    </motion.button>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}