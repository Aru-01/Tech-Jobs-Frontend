'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { authApi } from '@/lib/api';
import Button from '@/components/ui/Button';
import { User, Mail, Camera, Save, Loader2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({ full_name: '' });

  useEffect(() => {
    if (user) {
      setFormData({ full_name: user.name || user.full_name || '' });
      setImagePreview(user.profile_image_url || user.profile_image || '');
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload;
      if (imageFile) {
        // File upload: use FormData
        payload = new FormData();
        payload.append('full_name', formData.full_name);
        payload.append('profile_image', imageFile);
      } else {
        // JSON update
        payload = { full_name: formData.full_name };
      }
      const res = await authApi.updateProfile(payload);
      if (res.success) {
        toast.success('Profile updated successfully!');
        setImageFile(null);
        await refreshProfile();
      } else {
        toast.error(res.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl" style={{ color: 'var(--muted)' }}>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 sm:p-12 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32" style={{ background: 'linear-gradient(to right, #6366f1, #8b5cf6)', opacity: 0.8 }} />
        
        <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-start sm:items-end mt-12 mb-10">
          {/* Avatar with upload */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4" style={{ borderColor: 'var(--surface)', background: 'var(--surface-2)' }}>
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold" style={{ color: 'var(--muted)' }}>
                  {formData.full_name?.[0] || 'U'}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <Camera className="text-white" size={20} />
              <span className="text-white text-xs font-semibold">Change</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{user.name || user.full_name}</h1>
            <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: 'var(--accent)' }}>{user.role?.replace('_', ' ')}</p>
            {imageFile && (
              <p className="text-xs mt-2 flex items-center gap-1" style={{ color: '#10b981' }}>
                <Upload size={12} /> {imageFile.name} selected
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--muted)' }} />
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Email Address (Read Only)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--muted)' }} />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 rounded-xl outline-none cursor-not-allowed opacity-70"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading} variant="primary" size="lg" icon={loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
