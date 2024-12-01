import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        subscribedAt: new Date().toISOString()
      });
      toast.success('Successfully subscribed!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-amber-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Stay Updated</h2>
          <p className="mt-4 text-lg text-amber-100 max-w-2xl mx-auto">
            Subscribe to our newsletter for new flavors, exclusive offers, and Moroccan-inspired recipes.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full px-6 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-500 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}