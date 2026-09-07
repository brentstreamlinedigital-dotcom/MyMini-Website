import React, { useState } from 'react';
import { Sparkles, Camera, ArrowUpRight, ArrowLeftRight, Eye, Filter } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem, CategoryType } from '../types';
import { GalleryDetailModal } from './GalleryDetailModal';

interface GalleryViewProps {
  onConfigureCategory: (category: CategoryType) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onConfigureCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Commissions' },
    { id: 'cars', label: 'Cars' },
    { id: 'homes', label: 'Homes' },
    { id: 'pets', label: 'Pets' },
    { id: 'motorcycles', label: 'Motorcycles' },
    { id: 'businesses', label: 'Businesses' },
    { id: 'collectibles', label: 'Collectibles' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E9E8E4] bg-white text-[#1A1A1A] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#FF6801]"></span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold opacity-60">The "Made Mini" Archive</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-jellee tracking-tight text-[#1A1A1A]">
          Real objects. Recreated in miniature.
        </h1>
        <p className="text-base sm:text-lg text-[#1A1A1A] opacity-70 font-body">
          Explore commissions created for collectors, architects, automotive enthusiasts, and pet lovers across 42 countries.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer font-jellee ${
                isSelected
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'bg-white text-[#1A1A1A] opacity-70 hover:opacity-100 border border-[#E9E8E4] hover:bg-[#F7F6F2]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => {
          const isHovered = hoveredCardId === item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredCardId(item.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              onClick={() => setActiveModalItem(item)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E9E8E4] shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Visual Card Image with Photo Toggle Preview */}
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-900">
                <img
                  src={isHovered ? item.originalPhotoUrl : item.miniaturePhotoUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Scale Badge */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                  {item.scale}
                </div>

                {/* Photo toggle indicator */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-[#1A1A1A] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs border border-white/40">
                  <ArrowLeftRight className="w-3 h-3 text-[#FF6801]" />
                  <span>{isHovered ? 'Original Photo' : 'Finished Miniature'}</span>
                </div>

                {/* Hover inspect prompt */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-white text-[#1A1A1A] text-xs font-bold font-jellee shadow-lg flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#FF6801]" />
                    Inspect Details
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[11px] uppercase font-bold text-[#FF6801] font-jellee tracking-wider">
                    {item.category.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-[#1A1A1A] opacity-50">
                    {item.dimensions}
                  </span>
                </div>

                <h3 className="font-jellee font-bold text-xl text-[#1A1A1A] mb-2 group-hover:text-[#FF6801] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#1A1A1A] opacity-70 font-body line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-[#E9E8E4] flex items-center justify-between text-xs">
                  <span className="text-[#1A1A1A] opacity-60 font-medium">
                    {item.customerName} ({item.customerLocation})
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F7F6F2] group-hover:bg-[#FF6801] group-hover:text-white transition-colors flex items-center justify-center text-[#1A1A1A] border border-[#E9E8E4]">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Inspection Modal */}
      <GalleryDetailModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
        onConfigureCategory={(cat) => onConfigureCategory(cat as CategoryType)}
      />
    </div>
  );
};
