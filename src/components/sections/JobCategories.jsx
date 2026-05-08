'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid3x3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CategoryCard from '@/components/cards/CategoryCard';
import { CATEGORIES } from '@/lib/mockData';
import { dashboardApi } from '@/lib/api';

export default function JobCategories({ initialCategories = [] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isLoading, setIsLoading] = useState(initialCategories.length === 0);

  useEffect(() => {
    const fetchStats = async () => {
      if (initialCategories.length > 0) return;
      try {
        const response = await dashboardApi.getStats();
        const stats = response.data?.data || response.data;
        
        if (stats && stats.specialties) {
          const updatedCategories = stats.specialties.map(spec => {
            const existing = CATEGORIES.find(c => c.label === spec.label);
            return {
              id: existing?.id || spec.label.toLowerCase(),
              label: spec.label,
              count: `${spec.count} jobs`,
              icon: existing?.icon || 'Grid3x3',
              color: existing?.color || '#06b6d4'
            };
          });
          setCategories(updatedCategories);
        }
      } catch (error) {
        console.error('Failed to fetch job category stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [initialCategories]);

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
          {isLoading ? (
            // Skeleton Loader
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-48 rounded-3xl bg-white/5 animate-pulse border border-white/10" />
            ))
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

