'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Building2, TrendingUp, Users } from 'lucide-react';
import { COMPANIES } from '@/lib/mockData';
import CompanyCard from '@/components/cards/CompanyCard';
import Button from '@/components/ui/Button';

export default function CompaniesPage() {
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('All');

  const industries = ['All', ...new Set(COMPANIES.map(c => c.industry))];

  const filteredCompanies = COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) ||
                         company.description.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industry === 'All' || company.industry === industry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6"
        >
          <Building2 size={16} />
          <span>Top 3,200+ Companies</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--foreground)' }}
        >
          Discover Your Next <br />
          <span className="text-gradient">Dream Workplace</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}
        >
          Explore top-tier companies from early-stage startups to global tech giants. 
          Find the perfect culture and mission that aligns with your goals.
        </motion.p>
      </div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4 rounded-3xl mb-12 flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} size={20} />
          <input
            type="text"
            placeholder="Search by company name or mission..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent/50 transition-all" style={{ color: 'var(--foreground)' }}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent/50 transition-all appearance-none min-w-[160px]" style={{ color: 'var(--foreground)' }}
          >
            {industries.map(ind => (
              <option key={ind} value={ind} className="bg-slate-900">{ind}</option>
            ))}
          </select>
          <Button variant="secondary" className="!px-6">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, i) => (
            <CompanyCard key={company.id} company={company} index={i} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-lg" style={{ color: 'var(--muted)' }}>No companies found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {[
          { icon: <TrendingUp className="text-emerald-400" />, label: 'Fastest Growing', value: '850+' },
          { icon: <Users className="text-accent" />, label: 'Diverse Cultures', value: '2,400+' },
          { icon: <Building2 className="text-purple-400" />, label: 'Fortune 500', value: '120+' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{stat.value}</div>
            <div className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
