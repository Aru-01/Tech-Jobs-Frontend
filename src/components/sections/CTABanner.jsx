'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Rocket, Briefcase } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg opacity-90" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Floating shapes */}
      <div className="absolute top-1/4 left-8 w-32 h-32 rounded-full blur-3xl opacity-30 float-1"
        style={{ background: 'rgba(255,255,255,0.2)' }} />
      <div className="absolute bottom-1/4 right-8 w-40 h-40 rounded-full blur-3xl opacity-20 float-2"
        style={{ background: 'rgba(255,255,255,0.15)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'rgba(255,255,255,0.3)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
          style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <Rocket size={14} />
          <span>Your next career move starts here</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
        >
          Ready to Land Your
          <br />
          <span style={{ textShadow: '0 0 40px rgba(255,255,255,0.4)' }}>Dream Tech Job?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10"
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
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl text-base font-bold flex items-center gap-2 cursor-pointer transition-all"
              style={{
                background: 'white',
                color: '#6366f1',
                boxShadow: '0 0 40px rgba(255,255,255,0.3), 0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              <Rocket size={18} />
              Start For Free
              <ArrowRight size={16} />
            </motion.button>
          </Link>
          <Link href="/jobs">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl text-base font-semibold flex items-center gap-2 cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              <Briefcase size={18} />
              Browse Jobs
            </motion.button>
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-sm text-white/60"
        >
          No credit card required · Free forever for job seekers · 2-minute setup
        </motion.p>
      </div>
    </section>
  );
}
