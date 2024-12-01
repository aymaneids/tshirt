import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1611520189922-f7b1ba7d801f?auto=format&fit=crop&q=80"
          alt="Moroccan Energy Balls"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 to-amber-800/40" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col justify-center h-full pt-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl">
            Natural Energy,
            <span className="block">Moroccan Flavors</span>
          </h1>
          <p className="mt-6 text-xl text-amber-50 max-w-xl">
            Discover our handcrafted energy balls made with premium Moroccan ingredients.
            Perfect for your active lifestyle.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              to="/products"
              className="bg-amber-500 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors flex items-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/story"
              className="bg-white/10 text-white px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}