'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS, COMPANIES } from '@/lib/mockData';

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);
  const [displayTestimonials, setDisplayTestimonials] = useState([]);

  useEffect(() => {
    setMounted(true);
    // Randomize companies from the verified list for each testimonial
    const verifiedCompanies = COMPANIES.filter(c => c.name).map(c => c.name);
    
    const randomized = TESTIMONIALS.map(t => ({
      ...t,
      // Randomly pick a company from the verified list
      company: `Hired at ${verifiedCompanies[Math.floor(Math.random() * verifiedCompanies.length)]}`
    }));
    
    setDisplayTestimonials([...randomized, ...randomized]);
  }, []);

  if (!mounted || displayTestimonials.length === 0) return null;

  return (
    <section className="py-24 relative section-gradient overflow-hidden" id="testimonials">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}
          >
            <Star size={12} /> Success Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Engineers Who <span className="gradient-text">Got Hired</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Real stories from developers who landed their dream job through Tech_Jobs.
          </motion.p>
        </div>
      </div>

      {/* Auto Slider Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradient Masks for fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 z-20 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 z-20 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />
        
        <motion.div
          className="flex gap-6 w-max pl-6 hover:[animation-play-state:paused]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 50, repeat: Infinity }}
        >
          {displayTestimonials.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="glass-card p-6 rounded-2xl relative w-[300px] sm:w-[400px] shrink-0 border border-white/5 hover:border-indigo-500/30 transition-colors duration-500"
            >
              {/* Quote icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 shadow-inner"
                style={{ background: 'rgba(99,102,241,0.1)' }}
              >
                <Quote size={16} className="text-indigo-400" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    size={14} 
                    fill={idx < t.rating ? "#f59e0b" : "transparent"} 
                    style={{ color: idx < t.rating ? '#f59e0b' : 'rgba(255,255,255,0.1)' }} 
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm leading-relaxed mb-6 italic min-h-[80px]" style={{ color: 'var(--muted)' }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full grayscale hover:grayscale-0 transition-all duration-300"
                  style={{ border: '2px solid rgba(99,102,241,0.3)' }}
                />
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{t.name}</p>
                  <p className="text-xs font-medium text-indigo-400">{t.role}</p>
                  <p className="text-[10px] mt-0.5 opacity-70" style={{ color: 'var(--muted)' }}>{t.company}</p>
                </div>
              </div>

              {/* Bottom decorative gradient */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
