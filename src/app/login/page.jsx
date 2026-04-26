'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Chrome, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/ui/Logo';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { authApi } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
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
        toast.error(response.message || 'Login failed.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden" style={{ background: '#020617' }}>
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ background: 'var(--accent)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ background: '#8b5cf6', animationDelay: '2s' }} />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      {/* Floating Decorative Cards (Background) */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 right-[15%] hidden xl:block glass-card p-4 rounded-xl border border-white/5 opacity-40 rotate-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">P</div>
          <div>
            <div className="text-[10px] text-white/40">New Job at Pathao</div>
            <div className="text-xs text-white/80 font-medium">Software Engineer</div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 left-[15%] hidden xl:block glass-card p-4 rounded-xl border border-white/5 opacity-40 -rotate-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">B</div>
          <div>
            <div className="text-[10px] text-white/40">Success Story</div>
            <div className="text-xs text-white/80 font-medium">Hired at bKash</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1100px] grid lg:grid-cols-2 glass-card rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative z-10"
        style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)' }}
      >
        {/* Visual Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-950/50 to-slate-950/50 border-r border-white/5">
          <div>
            <Logo size="md" />
          </div>
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <Sparkles size={12} /> Over 1,200+ engineers hired
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.1]">
              The home of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">Bangladesh's best</span> <br />
              tech talent.
            </h1>
            <div className="space-y-4">
              {[
                'Access 450+ verified tech roles',
                'Verified companies like Pathao, bKash',
                'Transparent salary ranges',
                'Direct connection with recruiters'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-sm text-slate-400 italic mb-4">"Found my current role at Pathao through Tech_Jobs. The process was seamless and the listings are truly curated."</p>
            <div className="flex items-center gap-3">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=TariqulIslam&backgroundColor=b6e3f4" className="w-10 h-10 rounded-full border border-indigo-500/30" alt="User" />
              <div>
                <p className="text-sm font-bold text-white">Tariqul Islam</p>
                <p className="text-xs text-indigo-400">Senior Engineer @ Pathao</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="lg:hidden mb-8"><Logo size="sm" /></div>
          
          <div className="mb-10 text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-slate-400">Login to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Email</label>
              <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-indigo-500/50 transition-all">
                <Mail size={18} className="text-slate-500" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="bg-transparent outline-none text-white w-full text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
                <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</Link>
              </div>
              <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-indigo-500/50 transition-all">
                <Lock size={18} className="text-slate-500" />
                <input 
                  type={showPass ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent outline-none text-white w-full text-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button 
              type="submit" 
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Logging in...' : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-xs text-slate-500 font-medium">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <button 
            onClick={() => googleLogin()}
            className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          >
            <Chrome size={18} className="text-white" />
            Google Account
          </button>

          <p className="mt-10 text-center text-sm text-slate-500">
            Don't have an account? {' '}
            <Link href="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">Sign up for free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
