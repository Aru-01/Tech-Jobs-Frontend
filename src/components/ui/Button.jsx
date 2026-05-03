'use client';
import { motion } from 'framer-motion';

const variants = {
  primary: {
    base: 'text-white font-semibold shadow-lg btn-glow',
    style: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      border: '1px solid rgba(99,102,241,0.4)',
    },
  },
  secondary: {
    base: 'font-semibold',
    style: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      color: 'var(--foreground)',
    },
  },
  outline: {
    base: 'font-semibold',
    style: {
      background: 'transparent',
      border: '1px solid rgba(99,102,241,0.5)',
      color: 'var(--accent)',
    },
  },
  ghost: {
    base: 'font-medium',
    style: {
      background: 'transparent',
      border: '1px solid transparent',
      color: 'var(--muted)',
    },
  },
  danger: {
    base: 'font-semibold text-white',
    style: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      border: '1px solid rgba(239,68,68,0.4)',
    },
  },
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
  xl: 'px-8 py-4 text-base rounded-2xl gap-3',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  href,
}) {
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;

  const cls = `
    inline-flex items-center justify-center cursor-pointer
    transition-all duration-200 select-none
    ${s} ${v.base}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
    ${className}
  `.trim();

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
      {iconRight && !loading && <span className="flex-shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        style={v.style}
        whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -1 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cls}
      style={v.style}
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {content}
    </motion.button>
  );
}
