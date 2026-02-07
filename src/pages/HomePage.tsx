import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Sparkles, Layout } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Experience AR Furniture Shopping
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl mb-6 tracking-tight"
          >
            Design Your
            <br />
            <span className="italic">Dream Space</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Visualize furniture in your space with AR technology. Design rooms with our blueprint tool. Shop with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black text-white rounded-full text-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/ar-viewer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-black rounded-full text-lg hover:bg-gray-50 transition-colors"
              >
                Try AR View
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
            <div className="w-1 h-3 bg-black rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Why Choose ArFurnish</h2>
            <p className="text-gray-600 text-lg">Experience the future of furniture shopping</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Box,
                title: 'AR Visualization',
                description: 'View furniture in your space before buying with advanced AR technology',
              },
              {
                icon: Layout,
                title: 'Room Designer',
                description: 'Design and plan your room layout with our intuitive blueprint tool',
              },
              {
                icon: Sparkles,
                title: 'AI Comparison',
                description: 'Compare products across brands with AI-powered insights',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl mb-4">Featured Collection</h2>
              <p className="text-gray-600 text-lg">Handpicked pieces for your home</p>
            </div>
            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-black rounded-full hover:bg-gray-50 transition-colors"
              >
                View All
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join thousands of happy customers who've found their perfect furniture
            </p>
            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black rounded-full text-lg hover:bg-gray-100 transition-colors"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}