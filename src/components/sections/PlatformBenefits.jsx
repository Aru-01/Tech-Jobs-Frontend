'use client';
import { motion } from 'framer-motion';
import { Zap, Shield, Target, Globe, Users, TrendingUp } from 'lucide-react';
import { BENEFITS } from '@/lib/mockData';

const ICON_MAP = { Zap, Shield, Target, Globe, Users, TrendingUp };

export default function PlatformBenefits() {
  return (
    <section className="py-24 relative" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <Zap size={12} /> Why Tech_Jobs
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Built for <span className="gradient-text">Developers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            We obsess over the details so you can focus on what matters — finding the perfect role.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => {
            const Icon = ICON_MAP[benefit.icon] || Zap;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-6 rounded-2xl group"
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${benefit.color}15`,
                    border: `1px solid ${benefit.color}25`,
                    boxShadow: `0 0 20px ${benefit.color}15`,
                  }}
                >
                  <Icon size={22} style={{ color: benefit.color }} />
                </div>

                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>{benefit.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{benefit.description}</p>

                {/* Animated bottom border */}
                <motion.div
                  className="mt-5 h-px"
                  style={{ background: `linear-gradient(90deg, ${benefit.color}, transparent)` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
