import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Target,
  Eye,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { MILESTONES_DATA } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const About: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen pt-32 pb-24 transition-colors duration-400 ${
      isDark ? 'bg-black text-white' : 'bg-white text-neutral-900'
    }`}>
      {/* Background Red Glows in Dark Mode Only */}
      {isDark && <div className="absolute top-20 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />}

      {/* ========================================================================= */}
      {/* 1. ABOUT HERO */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono ${
            isDark ? 'border-red-900/40 bg-neutral-900/60 text-red-400' : 'border-stone-300 bg-stone-100 text-stone-800'
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${isDark ? 'text-red-500' : 'text-slate-800'}`} />
          <span>About KevorchSBD Agency</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight"
        >
          Building Modern <span className={isDark ? "text-red-500" : "text-slate-950 font-extrabold"}>Digital Experiences</span> & Driving Growth
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}
        >
          KevorchSBD is a modern performance marketing and web development agency. We replace outdated marketing methods with clear strategy, fast web development, and measurable ROI.
        </motion.p>
      </section>

      {/* ========================================================================= */}
      {/* 2. COMPANY STATS */}
      {/* ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-6 rounded-3xl border text-center ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'}`}>
            <span className={`text-3xl font-bold font-number ${isDark ? 'text-red-500' : 'text-slate-950'}`}>100+</span>
            <p className={`text-xs mt-1 font-medium ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>Successful Projects</p>
          </div>
          <div className={`p-6 rounded-3xl border text-center ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'}`}>
            <span className={`text-3xl font-bold font-number ${isDark ? 'text-red-500' : 'text-slate-950'}`}>98%</span>
            <p className={`text-xs mt-1 font-medium ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>Client Retention Rate</p>
          </div>
          <div className={`p-6 rounded-3xl border text-center ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'}`}>
            <span className={`text-3xl font-bold font-number ${isDark ? 'text-red-500' : 'text-slate-950'}`}>4.9/5</span>
            <p className={`text-xs mt-1 font-medium ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>Average Rating</p>
          </div>
          <div className={`p-6 rounded-3xl border text-center ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'}`}>
            <span className={`text-3xl font-bold font-number ${isDark ? 'text-red-500' : 'text-slate-950'}`}>4.8x</span>
            <p className={`text-xs mt-1 font-medium ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>Average Campaign ROAS</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MISSION, VISION & VALUES */}
      {/* ========================================================================= */}
      <section className={`py-16 border-y transition-colors ${
        isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${
              isDark ? 'text-red-500' : 'text-stone-700'
            }`}>
              // Core Foundations
            </span>
            <h2 className={`text-3xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Our Core Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`rounded-3xl p-8 border space-y-4 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-stone-200 shadow-xs'}`}>
              <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                isDark ? 'bg-red-600/15 border-red-500/30 text-red-500' : 'bg-stone-100 border-stone-200 text-slate-800'
              }`}>
                <Target className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Our Mission</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                Empower growing brands with high-converting ad strategies and modern React web solutions.
              </p>
            </div>

            <div className={`rounded-3xl p-8 border space-y-4 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-stone-200 shadow-xs'}`}>
              <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                isDark ? 'bg-red-600/15 border-red-500/30 text-red-500' : 'bg-stone-100 border-stone-200 text-slate-800'
              }`}>
                <Eye className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Our Vision</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                Set the benchmark for digital marketing clarity, transparent reporting, and technical web speed.
              </p>
            </div>

            <div className={`rounded-3xl p-8 border space-y-4 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-stone-200 shadow-xs'}`}>
              <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                isDark ? 'bg-red-600/15 border-red-500/30 text-red-500' : 'bg-stone-100 border-stone-200 text-slate-800'
              }`}>
                <Shield className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Our Values</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                Direct communication, measurable performance, clean design, and continuous optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMPANY TIMELINE */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${
            isDark ? 'text-red-500' : 'text-stone-700'
          }`}>
            // History
          </span>
          <h2 className={`text-3xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Company Journey
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {MILESTONES_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`rounded-3xl p-6 border space-y-3 transition-all duration-300 group overflow-hidden relative ${
                isDark
                  ? 'bg-neutral-950/80 border-neutral-800 hover:border-red-600/70 hover:shadow-[0_10px_30px_rgba(222,9,24,0.2)]'
                  : 'bg-white border-stone-200 hover:border-red-300 hover:shadow-xl shadow-xs'
              }`}
            >
              <span className={`inline-block text-xs font-mono font-bold px-3.5 py-1 rounded-full border transition-colors ${
                isDark
                  ? 'bg-red-600/20 text-red-400 border-red-500/40 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_12px_#DE0918]'
                  : 'bg-stone-100 text-slate-900 border-stone-300 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600'
              }`}>
                {item.year}
              </span>
              <h3 className={`text-base font-heading font-extrabold pt-1 transition-colors ${
                isDark ? 'text-white group-hover:text-red-400' : 'text-neutral-900 group-hover:text-red-600'
              }`}>
                {item.title}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FINAL ABOUT CTA */}
      {/* ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-8 sm:p-12 border text-center space-y-6 ${
          isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-200 shadow-sm'
        }`}>
          <h2 className={`text-3xl sm:text-4xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Ready to Work Together?
          </h2>
          <p className={`max-w-xl mx-auto text-sm sm:text-base ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
            Get in touch with our agency leads to discuss your campaign targets and digital project.
          </p>
          <MagneticButton variant="primary" size="lg" onClick={() => navigate('/contact')}>
            Schedule Strategy Call <ArrowRight className="w-5 h-5 ml-1" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
};
