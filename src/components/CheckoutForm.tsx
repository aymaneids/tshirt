import React, { useState } from 'react';
import { X, Plus, Minus, Phone, Mail, MapPin, Truck, MessageCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/ProductContext';
import toast from 'react-hot-toast';

interface CheckoutFormProps {
  product: Product;
  quantity: number;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  isWhatsApp: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  color: string;
  size: string;
  paymentMethod: 'cod';
  termsAccepted: boolean;
}

const SIZES = ['S', 'M', 'L', 'XL'];

export function CheckoutForm({ product, quantity: initialQuantity, onClose }: CheckoutFormProps) {
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [formData, setFormData] = useState<FormData>({
    fullName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    isWhatsApp: false,
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    color: product.details.colors[0]?.name || '',
    size: 'M',
    paymentMethod: 'cod',
    termsAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!formData.termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const orderNumber = `ORD${Date.now()}`;
      await addOrder({
        id: orderNumber,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        isWhatsApp: formData.isWhatsApp,
        address: `${formData.address.street}, ${formData.address.city}, ${formData.address.state} ${formData.address.zip}, ${formData.address.country}`,
        product,
        status: 'pending',
        total: parseFloat(product.price) * quantity,
        userId: user.uid,
        quantity,
        createdAt: new Date().toISOString(),
        details: {
          color: formData.color,
          size: formData.size,
          paymentMethod: formData.paymentMethod
        }
      });

      clearCart();
      onClose();
      toast.success('Order placed successfully! Order number: ' + orderNumber);
    } catch (error) {
      console.error('Failed to submit order:', error);
      toast.error('Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = parseFloat(product.price) * quantity;
  const total = subtotal;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-[58rem] w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-2 hover:bg-neutral-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Checkout</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product Information */}
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="font-medium text-amber-800 mb-4">Product Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-amber-800">{product.name}</span>
                  <span className="font-medium text-amber-800">${product.price}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">Color</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  >
                    {product.details.colors.map((color) => (
                      <option key={color.name} value={color.name}>{color.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">Size</label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  >
                    {SIZES.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">Quantity</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:bg-amber-100 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-amber-800">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:bg-amber-100 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-neutral-900">Customer Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700">Full Name*</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Email*</label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full pl-10 rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">Phone Number*</label>
                  <div className="mt-1 space-y-2">
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="block w-full pl-10 rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isWhatsApp"
                        checked={formData.isWhatsApp}
                        onChange={(e) => setFormData({ ...formData, isWhatsApp: e.target.checked })}
                        className="rounded border-neutral-300 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor="isWhatsApp" className="text-sm text-neutral-600 flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        This number is available on WhatsApp
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-neutral-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-neutral-400" />
                    Shipping Address*
                  </div>
                </label>
                
                <input
                  type="text"
                  placeholder="Street Address"
                  required
                  value={formData.address.street}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value }
                  })}
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formData.address.city}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value }
                    })}
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />

                  <input
                    type="text"
                    placeholder="State/Province"
                    required
                    value={formData.address.state}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value }
                    })}
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="ZIP/Postal Code"
                    required
                    value={formData.address.zip}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, zip: e.target.value }
                    })}
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />

                  <input
                    type="text"
                    placeholder="Country"
                    required
                    value={formData.address.country}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, country: e.target.value }
                    })}
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-medium text-neutral-900">Payment Method</h3>
              <div className="flex items-center gap-3 bg-neutral-50 p-4 rounded-lg">
                <Truck className="w-5 h-5 text-neutral-500" />
                <div className="flex-1">
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-neutral-500">Pay when you receive your order</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 bg-neutral-50 p-4 rounded-lg">
              <h3 className="font-medium text-neutral-900">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({quantity} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="mt-1 rounded border-neutral-300 text-amber-600 focus:ring-amber-500"
                required
              />
              <label htmlFor="terms" className="text-sm text-neutral-600">
                I agree to the <button type="button" className="text-amber-800 hover:text-amber-900">Terms & Conditions</button> and <button type="button" className="text-amber-800 hover:text-amber-900">Privacy Policy</button>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full btn btn-primary"
              disabled={isSubmitting || !formData.termsAccepted}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}