import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useProducts } from '../context/ProductContext';
import { useReviews } from '../context/ReviewContext';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

export function ProductReviewPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders, markAsReviewed } = useOrders();
  const { products } = useProducts();
  const { addReview } = useReviews();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = products.find(p => p.id === productId);
  const eligibleOrder = orders.find(order => 
    order.userId === user?.uid && 
    order.product.id === productId && 
    (order.status === 'shipping' || order.status === 'successful') &&
    !order.hasReviewed
  );

  if (!product || !user) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-center text-lg text-neutral-600">
              Product not found or you need to be logged in to write a review.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="mt-4 mx-auto block btn btn-primary"
            >
              Back to Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!eligibleOrder) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-center text-lg text-neutral-600">
              You can only review products from completed or shipping orders that haven't been reviewed yet.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="mt-4 mx-auto block btn btn-primary"
            >
              Back to Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !eligibleOrder) return;

    setIsSubmitting(true);
    try {
      await addReview({
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        productId: productId!,
        productName: product.name,
        rating,
        comment
      });
      await markAsReviewed(eligibleOrder.id);
      navigate(`/products/${productId}`);
      toast.success('Review submitted successfully');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
              Review {product.name}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className="p-1 hover:bg-amber-50 rounded-full"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          value <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/products/${productId}`)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}