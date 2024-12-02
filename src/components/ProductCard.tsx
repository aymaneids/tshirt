import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus } from 'lucide-react';
import { LikeButton } from './LikeButton';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/ProductContext';

interface ProductCardProps extends Product {}

export function ProductCard(product: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="group relative block">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <LikeButton productId={product.id} />
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-amber-50 transition-colors"
          >
            <Plus className="w-5 h-5 text-amber-800" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white line-clamp-1">{product.name}</h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-medium text-amber-800 dark:text-amber-400">${product.price}</p>
          <button
            onClick={handleAddToCart}
            className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-amber-800 dark:text-amber-400" />
          </button>
        </div>
      </div>
    </Link>
  );
}