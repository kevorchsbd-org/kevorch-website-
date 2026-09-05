import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Flame,
  Target,
  Eye,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen pt-32 pb-24 transition-colors duration-400 ${isDark ? 'bg-black text-white' : 'bg-white text-neutral-900'
      }`}>
      <SEO
        title="About Kevorch SBD | Digital Marketing Company"
        description="Learn about Kevorch SBD Marketing & Development, a performance digital marketing company driving growth through digital strategy, branding, and web development."
        canonical="/about"
        structuredData={{
          "@type": "AboutPage",
          "@id": "https://kevorch.online/about#webpage",
          "url": "https://kevorch.online/about",
          "name": "About Kevorch SBD Marketing & Development",
          "description": "Kevorch SBD Marketing & Development is a performance digital marketing company delivering strategic growth, Meta Ads, Google Ads & SEO, branding, and web development.",
          "isPartOf": {
            "@id": "https://kevorch.online/#website"
          }
        }}
      />
      {/* Background Red Glows in Dark Mode Only */}
      {isDark && <div className="absolute top-20 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />}

      {/* ========================================================================= */}
      {/* 1. ABOUT HERO */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold uppercase tracking-widest bg-red-500/10 border-red-500/30 text-[#DE0918]"
        >
          <Flame className="w-3.5 h-3.5 text-[#DE0918]" />
          <span>ABOUT KEVORCH</span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.12 } },
          }}
          className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight flex flex-wrap justify-center gap-x-3 gap-y-1"
        >
          {[
            { text: "Building", highlight: false },
            { text: "Modern", highlight: false },
            { text: "Digital", highlight: true },
            { text: "Experiences", highlight: true },
            { text: "&", highlight: false },
            { text: "Driving", highlight: false },
            { text: "Growth", highlight: false },
          ].map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.45, ease: [0.215, 0.61, 0.355, 1] },
                },
              }}
              className={word.highlight ? (isDark ? "text-red-500" : "text-slate-950 font-extrabold") : ""}
            >
              {word.text}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}
        >
          Kevorch SBD Marketing & Development is a results-focused digital marketing company. We replace outdated marketing methods with clear digital strategy, modern web development, and measurable ROI.
        </motion.p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-heading font-semibold">
          <NavLink to="/services" className={`inline-flex items-center gap-1.5 transition-colors ${isDark ? 'text-red-400 hover:text-red-300' : 'text-slate-900 hover:text-red-600'}`}>
            Explore our digital marketing services <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MISSION, VISION & VALUES */}
      {/* ========================================================================= */}
      <section className={`py-16 border-y transition-colors ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${isDark ? 'text-red-500' : 'text-stone-700'
              }`}>
              // Core Foundations
            </span>
            <h2 className={`text-3xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Our Core Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`rounded-3xl p-8 border space-y-4 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-stone-200 shadow-xs'}`}>
              <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${isDark ? 'bg-red-600/15 border-red-500/30 text-red-500' : 'bg-stone-100 border-stone-200 text-slate-800'
                }`}>
                <Target className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Our Mission</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                Empower growing brands with high-converting ad strategies, brand design, and modern web development solutions.
              </p>
            </div>

            <div className={`rounded-3xl p-8 border space-y-4 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-stone-200 shadow-xs'}`}>
              <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${isDark ? 'bg-red-600/15 border-red-500/30 text-red-500' : 'bg-stone-100 border-stone-200 text-slate-800'
                }`}>
                <Eye className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Our Vision</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                Set the benchmark for digital marketing clarity, transparent campaign reporting, and technical web performance.
              </p>
            </div>

            <div className={`rounded-3xl p-8 border space-y-4 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-stone-200 shadow-xs'}`}>
              <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${isDark ? 'bg-red-600/15 border-red-500/30 text-red-500' : 'bg-stone-100 border-stone-200 text-slate-800'
                }`}>
                <Shield className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Our Values</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                Direct communication, measurable growth, clean branding design, and continuous optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMPANY CAPABILITIES & PROBLEM-SOLVING */}
      {/* ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${isDark ? 'text-red-500' : 'text-stone-700'}`}>
            // Agency Capabilities
          </span>
          <h2 className={`text-3xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Solving Modern Digital Growth Challenges
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
            As a performance-focused digital marketing company, Kevorch SBD Marketing & Development bridges the gap between creative visual media and technical lead generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
          <div className={`p-7 rounded-3xl border ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'}`}>
            <h3 className={`text-lg font-heading font-bold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Core Expertise & Capabilities
            </h3>
            <ul className="space-y-2 font-mono text-[11px]">
              <li className="flex items-center gap-2">✓ Paid Media Scaling (Meta Ads & Google Ads)</li>
              <li className="flex items-center gap-2">✓ Search Engine Optimization (SEO Services)</li>
              <li className="flex items-center gap-2">✓ High-Converting React Web & App Development</li>
              <li className="flex items-center gap-2">✓ Brand Identity & Graphic Logo Creation</li>
              <li className="flex items-center gap-2">✓ Video Editing & Short-Form Social Reels</li>
            </ul>
          </div>

          <div className={`p-7 rounded-3xl border ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'}`}>
            <h3 className={`text-lg font-heading font-bold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Why Businesses Partner With Us
            </h3>
            <p className={`mb-3 ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
              We replace guesswork with structured experimentation, transparent communication, and rapid project execution. Our clients work with dedicated senior strategy leads committed to long-term business scale.
            </p>
            <div className="pt-2">
              <NavLink to="/contact" className={`font-mono text-xs font-semibold inline-flex items-center gap-1 ${isDark ? 'text-red-400 hover:text-red-300' : 'text-slate-900 hover:text-red-600'}`}>
                Book a Digital Marketing Consultation <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FINAL ABOUT CTA */}
      {/* ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-8 sm:p-12 border text-center space-y-6 ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200 shadow-sm'
          }`}>
          <h2 className={`text-3xl sm:text-4xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Ready to Work Together?
          </h2>
          <p className={`max-w-xl mx-auto text-sm sm:text-base ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
            Get in touch with our digital marketing company leads to discuss your project requirements and strategy.
          </p>
          <MagneticButton variant="primary" size="lg" onClick={() => navigate('/contact')}>
            Book a Digital Marketing Consultation <ArrowRight className="w-5 h-5 ml-1" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
};
