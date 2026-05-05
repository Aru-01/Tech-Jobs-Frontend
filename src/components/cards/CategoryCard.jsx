'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Monitor, Server, Cloud, Brain, Globe, Palette, Code2, Database, Shield, Smartphone, ArrowRight, Zap } from 'lucide-react';

const ICON_MAP = { Monitor, Server, Cloud, Brain, Globe, Palette, Code2, Database, Shield, Smartphone };

// Alternating visual styles — cycles through 3 design patterns per group
const CARD_VARIANTS = [
  // Pattern A: Icon top-left, gradient accent bottom-right
  ({ category, index }) => {
    const Icon = ICON_MAP[category.icon] || Monitor;
    return (
      <motion.div
        className="relative overflow-hidden rounded-2xl p-6 cursor-pointer group h-full"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}
        whileHover={{ y: -6, boxShadow: `0 20px 50px ${category.color}20` }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="absolute bottom-0 right-0 w-20 h-20 rounded-full opacity-10 blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-30"
          style={{ background: category.color, transform: 'translate(30%, 30%)' }} />
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}>
          <Icon size={20} style={{ color: category.color }} />
        </div>
        <h3 className="text-sm font-bold mb-1 leading-tight" style={{ color: 'var(--foreground)' }}>{category.label}</h3>
        <p className="text-xs font-semibold" style={{ color: category.color }}>{category.count}</p>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight size={14} style={{ color: category.color }} />
        </div>
      </motion.div>
    );
  },
  // Pattern B: Horizontal layout with big number
  ({ category, index }) => {
    const Icon = ICON_MAP[category.icon] || Monitor;
    const count = typeof category.count === 'string' ? category.count : `${category.count}`;
    return (
      <motion.div
        className="relative overflow-hidden rounded-2xl p-5 cursor-pointer group h-full"
        style={{
          background: `linear-gradient(135deg, ${category.color}12 0%, var(--surface) 60%)`,
          border: `1px solid ${category.color}25`,
          boxShadow: 'var(--shadow-sm)',
        }}
        whileHover={{ y: -6, borderColor: `${category.color}60` }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="flex items-start justify-between mb-3">
          <Icon size={18} style={{ color: category.color }} />
          <span className="text-2xl font-black opacity-10 group-hover:opacity-20 transition-opacity" style={{ color: category.color }}>
            {count.split(' ')[0]}
          </span>
        </div>
        <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--foreground)' }}>{category.label}</h3>
        <div className="flex items-center gap-1">
          <div className="flex-1 h-1 rounded-full" style={{ background: `${category.color}20` }}>
            <div className="h-full rounded-full" style={{ width: '60%', background: category.color }} />
          </div>
          <span className="text-xs font-semibold ml-1" style={{ color: category.color }}>{count}</span>
        </div>
      </motion.div>
    );
  },
  // Pattern C: Center-aligned with glow ring
  ({ category, index }) => {
    const Icon = ICON_MAP[category.icon] || Monitor;
    return (
      <motion.div
        className="relative overflow-hidden rounded-2xl p-6 cursor-pointer group h-full text-center"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
        whileHover={{ y: -6, background: `${category.color}08` }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
          style={{
            background: `${category.color}15`,
            border: `2px solid ${category.color}30`,
            boxShadow: `0 0 0 0 ${category.color}40`,
          }}>
          <Icon size={24} style={{ color: category.color }} />
        </div>
        <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--foreground)' }}>{category.label}</h3>
        <p className="text-xs font-semibold" style={{ color: category.color }}>{category.count}</p>
      </motion.div>
    );
  },
];

export default function CategoryCard({ category, index = 0 }) {
  // Cycle: pattern 0 for indices 0–2, pattern 1 for 3–5, pattern 2 for 6–8, etc.
  const groupIndex = Math.floor(index / 3) % 3;
  const Variant = CARD_VARIANTS[groupIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, type: 'spring', stiffness: 180 }}
      className="h-full"
    >
      <Link href={`/jobs?search=${encodeURIComponent(category.label)}`} className="block h-full">
        <Variant category={category} index={index} />
      </Link>
    </motion.div>
  );
}
