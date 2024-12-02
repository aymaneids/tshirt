import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, User, LayoutDashboard, Heart, Sun, Moon, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLikes } from '../context/LikesContext';
import { useTheme } from '../context/ThemeContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  const { likes } = useLikes();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [logo, setLogo] = useState({ url: '', darkUrl: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().logo) {
          setLogo(docSnap.data().logo);
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };

    fetchLogo();
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  const mobileMenuLinks = [
    { to: '/products', label: 'Products' },
    { to: '/story', label: 'Our Story' },
    { to: '/events', label: 'Events' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed w-full bg-white dark:bg-neutral-900 z-50 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={() => setShowMobileMenu(false)}>
              {theme === 'dark' && logo.darkUrl ? (
                <img src={logo.darkUrl} alt="Logo" className="h-8 w-auto" />
              ) : logo.url ? (
                <img src={logo.url} alt="Logo" className="h-8 w-auto" />
              ) : (
                <span className="text-2xl font-bold text-amber-800 dark:text-amber-400">WINO</span>
              )}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {mobileMenuLinks.map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className="text-neutral-600 dark:text-neutral-300 hover:text-amber-800 dark:hover:text-amber-400"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full text-amber-800 dark:text-amber-400"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAdmin && (
              <Link to="/dashboard" className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full">
                <LayoutDashboard className="w-5 h-5 text-amber-800 dark:text-amber-400" />
              </Link>
            )}
            
            {user && (
              <Link to="/profile?tab=favorites" className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full relative">
                <Heart className="w-5 h-5 text-amber-800 dark:text-amber-400" />
                {likes.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {likes.length}
                  </span>
                )}
              </Link>
            )}

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full"
              >
                <User className="w-5 h-5 text-amber-800 dark:text-amber-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-1">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Login / Sign Up
                    </Link>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/cart"
              className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full relative"
            >
              <ShoppingCart className="w-5 h-5 text-amber-800 dark:text-amber-400" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full"
            >
              <Menu className="w-5 h-5 text-amber-800 dark:text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-neutral-900 shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full"
                >
                  <X className="w-5 h-5 text-amber-800 dark:text-amber-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                {mobileMenuLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block py-2 text-neutral-600 dark:text-neutral-300 hover:text-amber-800 dark:hover:text-amber-400"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}