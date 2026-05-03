'use client';
import { motion } from 'framer-motion';
import { 
  Target, Rocket, Users, Shield, 
  Cpu, Globe, Heart, Zap 
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const VALUES = [
  { icon: <Target />, title: 'Mission-First', desc: 'We exist to connect talent with purpose-driven opportunities.', color: '#6366f1' },
  { icon: <Shield />, title: 'Trust & Transparency', desc: 'Honesty is our baseline. Every listing includes salary ranges.', color: '#10b981' },
  { icon: <Zap />, title: 'Developer Centric', desc: 'Built by engineers, for engineers. DX is at our core.', color: '#f59e0b' },
  { icon: <Globe />, title: 'Borderless Future', desc: 'Remote-first and global by default. Work from anywhere.', color: '#06b6d4' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6"
        >
          <Rocket size={16} />
          <span>Our Story</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold mb-8" style={{ color: 'var(--foreground)' }}
        >
          Connecting the World’s <br />
          <span className="text-gradient">Most Innovative Teams</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}
        >
          Tech_Jobs started with a simple problem: job boards were noisy, untransparent, and 
          disconnected from the tech reality. We built a platform that puts developers first.
        </motion.p>
      </section>

      {/* Stats / Numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Countries', val: '140+' },
            { label: 'Active Jobs', val: '12k+' },
            { label: 'Developers', val: '500k+' },
            { label: 'Companies', val: '3.2k+' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{s.val}</div>
              <div className="text-sm uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>Our Core Values</h2>
            <p className="text-lg" style={{ color: 'var(--muted)' }}>
              We aren’t just another job board. We are a community of builders who believe 
              that the right job can change a life, and the right hire can change a company.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {VALUES.map((v, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl group hover:border-[var(--accent)] transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:text-[var(--accent)] transition-colors" style={{ background: 'var(--surface-2)', color: 'var(--foreground)' }}>
                    {v.icon}
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: 'var(--foreground)' }}>{v.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="w-full aspect-square rounded-[40px] bg-gradient-to-tr from-accent/20 to-purple-500/20 border border-white/10 flex items-center justify-center relative overflow-hidden group">
              <Cpu className="w-32 h-32 text-accent/20 group-hover:text-accent/40 transition-colors duration-700" />
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass-card p-12 sm:p-20 rounded-[40px] text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>Ready to build the future?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs">
                <Button variant="primary" size="lg" className="!px-12">Browse Jobs</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" size="lg" className="!px-12">Post a Position</Button>
              </Link>
            </div>
          </div>
          {/* Decorative Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        </motion.div>
      </section>
    </div>
  );
}
