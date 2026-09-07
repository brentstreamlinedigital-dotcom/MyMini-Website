import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Camera, 
  Box, 
  Cpu, 
  ShieldCheck, 
  Truck, 
  Star, 
  ChevronRight, 
  Layers,
  ZoomIn,
  Eye
} from 'lucide-react';
import { HeroThreeViewer } from '../components/HeroThreeViewer';
import { ComparisonSlider } from '../components/ComparisonSlider';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { Configurator } from '../components/Configurator';
import { TESTIMONIALS, SIZE_OPTIONS, FINISH_OPTIONS } from '../data/mockData';
import { CartItem, CategoryType } from '../types';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onAddToCart: (item: CartItem) => void;
  onSelectGalleryItem: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onAddToCart,
  onSelectGalleryItem,
}) => {
  const [activeHeroStage, setActiveHeroStage] = useState<'photo' | 'model' | 'miniature'>('miniature');
  const [configuratorCategory, setConfiguratorCategory] = useState<CategoryType>('cars');

  const handleCategorySelectFromShowcase = (catId: string) => {
    setConfiguratorCategory(catId as CategoryType);
    const configEl = document.getElementById('create');
    if (configEl) {
      configEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full select-none overflow-x-hidden">
      {/* ==================================================
          1. HERO SECTION
          ================================================== */}
      <section className="relative min-h-[90vh] flex flex-col justify-between pt-28 sm:pt-32 pb-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Bold Typography & Brand Thesis */}
          <div className="lg:col-span-6 space-y-6 z-10">
            {/* Worldwide Shipping Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E9E8E4] bg-white text-[#1A1A1A] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF6801] animate-pulse"></span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold opacity-60">Now Shipping Worldwide</span>
            </div>

            {/* Massive Headline: "Your world. Miniaturized." */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-bold font-jellee tracking-tight text-[#1A1A1A] leading-[0.92]">
              Your world.<br />
              <span className="text-[#FF6801]">Miniaturized.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#1A1A1A] opacity-70 font-body max-w-lg leading-relaxed">
              Send us a photo of almost anything meaningful to you. We'll turn it into a highly detailed, professionally finished physical miniature.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#create"
                className="px-8 sm:px-10 py-4 sm:py-5 bg-[#1A1A1A] text-white rounded-full font-jellee text-base sm:text-lg font-bold hover:bg-[#FF6801] hover:scale-105 transition-all shadow-md active:scale-98 flex items-center gap-3 cursor-pointer"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#1A1A1A]">Starting at $149</span>
                <span className="text-xs opacity-50 font-semibold uppercase tracking-tighter text-[#1A1A1A]">Includes Global Shipping</span>
              </div>
            </div>

            {/* Trust and Social Proof Badges */}
            <div className="pt-6 border-t border-[#E9E8E4] flex flex-wrap items-center gap-6 text-xs text-[#1A1A1A] opacity-80">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold font-brand text-[#1A1A1A]">4.98/5 Rating</span>
              </div>
              <div className="h-4 w-px bg-[#E9E8E4]" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span className="font-medium">100% 3D Proof Approval</span>
              </div>
              <div className="h-4 w-px bg-[#E9E8E4]" />
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#1A1A1A]" />
                <span className="font-medium">Insured Worldwide Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity 3D Interactive Miniature Viewer */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            {/* Soft Ambient Radial Blur */}
            <div className="absolute -top-10 -left-6 w-80 h-80 bg-[#FF6801] rounded-full blur-[110px] opacity-10 pointer-events-none"></div>

            <div className="w-full relative mini-shadow">
              <div className="bg-gradient-to-br from-[#E9E8E4] to-[#D8D7D3] rounded-3xl p-1 shadow-inner">
                <div className="w-full aspect-square sm:aspect-4/3 lg:aspect-square rounded-[22px] overflow-hidden relative bg-[#111111]">
                  <HeroThreeViewer
                    initialStage={activeHeroStage}
                    onStageChange={(stage) => setActiveHeroStage(stage)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. EMOTIONAL STORY SECTION
          ================================================== */}
      <section className="py-24 bg-[#111111] text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6801]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FF6801] text-xs font-bold uppercase tracking-wider font-brand">
            <Sparkles className="w-3.5 h-3.5" />
            The Sentimental Imperative
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-brand tracking-tight max-w-3xl mx-auto leading-tight">
            Some things deserve to be kept.
          </h2>

          <div className="text-lg sm:text-xl text-neutral-300 font-body max-w-2xl mx-auto space-y-4 leading-relaxed">
            <p>
              Maybe it’s the car you’ve spent years building in the garage.
            </p>
            <p>
              The home where you grew up, filled with childhood laughter.
            </p>
            <p>
              Your first motorcycle. Your family business storefront. Your dog resting quietly at your feet.
            </p>
            <p className="text-white font-bold text-xl sm:text-2xl pt-2 font-brand">
              We turn those things into something you can hold.
            </p>
          </div>

          <div className="pt-6">
            <a
              href="#create"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-brand font-bold text-sm tracking-wide shadow-lg orange-glow hover:scale-105 transition-transform"
            >
              <span>Begin Your Keepsake</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. CATEGORIES: "Almost anything."
          ================================================== */}
      <div id="categories">
        <CategoryShowcase onSelectCategory={handleCategorySelectFromShowcase} />
      </div>

      {/* ==================================================
          4. SIGNATURE COMPARISON SLIDER (ORIGINAL -> MYMINI)
          ================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#E9E8E4]/40 border-y border-[#E9E8E4]">
        <ComparisonSlider />
      </section>

      {/* ==================================================
          5. THE MYMINI PROCESS (Manufacturing Documentary)
          ================================================== */}
      <section className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E9E8E4] bg-white text-[#1A1A1A] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF6801]"></span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold opacity-60">Manufacturing Documentary</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-jellee tracking-tight text-[#1A1A1A]">
            How your world becomes a miniature.
          </h2>
          <p className="text-base sm:text-lg text-[#1A1A1A] opacity-70 font-body">
            Four meticulous phases combining digital sculptors, 8K photopolymer printing, and master miniature artisans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {[
            {
              step: '01',
              title: 'Photo',
              fullTitle: 'Send Your Photos',
              description: 'Upload reference images from any angle using standard smartphone cameras.',
              icon: Camera,
              detail: 'Photogrammetry analysis',
            },
            {
              step: '02',
              title: 'Model',
              fullTitle: 'We Model It',
              description: 'Digital recreation by our studio artists with interactive 3D proof inspection.',
              icon: Box,
              detail: 'Interactive 3D proof approval',
            },
            {
              step: '03',
              title: 'Print',
              fullTitle: 'We Print It',
              description: 'Precision manufacturing using aerospace 8K SLA photopolymer with zero visible layer lines.',
              icon: Cpu,
              detail: 'Zero layer lines • High density',
            },
            {
              step: '04',
              title: 'Ship',
              fullTitle: 'You Receive It',
              description: 'Global delivery in premium memory foam vault packaging with laser-engraved brass plinth.',
              icon: Sparkles,
              detail: 'Museum grade delivery',
            },
          ].map((phase) => {
            const Icon = phase.icon;

            return (
              <div
                key={phase.step}
                className="process-step bg-white p-8 rounded-3xl border border-[#E9E8E4] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-jellee font-bold text-3xl text-[#FF6801]">
                      {phase.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-neutral-100 group-hover:bg-[#FF6801] group-hover:text-white transition-colors flex items-center justify-center text-neutral-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-xs uppercase tracking-wider font-bold text-[#FF6801] mb-1 font-jellee">
                    {phase.title}
                  </div>
                  <h3 className="font-jellee font-bold text-lg text-[#1A1A1A] mb-2">
                    {phase.fullTitle}
                  </h3>

                  <p className="text-xs opacity-60 font-medium leading-relaxed text-[#1A1A1A]">
                    {phase.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E9E8E4]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6801] font-brand">
                    {phase.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          6. DETAIL & CRAFTSMANSHIP ("Every detail matters")
          ================================================== */}
      <section className="py-24 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF6801] font-brand block mb-2">
                Macro Inspection
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-brand tracking-tight">
                Every detail matters.
              </h2>
              <p className="text-neutral-400 mt-3 max-w-xl font-body text-sm sm:text-base">
                THIS IS NOT A TOY. IT IS A HIGHLY DETAILED PHYSICAL RECREATION. Inspect the macro nuances under extreme magnification.
              </p>
            </div>

            <div className="text-right">
              <span className="font-mono text-sm text-neutral-400 block">TOLERANCE SPEC:</span>
              <span className="font-brand font-bold text-2xl text-[#FF6801]">±0.02mm Accuracy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Forged Wheels & Calipers',
                desc: 'Individual rim spokes, drilled brake rotors, and vivid calipers calibrated down to 0.3mm tolerances.',
                image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Textured Upholstery & Gauges',
                desc: 'Woven seat pattern decals, functional interior switchboards, and microscopic gauge cluster needles.',
                image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Architectural Brick & Glass',
                desc: 'Individual brick relief textures, simulated water pools, and crystal-clear acrylic windowpanes.',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
              },
            ].map((detail, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 group hover:border-[#FF6801]/60 transition-colors"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-800">
                  <img
                    src={detail.image}
                    alt={detail.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute top-3 right-3 bg-black/80 text-[#FF6801] p-1.5 rounded-full border border-white/10">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-brand font-bold text-lg text-white mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-body leading-relaxed">
                    {detail.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          7. CREATE MY MINI (The Core Configurator)
          ================================================== */}
      <section className="py-16 bg-[#F7F6F2]">
        <Configurator
          initialCategory={configuratorCategory}
          onAddToCart={onAddToCart}
          onRequestQuote={() => onNavigate('contact')}
        />
      </section>

      {/* ==================================================
          8. TESTIMONIALS & SOCIAL PROOF
          ================================================== */}
      <section className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E9E8E4] bg-white text-[#1A1A1A] mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF6801]"></span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold opacity-60">Collector Sentiments</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-jellee tracking-tight text-[#1A1A1A]">
            Loved by collectors worldwide.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-3xl border border-[#E9E8E4] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex text-[#FF6801]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#1A1A1A] opacity-80 font-body italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E9E8E4] flex items-center gap-3">
                <img
                  src={t.photoUrl}
                  alt={t.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-[#E9E8E4]"
                />
                <div>
                  <h4 className="font-jellee font-bold text-sm text-[#1A1A1A]">
                    {t.customerName}
                  </h4>
                  <span className="text-[11px] text-[#1A1A1A] opacity-60 block">
                    {t.location} • <strong className="text-[#FF6801] font-semibold">{t.miniatureType}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative vertical scroll indicator from Professional Polish theme */}
      <div className="hidden 2xl:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-6 opacity-20 pointer-events-none z-30">
        <div className="h-24 w-[1px] bg-[#1A1A1A] mx-auto"></div>
        <div className="rotate-90 origin-center text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap text-[#1A1A1A]">
          Scroll to Experience
        </div>
        <div className="h-24 w-[1px] bg-[#1A1A1A] mx-auto"></div>
      </div>
    </div>
  );
};
