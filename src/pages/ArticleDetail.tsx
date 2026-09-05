import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Tag,
} from 'lucide-react';
import { RESOURCES_ARTICLES } from '../data/resourcesData';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const article = RESOURCES_ARTICLES.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className={`min-h-screen pt-36 pb-20 transition-colors duration-400 flex items-center justify-center ${
        isDark ? 'bg-black text-white' : 'bg-stone-50 text-stone-900'
      }`}>
        <SEO
          title="Article Not Found | Kevorch SBD Marketing & Development"
          description="The requested digital marketing resource could not be found."
          canonical="/resources"
        />
        <div className="text-center max-w-md mx-auto px-4">
          <BookOpen className="w-16 h-16 text-red-500 mx-auto mb-6 opacity-80" />
          <h1 className="font-heading text-3xl font-bold mb-4">Resource Not Found</h1>
          <p className={`text-base font-body mb-8 ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
            The resource article you are looking for may have been moved or updated.
          </p>
          <NavLink
            to="/resources"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/25"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Resources
          </NavLink>
        </div>
      </div>
    );
  }

  // Other related articles (exclude current)
  const otherArticles = RESOURCES_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 2);

  // Article JSON-LD Structured Data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    url: `https://kevorch.online/resources/${article.slug}`,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: {
      '@type': 'Organization',
      name: 'Kevorch SBD Marketing & Development',
      url: 'https://kevorch.online',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kevorch SBD Marketing & Development',
      url: 'https://kevorch.online',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kevorch.online/favicon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://kevorch.online/resources/${article.slug}`,
    },
  };

  return (
    <>
      <SEO
        title={`${article.title} | Kevorch SBD Marketing & Development`}
        description={article.summary}
        canonical={`/resources/${article.slug}`}
        ogType="article"
        structuredData={articleSchema}
      />

      <div className={`min-h-screen pt-28 pb-20 transition-colors duration-400 ${
        isDark ? 'bg-black text-white' : 'bg-stone-50 text-stone-900'
      }`}>
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-red-600/5 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 flex items-center gap-2 text-xs sm:text-sm font-medium">
            <NavLink
              to="/resources"
              className={`inline-flex items-center gap-1.5 transition-colors ${
                isDark ? 'text-neutral-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Resources
            </NavLink>
            <span className={isDark ? 'text-neutral-600' : 'text-stone-400'}>/</span>
            <span className="text-red-500 font-semibold">{article.category}</span>
          </nav>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20">
                {article.category}
              </span>
              <div className={`flex items-center gap-4 text-xs font-medium ${
                isDark ? 'text-neutral-400' : 'text-stone-500'
              }`}>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Published {new Date(article.publishDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Unique H1 Heading */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Short Introduction / Summary */}
            <p className={`text-lg sm:text-xl font-body leading-relaxed border-l-4 border-red-500 pl-4 py-1 italic ${
              isDark ? 'text-neutral-300' : 'text-stone-700'
            }`}>
              {article.summary}
            </p>
          </motion.header>

          {/* PHASE 6: AEO Direct Answer Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`rounded-2xl p-6 sm:p-8 mb-12 border relative overflow-hidden ${
              isDark
                ? 'bg-neutral-900/80 border-red-500/30 text-neutral-200'
                : 'bg-red-500/5 border-red-500/20 text-stone-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3 text-red-500 font-heading font-bold text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <h2>Direct Answer & Core Takeaway</h2>
            </div>
            <p className="text-base sm:text-lg font-body font-medium leading-relaxed">
              {article.directAnswer}
            </p>
          </motion.div>

          {/* Semantic Article Body */}
          <article className="prose max-w-none mb-16">
            {article.sections.map((section, idx) => (
              <section key={idx} className="mb-12">
                {/* H2 Heading Hierarchy */}
                <h2 className={`font-heading text-2xl sm:text-3xl font-bold mb-4 tracking-tight ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  {section.heading}
                </h2>

                <p className={`text-base sm:text-lg font-body leading-relaxed mb-6 ${
                  isDark ? 'text-neutral-300' : 'text-stone-700'
                }`}>
                  {section.content}
                </p>

                {/* Bullets if present */}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-3 mb-6 pl-1">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <span className={`text-base font-body ${
                          isDark ? 'text-neutral-300' : 'text-stone-700'
                        }`}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          {/* PHASE 4: Contextual Internal Link to Related Service */}
          <div className={`rounded-2xl p-6 sm:p-8 mb-16 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
            isDark
              ? 'bg-neutral-900/60 border-neutral-800 hover:border-red-500/40'
              : 'bg-white border-stone-200 hover:border-red-500/30'
          }`}>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-1 block">
                Related Service Solution
              </span>
              <h3 className={`font-heading text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                {article.relatedServiceTitle}
              </h3>
              <p className={`text-sm font-body ${
                isDark ? 'text-neutral-400' : 'text-stone-600'
              }`}>
                Looking to deploy these strategies in your business? Explore how our specialist team can help.
              </p>
            </div>
            <NavLink
              to="/services"
              className="px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all whitespace-nowrap shadow-md shadow-red-500/20 inline-flex items-center gap-2 shrink-0"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          {/* Article Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-16 pb-8 border-b border-neutral-800">
            <Tag className={`w-4 h-4 ${isDark ? 'text-neutral-500' : 'text-stone-400'}`} />
            <span className={`text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-neutral-400' : 'text-stone-500'
            }`}>
              Topics:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1 rounded-lg border font-medium ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-stone-100 border-stone-200 text-stone-700'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA Banner to /contact */}
          <div className={`rounded-3xl p-8 sm:p-10 border text-center relative overflow-hidden mb-16 ${
            isDark
              ? 'bg-linear-to-br from-neutral-900 via-black to-neutral-950 border-red-900/40'
              : 'bg-linear-to-br from-red-500/5 via-stone-50 to-white border-red-500/20'
          }`}>
            <h3 className={`font-heading text-2xl sm:text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Ready to Accelerate Your Digital Growth?
            </h3>
            <p className={`text-base font-body max-w-xl mx-auto mb-8 leading-relaxed ${
              isDark ? 'text-neutral-300' : 'text-stone-600'
            }`}>
              Partner with Kevorch SBD Marketing & Development for custom SEO, Google & Meta advertising, and high-performance web engineering.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <NavLink
                to="/contact"
                className="px-8 py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-base transition-all shadow-lg shadow-red-500/25 inline-flex items-center gap-2"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/clients"
                className={`px-6 py-3.5 rounded-xl border font-semibold text-base transition-all ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800'
                    : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100'
                }`}
              >
                View Case Studies
              </NavLink>
            </div>
          </div>

          {/* Related Articles Section */}
          {otherArticles.length > 0 && (
            <div>
              <h3 className={`font-heading text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Related Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherArticles.map((rel) => (
                  <NavLink
                    key={rel.slug}
                    to={`/resources/${rel.slug}`}
                    className={`group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                      isDark
                        ? 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800 hover:border-red-500/40'
                        : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-red-500/30'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2 block">
                        {rel.category}
                      </span>
                      <h4 className={`font-heading text-lg font-bold mb-2 group-hover:text-red-500 transition-colors ${
                        isDark ? 'text-white' : 'text-stone-900'
                      }`}>
                        {rel.title}
                      </h4>
                      <p className={`text-xs font-body line-clamp-2 mb-4 ${
                        isDark ? 'text-neutral-400' : 'text-stone-600'
                      }`}>
                        {rel.summary}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-red-500 inline-flex items-center gap-1">
                      Read Article →
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
