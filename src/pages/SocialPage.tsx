import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export function SocialPage() {
  const socialLinks = [
    {
      platform: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/moroccanenergyballs',
      handle: '@moroccanenergyballs',
      description: 'Follow us for daily inspiration, behind-the-scenes content, and customer stories.'
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/moroccanenergyballs',
      handle: 'Moroccan Energy Balls',
      description: 'Join our community for recipes, health tips, and exclusive offers.'
    },
    {
      platform: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/moroccanenergy',
      handle: '@moroccanenergy',
      description: 'Stay updated with our latest news, promotions, and customer reviews.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Connect With Us</h1>
          <p className="text-lg text-neutral-600 mb-12">
            Follow us on social media to stay updated with our latest products, events, and community stories.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="w-8 h-8 text-amber-800 mb-4" />
                  <h2 className="text-xl font-bold text-neutral-900 mb-2">{social.platform}</h2>
                  <p className="text-amber-800 font-medium mb-4">{social.handle}</p>
                  <p className="text-neutral-600">{social.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}