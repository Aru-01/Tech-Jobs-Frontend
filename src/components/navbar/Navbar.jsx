'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Plus, LayoutDashboard, LogOut, Briefcase, User, Building2 } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

const NAV_LINKS = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Companies', href: '/companies' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'var(--glass-bg)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo size="sm" />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 link-hover"
                    style={{ color: active ? 'var(--accent)' : 'var(--muted)' }}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(99,102,241,0.08)' }}
                        transition={{ type: 'spring', duration: 0.4 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer transition-all"
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                    >
                      {user?.avatar || user?.name?.[0] || 'U'}
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown
                      size={14}
                      style={{
                        color: 'var(--muted)',
                        transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden"
                        style={{
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          boxShadow: 'var(--shadow-lg)',
                          transformOrigin: 'top right',
                        }}
                      >
                        {/* User info */}
                        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                          <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{user?.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{user?.email}</p>
                        </div>
                        {/* Menu Items */}
                        <div className="py-1.5">
                          {[
                            { href: '/profile', icon: <User size={15} />, label: 'My Profile', roles: ['job_seeker', 'recruiter', 'admin'] },
                            { href: '/add-job', icon: <Plus size={15} />, label: 'Post a Job', roles: ['recruiter', 'admin'] },
                            { href: '/manage-jobs', icon: <LayoutDashboard size={15} />, label: 'Manage Jobs', roles: ['recruiter', 'admin'] },
                            { href: '/manage-companies', icon: <Building2 size={15} />, label: 'Manage Companies', roles: ['recruiter', 'admin'] },
                            { href: '/jobs', icon: <Briefcase size={15} />, label: 'Browse Jobs', public: true },
                          ].filter(item => item.public || (user && item.roles?.includes(user.role))).map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setDropdownOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 hover:bg-[rgba(99,102,241,0.06)]"
                              style={{ color: 'var(--foreground)' }}
                            >
                              <span style={{ color: 'var(--accent)' }}>{item.icon}</span>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)' }} className="py-1.5">
                          <button
                            onClick={() => { logout(); setDropdownOpen(false); }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm w-full transition-all duration-150 hover:bg-[rgba(239,68,68,0.06)]"
                            style={{ color: '#ef4444' }}
                          >
                            <LogOut size={15} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" size="sm">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 flex items-center justify-center rounded-xl"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
            style={{
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      color: pathname === link.href ? 'var(--accent)' : 'var(--foreground)',
                      background: pathname === link.href ? 'rgba(99,102,241,0.08)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                {isLoggedIn ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                        {user?.avatar || user?.name?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{user?.name}</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>{user?.email}</p>
                      </div>
                    </div>
                    {[
                      { href: '/jobs', icon: <Briefcase size={16} />, label: 'Browse Jobs', public: true },
                      { href: '/add-job', icon: <Plus size={16} />, label: 'Post a Job', roles: ['recruiter', 'admin'] },
                      { href: '/manage-jobs', icon: <LayoutDashboard size={16} />, label: 'Manage Jobs', roles: ['recruiter', 'admin'] },
                      { href: '/manage-companies', icon: <Building2 size={16} />, label: 'Manage Companies', roles: ['recruiter', 'admin'] },
                    ].filter(item => item.public || (user && item.roles?.includes(user.role))).map(item => (
                      <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm" style={{ color: 'var(--foreground)' }}>
                        <span style={{ color: 'var(--accent)' }}>{item.icon}</span> {item.label}
                      </Link>
                    ))}
                    <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm w-full" style={{ color: '#ef4444' }}>
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 px-1">
                    <Link href="/login"><Button variant="secondary" size="md" fullWidth>Sign In</Button></Link>
                    <Link href="/register"><Button variant="primary" size="md" fullWidth>Get Started</Button></Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
