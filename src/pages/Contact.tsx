import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Flame,
  Mail,
  Phone,
  CheckCircle2,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { FAQS_DATA } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';
import { createLead } from '../services/leads';

interface IconProps { className?: string }

const WhatsAppIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 2.152.68 4.144 1.838 5.776L2.5 21.5l3.864-1.282A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.472 12.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"
      fill="currentColor"
    />
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      fill="currentColor"
    />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="contact-insta-clean" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      fill="currentColor"
    />
  </svg>
);

const GmailIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
  </svg>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    budget: 'Under ₹50K',
    selectedServices: [] as string[],
    customService: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const availableServices = [
    'Social Media',
    'Meta Ads',
    'Google Ads',
    'Graphic Design',
    'Video Editing',
    'Sales Support',
    'Website Development',
    'App Development',
    'SEO & Content Strategy',
    'UI/UX Design',
    'Branding & Identity',
    'Others',
  ];

  const budgetOptions = [
    'Under ₹50K',
    '₹50K–₹1L',
    '₹1L–₹3L',
    '₹3L+',
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
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.message.trim()) newErrors.message = 'Please briefly describe your growth goals';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await createLead({
        fullName: formData.name,
        email: formData.email,
        mobile: formData.phone,
        companyName: formData.company,
        website: formData.website,
        services: formData.selectedServices,
        customService: formData.customService,
        budget: formData.budget,
        goals: formData.message,
      });
    } catch (err) {
      console.error('Firestore submission warning (proceeding with local user feedback):', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#DE0918', '#FF3B4A', '#690A0F', '#F8F8F8'],
      });
    }
  };

  return (
    <div className={`relative min-h-screen pt-32 pb-24 overflow-hidden transition-colors duration-400 ${
      isDark ? 'bg-black text-white' : 'bg-white text-neutral-900'
    }`}>
      <SEO
        title="Contact Kevorch SBD Marketing & Development | Strategy Consultation"
        description="Get in touch with Kevorch SBD Marketing & Development. Book a strategy consultation for Meta Ads, Google Ads & SEO, or custom visual media production."
        canonical="/contact"
        structuredData={[
          {
            "@type": "ContactPage",
            "@id": "https://kevorch.online/contact#webpage",
            "url": "https://kevorch.online/contact",
            "name": "Contact Kevorch SBD Marketing & Development",
            "description": "Book a digital marketing strategy consultation with Kevorch SBD Marketing & Development.",
            "isPartOf": {
              "@id": "https://kevorch.online/#website"
            }
          },
          {
            "@type": "FAQPage",
            "@id": "https://kevorch.online/contact#faq",
            "mainEntity": FAQS_DATA.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]}
      />
      {/* Background Red Glows in Dark Mode Only */}
      {isDark && <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />}

      {/* ========================================================================= */}
      {/* 1. CONTACT HERO */}
      {/* ========================================================================= */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold uppercase tracking-widest bg-red-500/10 border-red-500/30 text-[#DE0918]"
        >
          <Flame className="w-3.5 h-3.5 text-[#DE0918]" />
          <span>LET'S TALK</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight"
        >
          Make Your Mark. <span className={isDark ? "text-transparent bg-clip-text bg-linear-to-r from-red-500 via-rose-500 to-red-800" : "text-slate-950 font-extrabold"}>Engineer Your Growth Strategy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}
        >
          Fill out the consultation request below. A senior growth partner will review your current digital footprint and respond within 12 business hours.
        </motion.p>
      </section>

      {/* ========================================================================= */}
      {/* 2. SPLIT EDITORIAL CONTACT & CONSULTATION FLOW */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE — AGENCY CONTACT AREA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-10"
          >
            {/* Header Block */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DE0918]">
                  LET'S TALK
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10B981]" />
                  <span className="text-[11px] font-mono font-bold text-emerald-500 uppercase tracking-wider">Available Now</span>
                </div>
              </div>
              <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Start a Conversation.
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                Have a project in mind? Tell us what you need and let's build something that works.
              </p>
            </div>

            {/* Clean Horizontal Contact Rows */}
            <div className={`border-t border-b divide-y ${isDark ? 'border-neutral-800/80 divide-neutral-800/80' : 'border-stone-200 divide-stone-200'}`}>
              
              {/* EMAIL */}
              <a
                href="mailto:kevorchsbd@gmail.com"
                className="py-5 flex items-center justify-between group cursor-pointer transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-neutral-400 block font-bold">
                    EMAIL
                  </span>
                  <span
                    className={`text-base sm:text-lg font-bold transition-colors block ${
                      isDark ? 'text-white group-hover:text-[#DE0918]' : 'text-neutral-900 group-hover:text-[#DE0918]'
                    }`}
                  >
                    kevorchsbd@gmail.com
                  </span>
                </div>
                <Mail className={`w-5 h-5 shrink-0 transition-all duration-300 group-hover:translate-x-1 ${isDark ? 'text-neutral-500 group-hover:text-[#DE0918]' : 'text-stone-400 group-hover:text-[#DE0918]'}`} />
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/918681838373"
                target="_blank"
                rel="noopener noreferrer"
                className="py-5 flex items-center justify-between group cursor-pointer transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-neutral-400 block font-bold">
                    WHATSAPP
                  </span>
                  <span
                    className={`text-base sm:text-lg font-bold transition-colors block ${
                      isDark ? 'text-white group-hover:text-[#DE0918]' : 'text-neutral-900 group-hover:text-[#DE0918]'
                    }`}
                  >
                    +91 86818 38373
                  </span>
                </div>
                <Phone className={`w-5 h-5 shrink-0 transition-all duration-300 group-hover:translate-x-1 ${isDark ? 'text-neutral-500 group-hover:text-[#DE0918]' : 'text-stone-400 group-hover:text-[#DE0918]'}`} />
              </a>

              {/* RESPONSE TIME */}
              <div className="py-5 flex items-center justify-between group">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 dark:text-neutral-400 block font-bold">
                    RESPONSE TIME
                  </span>
                  <p className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Under 12 Hours
                  </p>
                </div>
                <Clock className={`w-5 h-5 shrink-0 ${isDark ? 'text-neutral-500' : 'text-stone-400'}`} />
              </div>

            </div>

            {/* Official Social Channels */}
            <div className="space-y-3 pt-2">
              <span className={`text-[11px] font-mono uppercase tracking-widest font-bold block ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                OFFICIAL CHANNELS
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                <a
                  href="https://www.instagram.com/kevorchsbd/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
                    isDark
                      ? 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white hover:border-[#DE0918]'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:text-black hover:border-[#DE0918]'
                  }`}
                >
                  <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://wa.me/918681838373"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
                    isDark
                      ? 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white hover:border-[#DE0918]'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:text-black hover:border-[#DE0918]'
                  }`}
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61591971660618"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
                    isDark
                      ? 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white hover:border-[#DE0918]'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:text-black hover:border-[#DE0918]'
                  }`}
                >
                  <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&to=kevorchsbd@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
                    isDark
                      ? 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white hover:border-[#DE0918]'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:text-black hover:border-[#DE0918]'
                  }`}
                >
                  <GmailIcon className="w-4 h-4 text-[#EA4335]" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE — 5-STEP CONSULTATION FORM */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-10 rounded-3xl border text-center space-y-6 ${
                  isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'
                }`}
              >
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto shadow-xl ${
                  isDark ? 'bg-[#DE0918]/20 border-[#DE0918]/40 text-[#DE0918] shadow-red-600/30' : 'bg-red-50 border-red-200 text-[#DE0918]'
                }`}>
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Strategy Request Received!
                </h3>
                <p className={`text-sm max-w-md mx-auto leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                  Thank you, <strong className={isDark ? 'text-white' : 'text-black'}>{formData.name}</strong>. Our growth team is analyzing <strong className={isDark ? 'text-white' : 'text-black'}>{formData.company}</strong>'s details and will get back to you within 12 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      website: '',
                      budget: 'Under ₹50K',
                      selectedServices: [],
                      customService: '',
                      message: '',
                    });
                  }}
                  className={`px-8 py-3 rounded-full text-xs font-semibold transition-all hover:scale-105 cursor-pointer ${
                    isDark ? 'bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-800' : 'bg-stone-100 text-stone-800 hover:text-black border border-stone-300'
                  }`}
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Consultation Header */}
                <div className="space-y-2 border-b pb-6 border-stone-200 dark:border-neutral-800/80">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DE0918] block">
                    PROJECT CONSULTATION
                  </span>
                  <h3 className={`text-2xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Let's understand your project.
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                    Share a few details and we'll help you find the right next step.
                  </p>
                </div>

                {/* STEP 01: ABOUT YOU */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-extrabold text-[#DE0918]">01</span>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-500 dark:text-neutral-400">
                      / ABOUT YOU
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-500 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                        } ${errors.name ? 'border-[#DE0918]' : ''}`}
                      />
                      {errors.name && <span className="text-xs text-[#DE0918] font-medium block mt-0.5">{errors.name}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Work Email *
                      </label>
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-500 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                        } ${errors.email ? 'border-[#DE0918]' : ''}`}
                      />
                      {errors.email && <span className="text-xs text-[#DE0918] font-medium block mt-0.5">{errors.email}</span>}
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className={`text-xs font-semibold ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-500 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                        } ${errors.phone ? 'border-[#DE0918]' : ''}`}
                      />
                      {errors.phone && <span className="text-xs text-[#DE0918] font-medium block mt-0.5">{errors.phone}</span>}
                    </div>
                  </div>
                </div>

                {/* STEP 02: YOUR BUSINESS */}
                <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-extrabold text-[#DE0918]">02</span>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-500 dark:text-neutral-400">
                      / YOUR BUSINESS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Company Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Aurora Capital"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-500 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                        } ${errors.company ? 'border-[#DE0918]' : ''}`}
                      />
                      {errors.company && <span className="text-xs text-[#DE0918] font-medium block mt-0.5">{errors.company}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                        Company Website (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://company.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-500 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 03: WHAT DO YOU NEED? */}
                <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-extrabold text-[#DE0918]">03</span>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-500 dark:text-neutral-400">
                      / WHAT DO YOU NEED?
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {availableServices.map((srv) => {
                      const isSelected = formData.selectedServices.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => handleServiceToggle(srv)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-[#DE0918] text-white border-[#DE0918] font-bold shadow-md shadow-[#DE0918]/20 scale-102'
                              : isDark
                                ? 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                                : 'bg-[#F7F7F5] border-[#E7E5E4] text-stone-800 hover:border-stone-300 hover:text-black'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{srv}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Service Input when "Others" is selected */}
                  {formData.selectedServices.includes('Others') && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="pt-2"
                    >
                      <input
                        type="text"
                        placeholder="Please specify your custom service requirement..."
                        value={formData.customService}
                        onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-500 focus:border-[#DE0918]'
                            : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-[#DE0918]'
                        }`}
                      />
                    </motion.div>
                  )}
                </div>

                {/* STEP 04: MONTHLY GROWTH BUDGET */}
                <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-extrabold text-[#DE0918]">04</span>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-500 dark:text-neutral-400">
                      / MONTHLY GROWTH BUDGET
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {budgetOptions.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer border ${
                          formData.budget === b
                            ? 'bg-[#DE0918] text-white border-[#DE0918] font-bold shadow-md shadow-[#DE0918]/20'
                            : isDark
                              ? 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                              : 'bg-[#F7F7F5] border-[#E7E5E4] text-stone-800 hover:border-stone-300 hover:text-black'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STEP 05: YOUR GOAL */}
                <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-extrabold text-[#DE0918]">05</span>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-500 dark:text-neutral-400">
                      / YOUR GOAL
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <textarea
                      rows={4}
                      placeholder="Tell us about your business, current challenge, goals, and timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full border rounded-2xl p-4 text-sm leading-relaxed focus:outline-none transition-all ${
                        isDark
                          ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder-neutral-500 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                          : 'bg-stone-50 border-stone-300 text-neutral-900 placeholder-stone-400 focus:border-[#DE0918] focus:ring-1 focus:ring-[#DE0918]/20'
                      } ${errors.message ? 'border-[#DE0918]' : ''}`}
                    />
                    {errors.message && <span className="text-xs text-[#DE0918] font-medium block mt-0.5">{errors.message}</span>}
                  </div>
                </div>

                {/* CTA AREA */}
                <div className="space-y-3 pt-6 border-t border-stone-200 dark:border-neutral-800/80">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl text-base font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                      isDark
                        ? 'bg-white text-neutral-950 hover:bg-[#DE0918] hover:text-white shadow-white/10 hover:shadow-[#DE0918]/30'
                        : 'bg-neutral-900 text-white hover:bg-[#DE0918] shadow-neutral-900/10 hover:shadow-[#DE0918]/30'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                        Processing...
                      </span>
                    ) : (
                      <span>Get Free Consultation →</span>
                    )}
                  </button>

                  <p className={`text-xs text-center font-medium ${isDark ? 'text-neutral-500' : 'text-stone-500'}`}>
                    🔒 Your information is private. No spam.
                  </p>
                </div>
              </form>
            )}
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
