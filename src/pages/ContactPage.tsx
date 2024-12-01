import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      
      setFormData({ name: '', email: '', message: '' });
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8">Contact Us</h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-amber-800 dark:text-amber-400" />
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-white">Email</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">contact@moroccanenergyballs.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-amber-800 dark:text-amber-400" />
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-white">Phone</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-amber-800 dark:text-amber-400" />
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-white">Address</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      123 Energy Street<br />
                      Marrakech, Morocco
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}