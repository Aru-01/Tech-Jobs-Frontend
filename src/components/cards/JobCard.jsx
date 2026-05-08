'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, DollarSign, Clock, Bookmark, ArrowRight, Building2, Check } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { getMediaUrl } from '@/lib/utils';

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
  
  // Robust tech stack parsing
  let tags = [];
  if (Array.isArray(job.tech_stack)) {
    tags = job.tech_stack;
  } else if (typeof job.tech_stack === 'string') {
    let raw = job.tech_stack.trim();
    // Handle stringified arrays like "['Python', 'Django']"
    if (raw.startsWith('[') && raw.endsWith(']')) {
      tags = raw.slice(1, -1)
        .split(',')
        .map(t => t.trim().replace(/^['"]|['"]$/g, ''))
        .filter(t => t);
    } else {
      tags = raw.split(',').map(t => t.trim()).filter(t => t);
    }
  }

  const description = job.short_description || job.description;
  const posted = job.created_at ? new Date(job.created_at).toLocaleDateString() : job.posted;
  const typeColor = TYPE_COLORS[type] || 'indigo';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full"
    >
      <Link href={`/jobs/${job.id}`} className="block group h-full">
        <div
          className="glass-card p-6 rounded-2xl flex flex-col h-full relative overflow-hidden cursor-pointer"
          style={{ minHeight: '340px' }}
        >
          {/* Featured glow */}
          {job.featured && (
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #6366f1, transparent)', transform: 'translate(50%, -50%)' }}
            />
          )}

          {/* Header Section - Fixed Height for alignment */}
          <div className="flex items-start justify-between gap-3 mb-5 min-h-[60px]">
            <div className="flex items-center gap-3 overflow-hidden">
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
                style={{
                  background: `${job.companyColor || '#6366f1'}15`,
                  border: `1px solid ${job.companyColor || '#6366f1'}30`,
                }}
              >
                {companyLogo ? (
                  <img
                    src={getMediaUrl(companyLogo)}
                    alt={companyName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-lg text-accent">
                    {companyName?.[0] || 'J'}
                  </div>
                )}
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--muted)' }}>{companyName}</p>
                  {job.company_details?.is_verified && (
                    <div className="flex-shrink-0 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500 text-white shadow-sm">
                      <Check size={10} strokeWidth={4} />
                    </div>
                  )}
                </div>
                <h3
                  className="text-base font-bold leading-snug group-hover:text-accent transition-colors line-clamp-1"
                  style={{ color: 'var(--foreground)' }}
                >
                  {title}
                </h3>
              </div>
            </div>

            <motion.button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 transition-all border border-border bg-surface-2 text-muted hover:text-accent hover:border-accent/30"
            >
              <Bookmark size={15} />
            </motion.button>
          </div>

          {/* Description Section - Fixed Height */}
          {!compact && (
            <div className="h-[44px] overflow-hidden mb-5">
              <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--muted)' }}>
                {description}
              </p>
            </div>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--muted)' }}>
              <MapPin size={13} className="text-accent" /> {location}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
              <span className="text-sm">৳</span> {salary}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--muted)' }}>
              <Clock size={13} className="text-accent-3" /> {posted}
            </span>
          </div>

          {/* Footer: Tags + Type - Pushed to bottom */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border/50">
            <div className="flex flex-wrap gap-1.5 h-[26px] overflow-hidden">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag text-[10px] py-0.5 px-2 bg-accent/5 border-accent/10">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex-shrink-0">
              <Badge color={typeColor} dot className="text-[10px] py-0.5 px-2.5">
                {type}
              </Badge>
            </div>
          </div>

          {/* Hover Progress Line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 origin-left"
            style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-3))' }}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

