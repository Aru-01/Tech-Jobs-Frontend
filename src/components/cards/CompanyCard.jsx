'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, Briefcase, ExternalLink, ShieldCheck, Check } from 'lucide-react';
import { getMediaUrl } from '@/lib/utils';

export default function CompanyCard({ company, index }) {
  const name = company.company_name || company.name;
  const logo = company.logo_url || company.logo;
  const description = company.short_description || company.description;
  const industry = company.industry;
  const location = company.location;
  const size = company.size || '50-100'; // Fallback if size is missing in API
  const openJobs = company.jobs_count || company.openJobs || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/companies/${company.id}`}>
        <div className="glass-card p-6 rounded-3xl h-full transition-all duration-300 company-card-uniform">
          <div className="flex justify-between items-start mb-6">
            <div className="relative">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg overflow-hidden"
                style={{ background: company.color || '#6366f1' }}
              >
                {logo ? (
                  <img src={getMediaUrl(logo)} alt={name} className="w-full h-full object-contain p-2 bg-white/5" />
                ) : (
                  name?.[0]
                )}
              </div>
              {company.is_verified && (
                <div className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white w-5 h-5 rounded-full shadow-lg border-2 border-[var(--surface)] flex items-center justify-center">
                  <Check size={10} strokeWidth={4} />
                </div>
              )}
            </div>
            <div className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[var(--surface-2)] text-[var(--muted)] group-hover:bg-[rgba(99,102,241,0.1)] group-hover:text-[var(--accent)] transition-colors">
              {industry}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
            {name}
          </h3>
          <p className="text-sm line-clamp-2 mb-6 min-h-[40px]" style={{ color: 'var(--muted)' }}>
            {description}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
              <MapPin size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-xs truncate">{location}</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
              <Users size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-xs">{size}</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
              <Briefcase size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-xs">{openJobs} Open Roles</span>
            </div>
            <div className="flex items-center gap-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--muted)' }}>
              <ExternalLink size={14} />
              <span className="text-xs">View Profile</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
