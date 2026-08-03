import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import type { CaseStudy } from '../types';
import { MagneticButton } from './MagneticButton';
import { useTheme } from '../context/ThemeContext';

interface ProjectModalProps {
  project: CaseStudy | null;
  onClose: () => void;
  onConsultationClick: () => void;
}

export const ProjectModal = ({ project, onClose, onConsultationClick }: ProjectModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={`fixed inset-0 backdrop-blur-xl ${
            isDark ? 'bg-black/85' : 'bg-black/60'
          }`}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col transition-colors duration-300 ${
            isDark
              ? 'bg-neutral-950 border-red-900/50 shadow-red-950/40 text-neutral-200'
              : 'bg-white border-stone-200 shadow-xl text-neutral-800'
          }`}
        >
          {/* Header Banner */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-linear-to-t via-transparent to-transparent ${
              isDark ? 'from-neutral-950' : 'from-white'
            }`} />

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2.5 rounded-full border transition-all z-20 cursor-pointer ${
                isDark
                  ? 'bg-black/80 text-white border-red-900/40 hover:bg-neutral-900'
                  : 'bg-white/90 text-neutral-900 border-stone-200 hover:bg-stone-100 shadow-sm'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium bg-red-600/20 border border-red-500/40 text-red-500 mb-2">
                {project.industry} • {project.category}
              </span>
              <h2 className={`text-2xl sm:text-3xl font-heading font-bold leading-tight ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8 text-sm leading-relaxed">

            {/* Challenge & Solution */}
            <div className="space-y-4">
              <div>
                <h3 className={`text-base font-heading font-semibold mb-1 ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}>The Growth Challenge</h3>
                <p className={isDark ? 'text-neutral-400' : 'text-stone-600'}>{project.challenge}</p>
              </div>

              <div>
                <h3 className={`text-base font-heading font-semibold mb-1 ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}>The KevorchSBD Engineering Solution</h3>
                <p className={isDark ? 'text-neutral-400' : 'text-stone-600'}>{project.solution}</p>
              </div>
            </div>

            {/* Tags */}
            <div className={`flex flex-wrap gap-2 pt-2 border-t ${
              isDark ? 'border-neutral-800' : 'border-stone-200'
            }`}>
              {project.tags.map((tag) => (
                <span key={tag} className={`px-3 py-1 rounded-lg text-xs font-mono ${
                  isDark ? 'bg-neutral-900 text-neutral-300' : 'bg-stone-100 text-stone-700'
                }`}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Modal Footer CTA */}
            <div className={`pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t ${
              isDark ? 'border-neutral-800' : 'border-stone-200'
            }`}>
              <div>
                <span className="text-xs text-red-500">Want similar results for your business?</span>
                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Let's audit your growth potential.
                </p>
              </div>
              <MagneticButton
                variant="primary"
                size="md"
                onClick={() => {
                  onClose();
                  onConsultationClick();
                }}
              >
                Schedule Growth Audit <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
