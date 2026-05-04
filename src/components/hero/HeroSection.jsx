'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Search, Sparkles, TrendingUp, Users, Briefcase } from 'lucide-react';
import Button from '@/components/ui/Button';
import { dashboardApi } from '@/lib/api';

const FloatingShape = ({ className, style, delay = 0 }) => (
  <motion.div
    className={className}
    style={style}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      opacity: [0.6, 1, 0.6],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
);

const TechBadge = ({ label, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4, type: 'spring' }}
    className="glass flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold select-none"
    style={{ color: 'var(--foreground)', boxShadow: 'var(--shadow-sm)' }}
  >
    <span>{icon}</span>
    {label}
  </motion.div>
);

export default function HeroSection() {
  const [stats, setStats] = useState({
    active_jobs: '12,400+',
    companies_hiring: '3,200+',
    successful_hires: '10',
    avg_time_to_hire: '05 days'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardApi.getStats();
        if (response.success) {
          setStats({
            active_jobs: response.data.active_jobs?.toLocaleString() + '+',
            companies_hiring: response.data.companies_hiring?.toLocaleString() + '+',
            successful_hires: response.data.successful_hires,
            avg_time_to_hire: response.data.avg_time_to_hire
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  const statData = [
    { label: 'Active Jobs', value: stats.active_jobs, icon: <Briefcase size={18} /> },
    { label: 'Companies Hiring', value: stats.companies_hiring, icon: <Users size={18} /> },
    { label: 'Successful Hires', value: stats.successful_hires, icon: <TrendingUp size={18} /> },
    { label: 'Avg. Time to Hire', value: stats.avg_time_to_hire, icon: <Sparkles size={18} /> },
  ];
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg pt-20">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Floating blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 float-1"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-15 float-2"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
      <div className="absolute top-3/4 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-10 float-3"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />

      {/* Floating Tech Shapes */}
      <FloatingShape
        className="absolute top-24 right-16 w-14 h-14 rounded-2xl glass hidden lg:flex items-center justify-center text-2xl"
        style={{ boxShadow: 'var(--shadow-glow)' }}
        delay={0}
      />
      <FloatingShape
        className="absolute bottom-40 left-12 w-12 h-12 rounded-xl glass hidden lg:flex items-center justify-center"
        style={{ boxShadow: 'var(--shadow-sm)' }}
        delay={1.5}
      />
      <FloatingShape
        className="absolute top-40 left-24 w-10 h-10 rounded-xl hidden lg:block"
        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', opacity: 0.4, boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
        delay={2}
      />
      <FloatingShape
        className="absolute bottom-32 right-24 w-16 h-16 rounded-2xl hidden lg:block"
        style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', opacity: 0.25, boxShadow: '0 0 40px rgba(6,182,212,0.4)' }}
        delay={0.8}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass text-sm font-medium cursor-default"
          style={{ color: 'var(--accent)' }}
        >
          <Sparkles size={14} />
          <span>Over {stats.active_jobs} tech jobs from {stats.companies_hiring} top companies</span>
          <ArrowRight size={14} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
          style={{ color: 'var(--foreground)' }}
        >
          Find Your Dream
          <br />
          <span className="gradient-text">Tech Career</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ color: 'var(--muted)' }}
        >
          Connect with world-class companies building the future. Curated tech jobs — no spam, no noise, only premium opportunities matched to your skills.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8"
        >
          <div
            className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 input-glow"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <Search size={18} style={{ color: 'var(--muted)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--foreground)' }}
            />
          </div>
          <Link href="/jobs">
            <Button variant="primary" size="lg" iconRight={<ArrowRight size={16} />}>
              Search Jobs
            </Button>
          </Link>
        </motion.div>

        {/* Popular tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-16"
        >
          <span className="text-xs" style={{ color: 'var(--muted)' }}>Popular:</span>
          {['React', 'Python', 'Go', 'TypeScript', 'Kubernetes', 'AI/ML', 'Remote'].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + i * 0.04 }}
              className="tag cursor-pointer"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {statData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.08 }}
              className="glass-card p-4 rounded-2xl text-center"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="flex items-center justify-center mb-1" style={{ color: 'var(--accent)' }}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link href="/jobs">
            <Button variant="primary" size="xl" icon={<Search size={18} />}>
              Browse All Jobs
            </Button>
          </Link>
          <Link href="/add-job">
            <Button variant="secondary" size="xl" icon={<Briefcase size={18} />}>
              Hire Top Developers
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--background), transparent)' }}
      />
    </section>
  );
}
