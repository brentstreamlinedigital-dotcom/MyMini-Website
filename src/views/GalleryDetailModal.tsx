import React, { useState } from 'react';
import { X, Sparkles, Camera, ArrowLeftRight, Check, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryDetailModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onConfigureCategory: (category: string) => void;
}

export const GalleryDetailModal: React.FC<GalleryDetailModalProps> = ({
  item,
  onClose,
  onConfigureCategory,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  if (!item) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none">
      <div className="relative w-full max-w-5xl bg-[#F7F6F2] rounded-3xl shadow-2xl border border-neutral-300 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-[#111111] text-white flex items-center justify-between border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#FF6801] font-brand">
              Made Mini Archive • {item.scale}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-brand text-white">
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Interactive Split Comparison Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 font-brand">
                <ArrowLeftRight className="w-4 h-4 text-[#FF6801]" />
                Drag slider to compare Original Photograph ↔ Physical Miniature
              </span>
              <span className="text-[11px] text-neutral-500 hidden sm:inline">
                Customer: {item.customerName} ({item.customerLocation})
              </span>
            </div>

            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="relative w-full aspect-16/9 rounded-2xl overflow-hidden shadow-lg border border-neutral-300 cursor-ew-resize select-none"
            >
              {/* Finished miniature */}
              <div className="absolute inset-0">
                <img
                  src={item.miniaturePhotoUrl}
                  alt="Finished Miniature"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#FF6801] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Finished MyMini
                </div>
              </div>

              {/* Original photo clipped */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="absolute inset-0 w-[1000px] max-w-[90vw] h-full">
                  <img
                    src={item.originalPhotoUrl}
                    alt="Original Photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                    Original Photo
                  </div>
                </div>
              </div>

              {/* Split handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#111111] shadow-2xl border-4 border-[#FF6801] flex items-center justify-center">
                  <ArrowLeftRight className="w-4 h-4 text-[#FF6801]" />
                </div>
              </div>
            </div>
          </div>

          {/* Story & Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xl font-bold font-brand text-[#111111]">
                The Story Behind the Miniature
              </h4>
              <p className="text-sm text-neutral-700 font-body leading-relaxed bg-white p-5 rounded-2xl border border-neutral-200">
                {item.story}
              </p>

              {item.macroDetails && item.macroDetails.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h5 className="text-xs uppercase font-bold text-neutral-500 tracking-wider">
                    Macro Nuances Recreated
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.macroDetails.map((macro, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-neutral-200 flex gap-3">
                        <img
                          src={macro.imageUrl}
                          alt={macro.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <div className="font-brand font-bold text-xs text-[#111111]">{macro.title}</div>
                          <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">{macro.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Spec Card */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-3 text-xs">
              <h5 className="font-brand font-bold text-sm text-[#111111] uppercase tracking-wider pb-2 border-b border-neutral-100">
                Commission Specs
              </h5>
              <div>
                <span className="text-neutral-400 font-semibold block">Dimensions:</span>
                <span className="font-bold text-neutral-900">{item.dimensions}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold block">Precision Scale:</span>
                <span className="font-bold text-neutral-900">{item.scale}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold block">Artisan Finish:</span>
                <span className="font-bold text-[#FF6801]">{item.finish}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold block">Production Lead Time:</span>
                <span className="font-bold text-neutral-900">{item.turnaroundTime}</span>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onConfigureCategory(item.category);
                  }}
                  className="w-full py-3 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-brand font-bold text-xs tracking-wide shadow-md orange-glow flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Miniaturize Similar Subject</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
