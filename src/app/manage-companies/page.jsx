'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Plus, Search, MoreVertical, 
  ExternalLink, Edit2, Trash2, CheckCircle2, 
  Clock, AlertCircle 
} from 'lucide-react';
import { MANAGE_COMPANIES } from '@/lib/mockData';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { dashboardApi } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Lock } from 'lucide-react';

export default function ManageCompaniesPage() {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await dashboardApi.myCompanies();
        if (response.success) {
          setCompanies(response.data.results || response.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch companies', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchCompanies();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading) return null;

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
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Please sign in to manage your company profiles.</p>
          <Link href="/login">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              Sign In
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const filtered = companies.filter(c => 
    c.company_name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this company profile?')) {
      setCompanies(companies.filter(c => c.id !== id));
      toast.success('Company deleted successfully');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'verified': return { bg: 'rgba(16,185,129,0.1)', text: '#10b981', icon: <CheckCircle2 size={12} /> };
      case 'pending': return { bg: 'rgba(245,158,11,0.1)', text: '#f59e0b', icon: <Clock size={12} /> };
      case 'alert': return { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', icon: <AlertCircle size={12} /> };
      default: return { bg: 'rgba(255,255,255,0.05)', text: '#fff', icon: null };
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 size={14} />
            Recruiter Dashboard
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage <span className="text-gradient">Company Profiles</span></h1>
          <p className="text-white/40">Register and manage your company presence on Tech_Jobs.</p>
        </div>
        <Link href="/add-company">
          <Button variant="primary" className="!rounded-2xl !px-8 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Plus size={20} className="mr-2" />
            Add New Company
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Total Companies', val: companies.length, icon: <Building2 className="text-accent" /> },
          { label: 'Verified', val: companies.length, icon: <CheckCircle2 className="text-emerald-400" /> },
          { label: 'Active Jobs', val: 0, icon: <Plus className="text-purple-400" /> },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.val}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Area */}
      <div className="glass-card rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between bg-white/[0.02]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-accent/50 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Company Name</th>
                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Industry</th>
                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Active Jobs</th>
                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filtered.map((company) => {
                  const status = getStatusStyle('verified');
                  return (
                    <motion.tr
                      key={company.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center font-bold text-white text-xs overflow-hidden">
                            {company.logo_url ? <img src={company.logo_url} className="w-full h-full object-cover"/> : (company.company_name?.[0] || 'C')}
                          </div>
                          <div>
                            <Link href={`/companies/${company.id}`} className="text-sm font-bold text-white hover:text-accent transition-colors">
                              {company.company_name || 'Untitled Company'}
                            </Link>
                            <div className="text-xs text-white/40">{company.location || 'Unknown Location'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-white/70">{company.industry}</td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-white">0</span>
                      </td>
                      <td className="px-6 py-5">
                        <div 
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                          style={{ 
                            backgroundColor: company.is_verified ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', 
                            color: company.is_verified ? '#10b981' : '#f59e0b' 
                          }}
                        >
                          {company.is_verified ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          {company.is_verified ? 'Verified' : 'Pending'}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/edit-company/${company.id}`}>
                            <button className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                              <Edit2 size={16} />
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleDelete(company.id)}
                            className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                          <Link href={`/companies/${company.id}`}>
                            <button className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-accent hover:bg-accent/10 transition-all">
                              <ExternalLink size={16} />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center text-white/40 text-sm">
              No companies found. Add one to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
