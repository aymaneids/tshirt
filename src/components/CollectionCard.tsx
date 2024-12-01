import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { LikeButton } from './LikeButton';
import type { Product } from '../context/ProductContext';

interface CollectionCardProps {
  product: Product;
  index: number;
}

export function CollectionCard({ product, index }: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-b from-neutral-50/50 to-white dark:from-neutral-800/50 dark:to-neutral-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none dark:opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id="moroccan-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="currentColor"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#moroccan-pattern)"/>
          </svg>
        </div>

        {/* Product Image */}
        <Link to={`/products/${product.id}`}>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center rounded-lg transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <LikeButton productId={product.id} />
          <button className="p-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-amber-50 dark:hover:bg-amber-900/50 transition-colors">
            <ShoppingBag className="w-5 h-5 text-amber-800 dark:text-amber-400" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <Link 
          to={`/products/${product.id}`}
          className="block group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors"
        >
          <h3 className="font-medium text-lg text-neutral-900 dark:text-neutral-100">{product.name}</h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <p className="text-amber-800 dark:text-amber-400 font-medium">${product.price}</p>
          {product.details.colors.length > 0 && (
            <div className="flex -space-x-1">
              {product.details.colors.slice(0, 3).map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border-2 border-white dark:border-neutral-800"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {product.details.colors.length > 3 && (
                <div className="w-4 h-4 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-white dark:border-neutral-700 flex items-center justify-center">
                  <span className="text-[10px] text-neutral-600 dark:text-neutral-400">
                    +{product.details.colors.length - 3}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Size Options */}
        {product.details.sizes && (
          <div className="flex gap-1">
            {product.details.sizes.map((size, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}