import React from 'react';
import { Camera, Box, Cpu, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface HowItWorksViewProps {
  onNavigateToCreate: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigateToCreate }) => {
  const steps = [
    {
      number: '01',
      title: 'Send Your Photographs',
      subtitle: 'Raw Smartphone Photos → Spatial Geometry',
      description: 'You do not need laser scanners or professional studio lighting. Walk around your car, home, motorcycle, or pet and snap 4 to 12 clear photographs from different vantage points. Our computational photogrammetry pipeline calculates curvature, vanishing lines, and proportions automatically.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
      bullets: [
        'Natural daylight or indoor ambient lighting',
        'Automatic angle perspective alignment',
        'Personal privacy guaranteed: Photos never shared publicly',
      ],
    },
    {
      number: '02',
      title: 'Digital 3D Sculpting & Proof Approval',
      subtitle: 'Zero Guesswork • 360° Digital Proof',
      description: 'Senior digital sculptors reconstruct the physical asset polygon by polygon. We recreate wheel spoke angles, brake caliper stampings, window bevels, brick mortars, and facial expressions. Before any physical resin is cured, you receive a private, interactive 3D link to inspect every millimeter on your phone or laptop.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
      bullets: [
        'Inspect the digital model from any rotation angle',
        'Unlimited revisions until you are 100% delighted',
        'Physical production only starts upon your explicit signature',
      ],
    },
    {
      number: '03',
      title: '8K SLA Photopolymer Printing',
      subtitle: '22-Micron Layer Resolution • Aerospace Resin',
      description: 'Once approved, the file is sliced and fed into industrial 8K stereolithography 3D printers using specialized engineering photopolymers. With 22-micron layer height, the resulting surface is completely free of visible layer lines, offering the smooth density of cast porcelain.',
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80',
      bullets: [
        'Microscopic tolerances within ±0.02mm',
        'Zero stepped ridges or filament lines',
        'Nitrogen chamber secondary UV cure for lifelong durability',
      ],
    },
    {
      number: '04',
      title: 'Master Finishing & Vault Delivery',
      subtitle: 'Micro-Airbrushing • Solid American Walnut Base',
      description: 'Our miniature artists apply automotive-grade paint formulas matched to factory color codes or realistic patina. The finished piece is mounted onto a hand-milled solid American Walnut plinth, fitted with a laser-engraved brushed brass plaque, and packed into a custom-molded high-density foam travel vault.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      bullets: [
        'Multi-stage UV-resistant protective clear-coat',
        'Solid walnut plinth with brass personalization plate',
        'Insured worldwide courier delivery with signature required',
      ],
    },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6801]/10 text-[#FF6801] text-xs font-bold uppercase tracking-wider font-brand">
          <Box className="w-3.5 h-3.5" />
          The Science of Miniaturization
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-brand tracking-tight text-[#111111]">
          Where cutting-edge technology meets hand craftsmanship.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 font-body leading-relaxed">
          Creating a true scale miniature requires more than pressing "print." It requires spatial geometry, digital sculpting artistry, microscopic resin resolution, and human finishing.
        </p>
      </div>

      {/* 4 Documentary Phases */}
      <div className="space-y-16">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={step.number}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-xs"
            >
              {/* Text Side */}
              <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className="font-brand font-bold text-4xl sm:text-5xl text-[#FF6801]">
                    {step.number}
                  </span>
                  <div className="h-6 w-px bg-neutral-200" />
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 font-brand">
                    Phase {step.number}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-brand text-[#111111]">
                  {step.title}
                </h3>

                <h4 className="text-sm font-semibold text-[#FF6801]">
                  {step.subtitle}
                </h4>

                <p className="text-sm text-neutral-600 font-body leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-2 space-y-2">
                  {step.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6801] shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Side */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : ''}`}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-900 shadow-md border border-neutral-200">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    MYMINI Atelier Camera
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Production Guarantee Banner */}
      <div className="mt-20 bg-[#111111] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6801] uppercase tracking-wider font-brand">
            <ShieldCheck className="w-4 h-4" />
            The 100% Proof Guarantee
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-brand">
            Ready to hold your world in your hands?
          </h3>
          <p className="text-sm text-neutral-400 font-body">
            Upload your reference photos today. We will prepare your interactive 3D digital proof before any physical manufacturing occurs.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToCreate}
          className="px-8 py-4 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-brand font-bold text-sm tracking-wide shadow-xl orange-glow flex items-center gap-2 cursor-pointer whitespace-nowrap transition-all"
        >
          <span>Configure My Mini</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
