'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, Building2 } from 'lucide-react';

export default function CompanyCard({ company, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link href={`/jobs?company=${encodeURIComponent(company.name)}`}>
        <motion.div
          className="glass-card rounded-2xl p-6 text-center cursor-pointer group relative overflow-hidden"
          whileHover={{ scale: 1.03, y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            style={{ background: `radial-gradient(ellipse at center, ${company.color}18 0%, transparent 70%)` }}
          />

          {/* Logo */}
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center overflow-hidden relative"
            style={{
              background: `${company.color}15`,
              border: `1px solid ${company.color}30`,
              boxShadow: `0 0 20px ${company.color}20`,
            }}
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-10 h-10 rounded-xl"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `<div style="font-size:20px;font-weight:800;color:${company.color}">${company.name[0]}</div>`;
              }}
            />
          </div>

          {/* Company info */}
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--foreground)' }}>{company.name}</h3>
          <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>{company.industry}</p>

          {/* Open jobs badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: `${company.color}15`, color: company.color, border: `1px solid ${company.color}25` }}
          >
            <Briefcase size={11} />
            {company.openJobs} open roles
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
