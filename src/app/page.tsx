export const dynamic = 'force-dynamic';
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
  let API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tech-jobs-backend.vercel.app';
  if (API_URL.startsWith('NEXT_PUBLIC_API_URL=')) {
    API_URL = API_URL.replace('NEXT_PUBLIC_API_URL=', '').trim();
  }
  
  try {
    const res = await fetch(`${API_URL}/api/jobs/`, {
      next: { revalidate: 0 }, // always fresh
    });
    
    if (!res.ok) throw new Error('Failed to fetch jobs for stats');
    const result = await res.json();
    
    let jobs: any[] = [];
    if (Array.isArray(result)) {
      jobs = result;
    } else if (Array.isArray(result?.data?.results)) {
      jobs = result.data.results;
    } else if (Array.isArray(result?.results)) {
      jobs = result.results;
    } else if (Array.isArray(result?.data)) {
      jobs = result.data;
    }

    const counts: Record<string, number> = {};
    
    jobs.forEach((job: any) => {
      let tags: string[] = [];
      
      // Extract from tech_stack
      if (Array.isArray(job.tech_stack)) {
        tags = job.tech_stack;
      } else if (typeof job.tech_stack === 'string') {
        const raw = job.tech_stack.trim();
        if (raw.startsWith('[') && raw.endsWith(']')) {
          tags = raw.slice(1, -1).split(',').map((t: string) => t.trim().replace(/^['"]|['"]$/g, ''));
        } else {
          tags = raw.split(',').map((t: string) => t.trim());
        }
      }
      
      // Also add category if it exists
      if (job.category) {
        tags.push(job.category);
      }
      
      // Add job_role or industry if available and tech stack is empty
      if (tags.length === 0 && job.job_role) tags.push(job.job_role);

      tags.filter(t => t && t.length > 0).forEach(tag => {
        // Capitalize properly
        const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
        counts[formattedTag] = (counts[formattedTag] || 0) + 1;
      });
    });

    const processed = Object.entries(counts).map(([label, count]) => {
      return {
        id: label.toLowerCase(),
        label: label,
        count: `${count} jobs`,
      };
    });

    processed.sort((a, b) => parseInt(b.count) - parseInt(a.count));
    
    // Fallback if empty
    if (processed.length === 0) {
      return CATEGORIES.map(cat => ({ ...cat, count: '0 jobs' }));
    }
    
    return processed;
    
  } catch (error) {
    console.error('Failed to fetch dynamic stats on server:', error);
    return CATEGORIES.map(cat => ({ ...cat, count: '0 jobs' }));
  }
}

async function JobCategoriesSection() {
  const initialCategories = await getCategoryStats();
  return <JobCategories initialCategories={initialCategories as any} />;
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


