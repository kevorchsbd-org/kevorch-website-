import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Lock, Mail, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { auth } from '../services/firebase';
import { useTheme } from '../context/ThemeContext';
import whiteLogo from '../assets/whitelogo.png';
import blackLogo from '../assets/blacklogo.png';
import { SEO } from '../components/SEO';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/admin', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      console.error('Firebase Auth Error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid admin credentials. Please check your email and password.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-400 ${
      isDark ? 'bg-black text-white' : 'bg-stone-50 text-neutral-900'
    }`}>
      <SEO
        title="Admin Login | Kevorch"
        description="Kevorch Authorized Admin Login Portal"
        canonical="/admin/login"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className={`rounded-3xl p-8 border shadow-2xl transition-colors duration-300 ${
          isDark
            ? 'bg-neutral-950/90 border-red-900/40 shadow-red-950/20'
            : 'bg-white border-stone-200 shadow-stone-200/50'
        }`}>
          
          {/* Logo & Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex justify-center">
              <img
                src={isDark ? whiteLogo : blackLogo}
                alt="Kevorch Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-extrabold tracking-tight">Admin Portal</h1>
              <p className={`text-xs mt-1 font-mono ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                Authorized Kevorch Management Only
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-500 flex items-start gap-3 text-xs"
            >
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 text-neutral-400">
                ADMIN EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kevorch.online"
                  required
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border transition-colors outline-none ${
                    isDark
                      ? 'bg-neutral-900 border-neutral-800 focus:border-red-500 text-white placeholder-neutral-500'
                      : 'bg-stone-100 border-stone-300 focus:border-red-600 text-stone-900 placeholder-stone-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 text-neutral-400">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border transition-colors outline-none ${
                    isDark
                      ? 'bg-neutral-900 border-neutral-800 focus:border-red-500 text-white placeholder-neutral-500'
                      : 'bg-stone-100 border-stone-300 focus:border-red-600 text-stone-900 placeholder-stone-400'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-heading font-semibold text-sm bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
