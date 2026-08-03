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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="[perspective:1000px] group min-h-[250px]"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                
                {/* FRONT SIDE */}
                <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl p-6 text-center flex flex-col justify-between transition-all duration-300 ${
                  isDark
                    ? 'bg-[#111827] border border-slate-800 shadow-sm group-hover:border-red-500/70'
                    : 'bg-white border border-slate-200/80 shadow-sm group-hover:border-red-500/70'
                }`}>
                  <div>
                    {/* Outline Icon Top Center */}
                    <div className="group-hover:text-red-500 transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>

                    {/* Service Title */}
                    <h3 className={`text-base font-bold mb-2.5 leading-snug group-hover:text-red-500 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className={`text-xs leading-relaxed font-normal ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {service.shortDescription}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-red-500 tracking-wider uppercase mt-2 block">
                    Hover to Connect →
                  </span>
                </div>

                {/* BACK SIDE (3D Rotated 180deg) */}
                <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl p-5 text-center flex flex-col justify-between border ${
                  isDark
                    ? 'bg-neutral-950 border-red-600/60 text-white shadow-[0_0_20px_rgba(222,9,24,0.3)]'
                    : 'bg-slate-950 text-white border-red-500 shadow-xl'
                }`}>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest block mb-1">
                      Official Channels
                    </span>
                    <h4 className="text-sm font-extrabold text-white mb-3 line-clamp-1">
                      {service.title}
                    </h4>

                    {/* Social Media Icons Grid: Instagram & Facebook ONLY */}
                    <div className="grid grid-cols-2 gap-3 py-3 max-w-[170px] mx-auto">
                      <a
                        href="https://www.instagram.com/kevorchsbd/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-2.5 px-3 rounded-xl bg-[#E1306C]/20 border border-[#E1306C]/40 text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all transform hover:scale-105 flex items-center justify-center gap-1.5 font-bold text-xs shadow-xs"
                        title="Instagram"
                      >
                        <InstagramIcon className="w-4 h-4 fill-current shrink-0" />
                        <span>Insta</span>
                      </a>

                      <a
                        href="https://www.facebook.com/profile.php?id=61591971660618"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-2.5 px-3 rounded-xl bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all transform hover:scale-105 flex items-center justify-center gap-1.5 font-bold text-xs shadow-xs"
                        title="Facebook"
                      >
                        <FacebookIcon className="w-4 h-4 fill-current shrink-0" />
                        <span>FB</span>
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/contact');
                    }}
                    className="w-full py-2 rounded-xl text-xs font-mono font-bold bg-red-600 hover:bg-red-500 text-white transition-colors shadow-md flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Consult Strategy <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
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
