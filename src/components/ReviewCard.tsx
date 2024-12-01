import React, { useState } from 'react';
import { Star, Edit2, Trash2, MessageCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import type { Review } from '../context/ReviewContext';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { isAdmin } = useAuth();
  const { deleteReview, addAdminReply, updateAdminReply, deleteAdminReply } = useReviews();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyText, setReplyText] = useState(review.adminReply?.comment || '');

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateAdminReply(review.id, replyText);
      } else {
        await addAdminReply(review.id, replyText);
      }
      setIsReplying(false);
      setIsEditing(false);
      setReplyText('');
    } catch (error) {
      console.error('Error handling reply:', error);
    }
  };

  const handleEditReply = () => {
    setReplyText(review.adminReply?.comment || '');
    setIsEditing(true);
    setIsReplying(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{review.userName}</span>
            <div className="flex gap-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <p className="text-sm text-neutral-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => deleteReview(review.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-neutral-600">{review.comment}</p>

      {review.adminReply && !isReplying && (
        <div className="mt-4 pl-4 border-l-2 border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">Admin Reply</span>
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                Admin
              </span>
            </div>
            {isAdmin && (
              <div className="flex gap-2">
                <button
                  onClick={handleEditReply}
                  className="p-1 hover:bg-amber-50 rounded-full"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteAdminReply(review.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <p className="text-neutral-600 mt-2">{review.adminReply.comment}</p>
          {review.adminReply.updatedAt && (
            <p className="text-sm text-neutral-500 mt-1">
              (edited {new Date(review.adminReply.updatedAt).toLocaleDateString()})
            </p>
          )}
        </div>
      )}

      {isAdmin && !isReplying && !review.adminReply && (
        <button
          onClick={() => setIsReplying(true)}
          className="flex items-center gap-2 text-amber-800 hover:text-amber-900"
        >
          <MessageCircle className="w-4 h-4" />
          Reply to review
        </button>
      )}

      {isReplying && (
        <form onSubmit={handleReplySubmit} className="space-y-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            rows={3}
            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsReplying(false);
                setIsEditing(false);
                setReplyText('');
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Reply' : 'Post Reply'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}