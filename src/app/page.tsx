import { Suspense } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import FeaturedJobs from '@/components/sections/FeaturedJobs';
import TopCompanies from '@/components/sections/TopCompanies';
import JobCategories from '@/components/sections/JobCategories';
import Testimonials from '@/components/sections/Testimonials';
import PlatformBenefits from '@/components/sections/PlatformBenefits';
import CTABanner from '@/components/sections/CTABanner';
import { CATEGORIES } from '@/lib/mockData';

async function getCategoryStats() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${API_URL}/api/dashboard/stats/`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!res.ok) throw new Error('Failed to fetch');
    
    const result = await res.json();
    const stats = result?.data || result;

    if (stats && stats.specialties) {
      return stats.specialties.map((spec: any) => {
        const existing = CATEGORIES.find(c => c.label === spec.label);
        return {
          id: existing?.id || spec.label.toLowerCase(),
          label: spec.label,
          count: `${spec.count} jobs`,
          icon: existing?.icon || 'Grid3x3',
          color: existing?.color || '#06b6d4'
        };
      });
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch stats on server:', error);
    return [];
  }
}

async function JobCategoriesSection() {
  const initialCategories = await getCategoryStats();
  return <JobCategories initialCategories={initialCategories} />;
}

function CategoriesSkeleton() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-8 w-64 bg-white/5 animate-pulse rounded mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="h-48 rounded-3xl bg-white/5 animate-pulse border border-white/10" />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedJobs />
      <TopCompanies />
      <Suspense fallback={<CategoriesSkeleton />}>
        <JobCategoriesSection />
      </Suspense>
      <PlatformBenefits />
      <Testimonials />
      <CTABanner />
    </>
  );
}


