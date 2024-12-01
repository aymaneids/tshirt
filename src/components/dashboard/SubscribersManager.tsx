import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ArrowLeft, Mail } from 'lucide-react';
import { Link } from '../Link';

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export function SubscribersManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'subscribers'), orderBy('subscribedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subscribersData: Subscriber[] = [];
      snapshot.forEach((doc) => {
        subscribersData.push({ id: doc.id, ...doc.data() } as Subscriber);
      });
      setSubscribers(subscribersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-neutral-600">Loading subscribers...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Newsletter Subscribers</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Subscribed Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-neutral-400 mr-2" />
                      <span className="text-sm text-neutral-900">{subscriber.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-neutral-500">
                    No subscribers yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}