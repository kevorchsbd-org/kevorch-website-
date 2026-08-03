import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Target,
  Share2,
  Star,
  Play,
  MessageSquare,
  Palette,
  Video,
  Headphones,
  Search,
  Globe,
  Code2,
  Zap,
} from 'lucide-react';

import { MagneticButton } from '../components/MagneticButton';
import { Marquee } from '../components/Marquee';
import { CLIENT_LOGOS, SERVICES_DATA, CASE_STUDIES, TESTIMONIALS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import bgLightVideo from '../assets/bglight1.mp4';
import bgDarkVideo from '../assets/bgdark1.mp4';
interface IconProps { className?: string }

const InstagramIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const FigmaIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm0-6C12 4.343 10.657 3 9 3S6 4.343 6 6s1.343 3 3 3 3-1.343 3-3zm6 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm0 6c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm-6 6c0 1.657-1.343 3-3 3a3 3 0 0 1-3-3v-3h6v3z"/>
  </svg>
);

const PhotoshopIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <span className={`${className} inline-flex items-center justify-center font-extrabold text-[11px] leading-none tracking-tighter`}>Ps</span>
);

const IllustratorIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <span className={`${className} inline-flex items-center justify-center font-extrabold text-[11px] leading-none tracking-tighter`}>Ai</span>
);

const AdobeXdIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <span className={`${className} inline-flex items-center justify-center font-extrabold text-[11px] leading-none tracking-tighter`}>Xd</span>
);

const PremiereIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <span className={`${className} inline-flex items-center justify-center font-extrabold text-[11px] leading-none tracking-tighter`}>Pr</span>
);

const CapCutIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <span className={`${className} inline-flex items-center justify-center font-extrabold text-[10px] leading-none tracking-tighter`}>CC</span>
);

const DaVinciIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <span className={`${className} inline-flex items-center justify-center font-extrabold text-[10px] leading-none tracking-tighter`}>Dv</span>
);

const AfterEffectsIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <span className={`${className} inline-flex items-center justify-center font-extrabold text-[11px] leading-none tracking-tighter`}>Ae</span>
);

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Typewriter effect state
  const targetText = "Make Your Mark.";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let index = 0;
    setTypedText("");
    const typeInterval = setInterval(() => {
      if (index < targetText.length) {
        setTypedText(targetText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 110);

    return () => clearInterval(typeInterval);
  }, []);



  return (
    <div className={`relative min-h-screen transition-colors duration-400 overflow-hidden ${
      isDark ? 'bg-black text-white' : 'bg-white text-neutral-900'
    }`}>
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
        {/* Background Video in Light Mode & Dark Mode */}
        <video
          key={isDark ? 'dark-hero-video' : 'light-hero-video'}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-0 ${
            isDark ? 'opacity-40 mix-blend-screen' : 'opacity-50'
          }`}
        >
          <source src={isDark ? bgDarkVideo : bgLightVideo} type="video/mp4" />
        </video>

        {/* Optional Crimson Glow Overlay in Dark Mode */}
        {isDark && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-hero-glow blur-3xl pointer-events-none opacity-40 z-0" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left">
          <div className="space-y-8">
            


            {/* Large Statement Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading font-extrabold tracking-tight space-y-4"
            >
              {/* Single Line Typewriter Animated Title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black flex items-center justify-start tracking-tight min-h-[1.2em]"
              >
                <span className={isDark ? "text-transparent bg-clip-text bg-linear-to-r from-red-500 via-rose-500 to-red-700 drop-shadow-[0_0_25px_rgba(222,9,24,0.4)] font-black" : "text-red-600 font-black"}>
                  {typedText}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block w-1.5 h-9 sm:h-14 bg-red-500 rounded-full ml-1 sm:ml-2 shadow-[0_0_12px_#DE0918]"
                />
              </motion.div>

              {/* Sub-headline on Next Line in slightly smaller size */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className={`text-2xl sm:text-4xl lg:text-4xl font-extrabold leading-tight block max-w-3xl ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}
              >
                Transform Your Brand With <span className={isDark ? 'text-red-400 font-black' : 'text-red-600 font-black'}>Strategic Performance Marketing.</span>
              </motion.div>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base sm:text-lg max-w-2xl leading-relaxed font-sans ${
                isDark ? 'text-neutral-400' : 'text-stone-600'
              }`}
            >
              We help growing businesses build modern digital experiences, scale search engine visibility, and run high-converting search & social ad campaigns.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-start gap-4"
            >
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => navigate('/contact')}
              >
                Get Started <ArrowRight className="w-5 h-5 ml-1" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                size="lg"
                onClick={() => navigate('/clients')}
              >
                View Our Work <Play className="w-4 h-4 ml-1 fill-current" />
              </MagneticButton>
            </motion.div>


          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CLIENT SHOWCASE SECTION */}
      {/* ========================================================================= */}
      <section className={`py-10 border-y transition-colors ${
        isDark ? 'bg-neutral-950 border-neutral-800/80' : 'bg-stone-50 border-stone-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className={`text-xs font-mono tracking-widest uppercase font-semibold ${
            isDark ? 'text-red-500' : 'text-stone-700'
          }`}>
            Trusted By Market Leaders
          </span>
        </div>
        <Marquee items={CLIENT_LOGOS} speed={25} />
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY CHOOSE US / AGENCY OVERVIEW */}
      {/* ========================================================================= */}
      <section className={`py-24 transition-colors ${isDark ? 'bg-neutral-950' : 'bg-stone-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${isDark ? 'text-red-500' : 'text-stone-600'}`}>
              // Why Choose Us
            </span>
            <h2 className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold leading-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Built for <span className="text-red-500">results,</span> not excuses.
            </h2>
            <p className={`mt-4 text-base max-w-xl mx-auto leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
              We work directly with founders and marketing leads — no layers, no delays, just measurable growth.
            </p>
          </motion.div>

          {/* Feature cards grid - Clean Animated Cards without description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              { icon: '🎯', title: 'Direct Partnership', badge: 'High Impact' },
              { icon: '📈', title: 'ROI-First Mindset', badge: 'Revenue Driven' },
              { icon: '⚡', title: 'Fast Execution', badge: '24-48h Delivery' },
              { icon: '🔍', title: 'Technical Meta', badge: 'High Precision' },
              { icon: '💻', title: 'Modern Web Dev', badge: 'Ultra Fast' },
              { icon: '📊', title: 'Transparent Reporting', badge: 'Real-time' },
            ].map(({ icon, title, badge }) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 25, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -8, scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative rounded-2xl p-6 border overflow-hidden cursor-default transition-all duration-300 ${
                  isDark
                    ? 'bg-neutral-950/80 border-neutral-800/80 hover:border-red-600/70 hover:shadow-[0_10px_30px_rgba(222,9,24,0.25)]'
                    : 'bg-white border-stone-200 hover:border-red-400 hover:shadow-xl'
                }`}
              >
                {/* Glow backdrop on hover */}
                {isDark && (
                  <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-red-600/0 via-red-600/10 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className={`text-3xl p-3 rounded-2xl border transition-colors ${
                        isDark
                          ? 'bg-neutral-900 border-neutral-800 group-hover:border-red-800/60 group-hover:bg-red-950/30'
                          : 'bg-stone-100 border-stone-200 group-hover:bg-red-50'
                      }`}
                    >
                      {icon}
                    </motion.div>
                    <div>
                      <h3 className={`text-base font-heading font-extrabold transition-colors ${
                        isDark ? 'text-white group-hover:text-red-400' : 'text-neutral-900 group-hover:text-red-600'
                      }`}>
                        {title}
                      </h3>
                      <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold block mt-0.5 ${
                        isDark ? 'text-neutral-500 group-hover:text-red-500' : 'text-stone-400 group-hover:text-red-600'
                      }`}>
                        {badge}
                      </span>
                    </div>
                  </div>

                  <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isDark ? 'bg-neutral-800 group-hover:bg-red-500 group-hover:shadow-[0_0_10px_#DE0918]' : 'bg-stone-300 group-hover:bg-red-600'
                  }`} />
                </div>

                {/* Animated progress bar bottom line */}
                <div className="mt-5 h-1 w-full rounded-full overflow-hidden bg-neutral-900/40">
                  <motion.div
                    className="h-full rounded-full bg-linear-to-r from-red-600 to-rose-500 w-0 group-hover:w-full transition-all duration-500 ease-out"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border rounded-2xl px-8 py-6 transition-colors"
            style={{
              borderColor: isDark ? 'rgba(63,63,70,0.6)' : 'rgb(228,228,231)',
              background: isDark ? 'rgba(10,10,10,0.8)' : 'rgba(255,255,255,0.9)',
            }}
          >
            <div>
              <p className={`text-sm font-mono font-semibold uppercase tracking-wider ${isDark ? 'text-red-500' : 'text-stone-600'}`}>Client Satisfaction</p>
              <div className="flex items-end gap-4 mt-1">
                <span className={`text-4xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-neutral-900'}`}>98%</span>
                <span className={`text-4xl font-extrabold font-heading ${isDark ? 'text-red-500' : 'text-red-600'}`}>100+</span>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-stone-500'}`}>satisfaction · successful campaigns</p>
            </div>
            <NavLink
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm bg-red-600 hover:bg-red-500 text-white transition-colors duration-200 group shrink-0"
            >
              Meet Our Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SERVICES SECTION */}
      {/* ========================================================================= */}
      <section className={`py-24 border-y transition-colors ${
        isDark ? 'bg-neutral-950 border-neutral-800/80' : 'bg-stone-50 border-stone-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${
              isDark ? 'text-red-500' : 'text-stone-700'
            }`}>
              // Our Services
            </span>
            <h2 className={`text-3xl sm:text-4xl font-heading font-bold ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}>
              Comprehensive Growth Solutions
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SERVICES_DATA.slice(0, 6).map((service) => {
              const getHomeServiceIcon = (id: string) => {
                const iconClass = "w-5 h-5 transition-transform duration-300 group-hover:scale-110";
                switch (id) {
                  case 'smm': return <MessageSquare className={iconClass} />;
                  case 'meta-ads': return <Share2 className={iconClass} />;
                  case 'google-ads': return <Target className={iconClass} />;
                  case 'graphic-design': return <Palette className={iconClass} />;
                  case 'video-editing': return <Video className={iconClass} />;
                  case 'sales-support': return <Headphones className={iconClass} />;
                  default: return <Sparkles className={iconClass} />;
                }
              };

              const getHomeServiceRelativeIcons = (id: string) => {
                const iconClass = "w-4 h-4 transition-transform group-hover:scale-110";
                switch (id) {
                  case 'smm':
                    return [
                      { name: 'Instagram', node: <InstagramIcon className="w-4 h-4 fill-current text-[#E1306C]" />, bg: 'bg-[#E1306C]/15 border-[#E1306C]/30 text-[#E1306C]' },
                      { name: 'Facebook', node: <FacebookIcon className="w-4 h-4 fill-current text-[#1877F2]" />, bg: 'bg-[#1877F2]/15 border-[#1877F2]/30 text-[#1877F2]' },
                      { name: 'Community', node: <MessageSquare className={`${iconClass} text-amber-500`} />, bg: 'bg-amber-500/15 border-amber-500/30 text-amber-500' },
                      { name: 'Publishing', node: <Share2 className={`${iconClass} text-emerald-500`} />, bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500' },
                    ];
                  case 'meta-ads':
                    return [
                      { name: 'Facebook', node: <FacebookIcon className="w-4 h-4 fill-current text-[#1877F2]" />, bg: 'bg-[#1877F2]/15 border-[#1877F2]/30 text-[#1877F2]' },
                      { name: 'Instagram', node: <InstagramIcon className="w-4 h-4 fill-current text-[#E1306C]" />, bg: 'bg-[#E1306C]/15 border-[#E1306C]/30 text-[#E1306C]' },
                      { name: 'Targeting', node: <Target className={`${iconClass} text-red-500`} />, bg: 'bg-red-500/15 border-red-500/30 text-red-500' },
                      { name: 'Ad Scale', node: <Zap className={`${iconClass} text-yellow-400`} />, bg: 'bg-yellow-400/15 border-yellow-400/30 text-yellow-400' },
                    ];
                  case 'google-ads':
                    return [
                      { name: 'Search Ads', node: <Search className={`${iconClass} text-yellow-500`} />, bg: 'bg-yellow-500/15 border-yellow-500/30 text-yellow-500' },
                      { name: 'SEO Globe', node: <Globe className={`${iconClass} text-blue-400`} />, bg: 'bg-blue-400/15 border-blue-400/30 text-blue-400' },
                      { name: 'Bidding', node: <Target className={`${iconClass} text-red-500`} />, bg: 'bg-red-500/15 border-red-500/30 text-red-500' },
                      { name: 'Technical', node: <Code2 className={`${iconClass} text-emerald-500`} />, bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500' },
                    ];
                  case 'graphic-design':
                    return [
                      { name: 'Figma', node: <FigmaIcon className="w-4 h-4 text-purple-400" />, bg: 'bg-purple-500/15 border-purple-500/30 text-purple-400' },
                      { name: 'Photoshop', node: <PhotoshopIcon className="w-4 h-4 text-blue-400 font-extrabold" />, bg: 'bg-blue-500/15 border-blue-500/30 text-blue-400' },
                      { name: 'Illustrator', node: <IllustratorIcon className="w-4 h-4 text-amber-500 font-extrabold" />, bg: 'bg-amber-500/15 border-amber-500/30 text-amber-500' },
                      { name: 'Adobe XD', node: <AdobeXdIcon className="w-4 h-4 text-pink-500 font-extrabold" />, bg: 'bg-pink-500/15 border-pink-500/30 text-pink-500' },
                    ];
                  case 'video-editing':
                    return [
                      { name: 'Premiere Pro', node: <PremiereIcon className="w-4 h-4 text-purple-400 font-extrabold" />, bg: 'bg-purple-500/15 border-purple-500/30 text-purple-400' },
                      { name: 'CapCut Pro', node: <CapCutIcon className="w-4 h-4 text-cyan-400 font-extrabold" />, bg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400' },
                      { name: 'DaVinci', node: <DaVinciIcon className="w-4 h-4 text-amber-500 font-extrabold" />, bg: 'bg-amber-500/15 border-amber-500/30 text-amber-500' },
                      { name: 'After Effects', node: <AfterEffectsIcon className="w-4 h-4 text-indigo-400 font-extrabold" />, bg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400' },
                    ];
                  case 'sales-support':
                    return [
                      { name: 'Headset', node: <Headphones className={`${iconClass} text-blue-500`} />, bg: 'bg-blue-500/15 border-blue-500/30 text-blue-500' },
                      { name: 'CRM Chat', node: <MessageSquare className={`${iconClass} text-emerald-500`} />, bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500' },
                      { name: 'Leads', node: <Target className={`${iconClass} text-red-500`} />, bg: 'bg-red-500/15 border-red-500/30 text-red-500' },
                      { name: 'Nurture', node: <Zap className={`${iconClass} text-amber-500`} />, bg: 'bg-amber-500/15 border-amber-500/30 text-amber-500' },
                    ];
                  default:
                    return [
                      { name: 'Sparkles', node: <Sparkles className={`${iconClass} text-red-500`} />, bg: 'bg-red-500/15 border-red-500/30 text-red-500' },
                    ];
                }
              };

              const relativeIcons = getHomeServiceRelativeIcons(service.id);

              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="perspective-[1000px] group min-h-[260px]"
                >
                  <div className="relative w-full h-full transition-transform duration-700 transform-3d group-hover:transform-[rotateY(180deg)]">
                    
                    {/* FRONT SIDE */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl p-7 border transition-all flex flex-col justify-between space-y-4 ${
                      isDark
                        ? 'bg-neutral-900/80 border-neutral-800 group-hover:border-red-500/60 shadow-sm'
                        : 'bg-white border-stone-200 group-hover:border-red-300 shadow-sm'
                    }`}>
                      <div className="space-y-4">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 ${
                          isDark
                            ? 'bg-red-600/15 border-red-500/30 text-red-500'
                            : 'bg-stone-100 border-stone-200 text-slate-900'
                        }`}>
                          {getHomeServiceIcon(service.id)}
                        </div>

                        <h3 className={`text-xl font-heading font-extrabold ${
                          isDark ? 'text-white' : 'text-neutral-900'
                        }`}>
                          {service.title}
                        </h3>

                        <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                          {service.shortDescription}
                        </p>
                      </div>

                      <span className="text-xs font-mono font-bold text-red-500 tracking-wider uppercase block">
                        Hover to View Features →
                      </span>
                    </div>

                    {/* BACK SIDE (3D Rotated 180deg) */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden transform-[rotateY(180deg)] rounded-3xl p-6 text-center flex flex-col justify-between border ${
                      isDark
                        ? 'bg-neutral-950 border-red-600/60 text-white shadow-[0_0_25px_rgba(222,9,24,0.3)]'
                        : 'bg-slate-950 text-white border-red-500 shadow-xl'
                    }`}>
                      <div>
                        <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest block mb-1">
                          Service Features
                        </span>
                        <h4 className="text-lg font-heading font-extrabold text-white mb-4">
                          {service.title}
                        </h4>

                        {/* Relative Icons Display Grid */}
                        <div className="grid grid-cols-2 gap-2.5 py-2">
                          {relativeIcons.map((item, idx) => (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1 ${item.bg}`}
                            >
                              {item.node}
                              <span className="text-xs font-mono font-bold line-clamp-1">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-800">
                        <span className="text-xs font-mono text-neutral-400 block">
                          KevorchSBD Core Tech
                        </span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>



        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PROCESS SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${
            isDark ? 'text-red-500' : 'text-stone-700'
          }`}>
            // How We Work
          </span>
          <h2 className={`text-3xl sm:text-4xl font-heading font-bold ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}>
            Clear 4-Step Methodology
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`rounded-3xl p-6 border space-y-4 ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className={`text-2xl font-bold font-number ${isDark ? 'text-red-500' : 'text-slate-950'}`}>01</span>
            <h3 className={`text-lg font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Discovery & Audit</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
              Reviewing active advertising accounts, SEO rankings, and website technical performance.
            </p>
          </div>

          <div className={`rounded-3xl p-6 border space-y-4 ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className={`text-2xl font-bold font-number ${isDark ? 'text-red-500' : 'text-slate-950'}`}>02</span>
            <h3 className={`text-lg font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Strategy & Design</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
              Structuring ad campaign hierarchy, landing page copy, and responsive UI wireframes.
            </p>
          </div>

          <div className={`rounded-3xl p-6 border space-y-4 ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className={`text-2xl font-bold font-number ${isDark ? 'text-red-500' : 'text-slate-950'}`}>03</span>
            <h3 className={`text-lg font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Build & Launch</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
              Developing fast web code, launching ad campaigns, and setting up conversion tracking.
            </p>
          </div>

          <div className={`rounded-3xl p-6 border space-y-4 ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className={`text-2xl font-bold font-number ${isDark ? 'text-red-500' : 'text-slate-950'}`}>04</span>
            <h3 className={`text-lg font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Optimize & Scale</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
              Continuous bid optimization, A/B ad copy testing, and transparent performance updates.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FEATURED CASE STUDIES */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${
              isDark ? 'text-red-500' : 'text-stone-700'
            }`}>
              // Client Success
            </span>
            <h2 className={`text-3xl sm:text-4xl font-heading font-bold ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}>
              Featured Work
            </h2>
          </div>

          <NavLink to="/clients" className={`text-sm font-heading font-semibold flex items-center gap-1 ${
            isDark ? 'text-red-500 hover:text-red-400' : 'text-slate-900 hover:text-black'
          }`}>
            View All Clients <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className={`rounded-3xl p-7 border transition-all duration-300 group flex flex-col justify-between space-y-6 ${
                isDark ? 'bg-neutral-950 border-neutral-800 hover:border-red-500/50' : 'bg-white border-stone-200 hover:border-stone-400 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    isDark ? 'bg-black border-red-900/40 text-red-400' : 'bg-stone-100 border-stone-200 text-slate-900'
                  }`}>
                    {study.client}
                  </span>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                    {study.industry}
                  </span>
                </div>

                <h3 className={`text-xl font-heading font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-red-500' : 'text-neutral-900 group-hover:text-slate-950'
                }`}>
                  {study.title}
                </h3>
                <p className={`text-xs line-clamp-3 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                  {study.summary}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-end ${
                isDark ? 'border-neutral-900' : 'border-stone-200'
              }`}>
                <span className={`p-2 rounded-full transition-all ${
                  isDark ? 'bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white' : 'bg-stone-100 text-slate-800 group-hover:bg-slate-900 group-hover:text-white'
                }`}>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 7. TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className={`py-24 border-t transition-colors ${
        isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${
            isDark ? 'text-red-500' : 'text-stone-700'
          }`}>
            // Client Testimonials
          </span>

          <div className={`rounded-3xl p-8 sm:p-12 border relative space-y-8 ${
            isDark ? 'bg-black border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <div className="flex justify-center items-center gap-1 text-amber-400">
              {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            <blockquote className={`text-lg sm:text-2xl font-heading leading-relaxed ${
              isDark ? 'text-neutral-200' : 'text-neutral-800'
            }`}>
              "{TESTIMONIALS[activeTestimonial].content}"
            </blockquote>

            <div className="flex items-center justify-center gap-4 pt-4">
              <img
                src={TESTIMONIALS[activeTestimonial].avatar}
                alt={TESTIMONIALS[activeTestimonial].author}
                className={`w-12 h-12 rounded-full object-cover border ${isDark ? 'border-red-500/40' : 'border-stone-300'}`}
              />
              <div className="text-left">
                <h4 className={`font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {TESTIMONIALS[activeTestimonial].author}
                </h4>
                <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                  {TESTIMONIALS[activeTestimonial].role}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-2 pt-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === idx
                      ? isDark ? 'bg-red-500 w-8' : 'bg-slate-900 w-8'
                      : isDark ? 'bg-neutral-800' : 'bg-stone-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-8 sm:p-14 border text-center space-y-6 ${
          isDark
            ? 'bg-neutral-950 border-neutral-800'
            : 'bg-stone-50 border-stone-200 shadow-lg'
        }`}>
          <h2 className={`text-3xl sm:text-4xl font-heading font-bold ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}>
            Ready to grow your online presence?
          </h2>
          <p className={`max-w-xl mx-auto text-sm sm:text-base ${
            isDark ? 'text-neutral-400' : 'text-stone-600'
          }`}>
            Book a 30-minute strategic consultation with our leads. We will review your current ad performance and digital presence.
          </p>
          <MagneticButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/contact')}
          >
            Get Started Today <ArrowRight className="w-5 h-5 ml-1" />
          </MagneticButton>
        </div>
      </section>

    </div>
  );
};
