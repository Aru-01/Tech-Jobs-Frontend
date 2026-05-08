'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Monitor, Server, Cloud, Brain, Globe, Palette, 
  Code2, Database, Shield, Smartphone, ArrowRight, 
  Layers, Terminal, Cpu, Layout, Workflow, Sparkles,
  Search, Briefcase, Zap, Grid3x3
} from 'lucide-react';

const ICON_MAP = { 
  Monitor, Server, Cloud, Brain, Globe, Palette, 
  Code2, Database, Shield, Smartphone, Layers, 
  Terminal, Cpu, Layout, Workflow, Sparkles,
  Search, Briefcase, Zap, Grid3x3
};

export default function CategoryCard({ category, index = 0 }) {
  const Icon = ICON_MAP[category.icon] || Grid3x3;
  const countStr = typeof category.count === 'string' ? category.count : `${category.count} jobs`;
  const countNumber = parseInt(countStr) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/jobs?search=${encodeURIComponent(category.label)}`} className="block h-full group">
        <motion.div
          className="relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-500"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
          }}
          whileHover={{ 
            y: -8, 
            borderColor: `${category.color}40`,
            background: `linear-gradient(135deg, var(--surface) 0%, ${category.color}05 100%)`,
            boxShadow: `0 20px 40px -15px ${category.color}15`
          }}
        >
          {/* Subtle Background Glow */}
          <div 
            className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500"
            style={{ background: category.color }}
          />

          {/* Top Header: Icon & Big Number */}
          <div className="flex items-start justify-between mb-6">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
              style={{ 
                background: `${category.color}15`, 
                border: `1px solid ${category.color}30`,
                boxShadow: `0 8px 16px -4px ${category.color}20`
              }}
            >
              <Icon size={22} style={{ color: category.color }} />
            </div>
            
            <div className="flex flex-col items-end">
              <span 
                className="text-3xl font-black opacity-5 group-hover:opacity-15 transition-all duration-500 transform group-hover:-translate-y-1" 
                style={{ color: category.color }}
              >
                {countNumber > 99 ? '99+' : countNumber}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors" style={{ color: 'var(--foreground)' }}>
              {category.label}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium">
                <span style={{ color: 'var(--muted)' }}>Available Roles</span>
                <span style={{ color: category.color }}>{countStr}</span>
              </div>
              
              {/* Progress Bar Style Indicator */}
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '70%' }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.05) }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${category.color}80, ${category.color})` }}
                />
              </div>
            </div>
          </div>

          {/* Hover Arrow */}
          <div 
            className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
            style={{ color: category.color }}
          >
            <ArrowRight size={18} />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

