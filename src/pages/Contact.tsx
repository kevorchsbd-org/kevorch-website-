import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Flame,
  Mail,
  Phone,
  MapPin,
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Details & Office Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className={`glass-card rounded-3xl p-8 border space-y-6 ${
              isDark ? 'border-red-900/30' : 'border-stone-200 shadow-sm'
            }`}>
              <h3 className={`text-2xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Direct Agency Contact
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${
                    isDark ? 'bg-red-600/20 text-red-500 border-red-500/30' : 'bg-stone-100 text-slate-800 border-stone-200'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono ${isDark ? 'text-red-500' : 'text-stone-600'}`}>Inquiries & Proposals</span>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>kevorchsbd@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${
                    isDark ? 'bg-red-600/20 text-red-500 border-red-500/30' : 'bg-stone-100 text-slate-800 border-stone-200'
                  }`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono ${isDark ? 'text-red-500' : 'text-stone-600'}`}>Direct Mobile / WhatsApp</span>
                    <a href="tel:+918438358405" className={`font-semibold block hover:underline ${isDark ? 'text-white' : 'text-neutral-900'}`}>+91 84383 58405</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${
                    isDark ? 'bg-red-600/20 text-red-500 border-red-500/30' : 'bg-stone-100 text-slate-800 border-stone-200'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono ${isDark ? 'text-red-500' : 'text-stone-600'}`}>Guaranteed Response Time</span>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Under 12 Hours</p>
                  </div>
                </div>
              </div>

              {/* Social Media Channels: WhatsApp, Facebook, Email, LinkedIn */}
              <div className="pt-4 border-t border-stone-200 dark:border-neutral-800 space-y-3">
                <span className={`text-xs font-mono font-semibold uppercase tracking-wider block ${
                  isDark ? 'text-red-500' : 'text-stone-600'
                }`}>
                  Official Social Channels
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <a
                    href="https://www.instagram.com/kevorchsbd/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl border transition-all hover:scale-[1.02] bg-[#E1306C]/10 border-[#E1306C]/30 text-[#E1306C] hover:bg-[#E1306C] hover:text-white font-semibold"
                  >
                    <InstagramIcon className="w-4 h-4 fill-current" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl border transition-all hover:scale-[1.02] bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white font-semibold"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61591971660618"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl border transition-all hover:scale-[1.02] bg-[#1877F2]/10 border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:text-white font-semibold"
                  >
                    <FacebookIcon className="w-4 h-4 fill-current" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://mail.google.com/mail/?view=cm&to=kevorchsbd@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl border transition-all hover:scale-[1.02] bg-[#EA4335]/10 border-[#EA4335]/30 text-[#EA4335] hover:bg-[#EA4335] hover:text-white font-semibold"
                  >
                    <Mail className="w-4 h-4 stroke-[2.2]" />
                    <span>Email</span>
                  </a>


                </div>
              </div>
            </div>



            {/* Embedded Simulated Interactive Map Visual */}
            <div className={`glass-card rounded-3xl p-4 border relative overflow-hidden h-48 flex items-center justify-center ${
              isDark ? 'border-red-900/30' : 'border-stone-200'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Global Map View"
                className="absolute inset-0 w-full h-full object-cover opacity-25"
              />
              <div className="relative z-10 text-center space-y-1">
                <MapPin className={`w-8 h-8 mx-auto animate-bounce ${isDark ? 'text-red-500' : 'text-slate-900'}`} />
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                  isDark ? 'bg-black/90 text-white border-red-900/40' : 'bg-white/90 text-neutral-900 border-stone-200 shadow-xs'
                }`}>
                  Global Remote & Physical Hubs
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className={`glass-card rounded-3xl p-8 sm:p-10 border relative overflow-hidden shadow-2xl ${
              isDark ? 'border-red-900/40' : 'border-stone-200 shadow-xl'
            }`}>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className={`w-20 h-20 rounded-full border flex items-center justify-center mx-auto ${
                    isDark ? 'bg-red-600/20 border-red-500/40 text-red-500' : 'bg-stone-100 border-stone-300 text-slate-900'
                  }`}>
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className={`text-3xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
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
                        budget: '$15k - $30k/mo',
                        selectedServices: [],
                        message: '',
                      });
                    }}
                    className={`px-6 py-2.5 rounded-full text-xs font-mono transition-colors ${
                      isDark ? 'bg-neutral-900 text-neutral-300 hover:text-white' : 'bg-stone-100 text-stone-700 hover:text-black'
                    }`}
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className={`border-b pb-4 ${isDark ? 'border-neutral-900' : 'border-stone-200'}`}>
                    <h3 className={`text-2xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Project Consultation Form
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                      Select services and share your quarterly growth targets.
                    </p>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-mono uppercase ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none ${
                          isDark
                            ? 'bg-black border-neutral-900 text-white placeholder-neutral-600 focus:border-red-500'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-slate-900'
                        } ${errors.name ? 'border-red-600' : ''}`}
                      />
                      {errors.name && <span className="text-[11px] text-red-500 font-mono">{errors.name}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className={`text-xs font-mono uppercase ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Work Email *
                      </label>
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none ${
                          isDark
                            ? 'bg-black border-neutral-900 text-white placeholder-neutral-600 focus:border-red-500'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-slate-900'
                        } ${errors.email ? 'border-red-600' : ''}`}
                      />
                      {errors.email && <span className="text-[11px] text-red-500 font-mono">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Company & Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-mono uppercase ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Company Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Aurora Capital"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none ${
                          isDark
                            ? 'bg-black border-neutral-900 text-white placeholder-neutral-600 focus:border-red-500'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-slate-900'
                        } ${errors.company ? 'border-red-600' : ''}`}
                      />
                      {errors.company && <span className="text-[11px] text-red-500 font-mono">{errors.company}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className={`text-xs font-mono uppercase ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Company Website
                      </label>
                      <input
                        type="url"
                        placeholder="https://company.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none ${
                          isDark
                            ? 'bg-black border-neutral-900 text-white placeholder-neutral-600 focus:border-red-500'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Service Chips Selection */}
                  <div className="space-y-2">
                    <label className={`text-xs font-mono uppercase ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                      Required Growth Services
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {availableServices.map((srv) => {
                        const isSelected = formData.selectedServices.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => handleServiceToggle(srv)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                              isSelected
                                ? isDark ? 'bg-red-600 text-white border border-red-500' : 'bg-slate-950 text-white border border-slate-950'
                                : isDark
                                  ? 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                                  : 'bg-stone-100 border border-stone-200 text-stone-600 hover:text-black'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selection Pills */}
                  <div className="space-y-2">
                    <label className={`text-xs font-mono uppercase ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                      Estimated Monthly Ad / Growth Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                            formData.budget === b
                              ? isDark ? 'bg-red-600/20 text-red-500 border border-red-500 font-bold' : 'bg-slate-950 text-white border border-slate-950 font-bold'
                              : isDark
                                ? 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                                : 'bg-stone-100 border border-stone-200 text-stone-600 hover:text-black'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className={`text-xs font-mono uppercase ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                      Growth Goals & Project Details *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your current CPA, targets, or timelines..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full border rounded-xl p-4 text-sm focus:outline-none ${
                        isDark
                          ? 'bg-black border-neutral-900 text-white placeholder-neutral-600 focus:border-red-500'
                          : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-slate-900'
                      } ${errors.message ? 'border-red-600' : ''}`}
                    />
                    {errors.message && <span className="text-[11px] text-red-500 font-mono">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                        Transmitting Audit Request...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Submit Audit Request <Send className="w-4 h-4" />
                      </span>
                    )}
                  </MagneticButton>

                  <div className={`flex items-center justify-center gap-2 text-[11px] font-mono text-center ${
                    isDark ? 'text-neutral-500' : 'text-stone-500'
                  }`}>
                    <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-red-500' : 'text-slate-800'}`} />
                    <span>100% NDA Protection & Zero Spam Guarantee</span>
                  </div>
                </form>
              )}

            </div>
          </div>

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
