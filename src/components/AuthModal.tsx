import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'reset';
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup, login, resetPassword } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === 'signup') {
        await signup(email, password, name);
        setMode('login');
      } else if (mode === 'login') {
        await login(email, password);
        onClose();
      } else if (mode === 'reset') {
        await resetPassword(email);
        setMode('login');
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">
            {mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          )}

          <button type="submit" className="w-full btn btn-primary">
            {mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {mode === 'login' ? (
            <>
              <button
                onClick={() => setMode('reset')}
                className="text-amber-800 hover:text-amber-900"
              >
                Forgot password?
              </button>
              <p className="mt-2">
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-amber-800 hover:text-amber-900"
                >
                  Sign up
                </button>
              </p>
            </>
          ) : mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-amber-800 hover:text-amber-900"
              >
                Login
              </button>
            </p>
          ) : (
            <button
              onClick={() => setMode('login')}
              className="text-amber-800 hover:text-amber-900"
            >
              Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}