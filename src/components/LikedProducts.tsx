import React from 'react';
import { useLikes } from '../context/LikesContext';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';

export function LikedProducts() {
  const { likes, loading } = useLikes();
  const { products } = useProducts();

  const likedProducts = products.filter(product =>
    likes.some(like => like.productId === product.id)
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-600">Loading favorites...</p>
      </div>
    );
  }

  if (likedProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-600">No favorite products yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {likedProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}