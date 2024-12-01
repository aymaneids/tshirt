import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-8">Our Story</h1>
          <div className="prose prose-lg max-w-none">
            <p>
              Founded in the heart of Morocco, our journey began with a simple mission: to bring the authentic flavors and natural energy of traditional Moroccan ingredients to health-conscious consumers worldwide.
            </p>
            <h2>Our Mission</h2>
            <p>
              We're committed to creating delicious, nutritious energy balls using only the finest Moroccan ingredients. Each product is carefully crafted to provide sustainable energy while celebrating the rich culinary heritage of Morocco.
            </p>
            <h2>Our Ingredients</h2>
            <p>
              We source our ingredients directly from local Moroccan farmers and cooperatives, ensuring the highest quality while supporting local communities. From premium Majhool dates to pure Argan oil, every ingredient tells a story of tradition and excellence.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}