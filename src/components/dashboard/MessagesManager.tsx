import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ArrowLeft, Search, Trash2, Mail } from 'lucide-react';
import { Link } from '../Link';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData: Message[] = [];
      snapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(messagesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (messageId: string) => {
    try {
      await deleteDoc(doc(db, 'messages', messageId));
      toast.success('Message deleted successfully');
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete message:', error);
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-neutral-600">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Messages</h2>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
      </div>

      <div className="grid gap-6">
        {filteredMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Mail className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{message.name}</h3>
                  <p className="text-neutral-600">{message.email}</p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(message.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-4 text-neutral-700">{message.message}</p>
          </div>
        ))}
        {filteredMessages.length === 0 && (
          <div className="text-center py-8 text-neutral-500">
            No messages found
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              Delete Message
            </h3>
            <p className="text-neutral-600 mb-6">
              Are you sure you want to delete this message? This action cannot be undone.
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