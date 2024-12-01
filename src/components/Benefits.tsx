import React from 'react';
import { Leaf, Zap, Heart, Package } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'Made with pure, organic ingredients sourced from Morocco'
    },
    {
      icon: Zap,
      title: 'Instant Energy',
      description: 'Perfect for pre-workout or afternoon pick-me-up'
    },
    {
      icon: Heart,
      title: 'Health Conscious',
      description: 'High in protein, fiber, and essential nutrients'
    },
    {
      icon: Package,
      title: 'Eco-Friendly',
      description: 'Sustainable packaging for a better planet'
    }
  ];

  return (
    <section className="py-24 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900">Why Choose Our Energy Balls?</h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
            Experience the perfect blend of taste and nutrition with our authentic Moroccan recipes.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-amber-100">
                  <Icon className="h-6 w-6 text-amber-800" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-neutral-900">{benefit.title}</h3>
                <p className="mt-2 text-neutral-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}