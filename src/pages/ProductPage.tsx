import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/filters/ProductFilters';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';

export function ProductPage() {
  const { products } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    types: [] as string[],
    materials: [] as string[],
    fits: [] as string[],
    madeIn: [] as string[],
    colors: [] as string[],
    sizes: [] as string[]
  });

  useEffect(() => {
    const prices = products.map(p => parseFloat(p.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setFilters(prev => ({ ...prev, priceRange: [minPrice, maxPrice] }));
  }, [products]);

  useEffect(() => {
    let filtered = products;

    // Filter by price range
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    if (filters.types.length > 0) {
      filtered = filtered.filter(product => filters.types.includes(product.details.type));
    }

    if (filters.materials.length > 0) {
      filtered = filtered.filter(product => filters.materials.includes(product.details.material));
    }

    if (filters.fits.length > 0) {
      filtered = filtered.filter(product => filters.fits.includes(product.details.fit));
    }

    if (filters.madeIn.length > 0) {
      filtered = filtered.filter(product => filters.madeIn.includes(product.details.madeIn));
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.details.colors.some(color => filters.colors.includes(color.name))
      );
    }

    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.details.sizes.some(size => filters.sizes.includes(size))
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const resetFilters = () => {
    const prices = products.map(p => parseFloat(p.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setFilters({
      priceRange: [minPrice, maxPrice],
      types: [],
      materials: [],
      fits: [],
      madeIn: [],
      colors: [],
      sizes: []
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">Our Products</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-64">
              <ProductFilters
                products={products}
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
              />
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-neutral-900 p-6 overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                  >
                    <ProductFilters
                      products={products}
                      filters={filters}
                      onChange={setFilters}
                      onReset={resetFilters}
                      onClose={() => setShowFilters(false)}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1">
              <motion.div
                layout
                className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-neutral-600 dark:text-neutral-400">No products match your filters.</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}