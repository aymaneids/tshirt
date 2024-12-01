import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Plus, Star, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from '../Link';
import type { Review } from '../../context/ContentContext';

export function ReviewsEditor() {
  const { reviews, setReviews } = useContent();
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showForm, setShowForm] = useState(false);

  const initialReview = {
    id: '',
    author: '',
    rating: 5,
    content: '',
    date: new Date().toISOString().split('T')[0],
    avatar: ''
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      if (editingReview.id) {
        setReviews(reviews.map(rev => rev.id === editingReview.id ? editingReview : rev));
      } else {
        const newReview = {
          ...editingReview,
          id: Date.now().toString()
        };
        setReviews([...reviews, newReview]);
      }
      setEditingReview(null);
      setShowForm(false);
    }
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter(rev => rev.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Reviews</h2>
        <button
          onClick={() => {
            setEditingReview(initialReview);
            setShowForm(true);
          }}
          className="btn btn-primary flex items-center gap-2 ml-auto"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">
            {editingReview?.id ? 'Edit Review' : 'Add New Review'}
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Author Name</label>
              <input
                type="text"
                value={editingReview?.author || ''}
                onChange={e => setEditingReview({ ...editingReview!, author: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                value={editingReview?.rating || 5}
                onChange={e => setEditingReview({ ...editingReview!, rating: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Review</label>
              <textarea
                value={editingReview?.content || ''}
                onChange={e => setEditingReview({ ...editingReview!, content: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Avatar URL</label>
              <input
                type="url"
                value={editingReview?.avatar || ''}
                onChange={e => setEditingReview({ ...editingReview!, avatar: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingReview(null);
                  setShowForm(false);
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Review
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{review.author}</h3>
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-neutral-600 mt-4">{review.content}</p>
            <p className="text-neutral-500 text-sm mt-2">
              {new Date(review.date).toLocaleDateString()}
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingReview(review);
                  setShowForm(true);
                }}
                className="btn btn-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="btn btn-secondary text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}