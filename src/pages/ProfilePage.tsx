import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { LikedProducts } from '../components/LikedProducts';
import toast from 'react-hot-toast';

export function ProfilePage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites'>('orders');

  const userOrders = orders.filter(order => order.userId === user?.uid);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsUpdating(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName
      });

      await updateProfile(user, {
        displayName: displayName
      });

      setIsEditingName(false);
      toast.success('Name updated successfully');
    } catch (error) {
      console.error('Error updating name:', error);
      toast.error('Failed to update name');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-neutral-900 mb-8">Profile</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-500">Email</label>
              <p className="mt-1 text-lg">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-500">Name</label>
              {isEditingName ? (
                <form onSubmit={handleUpdateName} className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="flex-1 rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="btn btn-primary"
                  >
                    {isUpdating ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-lg">{displayName || 'Not set'}</p>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-sm text-amber-800 hover:text-amber-900"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-neutral-200">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`pb-2 font-medium border-b-2 ${
                    activeTab === 'orders'
                      ? 'border-amber-500 text-amber-800'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`pb-2 font-medium border-b-2 ${
                    activeTab === 'favorites'
                      ? 'border-amber-500 text-amber-800'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Favorites
                </button>
              </div>

              {activeTab === 'orders' ? (
                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <div key={order.id} className="bg-neutral-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                          ${order.status === 'successful' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipping' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-neutral-100 text-neutral-800'}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <img
                          src={order.product.image}
                          alt={order.product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{order.product.name}</p>
                          <p className="text-sm text-neutral-500">
                            Quantity: {order.quantity || 1} · Total: ${order.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-neutral-500">
                            Ordered on {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      {(order.status === 'shipping' || order.status === 'successful') && !order.hasReviewed && (
                        <div className="mt-4">
                          <Link
                            to={`/products/${order.product.id}/review`}
                            className="text-sm text-amber-800 hover:text-amber-900"
                          >
                            Write a Review
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                  {userOrders.length === 0 && (
                    <p className="text-neutral-500">No orders yet</p>
                  )}
                </div>
              ) : (
                <LikedProducts />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}