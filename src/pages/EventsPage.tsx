import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useContent } from '../context/ContentContext';
import { Calendar, MapPin } from 'lucide-react';

export function EventsPage() {
  const { events } = useContent();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8">Upcoming Events</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm dark:shadow-none dark:border dark:border-neutral-700 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}