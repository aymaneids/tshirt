import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface CartItemOptions {
  color?: string;
  size?: string;
}

export function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [itemOptions, setItemOptions] = useState<Record<string, CartItemOptions>>({});
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [contactInfo, setContactInfo] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: ''
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      // Create an order for each item
      for (const item of items) {
        const options = itemOptions[item.product.id] || {};
        const orderNumber = `ORD${Date.now()}-${item.product.id}`;
        
        await addOrder({
          id: orderNumber,
          customerName: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          address: `${address.street}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`,
          product: item.product,
          status: 'pending',
          total: parseFloat(item.product.price) * item.quantity,
          userId: user.uid,
          quantity: item.quantity,
          createdAt: new Date().toISOString(),
          details: {
            color: options.color || item.product.details.colors[0]?.name,
            size: options.size || item.product.details.sizes[0],
            paymentMethod: 'cod'
          }
        });
      }

      clearCart();
      toast.success('Orders placed successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Failed to place orders:', error);
      toast.error('Failed to place orders');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8">Shopping Cart</h1>
            <div className="text-center py-12">
              <p className="text-neutral-600">Your cart is empty</p>
              <button
                onClick={() => navigate('/products')}
                className="mt-4 btn btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-neutral-900 mb-8">Shopping Cart</h1>
          
          <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-6 p-4 bg-white rounded-lg shadow-sm">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-amber-800">${item.product.price}</p>
                      
                      <div className="mt-4 space-y-3">
                        {item.product.details.colors.length > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-neutral-700">Color</label>
                            <select
                              value={itemOptions[item.product.id]?.color || ''}
                              onChange={(e) => setItemOptions({
                                ...itemOptions,
                                [item.product.id]: {
                                  ...itemOptions[item.product.id],
                                  color: e.target.value
                                }
                              })}
                              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                            >
                              {item.product.details.colors.map((color) => (
                                <option key={color.name} value={color.name}>{color.name}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {item.product.details.sizes.length > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-neutral-700">Size</label>
                            <select
                              value={itemOptions[item.product.id]?.size || ''}
                              onChange={(e) => setItemOptions({
                                ...itemOptions,
                                [item.product.id]: {
                                  ...itemOptions[item.product.id],
                                  size: e.target.value
                                }
                              })}
                              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                            >
                              {item.product.details.sizes.map((size) => (
                                <option key={size} value={size}>{size}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div className="flex items-center gap-4">
                          <label className="text-sm font-medium text-neutral-700">Quantity:</label>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-1 hover:bg-neutral-100 rounded-full"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-neutral-100 rounded-full"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-amber-50 rounded-lg">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Email</label>
                    <input
                      type="email"
                      required
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Phone</label>
                    <input
                      type="tel"
                      required
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Street Address</label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">City</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">State/Province</label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">ZIP/Postal Code</label>
                      <input
                        type="text"
                        required
                        value={address.zip}
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Country</label>
                      <input
                        type="text"
                        required
                        value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full btn btn-primary">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}