import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import type { Product } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductInfoProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onBuyNow: () => void;
}

export function ProductInfo({ product, quantity, onQuantityChange, onBuyNow }: ProductInfoProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{product.name}</h1>
        <p className="mt-2 text-2xl font-medium text-amber-800 dark:text-amber-400">${product.price}</p>
      </div>

      <p className="text-lg text-neutral-600 dark:text-neutral-300">{product.description}</p>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Quantity:</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full"
          >
            <Minus className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          </button>
          <span className="w-8 text-center text-neutral-900 dark:text-white">{quantity}</span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full"
          >
            <Plus className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>
      </div>

      {product.details && (
        <>
          {product.details.colors && product.details.colors.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Available Colors</h2>
              <div className="flex gap-2">
                {product.details.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white dark:bg-neutral-800 rounded-full px-3 py-1"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm text-neutral-900 dark:text-white">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.details.sizes && product.details.sizes.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Available Sizes</h2>
              <div className="flex gap-2">
                {product.details.sizes.map((size, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-white dark:bg-neutral-800 rounded-full text-sm text-neutral-900 dark:text-white"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 btn btn-secondary flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
        <button
          onClick={onBuyNow}
          className="flex-1 btn btn-primary"
        >
          Buy Now
        </button>
      </div>

      {product.details && (
        <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          {product.details.material && (
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Material</h2>
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">{product.details.material}</p>
            </div>
          )}

          {product.details.features && product.details.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Features</h2>
              <ul className="mt-2 list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                {product.details.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.details.careInstructions && product.details.careInstructions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Care Instructions</h2>
              <ul className="mt-2 list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
                {product.details.careInstructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}