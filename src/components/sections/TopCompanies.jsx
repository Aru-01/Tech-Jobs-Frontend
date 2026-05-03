'use client';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import CompanyCard from '@/components/cards/CompanyCard';
import { COMPANIES } from '@/lib/mockData';

export default function TopCompanies() {
  return (
    <section className="py-24 relative section-gradient" id="companies">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'rgba(139,92,246,0.1)', color: 'var(--accent-2)', border: '1px solid rgba(139,92,246,0.2)' }}
          >
            <Building2 size={12} /> Top Companies Hiring
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Join <span className="gradient-text">World-Class</span> Teams
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Explore open roles at companies shaping the future of technology.
          </motion.p>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANIES.map((company, i) => (
            <CompanyCard key={company.id} company={company} index={i} />
          ))}
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm mt-10"
          style={{ color: 'var(--muted)' }}
        >
          Trusted by <span className="gradient-text font-semibold">3,200+ companies</span> worldwide to find exceptional tech talent.
        </motion.p>
      </div>
    </section>
  );
}
