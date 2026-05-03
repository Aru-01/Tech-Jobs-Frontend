'use client';
export default function Logo({ size = 'md', className = '' }) {
  const sizes = {
    sm: { text: 'text-lg', icon: 28 },
    md: { text: 'text-xl', icon: 34 },
    lg: { text: 'text-3xl', icon: 48 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon mark */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {/* Outer hexagon ring */}
        <path
          d="M20 3L35 11.5V28.5L20 37L5 28.5V11.5L20 3Z"
          fill="url(#logoGrad)"
          opacity="0.15"
        />
        {/* Inner hexagon */}
        <path
          d="M20 7L32 14V26L20 33L8 26V14L20 7Z"
          fill="url(#logoGrad)"
          opacity="0.25"
        />
        {/* T letter stylized */}
        <rect x="12" y="13" width="16" height="2.5" rx="1.25" fill="url(#logoGrad)" />
        <rect x="18.75" y="13" width="2.5" height="14" rx="1.25" fill="url(#logoGrad)" />
        {/* Accent dot */}
        <circle cx="28" cy="13" r="2.5" fill="url(#logoGrad2)" />
        {/* Bottom accent line */}
        <path d="M14 29 Q20 31.5 26 29" stroke="url(#logoGrad2)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
      </svg>

      {/* Wordmark */}
      <span
        className={`${s.text} font-bold tracking-tight`}
        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
      >
        <span className="gradient-text">Tech</span>
        <span style={{ color: 'var(--foreground)', opacity: 0.85 }}>_Jobs</span>
      </span>
    </div>
  );
}
