'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, Users, Globe, Twitter, Linkedin, 
  Calendar, Briefcase, ChevronRight, CheckCircle2,
  Loader2
} from 'lucide-react';
import JobCard from '@/components/cards/JobCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { companiesApi, jobsApi } from '@/lib/api';

export default function CompanyDetailPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyRes = await companiesApi.get(parseInt(id));
        if (companyRes.success) {
          setCompany(companyRes.data);
          
          // Fetch jobs for this company
          const jobsRes = await jobsApi.list({ company: id });
          if (jobsRes.success) {
            setCompanyJobs(jobsRes.data.results || jobsRes.data || []);
          }
        }
      } catch (error) {
        console.error('Failed to fetch company details:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="pt-32 text-center" style={{ color: 'var(--foreground)' }}>
        <h2 className="text-2xl font-bold">Company not found.</h2>
        <Link href="/companies" className="text-accent mt-4 inline-block hover:underline">
          Back to Companies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Brand Header */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{ background: '#6366f1' }}
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
                style={{ background: '#6366f1' }}
              >
                {company.logo_url ? (
                  <img src={company.logo_url} alt={company.company_name} className="w-full h-full object-cover" />
                ) : (
                  company.company_name?.[0] || 'C'
                )}
              </div>
            </motion.div>
            
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center md:justify-start gap-3 mb-2"
              >
                <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: 'var(--foreground)' }}>{company.company_name}</h1>
                <CheckCircle2 size={24} className="text-accent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm" style={{ color: 'var(--muted)' }}
              >
                <div className="flex items-center gap-1.5"><MapPin size={16} /> {company.location}</div>
                {company.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe size={16} /> 
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                      {company.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1.5"><Calendar size={16} /> Joined {new Date(company.created_at).getFullYear()}</div>
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
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>About {company.company_name}</h2>
              <div className="glass-card p-8 rounded-3xl">
                <p className="leading-relaxed whitespace-pre-line" style={{ color: 'var(--foreground)' }}>
                  {company.full_description || company.short_description}
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Open Roles</h2>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>{companyJobs.length} positions available</div>
              </div>
              <div className="space-y-4">
                {companyJobs.length > 0 ? (
                  companyJobs.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} />
                  ))
                ) : (
                  <div className="glass-card p-8 rounded-3xl text-center" style={{ color: 'var(--muted)' }}>
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
              <h3 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Company Profile</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>Industry</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{company.industry}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>Location</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{company.location}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="primary" fullWidth className="!rounded-xl">
                      Visit Website
                    </Button>
                  </a>
                )}
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all" style={{ color: 'var(--foreground)' }}>
                    <Twitter size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all" style={{ color: 'var(--foreground)' }}>
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
