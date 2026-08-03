import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Target,
  Share2,
  Star,
  ChevronRight,
  Play,
  Flame,
  MessageSquare,
  Palette,
  Video,
  Headphones,
} from 'lucide-react';

import { MagneticButton } from '../components/MagneticButton';
import { Marquee } from '../components/Marquee';
import { CLIENT_LOGOS, SERVICES_DATA, CASE_STUDIES, TESTIMONIALS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import bgLightVideo from '../assets/bglight1.mp4';
import bgDarkVideo from '../assets/bgdark1.mp4';



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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="space-y-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-medium ${
                isDark ? 'border-red-900/40 bg-neutral-900/60 text-red-400' : 'border-stone-300 bg-stone-100 text-stone-800'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${isDark ? 'text-red-500' : 'text-slate-800'}`} />
              <span>Make Your Mark.</span>
            </motion.div>

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
                className="text-4xl sm:text-6xl lg:text-7xl font-black flex items-center justify-center tracking-tight min-h-[1.2em]"
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
                className={`text-2xl sm:text-4xl lg:text-4xl font-extrabold leading-tight block max-w-3xl mx-auto ${
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
              className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans ${
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
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
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

              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`rounded-3xl p-7 border transition-all h-full flex flex-col justify-between space-y-6 group overflow-hidden relative ${
                    isDark ? 'bg-neutral-900/60 border-neutral-800 hover:border-red-500/60 hover:shadow-[0_10px_30px_rgba(222,9,24,0.2)]' : 'bg-white border-stone-200 hover:border-red-300 hover:shadow-xl shadow-sm'
                  }`}
                >
                  <div className="space-y-4 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 ${
                      isDark
                        ? 'bg-red-600/15 border-red-500/30 text-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_20px_#DE0918]'
                        : 'bg-stone-100 border-stone-200 text-slate-900 group-hover:bg-slate-950 group-hover:text-white'
                    }`}>
                      {getHomeServiceIcon(service.id)}
                    </div>

                    <h3 className={`text-xl font-heading font-extrabold transition-colors ${
                      isDark ? 'text-white group-hover:text-red-400' : 'text-neutral-900 group-hover:text-red-600'
                    }`}>
                      {service.title}
                    </h3>

                    <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className={`pt-4 border-t flex items-center justify-between text-xs relative z-10 ${
                    isDark ? 'border-neutral-800' : 'border-stone-200'
                  }`}>
                    <span className={`font-mono font-bold ${isDark ? 'text-red-500' : 'text-slate-900'}`}>{service.metrics.avgGrowth} Avg Lift</span>
                    <NavLink to="/services" className={`flex items-center gap-1 font-bold ${
                      isDark ? 'text-neutral-300 group-hover:text-red-400' : 'text-stone-700 group-hover:text-red-600'
                    }`}>
                      Explore <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </NavLink>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="text-center pt-4">
            <MagneticButton
              variant="outline"
              size="md"
              onClick={() => navigate('/services')}
            >
              View All 14 Services <ArrowRight className="w-4 h-4 ml-1" />
            </MagneticButton>
          </div>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

              <div className={`pt-4 border-t flex items-center justify-between ${
                isDark ? 'border-neutral-900' : 'border-stone-200'
              }`}>
                <div>
                  <span className={`text-[10px] uppercase font-mono ${isDark ? 'text-red-500' : 'text-stone-600'}`}>Results</span>
                  <p className={`text-base font-bold font-number ${isDark ? 'text-red-500' : 'text-slate-950'}`}>{study.results.roi} ROI • {study.results.revenue}</p>
                </div>
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
