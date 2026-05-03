'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Briefcase, MapPin, DollarSign, Calendar, Building2, Image, AlignLeft, Tag, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import toast from 'react-hot-toast';

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

export default function AddJobPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', shortDesc: '', fullDesc: '', salary: '', location: '',
    type: 'Full-time', deadline: '', company: '', logoUrl: '', bannerUrl: '', tags: '',
  });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (isLoading) return null;
  if (!isLoggedIn) {
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
    if (!form.title || !form.company || !form.salary || !form.location) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success('Job posted successfully! 🎉 Your listing is now live.');
    setForm({ title: '', shortDesc: '', fullDesc: '', salary: '', location: '', type: 'Full-time', deadline: '', company: '', logoUrl: '', bannerUrl: '', tags: '' });
  };

  return (
    <div className="min-h-screen py-24" style={{ background: 'var(--background)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

          {/* Section: Role Info */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>
              Role Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FIELD label="Job Title" icon={<Briefcase size={13} />} required>
                  <input className={inputCls} style={inputStyle} value={form.title} onChange={set('title')} placeholder="e.g. Senior Frontend Engineer" />
                </FIELD>
              </div>
              <FIELD label="Salary Range" icon={<DollarSign size={13} />} required>
                <input className={inputCls} style={inputStyle} value={form.salary} onChange={set('salary')} placeholder="e.g. $120K – $160K" />
              </FIELD>
              <FIELD label="Job Type" icon={<Briefcase size={13} />} required>
                <select className={inputCls} style={inputStyle} value={form.type} onChange={set('type')}>
                  {['Full-time', 'Part-time', 'Contract', 'Freelance'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </FIELD>
              <FIELD label="Location" icon={<MapPin size={13} />} required>
                <input className={inputCls} style={inputStyle} value={form.location} onChange={set('location')} placeholder="e.g. Remote / San Francisco" />
              </FIELD>
              <FIELD label="Application Deadline" icon={<Calendar size={13} />}>
                <input type="date" className={inputCls} style={inputStyle} value={form.deadline} onChange={set('deadline')} />
              </FIELD>
            </div>
          </div>

          <div className="h-px" style={{ background: 'var(--border)' }} />

          {/* Section: Descriptions */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>
              Descriptions
            </h2>
            <div className="space-y-4">
              <FIELD label="Short Description" icon={<AlignLeft size={13} />} required>
                <input className={inputCls} style={inputStyle} value={form.shortDesc} onChange={set('shortDesc')}
                  placeholder="Brief overview shown in job cards (150 chars)" maxLength={150} />
              </FIELD>
              <FIELD label="Full Description" icon={<AlignLeft size={13} />} required>
                <textarea className={inputCls} style={{ ...inputStyle, minHeight: '160px', resize: 'vertical' }}
                  value={form.fullDesc} onChange={set('fullDesc')}
                  placeholder="Full job description, responsibilities, requirements..." />
              </FIELD>
              <FIELD label="Tech Stack Tags" icon={<Tag size={13} />}>
                <input className={inputCls} style={inputStyle} value={form.tags} onChange={set('tags')}
                  placeholder="React, TypeScript, Node.js (comma separated)" />
              </FIELD>
            </div>
          </div>

          <div className="h-px" style={{ background: 'var(--border)' }} />

          {/* Section: Company */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>
              Company Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FIELD label="Company Name" icon={<Building2 size={13} />} required>
                  <input className={inputCls} style={inputStyle} value={form.company} onChange={set('company')} placeholder="e.g. Acme Corp" />
                </FIELD>
              </div>
              <FIELD label="Company Logo URL" icon={<Image size={13} />}>
                <input className={inputCls} style={inputStyle} value={form.logoUrl} onChange={set('logoUrl')} placeholder="https://..." />
              </FIELD>
              <FIELD label="Banner Image URL" icon={<Image size={13} />}>
                <input className={inputCls} style={inputStyle} value={form.bannerUrl} onChange={set('bannerUrl')} placeholder="https://..." />
              </FIELD>
            </div>
          </div>

          {/* Submit */}
          <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-white cursor-pointer mt-2"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.3)' }}>
            {loading ? (
              <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (<><CheckCircle size={18} /> Publish Job Listing <ArrowRight size={16} /></>)}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
