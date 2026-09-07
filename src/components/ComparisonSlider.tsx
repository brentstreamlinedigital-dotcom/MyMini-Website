import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Camera, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';

interface ComparisonSliderProps {
  initialItemId?: string;
  className?: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  initialItemId = 'porsche-911-targa',
  className = '',
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(initialItemId);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = GALLERY_ITEMS.find((item) => item.id === selectedItemId) || GALLERY_ITEMS[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      {/* Header & Sub-selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E9E8E4] bg-white text-[#1A1A1A] mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF6801]"></span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold opacity-60">Signature Fidelity Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jellee tracking-tight text-[#1A1A1A]">
            Original Photograph <span className="text-[#FF6801]">↔</span> Finished MyMini
          </h2>
          <p className="text-sm sm:text-base text-[#1A1A1A] opacity-70 mt-2 max-w-xl font-body">
            Drag the handle to reveal how raw smartphone customer photography is transformed into a high-density, museum-grade physical miniature.
          </p>
        </div>

        {/* Quick selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {GALLERY_ITEMS.slice(0, 4).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedItemId(item.id);
                setSliderPos(50);
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-bold font-jellee whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                selectedItemId === item.id
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'bg-white text-[#1A1A1A] opacity-70 hover:opacity-100 border border-[#E9E8E4]'
              }`}
            >
              <span>{item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}</span>
              {selectedItemId === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6801]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Canvas Card */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-br from-[#E9E8E4] to-[#D8D7D3] mini-shadow select-none group">
        <div className="rounded-[22px] overflow-hidden bg-neutral-900 border border-neutral-800">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={(e) => {
            if (isDragging) handleMove(e.clientX);
          }}
          onPointerUp={handlePointerUp}
          className="relative w-full aspect-16/10 sm:aspect-16/9 cursor-ew-resize overflow-hidden"
        >
          {/* Base Layer: Finished Miniature */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={activeItem.miniaturePhotoUrl}
              alt="Finished MYMINI Miniature"
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Tag Badge */}
            <div className="absolute top-6 right-6 z-10 bg-[#FF6801] text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Finished MyMini Miniature
            </div>
            {/* Specs footer label */}
            <div className="absolute bottom-6 right-6 z-10 bg-black/75 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs border border-white/10 hidden sm:block">
              <span className="font-bold text-neutral-300">Scale:</span> {activeItem.scale} • <span className="font-bold text-neutral-300">Finish:</span> {activeItem.finish}
            </div>
          </div>

          {/* Clipped Top Layer: Original Photograph */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div
              className="absolute inset-0 h-full"
              style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw' }}
            >
              <img
                src={activeItem.originalPhotoUrl}
                alt="Original Customer Photograph"
                className="w-full h-full object-cover filter saturate-90"
                draggable={false}
              />
              {/* Tag Badge */}
              <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-neutral-400" />
                Original Customer Photo
              </div>
              {/* Source label */}
              <div className="absolute bottom-6 left-6 z-10 bg-black/75 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs border border-white/10 hidden sm:block">
                <span className="font-bold text-neutral-300">Supplied by:</span> {activeItem.customerName} ({activeItem.customerLocation})
              </div>
            </div>
          </div>

          {/* Vertical Slider Bar Divider */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Draggable Knob */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-[#111111] shadow-2xl border-4 border-[#FF6801] flex items-center justify-center transition-transform group-hover:scale-110">
              <ArrowLeftRight className="w-4 h-4 text-[#FF6801] stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Bottom Story Ribbon */}
        <div className="p-6 bg-white border-t border-[#E9E8E4] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-jellee font-bold text-xl text-[#1A1A1A]">
              {activeItem.title}
            </h3>
            <p className="text-sm text-[#1A1A1A] opacity-70 mt-1 font-body">
              {activeItem.description}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-[#1A1A1A] opacity-50 tracking-wider block">Turnaround</span>
              <span className="text-xs font-bold text-[#1A1A1A]">{activeItem.turnaroundTime} from proof approval</span>
            </div>
            <a
              href="#create"
              className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#FF6801] text-white text-xs font-bold font-jellee tracking-wide transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Miniaturize Mine</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
