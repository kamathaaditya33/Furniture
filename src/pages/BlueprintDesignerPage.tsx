import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Minus,
  RotateCw,
  Trash2,
  Download,
  Grid,
  Move,
} from 'lucide-react';
import { products } from '../data/products';
import { BlueprintItem } from '../types';

export function BlueprintDesignerPage() {
  const [blueprintItems, setBlueprintItems] = useState<BlueprintItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addItem = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const newItem: BlueprintItem = {
      id: Date.now().toString(),
      productId: product.id,
      product,
      x: 200,
      y: 200,
      rotation: 0,
      scale: 1,
    };
    setBlueprintItems([...blueprintItems, newItem]);
  };

  const removeItem = (id: string) => {
    setBlueprintItems(blueprintItems.filter((item) => item.id !== id));
    if (selectedItem === id) setSelectedItem(null);
  };

  const updateItem = (id: string, updates: Partial<BlueprintItem>) => {
    setBlueprintItems(
      blueprintItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItem(id);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedItem || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateItem(selectedItem, { x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const selectedItemData = blueprintItems.find((item) => item.id === selectedItem);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl mb-4">Room Blueprint Designer</h1>
          <p className="text-gray-600 text-lg">
            Design and visualize your room layout with furniture
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Furniture Library */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg mb-4">Furniture Library</h3>
              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                {products.map((product) => (
                  <motion.button
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addItem(product.id)}
                    className="w-full flex gap-3 items-center p-3 rounded-xl border-2 border-gray-200 hover:border-black transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-500">${product.price}</p>
                    </div>
                    <Plus className="w-4 h-4 text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-2 rounded-lg transition-colors ${
                    showGrid ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="text-sm text-gray-600">
                {blueprintItems.length} items in room
              </div>
            </div>

            {/* Canvas Area */}
            <div
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative bg-white rounded-2xl overflow-hidden"
              style={{ height: '600px' }}
            >
              {/* Grid */}
              {showGrid && (
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
              )}

              {/* Room Outline */}
              <div className="absolute inset-8 border-4 border-gray-300 border-dashed rounded-lg" />

              {/* Furniture Items */}
              {blueprintItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    left: item.x,
                    top: item.y,
                    transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale})`,
                    cursor: isDragging && selectedItem === item.id ? 'grabbing' : 'grab',
                  }}
                  onMouseDown={(e) => handleMouseDown(item.id, e)}
                  className={`select-none ${
                    selectedItem === item.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-32 h-32 object-contain drop-shadow-lg pointer-events-none"
                    draggable={false}
                  />
                  {selectedItem === item.id && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {item.product.name}
                    </div>
                  )}
                </motion.div>
              ))}

              {blueprintItems.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Move className="w-12 h-12 mx-auto mb-2" />
                    <p>Add furniture from the library to start designing</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Properties Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg mb-4">Properties</h3>
              {selectedItemData ? (
                <div className="space-y-6">
                  <div>
                    <img
                      src={selectedItemData.product.image}
                      alt={selectedItemData.product.name}
                      className="w-full aspect-square object-cover rounded-lg mb-3"
                    />
                    <h4 className="mb-1">{selectedItemData.product.name}</h4>
                    <p className="text-sm text-gray-600">
                      ${selectedItemData.product.price}
                    </p>
                  </div>

                  {/* Rotation */}
                  <div>
                    <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <RotateCw className="w-4 h-4" />
                      Rotation: {selectedItemData.rotation}°
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={selectedItemData.rotation}
                      onChange={(e) =>
                        updateItem(selectedItemData.id, {
                          rotation: Number(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Scale */}
                  <div>
                    <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      Scale: {selectedItemData.scale.toFixed(2)}x
                    </label>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateItem(selectedItemData.id, {
                            scale: Math.max(0.5, selectedItemData.scale - 0.1),
                          })
                        }
                        className="p-2 rounded-lg border-2 border-gray-200 hover:border-black transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={selectedItemData.scale}
                        onChange={(e) =>
                          updateItem(selectedItemData.id, {
                            scale: Number(e.target.value),
                          })
                        }
                        className="flex-1"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateItem(selectedItemData.id, {
                            scale: Math.min(2, selectedItemData.scale + 0.1),
                          })
                        }
                        className="p-2 rounded-lg border-2 border-gray-200 hover:border-black transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Remove */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => removeItem(selectedItemData.id)}
                    className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Remove Item
                  </motion.button>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <p>Select an item to edit properties</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
