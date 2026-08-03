import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { CASE_STUDIES, CLIENT_LOGOS } from '../data/mockData';
import type { CaseStudy } from '../types';
import { ProjectModal } from '../components/ProjectModal';
import { Marquee } from '../components/Marquee';
import { MagneticButton } from '../components/MagneticButton';
import { useTheme } from '../context/ThemeContext';

export const Clients: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tags = ['All', 'Paid Media & SEO', 'Branding & Web Dev', 'UI/UX & Social Marketing'];

  const filteredCaseStudies = selectedTag === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.category.includes(selectedTag) || c.tags.includes(selectedTag));

  return (
    <div className={`relative min-h-screen pt-32 pb-24 overflow-hidden transition-colors duration-400 ${
      isDark ? 'bg-black text-white' : 'bg-white text-neutral-900'
    }`}>
      {/* Background Red Lights in Dark Mode Only */}
      {isDark && <div className="absolute top-20 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />}

      {/* ========================================================================= */}
      {/* 1. HERO & STATS COUNTER */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border text-xs font-mono ${
            isDark ? 'border-red-900/40 text-red-400' : 'border-stone-300 bg-stone-100 text-stone-800'
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${isDark ? 'text-red-500' : 'text-slate-800'}`} />
          <span>Case Studies & Track Record</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight"
        >
          Real Business Impact, <span className={isDark ? "text-transparent bg-clip-text bg-linear-to-r from-red-500 via-rose-500 to-red-800" : "text-slate-950 font-extrabold"}>Audited Results</span>
        </motion.h1>

        <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
          Explore how we helped enterprise tech companies, fintech unicorns, and D2C brands break revenue ceilings.
        </p>

      </section>

      {/* ========================================================================= */}
      {/* 2. INFINITE LOGO TICKER */}
      {/* ========================================================================= */}
      <section className={`py-12 my-12 border-y transition-colors ${
        isDark ? 'bg-neutral-950 border-red-900/30' : 'bg-stone-50 border-stone-200'
      }`}>
        <Marquee items={CLIENT_LOGOS} speed={25} />
      </section>

      {/* ========================================================================= */}
      {/* 3. CASE STUDIES GRID WITH TAG FILTERS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer ${
                selectedTag === tag
                  ? isDark ? 'bg-linear-to-r from-red-600 to-rose-800 text-white shadow-lg' : 'bg-slate-950 text-white shadow-sm'
                  : isDark ? 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white' : 'bg-stone-100 text-stone-600 border border-stone-200 hover:text-black'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => setSelectedProject(study)}
              className={`rounded-3xl p-7 border transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-6 ${
                isDark ? 'bg-neutral-950 border-red-900/30 hover:border-red-500/50' : 'bg-white border-stone-200 hover:border-stone-400 shadow-sm'
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

              <div className="space-y-4">
                <div className={`pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                  isDark ? 'border-neutral-900 text-red-500' : 'border-stone-200 text-slate-900'
                }`}>
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsultationClick={() => navigate('/contact')}
      />

      {/* ========================================================================= */}
      {/* 4. BEFORE / AFTER COMPARISON SECTION */}
      {/* ========================================================================= */}
      <section className={`py-24 border-t mt-20 transition-colors ${
        isDark ? 'bg-neutral-950 border-red-900/30' : 'bg-stone-50 border-stone-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${
              isDark ? 'text-red-500' : 'text-stone-700'
            }`}>
              // Performance Transformation
            </span>
            <h2 className={`text-3xl sm:text-4xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Before & After NEXUS Optimization
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className={`glass-card rounded-3xl p-8 border space-y-4 ${
              isDark ? 'border-neutral-800 bg-neutral-900/40' : 'border-stone-200 bg-stone-100'
            }`}>
              <span className={`px-3 py-1 rounded-full text-xs font-mono border ${
                isDark ? 'bg-neutral-950 border-neutral-700 text-neutral-400' : 'bg-stone-200 border-stone-300 text-stone-700'
              }`}>
                Typical Legacy Agency Setup
              </span>
              <ul className={`space-y-3 text-sm ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                <li className="flex items-start gap-2.5">
                  <span className={`font-bold ${isDark ? 'text-red-500' : 'text-stone-500'}`}>•</span>
                  <span>Average 1.8x ROAS with high acquisition costs ($300+ per lead)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className={`font-bold ${isDark ? 'text-red-500' : 'text-stone-500'}`}>•</span>
                  <span>Legacy WordPress site loading in 5.8s with 72% mobile bounce rate</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className={`font-bold ${isDark ? 'text-red-500' : 'text-stone-500'}`}>•</span>
                  <span>Opaque monthly PDF reports with zero live attribution dashboards</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className={`glass-card rounded-3xl p-8 border space-y-4 ${
              isDark ? 'border-red-600/40 bg-red-950/20' : 'border-stone-300 bg-white shadow-sm'
            }`}>
              <span className={`px-3 py-1 rounded-full text-xs font-mono border ${
                isDark ? 'bg-red-600/20 text-red-500 border-red-500/30' : 'bg-stone-100 text-slate-900 border-stone-300'
              }`}>
                Engineered NEXUS Architecture
              </span>
              <ul className={`space-y-3 text-sm ${isDark ? 'text-neutral-200' : 'text-stone-800'}`}>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-red-500' : 'text-slate-900'}`} />
                  <span>Sustained 5.4x ROAS with automated real-time CAPI ad bidding</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Sub-second React application with 99/100 Lighthouse performance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>24/7 Live Looker Studio dashboards & direct Slack channel access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FINAL CLIENT CTA */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass-card rounded-3xl p-8 sm:p-12 border text-center space-y-6 ${
          isDark ? 'border-red-900/40' : 'border-stone-200 shadow-lg'
        }`}>
          <h2 className={`text-3xl sm:text-4xl font-heading font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Ready to Become Our Next Success Story?
          </h2>
          <MagneticButton variant="primary" size="lg" onClick={() => navigate('/contact')}>
            Schedule Performance Consultation <ArrowRight className="w-5 h-5 ml-1" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
};
