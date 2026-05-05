'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Briefcase, MapPin, DollarSign, Calendar, Building2, Image as ImageIcon, AlignLeft, Tag, Lock, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { jobsApi, companiesApi } from '@/lib/api';

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

export default function EditJobPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [bannerFile, setBannerFile] = useState(null);
  const [form, setForm] = useState({
    title: '', shortDesc: '', fullDesc: '', salary: '', location: '',
    type: 'full_time', experience: 'mid', deadline: '', company: '', tags: '',
    bannerUrl: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobRes, compRes] = await Promise.all([
          jobsApi.get(parseInt(id)),
          companiesApi.list()
        ]);

        if (jobRes.success) {
          const job = jobRes.data;
          setForm({
            title: job.title,
            shortDesc: job.short_description,
            fullDesc: job.full_description,
            salary: job.salary.toString(),
            location: job.location,
            type: job.job_type,
            experience: job.experience_level,
            deadline: job.deadline,
            company: job.company,
            tags: (job.tech_stack || []).join(', '),
            bannerUrl: job.banner_image_url || ''
          });
        }

        if (compRes.success) {
          setCompanies(compRes.data.results || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };
    if (user && id) fetchData();
  }, [user, id]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-accent" size={40} />
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('short_description', form.shortDesc);
      formData.append('full_description', form.fullDesc);
      formData.append('salary', parseFloat(form.salary.replace(/[^0-9.]/g, '')) || 0);
      formData.append('location', form.location);
      formData.append('job_type', form.type);
      formData.append('experience_level', form.experience);
      formData.append('deadline', form.deadline);
      formData.append('tech_stack', JSON.stringify(form.tags.split(',').map(t => t.trim()).filter(t => t)));
      formData.append('company', parseInt(form.company));
      if (form.bannerUrl) formData.append('banner_image_url', form.bannerUrl);
      if (bannerFile) formData.append('banner_image', bannerFile);

      const response = await jobsApi.update(parseInt(id), formData);
      if (response.success) {
        toast.success('Job updated successfully! 🎉');
        router.push('/manage-jobs');
      } else {
        toast.error(response.message || 'Failed to update job.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen py-24" style={{ background: 'var(--background)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
            Edit <span className="gradient-text">Job Listing</span>
          </h1>
          <p style={{ color: 'var(--muted)' }}>Update your job details below.</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-3xl p-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
          
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>Role Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FIELD label="Job Title" icon={<Briefcase size={13} />} required>
                  <input className={inputCls} style={inputStyle} value={form.title} onChange={set('title')} />
                </FIELD>
              </div>
              <FIELD label="Salary Range (BDT)" icon={<span>৳</span>} required>
                <input type="number" className={inputCls} style={inputStyle} value={form.salary} onChange={set('salary')} placeholder="e.g. 80000" />
              </FIELD>
              <FIELD label="Job Type" icon={<Briefcase size={13} />} required>
                <select className={inputCls} style={inputStyle} value={form.type} onChange={set('type')}>
                  {JOB_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </FIELD>
              <FIELD label="Experience Level" icon={<Briefcase size={13} />} required>
                <select className={inputCls} style={inputStyle} value={form.experience} onChange={set('experience')}>
                  {EXPERIENCE_LEVELS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                </select>
              </FIELD>
              <FIELD label="Location" icon={<MapPin size={13} />} required>
                <input className={inputCls} style={inputStyle} value={form.location} onChange={set('location')} />
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
              <FIELD label="Tech Stack" icon={<Tag size={13} />}>
                <input className={inputCls} style={inputStyle} value={form.tags} onChange={set('tags')} placeholder="React, Python..." />
              </FIELD>
            </div>
          </div>

          <div className="h-px" style={{ background: 'var(--border)' }} />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>Media & Company</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FIELD label="Company" icon={<Building2 size={13} />} required>
                  <select className={inputCls} style={inputStyle} value={form.company} onChange={set('company')}>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                  </select>
                </FIELD>
              </div>
              <div className="sm:col-span-2">
                <FIELD label="Banner Image (File)" icon={<ImageIcon size={13} />}>
                  <input type="file" accept="image/*" className={inputCls} style={inputStyle} onChange={(e) => setBannerFile(e.target.files[0])} />
                </FIELD>
              </div>
              <div className="sm:col-span-2">
                <FIELD label="Banner Image URL" icon={<ImageIcon size={13} />}>
                  <input className={inputCls} style={inputStyle} value={form.bannerUrl} onChange={set('bannerUrl')} />
                </FIELD>
              </div>
            </div>
          </div>

          <motion.button type="submit" disabled={saving} whileHover={{ scale: saving ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-white cursor-pointer mt-2"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.3)' }}>
            {saving ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle size={18} /> Update Listing</>}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
