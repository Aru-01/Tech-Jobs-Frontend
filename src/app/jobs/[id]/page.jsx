'use client';
import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, DollarSign, Clock, Calendar, Bookmark,
  Share2, Briefcase, Users, CheckCircle, ExternalLink, Globe
} from 'lucide-react';
import { JOBS } from '@/lib/mockData';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

import { useState, useEffect } from 'react';
import { jobsApi } from '@/lib/api';

const TYPE_COLORS = { 'full_time': 'green', 'part_time': 'amber', 'contract': 'violet', 'freelance': 'cyan', 'internship': 'indigo' };

export default function JobDetailPage({ params }) {
  const { id } = use(params);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobsApi.get(id);
        if (response.success) {
          setJob(response.data);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error('Failed to fetch job:', error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 text-center text-white">Loading job details...</div>;
  if (!job) notFound();

  const type = job.job_type;
  const typeColor = TYPE_COLORS[type] || 'indigo';
  const companyName = job.company_details?.company_name || job.company_name || 'Tech Company';
  const companyLogo = job.company_details?.logo_url || job.company_logo || null;
  const companyColor = '#6366f1';

  // Parse fullDescription into paragraphs/sections
  const fullDescription = job.full_description || '';
  const sections = fullDescription.split('\n\n');

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Hero Banner */}
      <div
        className="relative pt-24 pb-16 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${job.companyColor}18 0%, var(--background) 70%)`,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${companyColor}20, transparent)`, transform: 'translate(30%, -30%)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: 'var(--muted)' }}
            >
              <ArrowLeft size={16} /> Back to Jobs
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Left: Company + Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex-1"
            >
              <div className="flex items-center gap-4 mb-5">
                {/* Company logo */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{
                    background: `${companyColor}15`,
                    border: `2px solid ${companyColor}30`,
                    boxShadow: `0 0 30px ${companyColor}20`,
                  }}
                >
                  <img src={companyLogo} alt={companyName} className="w-10 h-10 rounded-xl object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{companyName}</p>
                  <Badge color={typeColor} dot>{type}</Badge>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ color: 'var(--foreground)' }}>
                {job.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <MapPin size={15} />, label: job.location, color: 'var(--accent)' },
                  { icon: <DollarSign size={15} />, label: job.salary, color: '#10b981' },
                  { icon: <Clock size={15} />, label: `Posted ${new Date(job.created_at).toLocaleDateString()}`, color: 'var(--accent-3)' },
                  { icon: <Calendar size={15} />, label: `Deadline: ${job.deadline}`, color: '#f59e0b' },
                ].map((m, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--muted)' }}>
                    <span style={{ color: m.color }}>{m.icon}</span>
                    {m.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:w-72 glass-card rounded-2xl p-6"
            >
              <div className="text-2xl font-bold mb-1 gradient-text">{job.salary}</div>
              <p className="text-xs mb-5" style={{ color: 'var(--muted)' }}>Annual salary range</p>

              <div className="space-y-3">
                <Button variant="primary" size="lg" fullWidth icon={<CheckCircle size={16} />}>
                  Apply Now
                </Button>
                <Button variant="secondary" size="md" fullWidth icon={<Bookmark size={15} />}>
                  Save Job
                </Button>
                <Button variant="ghost" size="md" fullWidth icon={<Share2 size={15} />}>
                  Share
                </Button>
              </div>

              <div className="mt-5 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={14} style={{ color: 'var(--accent)' }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>Company</span>
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{companyName}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{job.location}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-2xl p-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>About the Role</h2>

              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {sections.map((section, i) => {
                  if (section.startsWith('**')) {
                    const lines = section.split('\n');
                    const heading = lines[0].replace(/\*\*/g, '');
                    const rest = lines.slice(1);
                    return (
                      <div key={i} className="mt-6">
                        <h3 className="text-base font-bold mb-3" style={{ color: 'var(--foreground)' }}>{heading}</h3>
                        <ul className="space-y-2">
                          {rest.filter(l => l.trim()).map((line, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                              <span>{line.replace(/^- /, '')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return <p key={i}>{section}</p>;
                })}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-5"
          >
            {/* Tech Stack */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--foreground)' }}>Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {job.tech_stack?.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Job Details */}
            <div className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>Job Details</h3>
              {[
                { label: 'Job Type', value: type },
                { label: 'Location', value: job.location },
                { label: 'Experience', value: job.experience_level },
                { label: 'Deadline', value: job.deadline },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{label}</span>
                  <span className="text-xs font-semibold capitalize" style={{ color: 'var(--foreground)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Apply card mobile */}
            <div className="lg:hidden rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <Button variant="primary" size="lg" fullWidth icon={<CheckCircle size={16} />}>Apply Now</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
