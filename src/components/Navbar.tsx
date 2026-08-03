import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

import { MagneticButton } from './MagneticButton';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Clients', path: '/clients' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">



        {/* ── 2. INDEPENDENT DESKTOP NAVIGATION PILL ── */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`hidden md:flex items-center gap-1 border backdrop-blur-xl px-3 py-1.5 rounded-full shadow-lg pointer-events-auto transition-all duration-300 ${
            isDark
              ? 'bg-black/40 border-red-900/30 shadow-black/40'
              : 'bg-white/80 border-stone-200 shadow-stone-200/50'
          } ${isScrolled ? 'scale-95' : 'scale-100'}`}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`relative px-4 py-1.5 text-sm font-heading font-medium transition-colors duration-300 rounded-full whitespace-nowrap ${
                  isActive
                    ? isDark
                      ? 'text-white font-semibold'
                      : 'text-neutral-950 font-bold'
                    : isDark
                    ? 'text-neutral-300 hover:text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className={`absolute inset-0 rounded-full -z-10 ${
                      isDark
                        ? 'bg-gradient-to-r from-red-600/30 to-red-900/20 border border-red-500/40 shadow-[0_0_12px_rgba(222,9,24,0.3)]'
                        : 'bg-stone-100 border border-stone-300 shadow-sm'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </motion.nav>

        {/* ── 3. INDEPENDENT RIGHT ACTIONS PILL (Theme Toggle & CTA) ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`hidden md:flex items-center gap-3 border backdrop-blur-xl px-3 py-1.5 rounded-full shadow-lg pointer-events-auto transition-all duration-300 ${
            isDark
              ? 'bg-black/40 border-red-900/30 shadow-black/40'
              : 'bg-white/80 border-stone-200 shadow-stone-200/50'
          } ${isScrolled ? 'scale-95' : 'scale-100'}`}
        >
          <ThemeToggle />
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={() => navigate('/contact')}
          >
            Start Project <ArrowRight className="w-4 h-4 ml-1" />
          </MagneticButton>
        </motion.div>

        {/* ── 4. INDEPENDENT MOBILE CONTROLS PILL ── */}
        <div className="md:hidden flex items-center gap-2 pointer-events-auto">
          <div
            className={`flex items-center gap-2 border backdrop-blur-xl px-2.5 py-1.5 rounded-full shadow-lg ${
              isDark
                ? 'bg-black/40 border-red-900/30'
                : 'bg-white/80 border-stone-200'
            }`}
          >
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full border transition-colors ${
                isDark
                  ? 'bg-neutral-900 border-red-900/50 text-neutral-200 hover:text-white'
                  : 'bg-stone-100 border-stone-300 text-stone-800 hover:text-black'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-red-500" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden pointer-events-auto absolute top-20 left-4 right-4 rounded-3xl border backdrop-blur-2xl z-50 p-6 shadow-2xl transition-colors duration-300 ${
              isDark
                ? 'bg-neutral-950/95 border-red-900/40 text-white shadow-red-950/40'
                : 'bg-white/98 border-stone-200 text-neutral-900 shadow-stone-400/30'
            }`}
          >
            <div className="flex flex-col gap-5 max-w-sm mx-auto w-full">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block text-xl font-heading font-bold py-1.5 px-3 rounded-xl transition-all ${
                        isActive
                          ? isDark
                            ? 'text-red-500 bg-red-950/30 border border-red-900/40'
                            : 'text-red-600 bg-red-50 border border-red-200'
                          : isDark
                          ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50'
                          : 'text-stone-700 hover:text-black hover:bg-stone-100'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <div className="pt-4 border-t border-red-900/30 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <span>Kevorch Digital Solutions</span>
                </div>
                <MagneticButton
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/contact');
                  }}
                >
                  Start Project <ArrowRight className="w-4 h-4 ml-2" />
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

