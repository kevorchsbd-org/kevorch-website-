import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Flame,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ChevronDown,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { FAQS_DATA } from '../data/mockData';
import { MagneticButton } from '../components/MagneticButton';
import { useTheme } from '../context/ThemeContext';

interface IconProps { className?: string }

const WhatsAppIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.228-1.157zm11.391-4.707c-.305-.153-1.805-.89-2.085-.99-.28-.101-.484-.153-.689.153-.204.305-.79 1.018-.968 1.222-.178.204-.356.229-.661.076-.305-.153-1.288-.475-2.453-1.514-.908-.81-1.52-1.81-1.698-2.115-.178-.305-.019-.47.133-.622.137-.137.305-.356.457-.534.153-.178.204-.305.305-.509.102-.204.051-.382-.025-.534-.076-.153-.689-1.658-.945-2.273-.249-.597-.502-.516-.689-.525l-.585-.01c-.204 0-.534.076-.814.382-.28.305-1.07 1.045-1.07 2.549 0 1.504 1.096 2.955 1.248 3.159.153.204 2.158 3.296 5.228 4.622.73.316 1.3.504 1.744.645.733.234 1.399.2 1.926.121.587-.088 1.805-.738 2.06-1.45.254-.712.254-1.323.178-1.45-.076-.127-.28-.203-.585-.356z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);



const InstagramIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    budget: '$15k - $30k/mo',
    selectedServices: [] as string[],
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const availableServices = [
    'Social Media Management',
    'Meta Ads (Facebook & Instagram)',
    'Google Ads & SEO',
    'Graphic Design',
    'Video Editing',
    'Sales Support & Lead Nurturing',
  ];

  const budgetOptions = [
    '< $10k/mo',
    '$10k - $25k/mo',
    '$25k - $50k/mo',
    '$50k+/mo',
  ];

  const handleServiceToggle = (serviceName: string): void => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceName)
        ? prev.selectedServices.filter((s) => s !== serviceName)
        : [...prev.selectedServices, serviceName],
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid work email is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.message.trim()) newErrors.message = 'Please briefly describe your growth goals';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#DE0918', '#FF3B4A', '#690A0F', '#F8F8F8'],
      });
    }, 1500);
  };

  return (
    <div className={`relative min-h-screen pt-32 pb-24 overflow-hidden transition-colors duration-400 ${
      isDark ? 'bg-black text-white' : 'bg-white text-neutral-900'
    }`}>
      {/* Background Red Glows in Dark Mode Only */}
      {isDark && <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />}

      {/* ========================================================================= */}
      {/* 1. CONTACT HERO */}
      {/* ========================================================================= */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border text-xs font-mono ${
            isDark ? 'border-red-900/40 text-red-400' : 'border-stone-300 bg-stone-100 text-stone-800'
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${isDark ? 'text-red-500' : 'text-slate-800'}`} />
          <span>Strategic Inquiry</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight"
        >
          Make Your Mark. <span className={isDark ? "text-transparent bg-clip-text bg-linear-to-r from-red-500 via-rose-500 to-red-800" : "text-slate-950 font-extrabold"}>Engineer Your Growth Strategy</span>
        </motion.h1>

        <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
          Fill out the consultation request below. A senior growth partner will review your current digital footprint and respond within 12 business hours.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 2. FORM & DIRECT DETAILS GRID */}
      {/* ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Details & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className={`rounded-3xl p-8 border space-y-6 transition-all duration-300 relative overflow-hidden ${
              isDark ? 'bg-neutral-950/90 border-neutral-800 shadow-[0_10px_30px_rgba(222,9,24,0.15)]' : 'bg-white border-stone-200 shadow-xl'
            }`}>
              {/* Header with live status */}
              <div className="flex items-center justify-between border-b pb-4 border-neutral-200 dark:border-neutral-800/80">
                <h3 className={`text-2xl font-heading font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Direct Agency Contact
                </h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#DE0918]" />
                  <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider">Available Now</span>
                </div>
              </div>
              
              <div className="space-y-5 text-sm">
                {/* Email Contact Item */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="flex items-center gap-4 group"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isDark ? 'bg-red-600/15 text-red-500 border-red-500/30 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_15px_#DE0918]' : 'bg-stone-100 text-slate-900 border-stone-200 group-hover:bg-slate-900 group-hover:text-white'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono block ${isDark ? 'text-red-400 font-semibold' : 'text-stone-500'}`}>Inquiries & Proposals</span>
                    <a href="mailto:kevorchsbd@gmail.com" className={`font-bold transition-colors block ${isDark ? 'text-white group-hover:text-red-400' : 'text-neutral-900 group-hover:text-red-600'}`}>
                      kevorchsbd@gmail.com
                    </a>
                  </div>
                </motion.div>

                {/* Mobile / WhatsApp Contact Item */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="flex items-center gap-4 group"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isDark ? 'bg-red-600/15 text-red-500 border-red-500/30 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_15px_#DE0918]' : 'bg-stone-100 text-slate-900 border-stone-200 group-hover:bg-slate-900 group-hover:text-white'
                  }`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono block ${isDark ? 'text-red-400 font-semibold' : 'text-stone-500'}`}>Direct Mobile / WhatsApp</span>
                    <a href="tel:+918438358405" className={`font-bold transition-colors block ${isDark ? 'text-white group-hover:text-red-400' : 'text-neutral-900 group-hover:text-red-600'}`}>
                      +91 84383 58405
                    </a>
                  </div>
                </motion.div>

                {/* Response Time Item */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="flex items-center gap-4 group"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isDark ? 'bg-red-600/15 text-red-500 border-red-500/30 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_15px_#DE0918]' : 'bg-stone-100 text-slate-900 border-stone-200 group-hover:bg-slate-900 group-hover:text-white'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono block ${isDark ? 'text-red-400 font-semibold' : 'text-stone-500'}`}>Guaranteed Response Time</span>
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Under 12 Hours</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Media Channels */}
              <div className="pt-5 border-t border-stone-200 dark:border-neutral-800 space-y-4">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                  isDark ? 'text-red-400' : 'text-stone-600'
                }`}>
                  Official Social Channels
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://www.instagram.com/kevorchsbd/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl border font-bold transition-all bg-[#E1306C]/10 border-[#E1306C]/30 text-[#E1306C] hover:bg-[#E1306C] hover:text-white shadow-xs"
                  >
                    <InstagramIcon className="w-4 h-4 fill-current" />
                    <span>Instagram</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://wa.me/918438358405"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl border font-bold transition-all bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white shadow-xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>WhatsApp</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://www.facebook.com/profile.php?id=61591971660618"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl border font-bold transition-all bg-[#1877F2]/10 border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:text-white shadow-xs"
                  >
                    <FacebookIcon className="w-4 h-4 fill-current" />
                    <span>Facebook</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://mail.google.com/mail/?view=cm&to=kevorchsbd@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl border font-bold transition-all bg-[#EA4335]/10 border-[#EA4335]/30 text-[#EA4335] hover:bg-[#EA4335] hover:text-white shadow-xs"
                  >
                    <Mail className="w-4 h-4 stroke-[2.2]" />
                    <span>Email</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className={`rounded-3xl p-8 sm:p-10 border relative overflow-hidden transition-all duration-300 ${
              isDark ? 'bg-neutral-950/90 border-neutral-800 shadow-[0_15px_40px_rgba(222,9,24,0.15)]' : 'bg-white border-stone-200 shadow-2xl'
            }`}>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className={`w-20 h-20 rounded-full border flex items-center justify-center mx-auto shadow-xl ${
                    isDark ? 'bg-red-600/20 border-red-500/40 text-red-500 shadow-red-600/30' : 'bg-red-50 border-red-200 text-red-600'
                  }`}>
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className={`text-3xl font-heading font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Strategy Request Received!
                  </h3>
                  <p className={`text-sm max-w-md mx-auto leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                    Thank you, <strong className={isDark ? 'text-white' : 'text-black'}>{formData.name}</strong>. Our senior growth leads are reviewing <strong className={isDark ? 'text-white' : 'text-black'}>{formData.company}</strong>'s market data and will deliver your custom audit within 12 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        website: '',
                        budget: '$10k - $25k/mo',
                        selectedServices: [],
                        message: '',
                      });
                    }}
                    className={`px-8 py-3 rounded-full text-xs font-mono font-bold transition-all hover:scale-105 ${
                      isDark ? 'bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-800' : 'bg-stone-100 text-stone-800 hover:text-black border border-stone-300'
                    }`}
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className={`border-b pb-5 ${isDark ? 'border-neutral-900' : 'border-stone-200'}`}>
                    <h3 className={`text-2xl font-heading font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Project Consultation Form
                    </h3>
                    <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                      Select your target services and share your growth objectives.
                    </p>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full border rounded-2xl px-4 py-3.5 text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                        } ${errors.name ? 'border-red-600' : ''}`}
                      />
                      {errors.name && <span className="text-[11px] text-red-500 font-mono font-bold">{errors.name}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Work Email *
                      </label>
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full border rounded-2xl px-4 py-3.5 text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                        } ${errors.email ? 'border-red-600' : ''}`}
                      />
                      {errors.email && <span className="text-[11px] text-red-500 font-mono font-bold">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Company & Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Company Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Aurora Capital"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={`w-full border rounded-2xl px-4 py-3.5 text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                        } ${errors.company ? 'border-red-600' : ''}`}
                      />
                      {errors.company && <span className="text-[11px] text-red-500 font-mono font-bold">{errors.company}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Company Website
                      </label>
                      <input
                        type="url"
                        placeholder="https://company.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className={`w-full border rounded-2xl px-4 py-3.5 text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Service Chips Selection */}
                  <div className="space-y-2">
                    <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                      Required Growth Services
                    </label>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {availableServices.map((srv) => {
                        const isSelected = formData.selectedServices.includes(srv);
                        return (
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            type="button"
                            key={srv}
                            onClick={() => handleServiceToggle(srv)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? isDark ? 'bg-red-600 text-white border border-red-500 shadow-[0_0_15px_#DE0918]' : 'bg-red-600 text-white border border-red-600 shadow-md'
                                : isDark
                                  ? 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                                  : 'bg-stone-100 border border-stone-200 text-stone-700 hover:text-black hover:border-stone-300'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{srv}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selection Pills */}
                  <div className="space-y-2">
                    <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                      Estimated Monthly Ad / Growth Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {budgetOptions.map((b) => (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`py-2.5 rounded-2xl text-xs font-mono transition-all cursor-pointer ${
                            formData.budget === b
                              ? isDark ? 'bg-red-600/20 text-red-400 border border-red-500 font-bold shadow-[0_0_12px_rgba(222,9,24,0.3)]' : 'bg-red-600 text-white border border-red-600 font-bold shadow-md'
                              : isDark
                                ? 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                                : 'bg-stone-100 border border-stone-200 text-stone-700 hover:text-black'
                          }`}
                        >
                          {b}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                      Growth Goals & Project Details *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your current CPA, targets, or timelines..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full border rounded-2xl p-4 text-sm focus:outline-none transition-all ${
                        isDark
                          ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                      } ${errors.message ? 'border-red-600' : ''}`}
                    />
                    {errors.message && <span className="text-[11px] text-red-500 font-mono font-bold">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2 font-extrabold">
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                        Transmitting Audit Request...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 font-extrabold">
                        Submit Audit Request <Send className="w-4 h-4" />
                      </span>
                    )}
                  </MagneticButton>

                  <div className={`flex items-center justify-center gap-2 text-[11px] font-mono text-center pt-1 ${
                    isDark ? 'text-neutral-500' : 'text-stone-500'
                  }`}>
                    <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-red-500' : 'text-slate-800'}`} />
                    <span>100% NDA Protection & Zero Spam Guarantee</span>
                  </div>
                </form>
              )}

            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold">
            // Frequently Asked Questions
          </span>
          <h2 className={`text-3xl sm:text-4xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS_DATA.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className={`glass-card rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isDark ? 'border-red-900/30' : 'border-stone-200'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className={`w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base hover:text-red-500 transition-colors cursor-pointer ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-red-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`px-6 pb-6 text-sm leading-relaxed border-t pt-4 ${
                        isDark ? 'text-neutral-400 border-neutral-900' : 'text-stone-600 border-stone-200'
                      }`}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
