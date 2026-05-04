'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid3x3 } from 'lucide-react';
import CategoryCard from '@/components/cards/CategoryCard';
import { CATEGORIES } from '@/lib/mockData';
import { dashboardApi } from '@/lib/api';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function JobCategories() {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardApi.getStats();
        const stats = response.data?.data || response.data;
        
        if (stats && stats.specialties) {
          // stats.specialties is now a sorted array of { label, count }
          const updatedCategories = stats.specialties.map(spec => {
            // Find existing icon/id from mock data or create new
            const existing = CATEGORIES.find(c => c.label === spec.label);
            return {
              id: existing?.id || spec.label.toLowerCase(),
              label: spec.label,
              count: `${spec.count} jobs`,
              icon: existing?.icon || <Grid3x3 size={24} />,
              color: existing?.color || 'var(--accent)'
            };
          });
          setCategories(updatedCategories);
        }
      } catch (error) {
        console.error('Failed to fetch job category stats:', error);
      }
    };
    fetchStats();
  }, []);

  const displayed = showAll ? categories : categories.slice(0, 6);

  return (
    <section className="py-24 relative" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--accent-3)', border: '1px solid rgba(6,182,212,0.2)' }}
          >
            <Grid3x3 size={12} /> Browse by Category
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Find Jobs By <span className="gradient-text">Specialty</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Whether you're a frontend wizard or ML researcher, we have your next role.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayed.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

        {categories.length > 6 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all border border-white/10 bg-white/5 hover:bg-white/10"
              style={{ color: 'var(--foreground)' }}
            >
              {showAll ? (
                <>Show Less <ChevronUp size={16} /></>
              ) : (
                <>Show All Specialties ({categories.length}) <ChevronDown size={16} /></>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
