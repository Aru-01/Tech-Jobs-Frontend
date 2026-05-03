import HeroSection from '@/components/hero/HeroSection';
import FeaturedJobs from '@/components/sections/FeaturedJobs';
import TopCompanies from '@/components/sections/TopCompanies';
import JobCategories from '@/components/sections/JobCategories';
import Testimonials from '@/components/sections/Testimonials';
import PlatformBenefits from '@/components/sections/PlatformBenefits';
import CTABanner from '@/components/sections/CTABanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedJobs />
      <TopCompanies />
      <JobCategories />
      <PlatformBenefits />
      <Testimonials />
      <CTABanner />
    </>
  );
}
