import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import type { Product } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

interface OrderFormProps {
  product: Product;
  onSuccess: () => void;
}

interface FormData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  quantity: number;
}

export function OrderForm({ product, onSuccess }: OrderFormProps) {
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    customerName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    quantity: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addOrder({
      ...formData,
      product,
      status: 'pending',
      total: parseFloat(product.price) * formData.quantity,
      createdAt: new Date().toISOString(),
      userId: user?.uid || ''
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700">Full Name</label>
        <input
          type="text"
          required
          value={formData.customerName}
          onChange={e => setFormData({ ...formData, customerName: e.target.value })}
          className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">Phone</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">Address</label>
        <textarea
          required
          value={formData.address}
          onChange={e => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">Quantity</label>
        <input
          type="number"
          min="1"
          required
          value={formData.quantity}
          onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div className="bg-amber-50 p-4 rounded-lg">
        <h3 className="font-medium text-amber-800">{product.name}</h3>
        <p className="text-amber-800">Unit Price: ${product.price}</p>
        <p className="text-amber-800 font-medium mt-2">
          Total: ${(parseFloat(product.price) * formData.quantity).toFixed(2)}
        </p>
      </div>

      <button type="submit" className="w-full btn btn-primary">
        Place Order
      </button>
    </form>
  );
}