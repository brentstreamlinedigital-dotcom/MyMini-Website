import React from 'react';
import { Logo } from './Logo';
import { Sparkles, ShieldCheck, Truck, Clock, ArrowUpRight, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="select-none">
      {/* Professional Polish 4-step process bar from theme */}
      <div className="border-t border-[#E9E8E4] bg-white py-10 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="process-step relative flex gap-4 items-start">
            <div className="text-[#FF6801] font-jellee font-bold text-xl">01</div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-1 text-[#1A1A1A]">Photo</h4>
              <p className="text-xs opacity-50 font-medium leading-relaxed text-[#1A1A1A]">
                Upload reference images from any angle.
              </p>
            </div>
          </div>

          <div className="process-step relative flex gap-4 items-start">
            <div className="text-[#FF6801] font-jellee font-bold text-xl">02</div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-1 text-[#1A1A1A]">Model</h4>
              <p className="text-xs opacity-50 font-medium leading-relaxed text-[#1A1A1A]">
                Digital recreation by our studio artists.
              </p>
            </div>
          </div>

          <div className="process-step relative flex gap-4 items-start">
            <div className="text-[#FF6801] font-jellee font-bold text-xl">03</div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-1 text-[#1A1A1A]">Print</h4>
              <p className="text-xs opacity-50 font-medium leading-relaxed text-[#1A1A1A]">
                Precision manufacturing & hand-finishing.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="text-[#FF6801] font-jellee font-bold text-xl">04</div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-1 text-[#1A1A1A]">Ship</h4>
              <p className="text-xs opacity-50 font-medium leading-relaxed text-[#1A1A1A]">
                Global delivery in premium packaging.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand Footer */}
      <div className="bg-[#111111] text-white pt-20 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Feature Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#FF6801] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-jellee font-bold text-lg text-white">
                  100% Proof Guarantee
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-body leading-relaxed">
                  Inspect a private 360° interactive 3D digital model before physical production. Request revisions until it is perfection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#FF6801] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-jellee font-bold text-lg text-white">
                  Master Human Craft
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-body leading-relaxed">
                  Aerospace-grade 8K SLA photopolymer resin, micro-brushed pigments, UV protective clear-coats, and solid American Walnut bases.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#FF6801] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-jellee font-bold text-lg text-white">
                  Insured Vault Shipping
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-body leading-relaxed">
                  Encased in custom CNC-cut high-density memory foam vault cases. Tracked worldwide delivery with signature confirmation.
                </p>
              </div>
            </div>
          </div>

        {/* Middle Navigation & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="cursor-pointer" onClick={() => onNavigate('home')}>
              <Logo size="lg" variant="orange" />
            </div>
            <p className="text-sm text-neutral-400 font-body max-w-sm leading-relaxed">
              We take photographs of almost anything meaningful to you, digitally recreate it as a high-fidelity 3D model, manufacture it as a physical miniature, and finish it to museum standards.
            </p>
            <div className="font-brand font-bold text-lg text-[#FF6801] tracking-wide">
              YOUR WORLD. MINIATURIZED.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            <div>
              <h5 className="font-brand font-bold text-white uppercase tracking-wider mb-4">
                Explore
              </h5>
              <ul className="space-y-2.5 text-neutral-400">
                <li>
                  <button type="button" onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                    How It Works
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors cursor-pointer">
                    "Made Mini" Gallery
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors cursor-pointer">
                    Pricing & Dimensions
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('orders')} className="hover:text-white transition-colors cursor-pointer">
                    Order Tracker
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-brand font-bold text-white uppercase tracking-wider mb-4">
                Categories
              </h5>
              <ul className="space-y-2.5 text-neutral-400">
                <li><a href="#categories" className="hover:text-white transition-colors">Automobiles</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Architectural Homes</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Motorcycles</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Lifelong Pets</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Milestone Memories</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-brand font-bold text-white uppercase tracking-wider mb-4">
                Support
              </h5>
              <ul className="space-y-2.5 text-neutral-400">
                <li>
                  <button type="button" onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer">
                    Help & FAQs
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                    Custom Studio Quote
                  </button>
                </li>
                <li>
                  <span className="text-neutral-500">concierge@myminis.com</span>
                </li>
                <li>
                  <span className="text-neutral-500">+1 (800) 849-MINI</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Studio Journal / VIP Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-brand font-bold text-white uppercase tracking-wider">
              The Miniature Journal
            </h5>
            <p className="text-xs text-neutral-400 font-body">
              Behind-the-scenes master artisan time-lapses, new scale releases, and private commission drops.
            </p>
            <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/20">
              <input
                type="email"
                placeholder="Enter email..."
                className="px-4 py-2 text-xs bg-transparent text-white focus:outline-none flex-1 placeholder:text-neutral-500"
              />
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-brand font-bold text-xs transition-colors cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Brand Statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} MYMINI Inc. All rights reserved. Playful Luxury & Custom Fine Scale Manufactory.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Photo Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Commission</span>
            <span className="hover:text-neutral-400 cursor-pointer">Authentication Security</span>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};
