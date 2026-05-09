'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid3x3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CategoryCard from '@/components/cards/CategoryCard';
import { CATEGORIES } from '@/lib/mockData';
import { dashboardApi } from '@/lib/api';

const ICON_KEYWORDS = {
  frontend: 'Monitor',
  backend: 'Server',
  cloud: 'Cloud',
  devops: 'Workflow',
  database: 'Database',
  data: 'Database',
  'ai/ml': 'Brain',
  ai: 'Brain',
  ml: 'Brain',
  design: 'Palette',
  'ui/ux': 'Palette',
  ux: 'Palette',
  mobile: 'Smartphone',
  android: 'Smartphone',
  ios: 'Smartphone',
  security: 'Shield',
  cyber: 'Shield',
  fullstack: 'Layers',
  'full stack': 'Layers',
  api: 'Terminal',
  software: 'Code2',
  engineering: 'Cpu',
  testing: 'Search',
  qa: 'Search',
};

const COLOR_KEYWORDS = {
  frontend: '#6366f1',
  backend: '#8b5cf6',
  cloud: '#06b6d4',
  devops: '#06b6d4',
  design: '#f43f5e',
  ai: '#f59e0b',
  database: '#3b82f6',
  mobile: '#10b981',
  security: '#ef4444',
};

const PALETTE = [
  '#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', 
  '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#84cc16'
];

const VARIETY_ICONS = [
  'Monitor', 'Server', 'Cloud', 'Brain', 'Globe', 'Palette', 
  'Code2', 'Database', 'Shield', 'Smartphone', 'Layers', 'Terminal'
];

const getSemanticIcon = (label) => {
  const lowLabel = label.toLowerCase();
  for (const [key, icon] of Object.entries(ICON_KEYWORDS)) {
    if (lowLabel.includes(key)) return icon;
  }
  return null;
};

const getSemanticColor = (label) => {
  const lowLabel = label.toLowerCase();
  for (const [key, color] of Object.entries(COLOR_KEYWORDS)) {
    if (lowLabel.includes(key)) return color;
  }
  return null;
};

export default function JobCategories({ initialCategories = [] }) {
  const enrichCategories = (cats) => {
    return cats.map((cat, i) => {
      const existing = CATEGORIES.find(c => c.label === cat.label);
      const semanticIcon = getSemanticIcon(cat.label);
      const semanticColor = getSemanticColor(cat.label);

      return {
        ...cat,
        id: cat.id || existing?.id || (cat.label ? cat.label.toLowerCase() : `cat-${i}`),
        icon: cat.icon && cat.icon !== 'Grid3x3' ? cat.icon : (semanticIcon || existing?.icon || VARIETY_ICONS[i % VARIETY_ICONS.length]),
        color: cat.color && cat.color !== '#06b6d4' ? cat.color : (semanticColor || existing?.color || PALETTE[i % PALETTE.length]),
        count: cat.count || (cat.jobs_count ? `${cat.jobs_count} jobs` : '0 jobs')
      };
    });
  };


  const [categories] = useState(enrichCategories(initialCategories));


  // Show max 12 (3 lines of 4)
  const displayed = categories.slice(0, 12);

  return (
    <section className="py-24 relative overflow-hidden" id="categories">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[10px] uppercase tracking-wider font-bold"
              style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--accent-3)', border: '1px solid rgba(6,182,212,0.2)' }}
            >
              <Grid3x3 size={12} /> Market Overview
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight"
            >
              Find Jobs By <span className="gradient-text">Specialty</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Explore opportunities across various tech domains. From frontend to AI, find your perfect match.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/jobs"
              className="group flex items-center gap-2 text-sm font-bold hover:text-accent transition-colors"
            >
              Browse all jobs <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Categories Grid - 4 cols on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400">
              No specialties found. Add some jobs to see them here!
            </div>
          ) : (
            displayed.map((cat, i) => (
              <CategoryCard key={cat.id || i} category={cat} index={i} />
            ))
          )}
        </div>

        {categories.length > 12 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <Link
              href="/specialties"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
              <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 transition-colors rounded-2xl" />
              <span className="relative">View All {categories.length} Specialties</span>
              <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

