'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Monitor, Server, Cloud, Brain, Globe, Palette, ArrowRight } from 'lucide-react';

const ICON_MAP = { Monitor, Server, Cloud, Brain, Globe, Palette };

export default function CategoryCard({ category, index = 0 }) {
  const Icon = ICON_MAP[category.icon] || Monitor;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07, type: 'spring', stiffness: 200 }}
    >
      <Link href={`/jobs?category=${category.id}`}>
        <motion.div
          className="glass-card rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: `radial-gradient(ellipse at 30% 50%, ${category.color}12 0%, transparent 70%)` }}
          />

          <div className="flex items-start justify-between mb-4">
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ background: category.bg, border: `1px solid ${category.color}25` }}
            >
              <Icon size={22} style={{ color: category.color }} />
            </div>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            >
              <ArrowRight size={16} style={{ color: category.color }} />
            </motion.div>
          </div>

          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--foreground)' }}>{category.label}</h3>
          <p className="text-sm font-semibold" style={{ color: category.color }}>{category.count} jobs</p>
        </motion.div>
      </Link>
    </motion.div>
  );
}
