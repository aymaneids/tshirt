import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, doc, setDoc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface Like {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
}

interface LikesContextType {
  likes: Like[];
  isLiked: (productId: string) => boolean;
  toggleLike: (productId: string) => Promise<void>;
  getLikeCount: (productId: string) => number;
  loading: boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLikes([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'likes'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const likesData: Like[] = [];
      snapshot.forEach((doc) => {
        likesData.push({ id: doc.id, ...doc.data() } as Like);
      });
      setLikes(likesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching likes:', error);
      toast.error('Failed to load likes');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const isLiked = (productId: string) => {
    return likes.some(like => like.productId === productId);
  };

  const getLikeCount = (productId: string) => {
    return likes.filter(like => like.productId === productId).length;
  };

  const toggleLike = async (productId: string) => {
    if (!user) {
      toast.error('Please login to like products');
      return;
    }

    try {
      const existingLike = likes.find(like => 
        like.userId === user.uid && like.productId === productId
      );

      if (existingLike) {
        await deleteDoc(doc(db, 'likes', existingLike.id));
        toast.success('Removed from favorites');
      } else {
        const newLike = {
          userId: user.uid,
          productId,
          createdAt: new Date().toISOString()
        };
        const docRef = doc(collection(db, 'likes'));
        await setDoc(docRef, newLike);
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update favorite');
    }
  };

  return (
    <LikesContext.Provider value={{
      likes,
      isLiked,
      toggleLike,
      getLikeCount,
      loading
    }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const context = useContext(LikesContext);
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
}