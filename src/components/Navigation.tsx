import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles, Clock, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'pricing', label: 'Pricing & Scales' },
    { id: 'faq', label: 'FAQ' },
    { id: 'orders', label: 'Track Order' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F6F2]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#E9E8E4]'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: MYMINI Official Brand Logo */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="focus:outline-none cursor-pointer flex items-center"
          aria-label="MYMINI Home"
        >
          <Logo size="md" />
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold uppercase tracking-widest font-body">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;

            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`transition-all cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#FF6801] font-bold opacity-100'
                    : 'text-[#1A1A1A] opacity-60 hover:opacity-100 hover:text-[#FF6801]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6801] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Cart & Primary CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2.5 sm:p-3 rounded-full bg-white hover:bg-neutral-50 text-[#1A1A1A] border border-[#E9E8E4] shadow-xs transition-all cursor-pointer group"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF6801] text-white text-[10px] font-bold flex items-center justify-center shadow-xs font-brand">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA "Create My Mini" */}
          <button
            type="button"
            onClick={() => handleLinkClick('create')}
            className="hidden sm:inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-jellee font-semibold text-sm tracking-tight shadow-md orange-glow hover:scale-105 transition-transform active:scale-98 cursor-pointer"
          >
            <span>Create My Mini</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-white text-[#1A1A1A] border border-[#E9E8E4] shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F6F2] border-b border-[#E9E8E4] px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2.5 px-4 rounded-xl text-xs uppercase tracking-widest font-bold font-body transition-colors ${
                  currentView === link.id
                    ? 'bg-[#FF6801] text-white'
                    : 'text-[#1A1A1A] hover:bg-neutral-200/50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-[#E9E8E4]">
              <button
                type="button"
                onClick={() => handleLinkClick('create')}
                className="w-full py-3.5 rounded-full bg-[#FF6801] text-white font-jellee font-semibold text-sm text-center shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <span>Create My Mini</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
