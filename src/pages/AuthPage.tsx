import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [logo, setLogo] = useState({ url: '', darkUrl: '' });
  const { signup, login, resetPassword } = useAuth();
  const { theme } = useTheme();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === 'signup') {
        await signup(email, password, name);
        navigate('/profile');
      } else if (mode === 'login') {
        await login(email, password);
        navigate('/profile');
      } else if (mode === 'reset') {
        await resetPassword(email);
        setMode('login');
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
          >
            <div className="flex flex-col items-center mb-8">
              {theme === 'dark' ? (
                logo.darkUrl ? (
                  <img src={logo.darkUrl} alt="WINO" className="h-12 w-auto mb-6" />
                ) : (
                  <span className="text-4xl font-bold text-amber-400 mb-6">WINO</span>
                )
              ) : (
                logo.url ? (
                  <img src={logo.url} alt="WINO" className="h-12 w-auto mb-6" />
                ) : (
                  <span className="text-4xl font-bold text-amber-800 mb-6">WINO</span>
                )
              )}
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-neutral-700 dark:text-white"
                  />
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-neutral-700 dark:text-white"
                />
              </div>

              {mode !== 'reset' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="block w-full rounded-lg border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-neutral-700 dark:text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <motion.button
                type="submit"
                className="w-full btn btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm">
              {mode === 'login' ? (
                <>
                  <motion.button
                    onClick={() => setMode('reset')}
                    className="text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Forgot password?
                  </motion.button>
                  <p className="mt-4">
                    Don't have an account?{' '}
                    <motion.button
                      onClick={() => setMode('signup')}
                      className="text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign up
                    </motion.button>
                  </p>
                </>
              ) : mode === 'signup' ? (
                <p>
                  Already have an account?{' '}
                  <motion.button
                    onClick={() => setMode('login')}
                    className="text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </p>
              ) : (
                <motion.button
                  onClick={() => setMode('login')}
                  className="text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to login
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}