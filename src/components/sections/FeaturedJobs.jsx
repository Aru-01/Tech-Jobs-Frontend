'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import JobCard from '@/components/cards/JobCard';
import { useState, useEffect } from 'react';
import { jobsApi } from '@/lib/api';
import Button from '@/components/ui/Button';

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsApi.list({ ordering: '-created_at' });
        if (response.success) {
          // In a real scenario, the backend might have a 'featured' flag.
          // For now, we'll just take the top 6.
          setJobs(response.data.results?.slice(0, 6) || []);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="py-24 relative" id="featured-jobs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            <Sparkles size={12} /> Featured Opportunities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Hand-Picked <span className="gradient-text">Top Roles</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Curated jobs from the world's most innovative tech companies. Updated daily.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {loading ? (
            // Simple loading skeletons
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl animate-pulse bg-gray-100 dark:bg-gray-800/50" />
            ))
          ) : (
            jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link href="/jobs">
            <Button variant="outline" size="lg" iconRight={<ArrowRight size={16} />}>
              Browse All Opportunities
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
