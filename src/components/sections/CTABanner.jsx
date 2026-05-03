'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Rocket, Briefcase } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTABanner() {
  return (
    <section className="py-24 relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="glass-card p-12 sm:p-20 rounded-[40px] text-center relative overflow-hidden"
      >
        {/* Floating shapes & decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full" style={{ background: 'var(--glow)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 blur-[100px] rounded-full" style={{ background: 'var(--glow-2)' }} />
        <div className="absolute inset-0 dot-pattern opacity-30" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--accent)' }}
          >
            <Rocket size={16} />
            <span>Your next career move starts here</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ color: 'var(--foreground)' }}
          >
            Ready to Land Your
            <br />
            <span className="gradient-text">Dream Tech Job?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--muted)' }}
          >
            Join 98,000+ engineers who found their perfect role through Tech_Jobs. Create your free account and get matched with top tech companies today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button variant="primary" size="lg" className="!px-8 !py-4 text-base font-bold flex items-center gap-2">
                <Rocket size={18} />
                Start For Free
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="secondary" size="lg" className="!px-8 !py-4 text-base font-semibold flex items-center gap-2">
                <Briefcase size={18} />
                Browse Jobs
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-sm"
            style={{ color: 'var(--muted)' }}
          >
            No credit card required · Free forever for job seekers · 2-minute setup
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
