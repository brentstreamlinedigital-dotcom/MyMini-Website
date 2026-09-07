import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onNavigateToCreate: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onProceedToCheckout,
  onNavigateToCreate,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = 0; // Complimentary insured courier worldwide

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F6F2] shadow-2xl flex flex-col border-l border-neutral-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 bg-white border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF6801]" />
              <h3 className="font-brand font-bold text-xl text-[#111111]">
                Your Commissions ({items.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-[#FF6801]/10 text-[#FF6801] flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="font-brand font-bold text-xl text-[#111111]">
                  Your cart is empty
                </h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto font-body">
                  Turn your car, home, pet, or sentimental memory into a handcrafted physical miniature.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToCreate();
                  }}
                  className="px-6 py-3 rounded-full bg-[#FF6801] text-white font-brand font-bold text-xs tracking-wide shadow-md hover:bg-[#e05b00] transition-colors"
                >
                  Configure My First Miniature
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs flex gap-4"
                >
                  {/* Photo thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                    {item.photos && item.photos.length > 0 ? (
                      <img
                        src={item.photos[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-300">
                        <Sparkles className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-brand font-bold text-sm text-[#111111] leading-tight">
                          {item.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-neutral-500 mt-1 space-y-0.5 font-body">
                        <div>Scale: <span className="text-neutral-800 font-semibold">{item.size.toUpperCase()}</span></div>
                        <div>Finish: <span className="text-neutral-800 font-semibold">{item.finish.replace('_', ' ').toUpperCase()}</span></div>
                        {item.includeDisplayPlinth && (
                          <div className="text-neutral-700 font-medium">✓ Walnut Plinth & Brass Plate</div>
                        )}
                        {item.rushProduction && (
                          <div className="text-[#FF6801] font-bold">⚡ Priority Studio Rush</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 flex items-baseline justify-between pt-2 border-t border-neutral-100">
                      <span className="text-[10px] text-neutral-400 font-semibold uppercase">Commission Price</span>
                      <span className="font-brand font-bold text-base text-[#FF6801]">${item.price} USD</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-neutral-200 space-y-4">
              <div className="space-y-2 text-xs font-body">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#111111]">${subtotal} USD</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span className="flex items-center gap-1">
                    <span>Insured Courier Delivery</span>
                    <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.2 rounded">Global</span>
                  </span>
                  <span className="font-bold text-green-700">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Digital Proof Review Guarantee</span>
                  <span className="text-neutral-900 font-semibold">Included</span>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex justify-between items-baseline">
                  <span className="font-brand font-bold text-base text-[#111111]">Total:</span>
                  <span className="font-brand font-bold text-2xl text-[#FF6801]">${subtotal} USD</span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-brand font-bold text-sm tracking-wide shadow-lg orange-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Proceed to Commission Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>30-Day Money Back Guarantee • Encrypted Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
