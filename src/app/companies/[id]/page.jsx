'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, Users, Globe, Twitter, Linkedin, 
  Calendar, Briefcase, ChevronRight, CheckCircle2,
  Loader2, ArrowLeft, ExternalLink, Building2
} from 'lucide-react';
import JobCard from '@/components/cards/JobCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { companiesApi, jobsApi } from '@/lib/api';
import { getMediaUrl } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function CompanyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        // Use the ID directly, don't parseInt as some backends might use slugs or string IDs
        const companyRes = await companiesApi.get(id);
        
        if (companyRes.success && companyRes.data) {
          setCompany(companyRes.data);
          
          // Fetch jobs for this company
          try {
            const jobsRes = await jobsApi.list({ company: id });
            if (jobsRes.success) {
              setCompanyJobs(jobsRes.data.results || jobsRes.data || []);
            }
          } catch (err) {
            console.error('Failed to fetch jobs:', err);
          }
        } else {
          console.error('Company not found or API error:', companyRes.message);
          setCompany(null);
        }
      } catch (error) {
        console.error('Failed to fetch company details:', error);
        toast.error('Could not load company details.');
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#020617]">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
        <p className="text-slate-400 text-sm font-medium animate-pulse">Loading company profile...</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto border border-white/5 shadow-2xl">
            <Building2 size={32} className="text-slate-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Company Not Found</h2>
            <p className="text-slate-400 text-sm">The company you are looking for doesn't exist or has been removed from our platform.</p>
          </div>
          <Button onClick={() => router.push('/companies')} variant="primary" className="!rounded-2xl">
            <ArrowLeft size={18} className="mr-2" />
            Back to Companies
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Dynamic Hero Header */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 blur-[120px]"
            style={{ background: `radial-gradient(circle, ${company.color || '#6366f1'}40, transparent)` }}
          />
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/companies" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
              <ArrowLeft size={16} />
              Back to Directory
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8">
            {/* Premium Logo Wrapper */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-[2.5rem] p-1.5 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div 
                  className="w-full h-full rounded-[2rem] flex items-center justify-center text-white text-5xl font-bold overflow-hidden relative group"
                  style={{ background: company.color || '#6366f1' }}
                >
                  {company.logo || company.logo_url ? (
                    <img 
                      src={getMediaUrl(company.logo || company.logo_url)} 
                      alt={company.company_name} 
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    company.company_name?.[0] || 'C'
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              {company.is_verified && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute -top-2 -right-2 bg-blue-500 text-white w-10 h-10 rounded-2xl shadow-2xl border-4 border-[#020617] flex items-center justify-center"
                >
                  <CheckCircle2 size={20} />
                </motion.div>
              )}
            </motion.div>
            
            <div className="text-center lg:text-left flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-3 mb-6"
              >
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">{company.company_name}</h1>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/5 border border-white/5">
                    <MapPin size={16} className="text-indigo-400" />
                    <span className="text-xs">{company.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/5 border border-white/5">
                    <Building2 size={16} className="text-emerald-400" />
                    <span className="text-xs">{company.industry}</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/5 border border-white/5">
                    <Users size={16} className="text-purple-400" />
                    <span className="text-xs">{company.size || '50-100'} People</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
              >
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" className="!rounded-xl shadow-xl shadow-indigo-500/20">
                      Visit Website <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </a>
                )}
                <div className="flex gap-2">
                  <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                    <Twitter size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                    <Linkedin size={20} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-indigo-500 rounded-full" />
                About the Company
              </h2>
              <div className="glass-card p-8 sm:p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                <div className="text-slate-300 text-base sm:text-lg leading-[1.8] font-sans whitespace-pre-line" style={{ wordBreak: 'break-word' }}>
                  {company.full_description || company.short_description || "No description available for this company."}
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-1 h-8 bg-emerald-500 rounded-full" />
                  Open Opportunities
                </h2>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  {companyJobs.length} Jobs
                </div>
              </div>
              
              <div className="grid gap-6">
                {companyJobs.length > 0 ? (
                  companyJobs.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} />
                  ))
                ) : (
                  <div className="glass-card p-12 rounded-[2rem] text-center border border-dashed border-white/10 bg-transparent">
                    <Briefcase size={40} className="text-slate-800 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">No open positions at the moment.</p>
                    <p className="text-slate-600 text-xs mt-2">Follow to get notified when they hire.</p>
                  </div>
                )}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] sticky top-32"
            >
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-xs text-slate-500">Quick Details</h3>
              <div className="space-y-5">
                <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Industry</span>
                  <span className="text-sm font-semibold text-slate-200">{company.industry}</span>
                </div>
                <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Headquarters</span>
                  <span className="text-sm font-semibold text-slate-200">{company.location}</span>
                </div>
                <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Year Founded</span>
                  <span className="text-sm font-semibold text-slate-200">{new Date(company.created_at).getFullYear()}</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                <Button variant="primary" fullWidth className="!rounded-2xl !py-4 shadow-lg shadow-indigo-500/20">
                  Follow Company
                </Button>
                <div className="flex items-center gap-3 justify-center pt-4">
                  <Globe size={18} className="text-slate-600" />
                  <span className="text-xs text-slate-500">Publicly Listed Company</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
