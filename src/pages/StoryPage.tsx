import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useContent } from '../context/ContentContext';

export function StoryPage() {
  const { story } = useContent();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative h-96 mb-12">
            <img
              src={story.image}
              alt="Our Story"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
            <h1 className="absolute bottom-8 left-8 text-4xl font-bold text-white">{story.title}</h1>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">{story.content}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}