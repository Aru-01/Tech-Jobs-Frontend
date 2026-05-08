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

const ICON_KEYWORDS: Record<string, string> = {
  frontend: 'Monitor',
  backend: 'Server',
  cloud: 'Cloud',
  devops: 'Workflow',
  database: 'Database',
  data: 'Database',
  'ai/ml': 'Brain',
  ai: 'Brain',
  ml: 'Brain',
  design: 'Palette',
  'ui/ux': 'Palette',
  ux: 'Palette',
  mobile: 'Smartphone',
  android: 'Smartphone',
  ios: 'Smartphone',
  security: 'Shield',
  cyber: 'Shield',
  fullstack: 'Layers',
  'full stack': 'Layers',
  api: 'Terminal',
  software: 'Code2',
  engineering: 'Cpu',
  testing: 'Search',
  qa: 'Search',
};

const COLOR_KEYWORDS: Record<string, string> = {
  frontend: '#6366f1',
  backend: '#8b5cf6',
  cloud: '#06b6d4',
  devops: '#06b6d4',
  design: '#f43f5e',
  ai: '#f59e0b',
  database: '#3b82f6',
  mobile: '#10b981',
  security: '#ef4444',
};

const PALETTE = [
  '#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', 
  '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#84cc16'
];

const VARIETY_ICONS = [
  'Monitor', 'Server', 'Cloud', 'Brain', 'Globe', 'Palette', 
  'Code2', 'Database', 'Shield', 'Smartphone', 'Layers', 'Terminal'
];

const getSemanticIcon = (label: string) => {
  const lowLabel = label.toLowerCase();
  for (const [key, icon] of Object.entries(ICON_KEYWORDS)) {
    if (lowLabel.includes(key)) return icon;
  }
  return null;
};

const getSemanticColor = (label: string) => {
  const lowLabel = label.toLowerCase();
  for (const [key, color] of Object.entries(COLOR_KEYWORDS)) {
    if (lowLabel.includes(key)) return color;
  }
  return null;
};

export default async function SpecialtiesPage() {
  const rawSpecialties = await getAllSpecialties();
  const specialties = rawSpecialties.map((spec: any, i: number) => {
    const existing = CATEGORIES.find(c => c.label === spec.label);
    const semanticIcon = getSemanticIcon(spec.label);
    const semanticColor = getSemanticColor(spec.label);

    return {
      ...spec,
      icon: spec.icon && spec.icon !== 'Grid3x3' ? spec.icon : (semanticIcon || existing?.icon || VARIETY_ICONS[i % VARIETY_ICONS.length]),
      color: spec.color && spec.color !== '#06b6d4' ? spec.color : (semanticColor || existing?.color || PALETTE[i % PALETTE.length]),
    };
  });


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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialties.map((cat: any, i: number) => (
            <CategoryCardWrapper key={cat.id || i} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </main>
  );
}


// Simple wrapper since CategoryCard is 'use client'
import CategoryCard from '@/components/cards/CategoryCard';
function CategoryCardWrapper({ cat, i }: { cat: any; i: number }) {
  return <CategoryCard category={cat} index={i} />;
}

