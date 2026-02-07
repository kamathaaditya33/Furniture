import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Sparkles, Layout, Star, ShoppingBag, Zap } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({ src, speed = 0.5 }: { src: string; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl">
      <motion.img
        src={src}
        style={{ y }}
        className="w-full h-full object-cover scale-110"
        alt="Parallax"
      />
    </div>
  );
}

export function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const allProducts = products.slice(0, 8);
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: containerProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
        style={{ scaleX: containerProgress }}
      />

      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"
            style={{ opacity: heroOpacity }}
          />
          {/* Floating shapes */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-gray-200 rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-7xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
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
            Visualize furniture in your space with AR technology. Design rooms with our
            blueprint tool. Shop with confidence.
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

      {/* Stats Section with Count Up Animation */}
      <section className="py-24 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: ShoppingBag, value: '10K+', label: 'Products' },
              { icon: Star, value: '50K+', label: 'Happy Customers' },
              { icon: Box, value: 'AR', label: 'Technology' },
              { icon: Zap, value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <stat.icon className="w-12 h-12 mx-auto mb-4" />
                  <motion.div
                    className="text-4xl mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Gallery */}
      <section className="relative h-[600px] overflow-hidden bg-gradient-to-br from-white to-gray-50">
        <div className="absolute top-8 left-8 z-20">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl mb-2 font-light">Trending Now</h2>
            <p className="text-gray-500">Swipe to explore</p>
          </AnimatedSection>
        </div>

        <motion.div
          className="flex gap-8 h-full items-center px-8"
          initial={{ x: 0 }}
          whileInView={{ x: '-50%' }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          viewport={{ once: false }}
        >
          {[...allProducts, ...allProducts, ...allProducts].map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              className="flex-shrink-0 w-96 h-96"
              whileHover={{ scale: 1.08, y: -12, zIndex: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link to={`/product/${product.id}`}>
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow bg-white">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-3/4 object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="p-6 h-1/4 flex flex-col justify-between">
                    <h3 className="text-lg font-medium line-clamp-1">{product.name}</h3>
                    <p className="text-2xl font-light">${product.price}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section with Stagger */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4">Why Choose ArFurnish</h2>
              <p className="text-gray-600 text-lg">Experience the future of furniture shopping</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Box,
                title: 'AR Visualization',
                description:
                  'View furniture in your space before buying with advanced AR technology',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Layout,
                title: 'Room Designer',
                description: 'Design and plan your room layout with our intuitive blueprint tool',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: Sparkles,
                title: 'AI Comparison',
                description: 'Compare products across brands with AI-powered insights',
                color: 'from-yellow-500 to-yellow-600',
              },
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all group"
                >
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Image Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl">
                  Transform Your Living Space
                </h2>
                <p className="text-gray-600 text-lg">
                  Discover furniture that brings your vision to life. From modern minimalism
                  to classic elegance, find pieces that reflect your unique style and
                  transform your house into a home.
                </p>
                <Link to="/catalog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-black text-white rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    Explore Collection
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <ParallaxImage
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTczODk1MjAwMHww&ixlib=rb-4.1.0&q=80&w=1080"
                speed={0.3}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-12">
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
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Scale Animation */}
      <section className="py-24 px-4 bg-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <motion.div
              whileInView={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.6 }}
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
                  className="px-8 py-4 bg-white text-black rounded-full text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
