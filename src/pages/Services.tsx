import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Code2,
  FileText,
  Link as LinkIcon,
  Target,
  Share2,
  Video,
  MessageSquare,
  Palette,
  Globe,
  Zap,
  ShoppingCart,
  Layout,
  ArrowRight,
  Sparkles,
  Headphones,
  Users,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

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

export const Services: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getServiceIcon = (iconName: string): React.ReactElement => {
    const iconClass = `w-8 h-8 mx-auto mb-4 stroke-[1.5] transition-colors ${
      isDark ? 'text-red-500' : 'text-slate-800 group-hover:text-red-500'
    }`;

    switch (iconName) {
      case 'Search': return <Search className={iconClass} />;
      case 'MapPin': return <MapPin className={iconClass} />;
      case 'Code2': return <Code2 className={iconClass} />;
      case 'FileText': return <FileText className={iconClass} />;
      case 'Link': return <LinkIcon className={iconClass} />;
      case 'Target': return <Target className={iconClass} />;
      case 'Share2': return <Share2 className={iconClass} />;
      case 'Video': return <Video className={iconClass} />;
      case 'MessageSquare': return <MessageSquare className={iconClass} />;
      case 'Palette': return <Palette className={iconClass} />;
      case 'Globe': return <Globe className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      case 'ShoppingCart': return <ShoppingCart className={iconClass} />;
      case 'Layout': return <Layout className={iconClass} />;
      case 'Headphones': return <Headphones className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const getServiceRelativeIcons = (id: string) => {
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
          { name: 'Keywords', node: <Target className={`${iconClass} text-red-500`} />, bg: 'bg-red-500/15 border-red-500/30 text-red-500' },
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
          { name: 'CRM Systems', node: <Users className={`${iconClass} text-blue-500`} />, bg: 'bg-blue-500/15 border-blue-500/30 text-blue-500' },
          { name: 'Lead Gen', node: <Target className={`${iconClass} text-red-500`} />, bg: 'bg-red-500/15 border-red-500/30 text-red-500' },
          { name: 'Follow-Up', node: <MessageSquare className={`${iconClass} text-emerald-500`} />, bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500' },
          { name: 'Sales Support', node: <Headphones className={`${iconClass} text-amber-500`} />, bg: 'bg-amber-500/15 border-amber-500/30 text-amber-500' },
        ];
      default:
        return [
          { name: 'Sparkles', node: <Sparkles className={`${iconClass} text-red-500`} />, bg: 'bg-red-500/15 border-red-500/30 text-red-500' },
        ];
    }
  };

  return (
    <div className={`min-h-screen pt-32 pb-24 transition-colors duration-300 ${
      isDark ? 'bg-[#0B0F19] text-white' : 'bg-[#F5F7FC] text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-3xl sm:text-5xl font-heading font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            Digital Marketing Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-base sm:text-lg leading-relaxed font-normal ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Comprehensive data-driven digital solutions designed to grow your brand, increase visibility, and drive qualified leads.
          </motion.p>
        </div>

        {/* 6-Column Responsive Grid with 3D Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6" style={{ gridAutoRows: '280px' }}>
          {SERVICES_DATA.map((service, index) => {
            const relativeIcons = getServiceRelativeIcons(service.id);
            return (
              <motion.div
                key={service.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="perspective-[1000px] group h-[280px]"
              >
                <div className="relative w-full h-full transition-transform duration-700 transform-3d group-hover:transform-[rotateY(180deg)]">
                  
                  {/* FRONT SIDE — Premium 3-Section Layout */}
                  <div className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                    isDark
                      ? 'bg-[#0f1623] border border-slate-800 group-hover:border-red-500/60 shadow-sm'
                      : 'bg-white border border-slate-200 group-hover:border-red-400/70 shadow-md'
                  }`}>

                    {/* ── TOP ACCENT BAR ── */}
                    <div className={`h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent transition-all duration-500 group-hover:via-red-400 shrink-0`} />

                    {/* ── MAIN CONTENT ── */}
                    <div className="flex-1 flex flex-col items-center justify-center px-4 py-3 text-center gap-2">
                      {/* Icon in a styled box */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 ${
                        isDark
                          ? 'bg-slate-800/80 border border-slate-700 group-hover:bg-red-600/20 group-hover:border-red-500/50'
                          : 'bg-stone-100 border border-stone-200 group-hover:bg-red-50 group-hover:border-red-300'
                      }`}>
                        <div className={`transition-colors duration-300 ${isDark ? 'text-slate-300 group-hover:text-red-400' : 'text-slate-700 group-hover:text-red-500'}`}>
                          {getServiceIcon(service.iconName)}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-sm font-extrabold leading-snug transition-colors duration-300 group-hover:text-red-500 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-[10px] leading-relaxed font-normal line-clamp-3 ${
                        isDark ? 'text-slate-500' : 'text-slate-500'
                      }`}>
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* ── BOTTOM FOOTER STRIP ── */}
                    <div className={`px-4 py-2 flex items-center justify-center gap-1.5 shrink-0 border-t transition-colors duration-300 ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-stone-50 border-stone-200'
                    }`}>
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                      <span className="text-[9px] font-mono font-bold text-red-500 tracking-widest uppercase">
                        Hover to Flip
                      </span>
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                    </div>

                  </div>

                  {/* BACK SIDE — Animated Premium Layout */}
                  <div className="absolute inset-0 w-full h-full backface-hidden transform-[rotateY(180deg)] rounded-2xl overflow-hidden flex flex-col border border-red-500/60 shadow-[0_0_20px_rgba(222,9,24,0.25)]">

                    {/* ── HEADER ── */}
                    <div className="bg-gradient-to-br from-red-600 to-rose-700 px-3 py-2.5 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-mono font-bold text-red-200 uppercase tracking-[0.2em] mb-0.5">
                        ✦ Service Features ✦
                      </span>
                      <h4 className="text-[11px] font-extrabold text-white text-center leading-tight line-clamp-2">
                        {service.title}
                      </h4>
                    </div>

                    {/* ── CONTENT ── */}
                    <div className="flex-1 bg-slate-950 px-3 py-2 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {relativeIcons.map((item, idx) => (
                          <div
                            key={idx}
                            className={`rounded-xl border flex flex-col items-center justify-center gap-1 py-2 px-1 transition-all duration-300 hover:scale-105 hover:shadow-lg ${item.bg}`}
                          >
                            {item.node}
                            <span className="text-[9px] font-mono font-bold text-center leading-none">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── FOOTER ── */}
                    <div className="bg-slate-900 border-t border-slate-800 px-3 py-1.5 flex items-center justify-center gap-1.5 shrink-0">
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block animate-pulse" />
                      <span className="text-[9px] font-mono text-slate-400 tracking-wide">KevorchSBD Core Tech</span>
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block animate-pulse" />
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Corporate CTA Banner */}
        <div className="mt-20 text-center">
          <div className={`rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto border transition-colors ${
            isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Looking for a tailored digital marketing strategy?
            </h2>
            <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Contact our senior marketing leads to discuss your campaign targets and digital requirements.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
                isDark ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-950 text-white hover:bg-red-600'
              }`}
            >
              Contact Our Team <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
