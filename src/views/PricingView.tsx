import React from 'react';
import { Sparkles, Check, ArrowRight, Clock, HelpCircle, ShieldCheck } from 'lucide-react';
import { SIZE_OPTIONS, FINISH_OPTIONS } from '../data/mockData';
import { SizeTier } from '../types';

interface PricingViewProps {
  onSelectSize: (size: SizeTier) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onSelectSize }) => {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E9E8E4] bg-white text-[#1A1A1A] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#FF6801]"></span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold opacity-60">Transparent Bespoke Investment</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-jellee tracking-tight text-[#1A1A1A]">
          Scales, finishes & pricing.
        </h1>
        <p className="text-base sm:text-lg text-[#1A1A1A] opacity-70 font-body">
          Every commission includes bespoke 3D modeling from your photographs, interactive digital proof revisions, 8K stereolithography printing, and insured vault shipping.
        </p>
      </div>

      {/* 4 Size Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {SIZE_OPTIONS.map((size) => (
          <div
            key={size.id}
            className={`bg-white rounded-3xl p-6 sm:p-8 border-2 flex flex-col justify-between relative transition-all hover:shadow-xl ${
              size.popular
                ? 'border-[#FF6801] shadow-lg ring-4 ring-[#FF6801]/10'
                : 'border-[#E9E8E4] hover:border-[#1A1A1A]/30'
            }`}
          >
            {size.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6801] text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md font-jellee">
                Most Popular
              </div>
            )}

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-jellee font-bold text-2xl text-[#1A1A1A]">
                  {size.name}
                </h3>
              </div>

              <div className="mb-4">
                <span className="font-jellee font-bold text-3xl text-[#FF6801]">
                  ${size.basePrice}
                </span>
                <span className="text-xs text-[#1A1A1A] opacity-50 block mt-0.5 font-medium">
                  Base 3D sculpt & resin print
                </span>
              </div>

              <div className="bg-[#F7F6F2] p-4 rounded-2xl border border-[#E9E8E4] mb-5 space-y-1">
                <div className="font-bold text-xs text-[#1A1A1A] font-jellee">
                  {size.dimensions} ({size.dimensionsMetric})
                </div>
                <div className="text-[11px] text-[#1A1A1A] opacity-60">
                  Scale reference: {size.comparisonObject}
                </div>
              </div>

              <div className="text-xs text-[#1A1A1A] opacity-80 space-y-2 font-body mb-6">
                <div>
                  <strong className="text-[#1A1A1A] block mb-0.5 font-jellee font-bold">Recommended For:</strong>
                  <span>{size.recommendedUse}</span>
                </div>
                <div className="pt-2 border-t border-[#E9E8E4]">
                  <strong className="text-[#1A1A1A] block mb-0.5 font-jellee font-bold">Approximate Scale:</strong>
                  <span>{size.id === 'mini' ? '1:43 – 1:64' : size.id === 'classic' ? '1:24 – 1:32' : size.id === 'large' ? '1:18 – 1:12' : '1:8 – 1:10 (Museum)'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E9E8E4]">
              <button
                type="button"
                onClick={() => onSelectSize(size.id)}
                className={`w-full py-3.5 rounded-full font-jellee font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-98 ${
                  size.popular
                    ? 'bg-[#FF6801] hover:bg-[#e05b00] text-white shadow-md orange-glow'
                    : 'bg-[#1A1A1A] hover:bg-[#FF6801] text-white'
                }`}
              >
                <span>Select {size.name} Scale</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Finish Options Detailed Matrix */}
      <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 shadow-2xl mb-16 border border-white/10">
        <div className="max-w-2xl mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#FF6801] font-jellee block mb-1">
            Finishing Mastery
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold font-jellee text-white">
            Choose your physical finish.
          </h3>
          <p className="text-sm text-neutral-400 mt-2 font-body">
            From monochromatic architectural sculpts to multi-layer micro-airbrushed collector centerpieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FINISH_OPTIONS.map((fin) => (
            <div
              key={fin.id}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-all"
            >
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white mb-3">
                  {fin.badge}
                </div>

                <h4 className="font-jellee font-bold text-xl text-white mb-1">
                  {fin.name}
                </h4>

                <span className="font-jellee font-bold text-lg text-[#FF6801] block mb-3">
                  {fin.addedCost === 0 ? 'Included with all sizes' : `+${fin.addedCost} USD`}
                </span>

                <p className="text-xs text-neutral-300 mb-6 font-body leading-relaxed">
                  {fin.description}
                </p>

                <div className="space-y-2 mb-6">
                  {fin.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#FF6801] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-neutral-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Estimated production: ~{fin.leadTimeDays} business days</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
