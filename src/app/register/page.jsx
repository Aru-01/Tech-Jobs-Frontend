'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Chrome, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/ui/Logo';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { authApi } from '@/lib/api';

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
  const [role, setRole] = useState('job_seeker');
  const [loading, setLoading] = useState(false);
  const { register, refreshProfile } = useAuth();
  const router = useRouter();
  const strength = useMemo(() => getStrength(password), [password]);

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
          toast.success('Welcome to Tech_Jobs! 🚀');
          router.push('/');
        }
      } catch (err) {
        toast.error('Google authentication failed.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await register({ full_name: name, email, password, role });
      if (response.success) {
        toast.success(`Welcome aboard, ${name.split(' ')[0]}!`);
        router.push('/');
      } else {
        toast.error(response.message || 'Registration failed.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden" style={{ background: '#020617' }}>
      {/* Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20" style={{ background: 'var(--accent)' }} />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20" style={{ background: '#8b5cf6' }} />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1100px] grid lg:grid-cols-2 glass-card rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative z-10"
        style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)' }}
      >
        {/* Visual Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-950/50 to-slate-950/50 border-r border-white/5 order-2">
          <div><Logo size="md" /></div>
          
          <div className="space-y-8">
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.1]">
              Start your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">career journey</span> <br />
              with us.
            </h1>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '450+', sub: 'Active Jobs' },
                { label: '1,200+', sub: 'Success Stories' },
                { label: '120+', sub: 'Verified Companies' },
                { label: '24 days', sub: 'Avg. Time to Hire' },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xl font-bold text-white">{s.label}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Verified Platform</p>
              <p className="text-xs text-indigo-300">Hand-picked jobs for Bangladeshi talent</p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-1">
          <div className="lg:hidden mb-8"><Logo size="sm" /></div>
          
          <div className="mb-10 text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400 text-sm">Join the network and land your dream job</p>
          </div>

          {/* Role Toggle */}
          <div className="flex p-1 rounded-2xl bg-white/5 border border-white/10 mb-8">
            <button 
              onClick={() => setRole('job_seeker')}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${role === 'job_seeker' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}
            >
              Job Seeker
            </button>
            <button 
              onClick={() => setRole('recruiter')}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${role === 'recruiter' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}
            >
              Recruiter
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase ml-1">Full Name</label>
              <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-indigo-500/50 transition-all">
                <User size={18} className="text-slate-500" />
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariqul Islam"
                  className="bg-transparent outline-none text-white w-full text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase ml-1">Email</label>
              <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-indigo-500/50 transition-all">
                <Mail size={18} className="text-slate-500" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-transparent outline-none text-white w-full text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase ml-1">Password</label>
              <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-indigo-500/50 transition-all">
                <Lock size={18} className="text-slate-500" />
                <input 
                  type={showPass ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="bg-transparent outline-none text-white w-full text-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-slate-500 hover:text-slate-300">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength */}
              {password.length > 0 && (
                <div className="px-1 pt-1">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(l => (
                      <div key={l} className={`h-1 flex-1 rounded-full ${strength >= l ? '' : 'bg-white/5'}`} style={{ backgroundColor: strength >= l ? STRENGTH_COLORS[strength] : '' }} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: STRENGTH_COLORS[strength] }}>{STRENGTH_LABELS[strength]}</span>
                </div>
              )}
            </div>

            <motion.button 
              type="submit" 
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Creating Account...' : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[10px] text-slate-600 font-bold">OR JOIN WITH</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <button 
            onClick={() => googleLogin()}
            className="w-full py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          >
            <Chrome size={18} />
            Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account? {' '}
            <Link href="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
