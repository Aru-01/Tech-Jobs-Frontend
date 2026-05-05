'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Plus, Search, MoreVertical, 
  ExternalLink, Edit2, Trash2, CheckCircle2, 
  Clock, AlertCircle 
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { dashboardApi, companiesApi } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { getMediaUrl } from '@/lib/utils';
import { Lock, Loader2, ShieldCheck, ChevronDown } from 'lucide-react';
import { axiosInstance } from '@/lib/axios';

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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

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
    c.company_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.industry?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this company profile?')) {
      try {
        await companiesApi.delete(id);
        setCompanies(companies.filter(c => c.id !== id));
        toast.success('Company deleted successfully');
      } catch (error) {
        toast.error('Failed to delete company');
      }
    }
  };

  const handleStatusChange = async (id, isVerified) => {
    try {
      const res = await companiesApi.update(id, { is_verified: isVerified });
      if (res.id || res.success) {
        setCompanies(prev => prev.map(c => c.id === id ? { ...c, is_verified: isVerified } : c));
        toast.success(`Company status updated to ${isVerified ? 'Verified' : 'Pending'}`);
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Building2 size={14} />
            Recruiter Dashboard
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            Manage <span className="gradient-text">Company Profiles</span>
          </h1>
          <p style={{ color: 'var(--muted)' }}>Register and manage your company presence on Tech_Jobs.</p>
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
          { label: 'Verified', val: companies.filter(c => c.is_verified).length, icon: <CheckCircle2 className="text-emerald-500" /> },
          { label: 'Total Jobs', val: 0, icon: <Plus className="text-purple-500" /> },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{stat.val}</div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Area */}
      <div className="glass-card rounded-[32px] overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-4 justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-2xl text-sm transition-all focus:outline-none"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {['Company Name', 'Industry', 'Jobs', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((company) => (
                  <motion.tr
                    key={company.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-accent/[0.03] transition-colors"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs overflow-hidden flex-shrink-0" 
                          style={{ background: 'var(--surface-2)', color: 'var(--accent)', border: '1px solid var(--border)' }}>
                          {company.logo || company.logo_url ? (
                            <img src={getMediaUrl(company.logo || company.logo_url)} className="w-full h-full object-cover"/>
                          ) : (
                            company.company_name?.[0] || 'C'
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Link href={`/companies/${company.id}`} className="text-sm font-bold hover:text-accent transition-colors" style={{ color: 'var(--foreground)' }}>
                              {company.company_name || 'Untitled Company'}
                            </Link>
                            {company.is_verified && (
                              <ShieldCheck size={14} style={{ color: '#3b82f6' }} title="Verified Company" />
                            )}
                          </div>
                          <div className="text-xs" style={{ color: 'var(--muted)' }}>{company.location || 'Unknown Location'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm" style={{ color: 'var(--muted)' }}>{company.industry}</td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>0</span>
                    </td>
                    <td className="px-6 py-5">
                      {user.role === 'admin' ? (
                        <div className="relative inline-block">
                          <select
                            value={company.is_verified ? 'verified' : 'pending'}
                            onChange={(e) => handleStatusChange(company.id, e.target.value === 'verified')}
                            className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer outline-none transition-all"
                            style={{ 
                              backgroundColor: company.is_verified ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', 
                              color: company.is_verified ? '#10b981' : '#f59e0b',
                              border: `1px solid ${company.is_verified ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                          </select>
                          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                        </div>
                      ) : (
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
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/edit-company/${company.id}`}>
                          <button className="p-2 rounded-xl transition-all" style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
                            <Edit2 size={16} />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(company.id)}
                          className="p-2 rounded-xl transition-all" 
                          style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
                        >
                          <Trash2 size={16} />
                        </button>
                        <Link href={`/companies/${company.id}`}>
                          <button className="p-2 rounded-xl transition-all" style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}>
                            <ExternalLink size={16} />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center text-sm" style={{ color: 'var(--muted)' }}>
              No companies found. Add one to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
