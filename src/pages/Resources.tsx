import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  Search,
} from 'lucide-react';
import { RESOURCES_ARTICLES } from '../data/resourcesData';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';

const CATEGORIES = ['All', 'Meta Ads', 'SEO', 'Google Ads', 'Branding', 'Growth Strategy'] as const;

export const Resources: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = RESOURCES_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Digital Marketing Resources & Insights',
    description:
      'High-value digital marketing resources, technical SEO strategies, advertising guides, and brand development insights by Kevorch SBD Marketing & Development.',
    url: 'https://kevorch.online/resources',
    publisher: {
      '@type': 'Organization',
      name: 'Kevorch SBD Marketing & Development',
      url: 'https://kevorch.online',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: RESOURCES_ARTICLES.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://kevorch.online/resources/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <SEO
        title="Digital Marketing Resources & Insights | Kevorch SBD Marketing & Development"
        description="Explore high-value digital marketing resources, technical SEO guides, Meta & Google Ads strategies, brand identity frameworks, and web development insights."
        canonical="/resources"
        structuredData={structuredData}
      />

      <div className={`min-h-screen pt-28 pb-20 transition-colors duration-400 ${
        isDark ? 'bg-black text-white' : 'bg-stone-50 text-stone-900'
      }`}>
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/5 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header & Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Knowledge & Insights Center</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Digital Marketing <span className="text-red-500">Resources</span> & Growth Insights
            </h1>

            <p className={`text-lg sm:text-xl font-body leading-relaxed mb-8 ${
              isDark ? 'text-neutral-300' : 'text-stone-600'
            }`}>
              Actionable guides, technical SEO blueprints, and advertising frameworks designed to accelerate lead generation, improve search authority, and build lasting brand value.
            </p>

            {/* Quick Topic Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
              <span className={`px-3 py-1.5 rounded-lg border ${
                isDark ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300' : 'border-stone-200 bg-white text-stone-700'
              }`}>
                SEO
              </span>
              <span className={`px-3 py-1.5 rounded-lg border ${
                isDark ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300' : 'border-stone-200 bg-white text-stone-700'
              }`}>
                Google Ads
              </span>
              <span className={`px-3 py-1.5 rounded-lg border ${
                isDark ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300' : 'border-stone-200 bg-white text-stone-700'
              }`}>
                Meta Ads
              </span>
              <span className={`px-3 py-1.5 rounded-lg border ${
                isDark ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300' : 'border-stone-200 bg-white text-stone-700'
              }`}>
                Branding
              </span>
              <span className={`px-3 py-1.5 rounded-lg border ${
                isDark ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300' : 'border-stone-200 bg-white text-stone-700'
              }`}>
                Web Development
              </span>
              <span className={`px-3 py-1.5 rounded-lg border ${
                isDark ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300' : 'border-stone-200 bg-white text-stone-700'
              }`}>
                Lead Generation
              </span>
              <span className={`px-3 py-1.5 rounded-lg border ${
                isDark ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300' : 'border-stone-200 bg-white text-stone-700'
              }`}>
                Digital Strategy
              </span>
            </div>
          </motion.div>

          {/* Filter & Search Bar */}
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                      : isDark
                      ? 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                      : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? 'text-neutral-500' : 'text-stone-400'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
                  isDark
                    ? 'bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500'
                    : 'bg-white border border-stone-200 text-stone-900 placeholder-stone-400'
                }`}
              />
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between ${
                    isDark
                      ? 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800/80 hover:border-red-500/50 shadow-xl shadow-black/40'
                      : 'bg-white hover:bg-stone-50 border-stone-200/80 hover:border-red-500/30 shadow-xl shadow-stone-200/40'
                  }`}
                >
                  <div>
                    {/* Category & Meta info */}
                    <div className="flex items-center justify-between gap-4 mb-4 text-xs">
                      <span className="px-3 py-1 rounded-full font-semibold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20">
                        {article.category}
                      </span>
                      <div className={`flex items-center gap-3 ${
                        isDark ? 'text-neutral-400' : 'text-stone-500'
                      }`}>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(article.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Article Title */}
                    <h2 className={`font-heading text-xl sm:text-2xl font-bold mb-3 group-hover:text-red-500 transition-colors leading-snug ${
                      isDark ? 'text-white' : 'text-stone-900'
                    }`}>
                      <NavLink to={`/resources/${article.slug}`} className="focus:outline-none">
                        {article.title}
                      </NavLink>
                    </h2>

                    {/* Summary */}
                    <p className={`text-sm font-body leading-relaxed mb-6 ${
                      isDark ? 'text-neutral-400' : 'text-stone-600'
                    }`}>
                      {article.summary}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2.5 py-0.5 rounded-md ${
                            isDark ? 'bg-neutral-800/60 text-neutral-400' : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Action */}
                    <div className={`pt-4 border-t flex items-center justify-between ${
                      isDark ? 'border-neutral-800' : 'border-stone-100'
                    }`}>
                      <NavLink
                        to={`/resources/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-400 transition-colors group/link"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </NavLink>

                      <NavLink
                        to="/services"
                        className={`text-xs hover:underline ${
                          isDark ? 'text-neutral-500 hover:text-neutral-300' : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        View Related Services →
                      </NavLink>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 rounded-3xl border mb-20 ${
              isDark ? 'bg-neutral-900/40 border-neutral-800 text-neutral-400' : 'bg-white border-stone-200 text-stone-600'
            }`}>
              <BookOpen className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-heading font-semibold mb-2">No resources match your search</h3>
              <p className="text-sm max-w-md mx-auto mb-6">
                Try selecting a different category filter or clearing your search term to view available articles.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Internal Linking & Conversion Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-8 sm:p-12 border relative overflow-hidden ${
              isDark
                ? 'bg-linear-to-br from-neutral-900 via-black to-neutral-950 border-red-900/40'
                : 'bg-linear-to-br from-red-500/5 via-stone-50 to-white border-red-500/20'
            }`}
          >
            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2 block">
                Partner for Growth
              </span>
              <h2 className={`font-heading text-2xl sm:text-3xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Ready to Implement These Growth Strategies for Your Business?
              </h2>
              <p className={`text-base font-body mb-8 leading-relaxed ${
                isDark ? 'text-neutral-300' : 'text-stone-600'
              }`}>
                Explore our full suite of digital marketing, paid advertising, technical SEO, and web development services, or view client success stories to see our work in action.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <NavLink
                  to="/services"
                  className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all shadow-lg shadow-red-500/25 inline-flex items-center gap-2"
                >
                  Explore Digital Marketing Services
                  <ArrowRight className="w-4 h-4" />
                </NavLink>

                <NavLink
                  to="/clients"
                  className={`px-6 py-3 rounded-xl border font-semibold text-sm transition-all ${
                    isDark
                      ? 'border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800'
                      : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  View Client Work
                </NavLink>

                <NavLink
                  to="/contact"
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                    isDark ? 'text-neutral-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Contact Our Team →
                </NavLink>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Resources;
