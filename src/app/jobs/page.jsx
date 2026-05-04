'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, Briefcase, MapPin } from 'lucide-react';
import JobCard from '@/components/cards/JobCard';
import { JOBS, CATEGORIES } from '@/lib/mockData';
import Badge from '@/components/ui/Badge';

const JOB_TYPES = ['All', 'Full-time', 'Part-time', 'Contract'];
const LOCATIONS = ['All', 'Remote', 'San Francisco, CA', 'New York, NY'];

import { jobsApi } from '@/lib/api';

const JOB_TYPE_MAP = {
  'All': '',
  'Full-time': 'full_time',
  'Part-time': 'part_time',
  'Contract': 'contract',
};

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (selectedType !== 'All') params.job_type = JOB_TYPE_MAP[selectedType];
        if (selectedLocation !== 'All') params.location = selectedLocation;
        
        const response = await jobsApi.list(params);
        if (response.success) {
          setJobs(response.data.results || []);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchJobs();
    }, 400); // Debounce search

    return () => clearTimeout(timer);
  }, [search, selectedType, selectedLocation, selectedCategory]);

  const clearFilters = () => {
    setSearch('');
    setSelectedType('All');
    setSelectedLocation('All');
    setSelectedCategory('All');
  };

  const hasFilters = search || selectedType !== 'All' || selectedLocation !== 'All' || selectedCategory !== 'All';

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Page Header */}
      <div className="relative pt-28 pb-16 hero-bg overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
              style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <Briefcase size={12} /> {jobs.length} jobs available
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Browse <span className="gradient-text">Tech Jobs</span>
            </h1>
            <p className="text-lg" style={{ color: 'var(--muted)' }}>
              Find your perfect role from curated tech opportunities worldwide.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-2xl mx-auto"
          >
            <div
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 input-glow"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
            >
              <Search size={18} style={{ color: 'var(--muted)', flexShrink: 0 }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, company, or skill..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: 'var(--foreground)' }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ color: 'var(--muted)' }}>
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters + Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
            <SlidersHorizontal size={16} />
            <span className="text-sm font-medium">Filter:</span>
          </div>

          {/* Job Type */}
          <div className="flex flex-wrap gap-2">
            {JOB_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: selectedType === type ? 'rgba(99,102,241,0.15)' : 'var(--surface-2)',
                  border: selectedType === type ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--border)',
                  color: selectedType === type ? 'var(--accent)' : 'var(--muted)',
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Location */}
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1"
                style={{
                  background: selectedLocation === loc ? 'rgba(6,182,212,0.12)' : 'var(--surface-2)',
                  border: selectedLocation === loc ? '1px solid rgba(6,182,212,0.4)' : '1px solid var(--border)',
                  color: selectedLocation === loc ? 'var(--accent-3)' : 'var(--muted)',
                }}
              >
                {loc !== 'All' && <MapPin size={10} />}
                {loc}
              </button>
            ))}
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              style={{ color: '#ef4444', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <X size={12} /> Clear
            </button>
          )}
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Showing <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{jobs.length}</span> jobs
            {hasFilters && ' matching your filters'}
          </p>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl animate-pulse bg-gray-100 dark:bg-gray-800/50" />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <Briefcase size={24} style={{ color: 'var(--muted)' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>No jobs found</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Try adjusting your search or clearing your filters.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all"
              style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
