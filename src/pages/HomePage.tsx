import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Partners } from '../components/Partners';
import { NewsletterSubscription } from '../components/NewsletterSubscription';
import { ShoppingBag, Award, Leaf, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CollectionCard } from '../components/CollectionCard';

export function HomePage() {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);
  const [settings, setSettings] = useState({
    heroBackgroundImage: 'https://images.unsplash.com/photo-1590739293931-a28a7997e3c9?auto=format&fit=crop&q=80',
    heritage: {
      title: 'Moroccan Heritage in Every Thread',
      description: 'Each design tells a story, inspired by centuries of Moroccan craftsmanship and artistry. Our patterns and motifs are drawn from traditional zellige tiles, ancient textiles, and the vibrant colors of Morocco\'s imperial cities.',
      image1: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80',
      image2: 'https://images.unsplash.com/photo-1531837763904-5d3cb2632ea3?auto=format&fit=crop&q=80'
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings({
            heroBackgroundImage: data.heroBackgroundImage || settings.heroBackgroundImage,
            heritage: {
              title: data.heritage?.title || settings.heritage.title,
              description: data.heritage?.description || settings.heritage.description,
              image1: data.heritage?.image1 || settings.heritage.image1,
              image2: data.heritage?.image2 || settings.heritage.image2
            }
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh]">
        <div className="absolute inset-0">
          <img
            src={settings.heroBackgroundImage}
            alt="WINO Moroccan Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center h-full pt-16">
            <div className="inline-block">
              <span className="text-xl text-amber-400 font-medium mb-4 block">
                ⵡⵉⵏⵓ | WINO
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white max-w-2xl">
              Modern Style,
              <span className="block text-amber-400">Moroccan Soul</span>
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-xl">
              Discover our unique collection of t-shirts and hoodies inspired by the rich heritage and artistry of Morocco.
            </p>
            <div className="mt-10 flex gap-4">
              <Link
                to="/products"
                className="bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-amber-300 transition-colors flex items-center gap-2"
              >
                Shop Collection
                <ShoppingBag className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Latest Collection Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-amber-50/30 dark:from-neutral-900 dark:to-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-amber-600 dark:text-amber-500 font-medium">Discover Our</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Latest Collection</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Where tradition meets contemporary fashion, each piece tells a story of Moroccan craftsmanship
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <CollectionCard 
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-medium transition-colors"
            >
              View All Products
              <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <Partners />

      {/* Newsletter Section */}
      <NewsletterSubscription />

      {/* Heritage Section */}
      <section className="py-24 bg-amber-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{settings.heritage.title}</h2>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                {settings.heritage.description}
              </p>
              <Link
                to="/story"
                className="mt-8 inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium hover:text-amber-700 dark:hover:text-amber-300"
              >
                Discover Our Story
                <span className="text-2xl">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={settings.heritage.image1}
                alt="Moroccan Pattern"
                className="rounded-xl"
              />
              <img
                src={settings.heritage.image2}
                alt="Moroccan Craftsmanship"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-8 rounded-xl bg-neutral-50 dark:bg-neutral-800">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">Authentic Designs</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Each piece features authentic Moroccan patterns and motifs
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-neutral-50 dark:bg-neutral-800">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">Sustainable Fashion</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Eco-friendly materials and ethical production practices
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-neutral-50 dark:bg-neutral-800">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">Artisan Support</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Supporting local Moroccan artisans and communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id="moroccan" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="currentColor"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#moroccan)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">The Atlas Collection</h2>
            <p className="mt-6 text-lg text-gray-300">
              Inspired by the majestic Atlas Mountains, our new collection combines comfort with the timeless beauty of Moroccan design.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-amber-300 transition-colors"
            >
              Explore Collection
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}