import JobCategories from '@/components/sections/JobCategories';
import { CATEGORIES } from '@/lib/mockData';
import { Grid3x3, Search } from 'lucide-react';

async function getAllSpecialties() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${API_URL}/api/dashboard/stats/`, {
      next: { revalidate: 3600 },
    });
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
    console.error('Failed to fetch specialties:', error);
    return [];
  }
}

export default async function SpecialtiesPage() {
  const specialties = await getAllSpecialties();

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
            Explore All <span className="gradient-text">Specialties</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our comprehensive list of tech categories and find the one that matches your expertise.
          </p>
        </div>

        {/* We can reuse JobCategories component but pass all specialties and tell it to show all */}
        {/* But JobCategories component is designed as a section. Let's make a simplified version or just use it. */}
        {/* For now, I'll just pass all specialties to JobCategories and it will slice it. Wait, I should update JobCategories to allow showing all if a prop is passed. */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialties.map((cat, i) => (
            <CategoryCardWrapper key={cat.id || i} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </main>
  );
}

// Simple wrapper since CategoryCard is 'use client'
import CategoryCard from '@/components/cards/CategoryCard';
function CategoryCardWrapper({ cat, i }: any) {
  return <CategoryCard category={cat} index={i} />;
}
