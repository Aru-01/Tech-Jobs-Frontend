'use client';
import { use, useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, DollarSign, Clock, Calendar, Bookmark,
  Share2, Briefcase, Users, CheckCircle, ExternalLink, Globe, Check,
  Loader2, Sparkles, Building2, Link as LinkIcon, Mail
} from 'lucide-react';
import { jobsApi } from '@/lib/api';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { getMediaUrl } from '@/lib/utils';

const TYPE_COLORS = { 
  'full_time': 'green', 
  'part_time': 'amber', 
  'contract': 'violet', 
  'freelance': 'cyan', 
  'internship': 'indigo',
  'Full-time': 'green',
  'Part-time': 'amber'
};

const formatLabel = (text) => {
  if (!text) return 'N/A';
  return text.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export default function JobDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await jobsApi.get(id);
        if (response.success && response.data) {
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#020617]">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
        <p className="text-slate-400 text-sm font-medium animate-pulse">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto border border-white/5 shadow-2xl">
            <Briefcase size={32} className="text-slate-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
            <p className="text-slate-400 text-sm">The job listing you are looking for doesn't exist or has been closed.</p>
          </div>
          <Button onClick={() => router.push('/jobs')} variant="primary" className="!rounded-2xl">
            <ArrowLeft size={18} className="mr-2" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  const type = formatLabel(job.job_type || job.type);
  const typeColor = TYPE_COLORS[job.job_type || job.type] || 'indigo';
  const companyName = job.company_details?.company_name || job.company_name || 'Tech Company';
  const companyLogo = job.company_details?.logo_url || job.company_logo || null;
  const companyColor = job.companyColor || '#6366f1';
  const expLevel = formatLabel(job.experience_level);
  
  // Banner
  const bannerUrl = job.banner_image_url || job.banner || null;

  // Description
  const fullDescription = job.full_description || job.description || '';
  const sections = fullDescription.split('\n\n').filter(s => s.trim() !== '');

  // Tech Stack parsing
  let tags = [];
  if (Array.isArray(job.tech_stack)) {
    tags = job.tech_stack;
  } else if (typeof job.tech_stack === 'string') {
    let raw = job.tech_stack.trim();
    if (raw.startsWith('[') && raw.endsWith(']')) {
      tags = raw.slice(1, -1)
        .split(',')
        .map(t => t.trim().replace(/^['"]|['"]$/g, ''))
        .filter(t => t);
    } else {
      tags = raw.split(',').map(t => t.trim()).filter(t => t);
    }
  }

  // Extract link or email
  let applyLink = job.apply_link || null;
  if (!applyLink) {
    const urlMatch = fullDescription.match(/(https?:\/\/[^\s]+)/);
    const emailMatch = fullDescription.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    if (urlMatch) {
      applyLink = urlMatch[1];
    } else if (emailMatch) {
      applyLink = `mailto:${emailMatch[1]}?subject=Application for ${job.title}`;
    }
  }

  const handleApply = () => {
    if (applyLink) {
      window.open(applyLink, '_blank', 'noopener noreferrer');
    } else {
      toast.success('Application portal is now live! 🚀', { icon: '🔥' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pb-24">
      {/* Banner & Hero Area */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute top-0 right-0 w-[50%] h-full opacity-20 blur-[120px]"
            style={{ background: `radial-gradient(circle, ${companyColor}40, transparent)` }}
          />
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
            <Link href="/jobs" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
              <ArrowLeft size={16} /> Back to Search
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-[2rem] p-1 bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex-shrink-0">
                  <div className="w-full h-full rounded-[1.8rem] flex items-center justify-center overflow-hidden" style={{ background: `${companyColor}20` }}>
                    {companyLogo ? (
                      <img src={getMediaUrl(companyLogo)} alt={companyName} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-2xl font-bold" style={{ color: companyColor }}>{companyName[0]}</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">{companyName}</p>
                    {job.company_details?.is_verified && <CheckCircle size={14} className="text-blue-500" />}
                  </div>
                  <Badge color={typeColor} dot className="text-[10px] font-bold uppercase tracking-widest px-3 py-1">{type}</Badge>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 font-sans tracking-tight">
                {job.title}
              </h1>
              
              {job.short_description && (
                <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
                  {job.short_description}
                </p>
              )}

              <div className="flex flex-wrap gap-6">
                {[
                  { icon: <MapPin size={18} />, label: job.location, color: 'text-indigo-400' },
                  { icon: <span className="text-xl font-bold">৳</span>, label: job.salary, color: 'text-emerald-400' },
                  { icon: <Clock size={18} />, label: `Posted ${new Date(job.created_at).toLocaleDateString()}`, color: 'text-purple-400' },
                  { icon: <Users size={18} />, label: expLevel, color: 'text-rose-400' },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-slate-300 font-medium">
                    <span className={m.color}>{m.icon}</span>
                    <span className="text-sm">{m.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:w-80 glass-card p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
            >
              <div className="mb-8">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Monthly Salary</div>
                <div className="text-3xl font-black text-white flex items-center gap-2">
                  <span className="text-emerald-500">৳</span>
                  {job.salary}
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  variant="primary" size="lg" fullWidth 
                  className="!rounded-2xl !py-4 shadow-xl shadow-indigo-500/30"
                  onClick={handleApply}
                >
                  Apply Now
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary" fullWidth className="!rounded-xl !py-3 bg-white/5 border-white/10 hover:bg-white/10">
                    <Bookmark size={18} />
                  </Button>
                  <Button 
                    variant="secondary" fullWidth className="!rounded-xl !py-3 bg-white/5 border-white/10 hover:bg-white/10"
                    onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied!'); }}
                  >
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>

              {applyLink && (
                 <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
                   {applyLink.startsWith('mailto:') ? <Mail size={12} /> : <LinkIcon size={12} />}
                   <span>External application process</span>
                 </div>
              )}

              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                    <Sparkles size={20} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-tight">
                    Premium Listing <br /> <span className="text-slate-300">Verified by Tech_Jobs</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {bannerUrl && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl glass-card">
            <img src={getMediaUrl(bannerUrl)} alt="Job Banner" className="w-full h-auto max-h-[400px] object-cover" />
          </motion.div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-indigo-500 rounded-full" />
                Job Description
              </h2>
              <div className="glass-card p-8 sm:p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                <div className="text-slate-300 text-base sm:text-lg leading-[1.8] font-sans whitespace-pre-line" style={{ wordBreak: 'break-word' }}>
                  {fullDescription}
                </div>
              </div>
            </section>
          </motion.div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] sticky top-32">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {tags.length > 0 ? tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
                    {tag}
                  </span>
                )) : (
                  <span className="text-slate-500 text-sm">Not specified</span>
                )}
              </div>

              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 mt-10">Summary</h3>
              <div className="space-y-4">
                {[
                  { label: 'Role', value: job.title },
                  { label: 'Type', value: type },
                  { label: 'Experience', value: expLevel },
                  { label: 'Deadline', value: job.deadline || 'Ongoing' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
                    <span className="text-sm font-bold text-slate-200 text-right max-w-[60%] truncate" title={value}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
