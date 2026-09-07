import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/mockData';

interface CategoryShowcaseProps {
  onSelectCategory?: (categoryId: string) => void;
  className?: string;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES_DATA[0]);

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E9E8E4] bg-white text-[#1A1A1A] mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF6801]"></span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold opacity-60">Infinite Possibilities</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-jellee tracking-tight text-[#1A1A1A]">
            Almost anything.
          </h2>
          <p className="text-base sm:text-lg text-[#1A1A1A] opacity-70 mt-3 max-w-2xl font-body">
            If you can photograph it, our artists and engineers can sculpt, print, and finish it. From vintage automobiles to childhood homes and family pets.
          </p>
        </div>

        {/* Live counter tag */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-[#E9E8E4] shadow-xs flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6801] animate-pulse" />
          <span className="text-xs font-bold text-[#1A1A1A]">
            Over 3,420 unique physical creations delivered worldwide
          </span>
        </div>
      </div>

      {/* Main Interactive Stage: Category List on Left + Massive Visual Preview Stage on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Category Selector List (Massive typography with hover triggers) */}
        <div className="lg:col-span-6 flex flex-col justify-center divide-y divide-[#E9E8E4] border-y border-[#E9E8E4]">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = activeCategory.id === cat.id;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat)}
                onClick={() => {
                  setActiveCategory(cat);
                  if (onSelectCategory) onSelectCategory(cat.id);
                }}
                className={`group py-5 sm:py-6 px-4 -mx-4 transition-all duration-300 cursor-pointer flex items-center justify-between rounded-2xl ${
                  isSelected
                    ? 'bg-white shadow-xs border-l-4 border-l-[#FF6801] pl-6'
                    : 'hover:bg-white/60 hover:pl-6'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-jellee text-2xl sm:text-4xl lg:text-5xl font-bold transition-all duration-300 tracking-tight ${
                      isSelected
                        ? 'text-[#FF6801] scale-102 translate-x-1'
                        : 'text-[#1A1A1A] opacity-80 group-hover:opacity-100'
                    }`}
                  >
                    {cat.title.toUpperCase()}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-bold font-body text-[#1A1A1A] opacity-50 bg-[#F7F6F2] px-2.5 py-0.5 rounded-full hidden sm:inline-block border border-[#E9E8E4]">
                      {cat.count}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium font-body hidden md:inline-block transition-opacity duration-200 ${
                      isSelected ? 'opacity-100 text-[#1A1A1A]/60' : 'opacity-0'
                    }`}
                  >
                    Explore {cat.title}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#FF6801] text-white rotate-45 shadow-sm'
                        : 'bg-neutral-100 text-neutral-400 group-hover:bg-[#E9E8E4] group-hover:text-[#1A1A1A]'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Category Immersive Visual Stage */}
        <div className="lg:col-span-6 relative min-h-[420px] sm:min-h-[500px] lg:min-h-full rounded-3xl overflow-hidden bg-neutral-900 shadow-xl border border-[#E9E8E4] flex flex-col justify-end p-6 sm:p-10 text-white group">
          {/* Background Category Image with smooth cross-fade */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              key={activeCategory.id}
              src={activeCategory.heroImage}
              alt={activeCategory.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out scale-105 group-hover:scale-110 filter brightness-90"
            />
            {/* Cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </div>

          {/* Interactive Floating Category Details */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6801] text-white text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              Category Showcase
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold font-brand mb-2 text-white">
              {activeCategory.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-200 font-body max-w-md mb-4 leading-relaxed">
              {activeCategory.tagline}
            </p>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 mb-6 max-w-md">
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#FF6801]">
                Master Sculptor Focus:
              </div>
              <p className="text-xs text-neutral-100 mt-0.5">
                {activeCategory.highlight}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#create"
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(activeCategory.id);
                }}
                className="px-6 py-3 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-jellee font-bold text-sm transition-all shadow-md orange-glow flex items-center gap-2 hover:scale-105 cursor-pointer"
              >
                <span>Miniaturize Your {activeCategory.title}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#gallery"
                className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-jellee font-bold text-sm transition-all backdrop-blur-xs border border-white/20 cursor-pointer"
              >
                View {activeCategory.title} Archive
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
