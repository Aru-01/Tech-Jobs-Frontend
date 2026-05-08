'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Rocket, Briefcase, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden" id="cta">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[#0f172a] to-[#1e1b4b] opacity-80" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)' }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 p-10 sm:p-16 lg:p-20 items-center">
            
            {/* Left Content */}
            <div className="text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
              >
                <Rocket size={16} className="text-indigo-400" />
                <span>Accelerate your career</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white"
              >
                Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">next great opportunity</span> today.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed"
              >
                Join an exclusive network of over 98,000 top-tier engineers. Connect with verified companies offering transparent salaries and remote-first cultures.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link href="/register">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto !px-8 !py-4 text-base font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-shadow">
                    Create Free Profile
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto !px-8 !py-4 text-base font-semibold flex items-center justify-center gap-2 border-white/10 hover:bg-white/5">
                    <Briefcase size={18} />
                    Explore Jobs
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-white/10"
              >
                {['No credit card needed', 'Transparent salaries', 'Direct matches'].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Visuals - Floating Cards */}
            <div className="relative hidden lg:block h-[400px]">
              {/* Card 1 */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-10 top-10 w-80 glass-card p-5 rounded-2xl border border-white/10 shadow-2xl z-20 backdrop-blur-xl bg-white/5"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                      <span className="text-lg font-bold text-indigo-400">V</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Senior Frontend Eng.</h4>
                      <p className="text-indigo-300 text-xs">Vercel</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded font-medium border border-emerald-500/20">$160k - $200k</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/5 rounded-full" />
                  <div className="h-2 w-4/5 bg-white/5 rounded-full" />
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute left-0 bottom-10 w-80 glass-card p-5 rounded-2xl border border-white/10 shadow-2xl z-10 backdrop-blur-xl bg-white/5"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                      <span className="text-lg font-bold text-rose-400">S</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Staff Backend Eng.</h4>
                      <p className="text-rose-300 text-xs">Stripe</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded font-medium border border-emerald-500/20">$200k - $250k</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/5 rounded-full" />
                  <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/5 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/5 rounded-full" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
