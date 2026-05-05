'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Briefcase, MapPin, DollarSign, Calendar, Building2, Image as ImageIcon, AlignLeft, Tag, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { jobsApi, companiesApi } from '@/lib/api';
import { getMediaUrl } from '@/lib/utils';

const FIELD = ({ label, icon, children, required }) => (
  <div>
    <label className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
      <span style={{ color: 'var(--accent)' }}>{icon}</span>
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    {children}
  </div>
);

const inputCls = 'w-full px-4 py-3 rounded-xl text-sm outline-none input-glow transition-all duration-200';
const inputStyle = { background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--foreground)' };

const JOB_TYPES = [
  { label: 'Full-time', value: 'full_time' },
  { label: 'Part-time', value: 'part_time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Internship', value: 'internship' },
];

const EXPERIENCE_LEVELS = [
  { label: 'Entry Level', value: 'entry' },
  { label: 'Mid Level', value: 'mid' },
  { label: 'Senior Level', value: 'senior' },
  { label: 'Director', value: 'director' },
];

export default function AddJobPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [isNewCompany, setIsNewCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [createdCompanyId, setCreatedCompanyId] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [form, setForm] = useState({
    title: '', shortDesc: '', fullDesc: '', salary: '', location: '',
    type: 'full_time', experience: 'mid', deadline: '', company: '', tags: '',
    bannerUrl: ''
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companiesApi.list();
        if (response.success) {
          setCompanies(response.data.results || []);
          if (response.data.results?.length > 0) {
            setForm(f => ({ ...f, company: response.data.results[0].id }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };
    if (user) fetchCompanies();
  }, [user]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (authLoading) return null;
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center p-10 glass-card rounded-3xl max-w-sm">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Lock size={28} style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Access Restricted</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Please sign in to post a job listing.</p>
          <Link href="/login">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              Sign In to Continue
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || (!form.company && !newCompanyName) || !form.salary || !form.location) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (form.deadline) {
      const selected = new Date(form.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        toast.error('Deadline cannot be in the past! 📅');
        return;
      }
    }
    setLoading(true);
    try {
      let companyId = parseInt(form.company);
      
      if (isNewCompany) {
        if (createdCompanyId) {
          companyId = createdCompanyId;
        } else {
          if (!newCompanyName) {
            toast.error('Please enter a new company name.');
            setLoading(false);
            return;
          }
          const compRes = await companiesApi.create({
            company_name: newCompanyName,
            location: form.location || 'Remote',
            industry: 'Technology',
            short_description: 'A newly added company.',
            full_description: 'More details coming soon.'
          });
          if (compRes.success && compRes.data?.id) {
            companyId = compRes.data.id;
            setCreatedCompanyId(companyId);
          } else {
            toast.error(compRes.message || 'Failed to create new company.');
            setLoading(false);
            return;
          }
        }
      }

      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('short_description', form.shortDesc);
      formData.append('full_description', form.fullDesc);
      // Ensure salary is a number
      const salaryNum = parseFloat(form.salary.toString().replace(/[^0-9.]/g, '')) || 0;
      formData.append('salary', salaryNum);
      formData.append('location', form.location);
      formData.append('job_type', form.type);
      formData.append('experience_level', form.experience);
      formData.append('deadline', form.deadline);
      const tags = form.tags ? form.tags.split(',').map(t => t.trim()).filter(t => t) : [];
      formData.append('tech_stack', JSON.stringify(tags));
      formData.append('company', companyId);
      if (form.bannerUrl) formData.append('banner_image_url', form.bannerUrl);
      if (bannerFile) formData.append('banner_image', bannerFile);

      if (!companyId) {
        toast.error('Please select or add a company.');
        setLoading(false);
        return;
      }

      if (!form.deadline) {
        formData.delete('deadline');
      }

      const response = await jobsApi.create(formData);
      if (response.success) {
        toast.success('Job posted successfully! 🎉');
        router.push(`/jobs/${response.data.id}`);
      } else {
        toast.error(response.message || 'Failed to post job.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error('Post job error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24" style={{ background: 'var(--background)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Briefcase size={12} /> Post a Job
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
            Hire Top <span className="gradient-text">Tech Talent</span>
          </h1>
          <p style={{ color: 'var(--muted)' }}>Fill in the details below to create your job listing.</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 rounded-3xl p-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>Role Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FIELD label="Job Title" icon={<Briefcase size={13} />} required>
                  <input className={inputCls} style={inputStyle} value={form.title} onChange={set('title')} placeholder="e.g. Senior Frontend Engineer" />
                </FIELD>
              </div>
              <FIELD label="Salary Range (BDT)" icon={<span>৳</span>} required>
                <input type="number" className={inputCls} style={inputStyle} value={form.salary} onChange={set('salary')} placeholder="e.g. 80000" />
              </FIELD>
              <FIELD label="Job Type" icon={<Briefcase size={13} />} required>
                <select className={inputCls} style={inputStyle} value={form.type} onChange={set('type')}>
                  {JOB_TYPES.map((t) => (<option key={t.value} value={t.value}>{t.label}</option>))}
                </select>
              </FIELD>
              <FIELD label="Experience Level" icon={<Briefcase size={13} />} required>
                <select className={inputCls} style={inputStyle} value={form.experience} onChange={set('experience')}>
                  {EXPERIENCE_LEVELS.map((e) => (<option key={e.value} value={e.value}>{e.label}</option>))}
                </select>
              </FIELD>
              <FIELD label="Location" icon={<MapPin size={13} />} required>
                <input className={inputCls} style={inputStyle} value={form.location} onChange={set('location')} placeholder="e.g. Remote / San Francisco" />
              </FIELD>
              <FIELD label="Deadline" icon={<Calendar size={13} />}>
                <input type="date" className={inputCls} style={inputStyle} value={form.deadline} onChange={set('deadline')} />
              </FIELD>
            </div>
          </div>

          <div className="h-px" style={{ background: 'var(--border)' }} />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>Descriptions</h2>
            <div className="space-y-4">
              <FIELD label="Short Description" icon={<AlignLeft size={13} />} required>
                <input className={inputCls} style={inputStyle} value={form.shortDesc} onChange={set('shortDesc')} maxLength={150} />
              </FIELD>
              <FIELD label="Full Description" icon={<AlignLeft size={13} />} required>
                <textarea className={inputCls} style={{ ...inputStyle, minHeight: '160px', resize: 'vertical' }} value={form.fullDesc} onChange={set('fullDesc')} />
              </FIELD>
              <FIELD label="Tech Stack Tags" icon={<Tag size={13} />}>
                <input className={inputCls} style={inputStyle} value={form.tags} onChange={set('tags')} placeholder="React, Node.js..." />
              </FIELD>
            </div>
          </div>

          <div className="h-px" style={{ background: 'var(--border)' }} />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>Media & Company</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--foreground)' }}>
                    <span style={{ color: 'var(--accent)' }}><Building2 size={13} /></span>Company *
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>
                    <input type="checkbox" checked={isNewCompany} onChange={(e) => setIsNewCompany(e.target.checked)} className="rounded accent-indigo-500" />
                    Add New Company
                  </label>
                </div>
                {isNewCompany ? (
                  <input className={inputCls} style={inputStyle} value={newCompanyName} onChange={(e) => setNewCompanyName(e.target.value)} placeholder="New company name..." />
                ) : (
                  <select className={inputCls} style={inputStyle} value={form.company} onChange={set('company')}>
                    <option value="" disabled>Select an existing company</option>
                    {companies.map((c) => (<option key={c.id} value={c.id}>{c.company_name}</option>))}
                  </select>
                )}
              </div>
              <div className="sm:col-span-2">
                <FIELD label="Banner Image (File)" icon={<ImageIcon size={13} />}>
                  <input type="file" accept="image/*" className={inputCls} style={inputStyle} onChange={(e) => setBannerFile(e.target.files[0])} />
                </FIELD>
              </div>
              <div className="sm:col-span-2">
                <FIELD label="Banner Image URL (Optional)" icon={<ImageIcon size={13} />}>
                  <input className={inputCls} style={inputStyle} value={form.bannerUrl} onChange={set('bannerUrl')} placeholder="https://..." />
                </FIELD>
              </div>
            </div>
          </div>

          <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-white cursor-pointer mt-2"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.3)' }}>
            {loading ? <CheckCircle size={18} className="animate-spin" /> : <><CheckCircle size={18} /> Publish Job Listing <ArrowRight size={16} /></>}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
