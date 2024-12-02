import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative min-h-[100vh] md:h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1590739293931-a28a7997e3c9?auto=format&fit=crop&q=80"
          alt="Moroccan Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full pt-20 md:pt-16">
          <div className="max-w-xl">
            <div className="inline-block">
              <span className="text-lg md:text-xl text-amber-400 font-medium mb-4 block">
                ⵡⵉⵏⵓ | WINO
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white">
              Modern Style,
              <span className="block text-amber-400">Moroccan Soul</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200">
              Discover our unique collection of t-shirts and hoodies inspired by the rich heritage and artistry of Morocco.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="w-full sm:w-auto text-center bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto text-center bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}