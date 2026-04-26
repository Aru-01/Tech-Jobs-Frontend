'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Play as Youtube, Send, Facebook } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useState } from 'react';
import toast from 'react-hot-toast';

const FOOTER_LINKS = {
  Product: [
    { label: 'Browse Jobs', href: '/jobs' },
    { label: 'Companies', href: '/#companies' },
    { label: 'Categories', href: '/#categories' },
    { label: 'Salary Guide', href: '#' },
  ],
  Recruiters: [
    { label: 'Post a Job', href: '/add-job' },
    { label: 'Manage Listings', href: '/manage-jobs' },
    { label: 'Pricing', href: '#' },
    { label: 'Talent Pool', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
};

const SOCIALS = [
  { icon: <Facebook size={16} />, href: 'https://www.facebook.com/Aru.0012', label: 'Facebook' },
  { icon: <Github size={16} />, href: 'https://github.com/aru-01', label: 'GitHub' },
  { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/aru01', label: 'LinkedIn' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('🎉 You\'re on the list! Watch your inbox.', {
      style: { background: 'var(--surface)', color: 'var(--foreground)', border: '1px solid var(--border)' },
    });
    setEmail('');
  };

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: 'var(--muted)' }}>
              The premium job board for tech professionals. Find your dream role at the world's most innovative companies.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Weekly Tech Jobs Digest
              </p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-xl text-sm input-glow transition-all duration-200"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    outline: 'none',
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-xl flex items-center gap-1.5 text-sm font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  <Send size={14} />
                </motion.button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
                  {category}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm link-hover transition-colors duration-200"
                        style={{ color: 'var(--muted)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            © 2025 Tech_Jobs. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: 'var(--muted)' }}>Built for</span>
            <span className="text-xs gradient-text font-semibold">🖤 Aru</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
