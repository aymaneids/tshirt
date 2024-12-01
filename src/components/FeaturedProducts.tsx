import React from 'react';
import { ProductCard } from './ProductCard';
import { useProducts } from '../context/ProductContext';

export function FeaturedProducts() {
  const { products } = useProducts();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-neutral-900">Featured Flavors</h2>
        <p className="mt-4 text-lg text-neutral-600 max-w-3xl">
          Discover our most popular energy balls, handcrafted with authentic Moroccan ingredients.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}