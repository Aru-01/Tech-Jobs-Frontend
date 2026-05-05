'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Trash2, RefreshCw, Search, Lock, Loader2, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { axiosInstance } from '@/lib/axios';
import { getMediaUrl } from '@/lib/utils';

const ROLES = ['job_seeker', 'recruiter', 'admin'];
const ROLE_COLORS = {
  admin: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'rgba(239,68,68,0.25)' },
  recruiter: { bg: 'rgba(99,102,241,0.1)', color: 'var(--accent)', border: 'rgba(99,102,241,0.25)' },
  job_seeker: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', border: 'rgba(16,185,129,0.25)' },
};

export default function AdminUsersPage() {
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [updating, setUpdating] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/api/auth/users/');
      if (res.success && res.data) {
        setUsers(res.data.results || res.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchUsers();
    else if (!authLoading) setLoading(false);
  }, [user, authLoading]);

  const handleRoleChange = async (userId, newRole) => {
    setUpdating(userId);
    try {
      const res = await axiosInstance.patch(`/api/auth/users/${userId}/`, { role: newRole });
      if (res.success) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        toast.success(`Role updated to ${newRole}`);
      } else {
        toast.error(res.message || 'Failed to update role');
      }
    } catch (e) {
      toast.error('Failed to update role');
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This cannot be undone.')) return;
    setDeleting(userId);
    try {
      await axiosInstance.delete(`/api/auth/users/${userId}/`);
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast.success('User deleted successfully');
    } catch (e) {
      toast.error('Failed to delete user');
    } finally {
      setDeleting(null);
    }
  };

  const filteredUsers = users.filter(u =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin" size={36} style={{ color: 'var(--accent)' }} />
    </div>
  );

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center p-10 glass-card rounded-3xl max-w-sm">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <Lock size={28} style={{ color: '#ef4444' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Admin Only</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>This page is restricted to admin accounts.</p>
          <Link href="/">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              Go Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24" style={{ background: 'var(--background)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 text-xs font-semibold"
              style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
              <Shield size={12} /> Admin Panel
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
              Manage <span className="gradient-text">Users</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              {users.length} total users registered
            </p>
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}>
            <RefreshCw size={15} /> Refresh
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="grid grid-cols-3 gap-4 mb-8">
          {ROLES.map((role) => {
            const count = users.filter(u => u.role === role).length;
            const style = ROLE_COLORS[role];
            return (
              <div key={role} className="glass-card rounded-2xl p-5">
                <div className="text-2xl font-bold mb-1" style={{ color: style.color }}>{count}</div>
                <div className="text-xs capitalize" style={{ color: 'var(--muted)' }}>{role.replace('_', ' ')}s</div>
              </div>
            );
          })}
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          />
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>

          <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-base font-bold" style={{ color: 'var(--foreground)' }}>
              All Users
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)' }}>
                {filteredUsers.length}
              </span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['User', 'Email', 'Role', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((u, i) => {
                    const roleStyle = ROLE_COLORS[u.role] || ROLE_COLORS.job_seeker;
                    return (
                      <motion.tr key={u.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.04 }}
                        style={{ borderBottom: '1px solid var(--border)' }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 overflow-hidden"
                              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                              {u.profile_image_url || u.profile_image ? (
                                <img src={getMediaUrl(u.profile_image_url || u.profile_image)} alt={u.full_name} className="w-full h-full object-cover" />
                              ) : (
                                u.full_name?.[0]?.toUpperCase() || 'U'
                              )}
                            </div>
                            <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{u.full_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm" style={{ color: 'var(--muted)' }}>{u.email}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative inline-block">
                            <select
                              value={u.role}
                              onChange={e => handleRoleChange(u.id, e.target.value)}
                              disabled={updating === u.id || u.id === user.id}
                              className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-semibold cursor-pointer outline-none transition-all"
                              style={{ background: roleStyle.bg, color: roleStyle.color, border: `1px solid ${roleStyle.border}` }}
                            >
                              {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                            </select>
                            {updating === u.id ? (
                              <Loader2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin" style={{ color: roleStyle.color }} />
                            ) : (
                              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: roleStyle.color }} />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs" style={{ color: 'var(--muted)' }}>
                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {u.id !== user.id ? (
                            <motion.button
                              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(u.id)}
                              disabled={deleting === u.id}
                              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                              style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
                              title="Delete user"
                            >
                              {deleting === u.id
                                ? <Loader2 size={14} className="animate-spin" />
                                : <Trash2 size={14} />}
                            </motion.button>
                          ) : (
                            <span className="text-xs" style={{ color: 'var(--muted)' }}>You</span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-16" style={{ color: 'var(--muted)' }}>
                <Users size={32} className="mx-auto mb-3 opacity-40" />
                <p>No users found.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
