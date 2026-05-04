'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Chrome, CheckCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/ui/Logo';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { authApi } from '@/lib/api';

const PERKS = [
  'Access 12,000+ premium tech roles',
  'Salary transparency on every listing',
  'Remote-first job board',
  'Apply in one click',
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, refreshProfile } = useAuth();
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setLoading(true);
      try {
        const response = await authApi.googleAuth({ code: codeResponse.code });
        const token = response.data?.access || response.data?.access_token;
        if (response.success && token) {
          localStorage.setItem('access_token', token);
          await refreshProfile(token);
          toast.success('Google login successful! 🚀');
          router.push('/');
        } else {
          toast.error(response.message || 'Google authentication failed.');
        }
      } catch (err) {
        console.error('Google login error:', err);
        toast.error('Failed to authenticate with Google.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => toast.error('Google login failed.')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await login({ email, password });
      if (response.success) {
        toast.success('Welcome back!');
        router.push('/');
      } else {
        const errorMsg = response.message || 'Login failed. Please check your credentials.';
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0d2b 0%, #1a0a3b 50%, #0d1a3b 100%)' }}
      >
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-30 float-1"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full blur-3xl opacity-20 float-2"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="relative z-10"><Logo size="md" /></div>

        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold"
              style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)' }}>
              <Sparkles size={12} /> Join 98,000+ tech professionals
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Your Next Big Role<br />
              <span className="gradient-text">Starts Here.</span>
            </h2>
            <p className="text-white/60 text-base mb-8">
              Sign in to access curated tech jobs from innovative companies.
            </p>
            <ul className="space-y-3">
              {PERKS.map((perk, i) => (
                <motion.li key={perk} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-white/70">
                  <CheckCircle size={16} style={{ color: '#818cf8', flexShrink: 0 }} />
                  {perk}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="relative z-10 glass rounded-2xl p-5"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-sm text-white/70 italic mb-3">
            "Found my dream job at Vercel through Tech_Jobs in under 3 weeks. Incredible platform."
          </p>
          <div className="flex items-center gap-2">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen&backgroundColor=b6e3f4"
              className="w-8 h-8 rounded-full" alt="Sarah" />
            <div>
              <p className="text-xs font-semibold text-white">Sarah Chen</p>
              <p className="text-xs text-white/50">Senior Engineer @ Vercel</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center"><Logo size="md" /></div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Welcome back</h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              No account?{' '}
              <Link href="/register" className="font-semibold link-hover" style={{ color: 'var(--accent)' }}>
                Sign up free
              </Link>
            </p>
          </div>

          <motion.button onClick={() => googleLogin()} disabled={loading} whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm font-semibold transition-all cursor-pointer"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
            <Chrome size={18} style={{ color: '#4285f4' }} />
            Continue with Google
          </motion.button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>or sign in with email</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Email address</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl input-glow" style={inputStyle}>
                <Mail size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--foreground)' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>Password</label>
                <Link href="#" className="text-xs font-medium link-hover" style={{ color: 'var(--accent)' }}>
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl input-glow" style={inputStyle}>
                <Lock size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--foreground)' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ color: 'var(--muted)' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <div onClick={() => setRemember(!remember)}
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: remember ? 'var(--accent)' : 'var(--surface-2)', border: remember ? '1px solid var(--accent)' : '1px solid var(--border)' }}>
                {remember && <CheckCircle size={12} color="white" />}
              </div>
              <span className="text-sm" style={{ color: 'var(--muted)' }}>Remember me for 30 days</span>
            </label>

            <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}>
              {loading ? (
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ) : (<>Sign In <ArrowRight size={16} /></>)}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
