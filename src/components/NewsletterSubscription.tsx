import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';

export function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(500);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().newsletter?.subscriberCount) {
          setSubscriberCount(docSnap.data().newsletter.subscriberCount);
        }
      } catch (error) {
        console.error('Error fetching subscriber count:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        subscribedAt: new Date().toISOString()
      });
      
      setEmail('');
      toast.success('Successfully subscribed to our newsletter!');
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-amber-50 to-white dark:from-neutral-800 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Stay Connected</h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new product launches, and Moroccan-inspired style tips.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="mt-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full px-6 py-3 text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
              required
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-500 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-400 dark:hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
            Join our community of {subscriberCount.toLocaleString()}+ subscribers
          </p>
        </motion.form>
      </div>
    </section>
  );
}