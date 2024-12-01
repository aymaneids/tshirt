import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
  adminReply?: {
    id: string;
    comment: string;
    createdAt: string;
    updatedAt?: string;
  };
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
  addAdminReply: (reviewId: string, comment: string) => Promise<void>;
  updateAdminReply: (reviewId: string, comment: string) => Promise<void>;
  deleteAdminReply: (reviewId: string) => Promise<void>;
  loading: boolean;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData: Review[] = [];
      snapshot.forEach((doc) => {
        reviewsData.push({ id: doc.id, ...doc.data() } as Review);
      });
      setReviews(reviewsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addReview = async (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'reviews'), {
        ...reviewData,
        createdAt: serverTimestamp()
      });
      toast.success('Review submitted successfully');
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to submit review');
      throw error;
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
      throw error;
    }
  };

  const addAdminReply = async (reviewId: string, comment: string) => {
    if (!isAdmin) return;
    try {
      const replyData = {
        adminReply: {
          id: Date.now().toString(),
          comment,
          createdAt: new Date().toISOString(),
        }
      };
      await updateDoc(doc(db, 'reviews', reviewId), replyData);
      toast.success('Reply added successfully');
    } catch (error) {
      console.error('Error adding reply:', error);
      toast.error('Failed to add reply');
      throw error;
    }
  };

  const updateAdminReply = async (reviewId: string, comment: string) => {
    if (!isAdmin) return;
    try {
      const review = reviews.find(r => r.id === reviewId);
      if (!review?.adminReply) return;

      const replyData = {
        adminReply: {
          ...review.adminReply,
          comment,
          updatedAt: new Date().toISOString(),
        }
      };
      await updateDoc(doc(db, 'reviews', reviewId), replyData);
      toast.success('Reply updated successfully');
    } catch (error) {
      console.error('Error updating reply:', error);
      toast.error('Failed to update reply');
      throw error;
    }
  };

  const deleteAdminReply = async (reviewId: string) => {
    if (!isAdmin) return;
    try {
      await updateDoc(doc(db, 'reviews', reviewId), {
        adminReply: null
      });
      toast.success('Reply deleted successfully');
    } catch (error) {
      console.error('Error deleting reply:', error);
      toast.error('Failed to delete reply');
      throw error;
    }
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      addReview,
      deleteReview,
      addAdminReply,
      updateAdminReply,
      deleteAdminReply,
      loading
    }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
}