import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from './Link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useTheme } from '../context/ThemeContext';

export function Footer() {
  const [socialLinks, setSocialLinks] = useState({
    instagram: '#',
    facebook: '#',
    twitter: '#'
  });
  const [logo, setLogo] = useState({ url: '', darkUrl: '' });
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [socialDoc, settingsDoc] = await Promise.all([
          getDoc(doc(db, 'settings', 'socialLinks')),
          getDoc(doc(db, 'settings', 'general'))
        ]);

        if (socialDoc.exists()) {
          setSocialLinks(socialDoc.data());
        }
        if (settingsDoc.exists() && settingsDoc.data().logo) {
          setLogo(settingsDoc.data().logo);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              {theme === 'dark' && logo.darkUrl ? (
                <img src={logo.darkUrl} alt="Wino" className="h-22 w-auto" />
              ) : logo.url ? (
                <img src={logo.url} alt="Wino" className="h-12 w-auto invert dark:invert-0" />
              ) : (
                <span className="text-4xl font-bold text-white">WINO</span>
              )}
            </div>
            <p className="mt-4 text-neutral-400 dark:text-neutral-500">
              
            </p>
          </div>
          <div>
            <h4 className="text-white dark:text-neutral-200 font-medium">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/products" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">Products</Link></li>
              <li><Link href="/story" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">Our Story</Link></li>
              <li><Link href="/events" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">Events</Link></li>
              <li><Link href="/reviews" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white dark:text-neutral-200 font-medium">Help Center</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/faq" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">FAQ</Link></li>
              <li><Link href="/shipping" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">Shipping</Link></li>
              <li><Link href="/returns" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">Returns</Link></li>
              <li><Link href="/contact" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white dark:text-neutral-200 font-medium">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-400 dark:text-neutral-500 hover:text-amber-400">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-800 dark:border-neutral-700">
          <p className="text-neutral-400 dark:text-neutral-500 text-center">
            © {new Date().getFullYear()} Wino. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}