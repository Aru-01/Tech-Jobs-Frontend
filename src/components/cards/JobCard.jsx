'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, DollarSign, Clock, Bookmark, ArrowRight, Building2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const TYPE_COLORS = {
  'Full-time': 'green',
  'Part-time': 'amber',
  'Contract': 'violet',
  'Remote': 'cyan',
};

export default function JobCard({ job, index = 0, compact = false }) {
  const title = job.title;
  const companyName = job.company_details?.company_name || job.company_name || 'N/A';
  const companyLogo = job.company_details?.logo_url || job.company_logo || job.companyLogo;
  const location = job.location;
  const salary = job.salary;
  const type = job.job_type || job.type;
  const tags = job.tech_stack || job.tags || [];
  const description = job.short_description || job.description;
  const posted = job.created_at ? new Date(job.created_at).toLocaleDateString() : job.posted;

  const typeColor = TYPE_COLORS[type] || 'indigo';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/jobs/${job.id}`} className="block group">
        <div
          className="glass-card p-6 rounded-2xl flex flex-col h-full relative overflow-hidden cursor-pointer card-uniform"
        >
          {/* Featured glow */}
          {job.featured && (
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #6366f1, transparent)', transform: 'translate(50%, -50%)' }}
            />
          )}

          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              {/* Company Logo */}
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
                style={{
                  background: `${job.companyColor}18`,
                  border: `1px solid ${job.companyColor}30`,
                }}
              >
                <img
                  src={companyLogo}
                  alt={companyName}
                  className="w-8 h-8 rounded-lg object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{companyName}</p>
                <h3
                  className="text-base font-bold leading-tight group-hover:text-[--accent] transition-colors"
                  style={{ color: 'var(--foreground)' }}
                >
                  {title}
                </h3>
              </div>
            </div>

            {/* Bookmark */}
            <motion.button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 transition-colors"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
              }}
            >
              <Bookmark size={14} />
            </motion.button>
          </div>

          {/* Description */}
          {!compact && (
            <p className="text-sm leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: 'var(--muted)' }}>
              {description}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
              <MapPin size={12} style={{ color: 'var(--accent)' }} /> {location}
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
              <DollarSign size={12} style={{ color: '#10b981' }} /> {salary}
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
              <Clock size={12} style={{ color: 'var(--accent-3)' }} /> {posted}
            </span>
          </div>

          {/* Tags + Type */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag text-[10px]">{tag}</span>
              ))}
            </div>
            <Badge color={typeColor} dot>{type}</Badge>
          </div>

          {/* Hover overlay line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)' }}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
