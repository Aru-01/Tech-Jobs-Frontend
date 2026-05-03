'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/mockData';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section className="py-24 relative section-gradient" id="testimonials">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}
          >
            <Star size={12} /> Success Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Engineers Who <span className="gradient-text">Got Hired</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Real stories from developers who landed their dream job through Tech_Jobs.
          </motion.p>
        </div>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl relative"
            >
              {/* Quote icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(99,102,241,0.1)' }}
              >
                <Quote size={16} style={{ color: 'var(--accent)' }} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm leading-relaxed mb-6 italic" style={{ color: 'var(--muted)' }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full"
                  style={{ border: '2px solid rgba(99,102,241,0.3)' }}
                />
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--accent)' }}>{t.role}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.company}</p>
                </div>
              </div>

              {/* Bottom gradient */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
