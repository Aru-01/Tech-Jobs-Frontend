'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LayoutDashboard, Plus, Eye, Trash2, Lock, TrendingUp, Users, Briefcase, Clock, ExternalLink, Edit2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { MANAGE_JOBS } from '@/lib/mockData';
import Badge from '@/components/ui/Badge';
import toast from 'react-hot-toast';
import { dashboardApi } from '@/lib/api';

const STATUS_COLOR = { active: 'active', paused: 'paused', closed: 'closed' };

export default function ManageJobsPage() {
  const { user, loading: authLoading } = useAuth();
  const isLoggedIn = !!user;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await dashboardApi.myJobs();
        if (response.success) {
          setJobs(response.data.results || response.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchJobs();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading) return null;

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
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Please sign in to manage your job listings.</p>
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

  const handleDelete = async (id) => {
    setDeleting(id);
    await new Promise((r) => setTimeout(r, 700));
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setDeleting(null);
    toast.success('Job listing removed.', {
      style: { background: 'var(--surface)', color: 'var(--foreground)', border: '1px solid var(--border)' }
    });
  };

  const stats = [
    { label: 'Total Listings', value: jobs.length, icon: <Briefcase size={18} />, color: '#6366f1' },
    { label: 'Active', value: jobs.length, icon: <TrendingUp size={18} />, color: '#10b981' },
    { label: 'Total Applicants', value: 0, icon: <Users size={18} />, color: '#8b5cf6' },
    { label: 'Avg. Applicants', value: 0, icon: <Clock size={18} />, color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen py-24" style={{ background: 'var(--background)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 text-xs font-semibold"
              style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <LayoutDashboard size={12} /> Recruiter Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
              Manage <span className="gradient-text">Your Listings</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Welcome back, <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{user?.name}</span>
            </p>
          </div>
          <Link href="/add-job">
            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 25px rgba(99,102,241,0.3)' }}>
              <Plus size={16} /> Post New Job
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="glass-card rounded-2xl p-5"
              whileHover={{ y: -3 }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                  <span style={{ color: s.color }}>{s.icon}</span>
                </div>
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Jobs Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>

          {/* Table Header */}
          <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-base font-bold" style={{ color: 'var(--foreground)' }}>
              Active Listings <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)' }}>{jobs.length}</span>
            </h2>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <Briefcase size={24} style={{ color: 'var(--muted)' }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>No listings yet</h3>
              <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>Post your first job to start finding great candidates.</p>
              <Link href="/add-job">
                <motion.button whileHover={{ scale: 1.03 }} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  Post a Job
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Job Title', 'Company', 'Salary', 'Applicants', 'Status', 'Created', 'Actions'].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {jobs.map((job, i) => (
                      <motion.tr key={job.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="group transition-colors duration-150"
                        style={{ borderBottom: '1px solid var(--border)' }}
                        whileHover={{ backgroundColor: 'rgba(99,102,241,0.03)' }}
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{job.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm" style={{ color: 'var(--muted)' }}>{job.company_details?.company_name || 'N/A'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium" style={{ color: '#10b981' }}>{job.salary}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <Users size={13} style={{ color: 'var(--muted)' }} />
                            <span className="text-sm" style={{ color: 'var(--foreground)' }}>0</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {job.is_active ? (
                            <Badge color="active" dot>Active</Badge>
                          ) : (
                            <Badge color="closed" dot>Expired</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs" style={{ color: 'var(--muted)' }}>{new Date(job.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link href={`/jobs/${job.id}`}>
                              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                                style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)' }}
                                title="View">
                                <Eye size={14} />
                              </motion.button>
                            </Link>
                            <Link href={`/edit-job/${job.id}`}>
                              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                                style={{ background: 'rgba(139,92,246,0.1)', color: 'var(--accent-2)' }}
                                title="Edit">
                                <Edit2 size={14} />
                              </motion.button>
                            </Link>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(job.id)}
                              disabled={deleting === job.id}
                              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                              style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
                              title="Delete">
                              {deleting === job.id ? (
                                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="3" strokeOpacity="0.3" />
                                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                              ) : <Trash2 size={14} />}
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
