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

        {/* 6-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`rounded-2xl p-6 text-center flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${
                isDark
                  ? 'bg-[#111827] border border-slate-800 shadow-sm hover:shadow-md hover:border-red-500/70'
                  : 'bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-red-500/70'
              }`}
              onClick={() => navigate('/contact')}
            >
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
