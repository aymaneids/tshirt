import React, { useState } from 'react';
import { useReviews } from '../context/ReviewContext';
import { ReviewCard } from './ReviewCard';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { reviews, loading } = useReviews();
  const { user } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  
  const productReviews = reviews.filter(review => review.productId === productId);

  // Check if user has an eligible order for reviewing
  const hasEligibleOrder = orders.some(order => 
    order.userId === user?.uid && 
    order.product.id === productId && 
    (order.status === 'shipping' || order.status === 'confirmed') &&
    !order.hasReviewed
  );

  const handleWriteReview = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/products/${productId}/review`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      {user && hasEligibleOrder && (
        <button
          onClick={handleWriteReview}
          className="btn btn-primary"
        >
          Write a Review
        </button>
      )}

      <div className="space-y-6">
        {productReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        {productReviews.length === 0 && (
          <p className="text-center text-neutral-500">No reviews yet</p>
        )}
      </div>
    </div>
  );
}