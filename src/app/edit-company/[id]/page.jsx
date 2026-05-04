'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Building2, MapPin, Globe, Image as ImageIcon, AlignLeft, CheckCircle, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { companiesApi } from '@/lib/api';

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

export default function EditCompanyPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [form, setForm] = useState({
    company_name: '',
    industry: '',
    location: '',
    website: '',
    logo_url: '',
    banner_image_url: '',
    short_description: '',
    full_description: '',
  });

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await companiesApi.get(parseInt(id));
        if (response.success) {
          setForm({
            company_name: response.data.company_name,
            industry: response.data.industry,
            location: response.data.location,
            website: response.data.website || '',
            logo_url: response.data.logo_url || '',
            banner_image_url: response.data.banner_image_url || '',
            short_description: response.data.short_description,
            full_description: response.data.full_description,
          });
        }
      } catch (error) {
        console.error('Failed to fetch company:', error);
        toast.error('Failed to load company details.');
      } finally {
        setLoading(false);
      }
    };
    if (user && id) fetchCompany();
  }, [user, id]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-accent" size={40} />
    </div>
  );

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
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Please sign in to edit company details.</p>
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
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (form[key]) formData.append(key, form[key]);
      });
      if (logoFile) formData.append('logo', logoFile);
      if (bannerFile) formData.append('banner_image', bannerFile);

      const response = await companiesApi.update(parseInt(id), formData);
      if (response.success) {
        toast.success('Company updated successfully! 🎉');
        router.push('/manage-companies');
      } else {
        toast.error(response.message || 'Failed to update company.');
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
            Edit <span className="gradient-text">Company Profile</span>
          </h1>
          <p style={{ color: 'var(--muted)' }}>Update your company details below.</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-3xl p-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
          
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FIELD label="Company Name" icon={<Building2 size={13} />} required>
                  <input className={inputCls} style={inputStyle} value={form.company_name} onChange={set('company_name')} />
                </FIELD>
              </div>
              <FIELD label="Industry" icon={<Building2 size={13} />} required>
                <input className={inputCls} style={inputStyle} value={form.industry} onChange={set('industry')} />
              </FIELD>
              <FIELD label="Location" icon={<MapPin size={13} />} required>
                <input className={inputCls} style={inputStyle} value={form.location} onChange={set('location')} />
              </FIELD>
              <FIELD label="Website" icon={<Globe size={13} />}>
                <input type="url" className={inputCls} style={inputStyle} value={form.website} onChange={set('website')} />
              </FIELD>
            </div>
          </div>

          <div className="h-px" style={{ background: 'var(--border)' }} />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>Media Assets</h2>
            <div className="space-y-4">
              <FIELD label="Company Logo (File)" icon={<ImageIcon size={13} />}>
                <input type="file" accept="image/*" className={inputCls} style={inputStyle} onChange={(e) => setLogoFile(e.target.files[0])} />
              </FIELD>
              <FIELD label="Banner Image (File)" icon={<ImageIcon size={13} />}>
                <input type="file" accept="image/*" className={inputCls} style={inputStyle} onChange={(e) => setBannerFile(e.target.files[0])} />
              </FIELD>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FIELD label="Logo URL" icon={<ImageIcon size={13} />}>
                  <input type="url" className={inputCls} style={inputStyle} value={form.logo_url} onChange={set('logo_url')} />
                </FIELD>
                <FIELD label="Banner Image URL" icon={<ImageIcon size={13} />}>
                  <input type="url" className={inputCls} style={inputStyle} value={form.banner_image_url} onChange={set('banner_image_url')} />
                </FIELD>
              </div>
            </div>
          </div>

          <div className="h-px" style={{ background: 'var(--border)' }} />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>Descriptions</h2>
            <div className="space-y-4">
              <FIELD label="Short Description" icon={<AlignLeft size={13} />} required>
                <input className={inputCls} style={inputStyle} value={form.short_description} onChange={set('short_description')} maxLength={150} />
              </FIELD>
              <FIELD label="Full Description" icon={<AlignLeft size={13} />} required>
                <textarea className={inputCls} style={{ ...inputStyle, minHeight: '160px', resize: 'vertical' }} value={form.full_description} onChange={set('full_description')} />
              </FIELD>
            </div>
          </div>

          <motion.button type="submit" disabled={saving} whileHover={{ scale: saving ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-white cursor-pointer mt-2"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.3)' }}>
            {saving ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle size={18} /> Update Company Profile</>}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
