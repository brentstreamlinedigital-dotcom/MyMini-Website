import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, Mail, ArrowRight } from 'lucide-react';
import { FAQS } from '../data/mockData';

interface FaqViewProps {
  onNavigateToContact: () => void;
  onNavigateToCreate: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigateToContact, onNavigateToCreate }) => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'photos', label: 'Photography & Input' },
    { id: 'materials', label: 'Materials & Production' },
    { id: 'process', label: 'Process & 3D Proofs' },
    { id: 'shipping', label: 'Shipping & Delivery' },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto select-none">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6801]/10 text-[#FF6801] text-xs font-bold uppercase tracking-wider font-brand">
          <HelpCircle className="w-3.5 h-3.5" />
          Clear & Transparent Answers
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-brand tracking-tight text-[#111111]">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 font-body">
          Everything you need to know about photo preparation, digital proof inspection, materials, and international shipping.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer font-brand whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4 mb-16">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? '' : faq.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="font-brand font-bold text-base sm:text-lg text-[#111111]">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                    isOpen ? 'bg-[#FF6801] text-white rotate-180' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-600 font-body leading-relaxed border-t border-neutral-100 pt-4 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Concierge Callout */}
      <div className="bg-[#111111] text-white p-8 rounded-3xl text-center space-y-4 shadow-xl">
        <h3 className="font-brand font-bold text-2xl text-white">
          Have an unusual subject or special request?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto font-body">
          Our senior modelers love complex architectural models, vintage artifacts, and large-scale corporate commissions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onNavigateToContact}
            className="px-6 py-3 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-brand font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer"
          >
            Request a Custom Studio Quote
          </button>
          <button
            type="button"
            onClick={onNavigateToCreate}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-brand font-bold text-xs transition-all cursor-pointer"
          >
            Launch Configurator
          </button>
        </div>
      </div>
    </div>
  );
};
