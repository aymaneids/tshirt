import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { ArrowLeft, Search, Trash2, ExternalLink, MessageCircle } from 'lucide-react';
import { Link } from '../Link';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  not_confirmed: 'bg-red-100 text-red-800',
  shipping: 'bg-blue-100 text-blue-800',
  successful: 'bg-emerald-100 text-emerald-800',
  returned: 'bg-gray-100 text-gray-800'
};

const STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  not_confirmed: 'Not Confirmed',
  shipping: 'Shipping',
  successful: 'Successful',
  returned: 'Returned'
};

export function OrdersManager() {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const handleWhatsAppClick = (phone: string) => {
    const formattedPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Orders</h2>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Order #{order.id}</h3>
                  <p className="text-sm text-neutral-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    className={`text-sm rounded-full px-3 py-1 font-medium ${STATUS_COLORS[order.status]}`}
                  >
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowDeleteConfirm(order.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="p-2 hover:bg-neutral-50 rounded-full"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="mt-4 border-t pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-neutral-500">Customer Details</h4>
                      <p className="mt-1">{order.customerName}</p>
                      <p className="text-sm text-neutral-600">{order.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-neutral-600">{order.phone}</p>
                        {order.isWhatsApp && (
                          <button
                            onClick={() => handleWhatsAppClick(order.phone)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                            title="Contact on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 whitespace-pre-wrap mt-2">{order.address}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-neutral-500">Order Details</h4>
                      <div className="mt-1 space-y-2">
                        <p>
                          <span className="text-neutral-600">Product: </span>
                          {order.product.name}
                        </p>
                        {order.details && (
                          <>
                            <p>
                              <span className="text-neutral-600">Color: </span>
                              {order.details.color}
                            </p>
                            <p>
                              <span className="text-neutral-600">Size: </span>
                              {order.details.size}
                            </p>
                          </>
                        )}
                        <p>
                          <span className="text-neutral-600">Quantity: </span>
                          {order.quantity}
                        </p>
                        <p>
                          <span className="text-neutral-600">Total: </span>
                          ${order.total.toFixed(2)}
                        </p>
                        <p>
                          <span className="text-neutral-600">Payment Method: </span>
                          {order.details?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              Delete Order
            </h3>
            <p className="text-neutral-600 mb-6">
              Are you sure you want to delete this order? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="btn btn-primary bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}