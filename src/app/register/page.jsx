'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Chrome, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/ui/Logo';
import toast from 'react-hot-toast';

function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^a-zA-Z0-9]/.test(pw)) s++;
  return s;
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['', '#ef4444', '#f59e0b', '#6366f1', '#10b981'];

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const strength = useMemo(() => getStrength(password), [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error('Please fill all fields.'); return; }
    if (strength < 2) { toast.error('Please choose a stronger password.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    login({ name, email, avatar: initials, role: 'recruiter' });
    toast.success(`Welcome to Tech_Jobs, ${name.split(' ')[0]}! 🚀`);
    router.push('/');
  };

  const inputStyle = { background: 'var(--surface-2)', border: '1px solid var(--border)' };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      {/* Left Panel */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a20 0%, #1a0535 50%, #050d1f 100%)' }}>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-25 float-1"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full blur-3xl opacity-20 float-2"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
        <div className="absolute inset-0 dot-pattern opacity-10" />

        <div className="relative z-10 mb-12"><Logo size="md" /></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Join the Premier<br />
            <span className="gradient-text">Tech Job Community</span>
          </h2>
          <p className="text-white/60 mb-8">
            Create your free account and get instant access to thousands of curated tech roles.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '12K+', sub: 'Active Jobs' },
              { label: '98K+', sub: 'Hired' },
              { label: '3.2K+', sub: 'Companies' },
              { label: '18 days', sub: 'Avg. Hire Time' },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-2xl font-bold gradient-text">{s.label}</div>
                <div className="text-xs text-white/50 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center"><Logo size="md" /></div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Create your account</h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Already have an account?{' '}
              <Link href="/login" className="font-semibold link-hover" style={{ color: 'var(--accent)' }}>Sign in</Link>
            </p>
          </div>

          {/* Google */}
          <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm font-semibold cursor-pointer"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
            <Chrome size={18} style={{ color: '#4285f4' }} />
            Sign up with Google
          </motion.button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>or with email</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Full Name</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl input-glow" style={inputStyle}>
                <User size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--foreground)' }} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Email Address</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl input-glow" style={inputStyle}>
                <Mail size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--foreground)' }} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Password</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl input-glow" style={inputStyle}>
                <Lock size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters"
                  className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--foreground)' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ color: 'var(--muted)' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Strength meter */}
              {password.length > 0 && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                  <div className="flex gap-1.5 mb-1.5">
                    {[1, 2, 3, 4].map((level) => (
                      <div key={level} className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{ background: strength >= level ? STRENGTH_COLORS[strength] : 'var(--border)' }} />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: STRENGTH_COLORS[strength] }}>
                    {STRENGTH_LABELS[strength]}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Terms */}
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              By creating an account, you agree to our{' '}
              <Link href="#" className="link-hover" style={{ color: 'var(--accent)' }}>Terms</Link>
              {' & '}
              <Link href="#" className="link-hover" style={{ color: 'var(--accent)' }}>Privacy Policy</Link>
            </p>

            {/* Submit */}
            <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}>
              {loading ? (
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ) : (<>Create Account <ArrowRight size={16} /></>)}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
