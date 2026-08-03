import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  X,
  Home,
  User,
  Briefcase,
  Users,
  Mail,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Zap,
  Check,
  Search,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type AccentColor = 'red' | 'cyan' | 'emerald';

interface AccentStyle {
  name: string;
  badge: string;
  border: string;
  glow: string;
  text: string;
  bg: string;
  hoverBg: string;
  accentHex: string;
}

const ACCENT_MAP: Record<AccentColor, AccentStyle> = {
  red: {
    name: 'Crimson Red',
    badge: 'bg-red-600/20 text-red-500 border-red-500/40',
    border: 'border-red-600/40',
    glow: 'shadow-red-600/20',
    text: 'text-red-500',
    bg: 'bg-red-600',
    hoverBg: 'hover:bg-red-600',
    accentHex: '#DE0918',
  },
  cyan: {
    name: 'Cyber Cyan',
    badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/40',
    border: 'border-cyan-500/40',
    glow: 'shadow-cyan-500/20',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500',
    hoverBg: 'hover:bg-cyan-500',
    accentHex: '#06B6D4',
  },
  emerald: {
    name: 'Emerald Gold',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/40',
    border: 'border-emerald-500/40',
    glow: 'shadow-emerald-500/20',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500',
    hoverBg: 'hover:bg-emerald-500',
    accentHex: '#10B981',
  },
};

export const NavAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accentColor, setAccentColor] = useState<AccentColor>('red');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const accent = ACCENT_MAP[accentColor];

  // Global Keyboard Shortcut: Ctrl+K or Cmd+K to toggle assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { name: 'Home Page', path: '/', icon: Home, desc: 'Main Agency Overview & Key Highlights' },
    { name: 'About Agency', path: '/about', icon: User, desc: 'Our Mission, Leadership & Core Values' },
    { name: 'Growth Services', path: '/services', icon: Briefcase, desc: 'SEO, Paid Media, Web Dev & Branding' },
    { name: 'Client Case Studies', path: '/clients', icon: Users, desc: 'Real Success Stories & Track Records' },
    { name: 'Contact & Consult', path: '/contact', icon: Mail, desc: 'Get a Custom Growth Strategy Audit' },
  ];

  const filteredItems = navItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Dock Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-300 cursor-pointer ${
            isDark
              ? `bg-black/80 ${accent.border} text-white ${accent.glow}`
              : `bg-white/95 border-stone-300 text-stone-900 shadow-lg`
          }`}
        >
          <div className="relative">
            <Compass className={`w-5 h-5 ${accent.text} animate-spin-slow`} />
            <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${accent.bg} animate-ping`} />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider hidden sm:inline">
            Nav Assistant
          </span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${accent.badge} hidden lg:inline`}>
            ⌘K
          </span>
        </motion.button>
      </div>

      {/* Navigation Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden z-10 transition-colors ${
                isDark ? `bg-neutral-950/95 ${accent.border} text-white` : 'bg-white border-stone-200 text-neutral-900 shadow-2xl'
              }`}
            >
              {/* Top Header & 3-Color Selector */}
              <div className={`p-5 sm:p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isDark ? 'border-neutral-900 bg-black/40' : 'border-stone-200 bg-stone-50/80'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-2xl border ${accent.badge}`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg flex items-center gap-2">
                      Navigation Assistant
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                      Select your target page or customize the 3-color mode.
                    </p>
                  </div>
                </div>

                {/* 3-Color Accent Switcher */}
                <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                  <span className={`text-[11px] font-mono uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                    3-Color Mode:
                  </span>
                  <div className="flex items-center gap-1.5 p-1 rounded-full border border-neutral-800 bg-black/30">
                    <button
                      title="Crimson Red Theme"
                      onClick={() => setAccentColor('red')}
                      className={`w-6 h-6 rounded-full bg-red-600 transition-all flex items-center justify-center cursor-pointer ${
                        accentColor === 'red' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {accentColor === 'red' && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <button
                      title="Cyber Cyan Theme"
                      onClick={() => setAccentColor('cyan')}
                      className={`w-6 h-6 rounded-full bg-cyan-500 transition-all flex items-center justify-center cursor-pointer ${
                        accentColor === 'cyan' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {accentColor === 'cyan' && <Check className="w-3 h-3 text-black font-bold" />}
                    </button>
                    <button
                      title="Emerald Gold Theme"
                      onClick={() => setAccentColor('emerald')}
                      className={`w-6 h-6 rounded-full bg-emerald-500 transition-all flex items-center justify-center cursor-pointer ${
                        accentColor === 'emerald' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {accentColor === 'emerald' && <Check className="w-3 h-3 text-black font-bold" />}
                    </button>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-full border transition-colors cursor-pointer ml-2 ${
                      isDark ? 'border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900' : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Search Bar Input */}
              <div className={`p-4 border-b ${isDark ? 'border-neutral-900' : 'border-stone-200'}`}>
                <div className="relative">
                  <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-neutral-500' : 'text-stone-400'}`} />
                  <input
                    type="text"
                    placeholder="Search pages, services, or actions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none border transition-colors ${
                      isDark
                        ? 'bg-black border-neutral-900 text-white placeholder-neutral-500 focus:border-red-500'
                        : 'bg-stone-50 border-stone-200 text-neutral-900 placeholder-stone-400 focus:border-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Quick Navigation Options List */}
              <div className="p-4 max-h-80 overflow-y-auto space-y-2">
                <span className={`text-[11px] font-mono uppercase tracking-wider px-2 block ${accent.text}`}>
                  // Direct Page Jumps
                </span>

                {filteredItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                        isActive
                          ? isDark
                            ? `bg-black ${accent.border} ${accent.text}`
                            : 'bg-stone-100 border-stone-400 text-neutral-900 font-bold'
                          : isDark
                          ? 'bg-neutral-900/40 border-neutral-900 hover:border-neutral-700 hover:bg-neutral-900'
                          : 'bg-stone-50/50 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl border transition-colors ${
                          isActive
                            ? accent.badge
                            : isDark
                            ? 'bg-black border-neutral-800 text-neutral-400 group-hover:text-white'
                            : 'bg-white border-stone-200 text-stone-600 group-hover:text-black'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-heading font-bold text-sm flex items-center gap-2">
                            <span>{item.name}</span>
                            {isActive && (
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${accent.badge}`}>
                                Active Page
                              </span>
                            )}
                          </div>
                          <span className={`text-xs ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                            {item.desc}
                          </span>
                        </div>
                      </div>

                      <Zap className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${accent.text}`} />
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Tools Bar */}
              <div className={`p-4 border-t flex items-center justify-between gap-2 text-xs font-mono ${
                isDark ? 'border-neutral-900 bg-black/40' : 'border-stone-200 bg-stone-50'
              }`}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={scrollToTop}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isDark ? 'border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300' : 'border-stone-300 bg-white hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" /> Top
                  </button>
                  <button
                    onClick={scrollToBottom}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isDark ? 'border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300' : 'border-stone-300 bg-white hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" /> Bottom
                  </button>
                </div>

                <button
                  onClick={() => handleNavigate('/contact')}
                  className={`px-4 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${accent.bg} text-white shadow-md hover:scale-105`}
                >
                  Book Strategy Audit →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
