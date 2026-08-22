import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUp, Send, Check, ShieldCheck, Mail } from 'lucide-react';
import whiteLogo from '../assets/whitelogo.png';
import blackLogo from '../assets/blacklogo.png';
import { useTheme } from '../context/ThemeContext';

interface IconProps { className?: string }

const WhatsAppIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.228-1.157zm11.391-4.707c-.305-.153-1.805-.89-2.085-.99-.28-.101-.484-.153-.689.153-.204.305-.79 1.018-.968 1.222-.178.204-.356.229-.661.076-.305-.153-1.288-.475-2.453-1.514-.908-.81-1.52-1.81-1.698-2.115-.178-.305-.019-.47.133-.622.137-.137.305-.356.457-.534.153-.178.204-.305.305-.509.102-.204.051-.382-.025-.534-.076-.153-.689-1.658-.945-2.273-.249-.597-.502-.516-.689-.525l-.585-.01c-.204 0-.534.076-.814.382-.28.305-1.07 1.045-1.07 2.549 0 1.504 1.096 2.955 1.248 3.159.153.204 2.158 3.296 5.228 4.622.73.316 1.3.504 1.744.645.733.234 1.399.2 1.926.121.587-.088 1.805-.738 2.06-1.45.254-.712.254-1.323.178-1.45-.076-.127-.28-.203-.585-.356z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);



const InstagramIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative border-t pt-20 pb-12 overflow-hidden transition-colors duration-400 ${
      isDark
        ? 'bg-[#000000] border-red-900/30 text-neutral-400'
        : 'bg-stone-50 border-stone-200 text-stone-600'
    }`}>
      {/* Background Decorative Mesh Glow in Dark Mode Only */}
      {isDark && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-75 bg-linear-to-t from-red-950/20 via-red-900/10 to-transparent blur-3xl pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-red-900/20">
          
          {/* Column 1: Brand & Availability */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-1">
              <img
                src={isDark ? whiteLogo : blackLogo}
                alt="KEVORCH Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>



            {/* Live Availability Badge */}
            <div className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border text-xs font-mono w-max ${
              isDark
                ? 'bg-neutral-950 border-red-800/40 text-red-400'
                : 'bg-white border-red-300 text-red-600 shadow-xs'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Available for new projects Q3 2026</span>
            </div>

            {/* Social Media Links: WhatsApp, Facebook, Email, LinkedIn */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.instagram.com/kevorchsbd/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[#E1306C]/10 border-[#E1306C]/30 text-[#E1306C] hover:bg-[#E1306C] hover:text-white shadow-xs"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/918438358405"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61591971660618"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[#1877F2]/10 border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:text-white shadow-xs"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&to=kevorchsbd@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                title="Email"
                className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[#EA4335]/10 border-[#EA4335]/30 text-[#EA4335] hover:bg-[#EA4335] hover:text-white shadow-xs"
              >
                <Mail className="w-4 h-4" />
              </a>


            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className={`font-heading font-semibold text-base tracking-wide ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}>Navigation</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><NavLink to="/" className="hover:text-red-500 transition-colors">Home</NavLink></li>
              <li><NavLink to="/about" className="hover:text-red-500 transition-colors">About</NavLink></li>
              <li><NavLink to="/services" className="hover:text-red-500 transition-colors">Services</NavLink></li>
              <li><NavLink to="/clients" className="hover:text-red-500 transition-colors">Clients</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-red-500 transition-colors">Contact</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Top Services */}
          <div className="flex flex-col gap-4">
            <h4 className={`font-heading font-semibold text-base tracking-wide ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}>Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><NavLink to="/services" className="hover:text-red-500 transition-colors">Search Engine Optimization</NavLink></li>
              <li><NavLink to="/services" className="hover:text-red-500 transition-colors">Google & Meta Ads</NavLink></li>
              <li><NavLink to="/services" className="hover:text-red-500 transition-colors">Custom Web Development</NavLink></li>
              <li><NavLink to="/services" className="hover:text-red-500 transition-colors">Brand Identity Systems</NavLink></li>
              <li><NavLink to="/services" className="hover:text-red-500 transition-colors">UI/UX & Product Design</NavLink></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className={`font-heading font-semibold text-base tracking-wide ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}>Growth Insider</h4>
            <p className="text-xs leading-relaxed">
              Subscribe to get bi-weekly performance marketing breakdowns and SEO teardowns.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-red-500 transition-colors ${
                    isDark
                      ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500'
                      : 'bg-white border-stone-300 text-neutral-900 placeholder-stone-400'
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-red-500 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3 h-3" /> Subscribed successfully!
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} KevorchSBD Agency Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-red-500 transition-colors">Security</a>
          </div>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all group cursor-pointer ${
              isDark
                ? 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:text-white hover:border-red-900'
                : 'bg-white border-stone-200 text-stone-700 hover:text-black hover:border-stone-400'
            }`}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-red-500" />
          </button>
        </div>
      </div>
    </footer>
  );
};
