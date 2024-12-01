import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useReviews } from '../context/ReviewContext';
import { ReviewCard } from '../components/ReviewCard';

export function ReviewsPage() {
  const { reviews, loading } = useReviews();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8">Customer Reviews</h1>
          
          {loading ? (
            <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">No reviews yet</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}