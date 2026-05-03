'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, Users, Globe, Twitter, Linkedin, 
  Calendar, Briefcase, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { COMPANIES, JOBS } from '@/lib/mockData';
import JobCard from '@/components/cards/JobCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CompanyDetailPage() {
  const { id } = useParams();
  const company = COMPANIES.find(c => c.id === id);
  const companyJobs = JOBS.filter(j => j.company === company?.name);

  if (!company) return <div className="pt-32 text-center text-white">Company not found.</div>;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Brand Header */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{ background: company.color || '#6366f1' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 rounded-3xl p-1 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              <div 
                className="w-full h-full rounded-2xl flex items-center justify-center text-white text-4xl font-bold overflow-hidden"
                style={{ background: company.color || '#6366f1' }}
              >
                {company.logo ? (
                  <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                ) : (
                  company.name[0]
                )}
              </div>
            </motion.div>
            
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center md:justify-start gap-3 mb-2"
              >
                <h1 className="text-4xl sm:text-5xl font-bold text-white">{company.name}</h1>
                <CheckCircle2 size={24} className="text-accent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/60 text-sm"
              >
                <div className="flex items-center gap-1.5"><MapPin size={16} /> {company.location}</div>
                <div className="flex items-center gap-1.5"><Globe size={16} /> {company.website.replace('https://', '')}</div>
                <div className="flex items-center gap-1.5"><Calendar size={16} /> Founded {company.founded}</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">About {company.name}</h2>
              <div className="glass-card p-8 rounded-3xl">
                <p className="text-white/70 leading-relaxed whitespace-pre-line">
                  {company.fullDescription}
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Open Roles</h2>
                <div className="text-sm text-white/40">{companyJobs.length} positions available</div>
              </div>
              <div className="space-y-4">
                {companyJobs.length > 0 ? (
                  companyJobs.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} />
                  ))
                ) : (
                  <div className="glass-card p-8 rounded-3xl text-center text-white/40">
                    No open positions at the moment.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="glass-card p-6 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-white">Company Profile</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-white/40 text-sm">Industry</span>
                  <span className="text-white text-sm font-medium">{company.industry}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-white/40 text-sm">Team Size</span>
                  <span className="text-white text-sm font-medium">{company.size}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-white/40 text-sm">Headquarters</span>
                  <span className="text-white text-sm font-medium">{company.location}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="primary" fullWidth className="!rounded-xl">
                  Visit Website
                </Button>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                    <Twitter size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="glass-card p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-white mb-6">Company Benefits</h3>
              <div className="space-y-4">
                {company.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <ChevronRight size={14} />
                    </div>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
