import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, total } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
            <p className="text-neutral-600">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-amber-800">${item.product.price}</p>
                    <p className="text-sm text-neutral-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleViewCart}
                className="w-full btn btn-primary"
              >
                View Cart & Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}