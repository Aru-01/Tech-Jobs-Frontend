'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, Briefcase, ExternalLink } from 'lucide-react';

export default function CompanyCard({ company, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/companies/${company.id}`}>
        <div className="glass-card p-6 rounded-3xl h-full transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg overflow-hidden"
              style={{ background: company.color || '#6366f1' }}
            >
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              ) : (
                company.name[0]
              )}
            </div>
            <div className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[var(--surface-2)] text-[var(--muted)] group-hover:bg-[rgba(99,102,241,0.1)] group-hover:text-[var(--accent)] transition-colors">
              {company.industry}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
            {company.name}
          </h3>
          <p className="text-sm line-clamp-2 mb-6 min-h-[40px]" style={{ color: 'var(--muted)' }}>
            {company.description}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
              <MapPin size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-xs truncate">{company.location}</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
              <Users size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-xs">{company.size}</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
              <Briefcase size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-xs">{company.openJobs} Open Roles</span>
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
