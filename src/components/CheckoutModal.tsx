import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  Sparkles, 
  ArrowRight,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderNumber: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    firstName: 'Marcus',
    lastName: 'Lindqvist',
    email: 'marcus.l@nordicdesign.com',
    phone: '+46 70 123 4567',
    address: 'Kungsgatan 14, Fl 4',
    city: 'Stockholm',
    postalCode: '111 35',
    country: 'Sweden',
    proofApprovalNotification: 'both',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/28',
    cardCvc: '•••',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNum = `MM-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedOrderNumber(orderNum);
      setIsSubmitting(false);
      setOrderComplete(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6801', '#111111', '#FFFFFF', '#D4AF37'],
      });

      onOrderSuccess(orderNum);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 select-none">
      <div className="relative w-full max-w-2xl bg-[#F7F6F2] rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-[#111111] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#FF6801]" />
            <span className="font-brand font-bold text-lg text-white">
              MYMINI Encrypted Checkout
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderComplete ? (
          /* Order Placed Success View */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-[#FF6801] text-white flex items-center justify-center mx-auto shadow-xl orange-glow">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF6801] block mb-1">
                Commission Confirmed
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold font-brand text-[#111111]">
                Your World Is Being Miniaturized
              </h3>
              <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto font-body">
                We have assigned your project to our senior 3D sculpting atelier. Your order number is:
              </p>
              <div className="mt-3 inline-block font-mono font-bold text-2xl text-[#111111] bg-white px-6 py-2 rounded-2xl border border-neutral-300 shadow-sm">
                {generatedOrderNumber}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="font-bold text-[#111111] text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF6801]" /> Next Milestone:
              </div>
              <p className="text-neutral-600">
                In approximately 3 to 4 days, you will receive an email containing your private <strong>interactive 3D digital proof</strong>. You will be able to inspect every angle and approve it before physical 3D printing begins.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#111111] hover:bg-black text-white font-brand font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer"
              >
                Track This Order
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Order Items Preview */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-800 mb-2">
                <span>Commission Summary ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                <span className="text-[#FF6801] font-brand text-base">${subtotal} USD</span>
              </div>
              <div className="space-y-1.5 max-h-24 overflow-y-auto text-xs text-neutral-600">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between items-center py-0.5">
                    <span>{it.title} ({it.size.toUpperCase()})</span>
                    <span className="font-semibold text-neutral-800">${it.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="font-brand font-bold text-sm text-[#111111] uppercase tracking-wider">
                1. Customer & Delivery Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="First Name"
                  className="px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF6801]"
                />
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Last Name"
                  className="px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF6801]"
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email (for 3D Proof Approval)"
                  className="px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF6801]"
                />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone Number"
                  className="px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF6801]"
                />
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street Address"
                  className="sm:col-span-2 px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF6801]"
                />
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                  className="px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF6801]"
                />
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Country"
                  className="px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF6801]"
                />
              </div>
            </div>

            {/* Proof Notification Preference */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 text-xs space-y-2">
              <div className="font-bold text-[#111111] flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#FF6801]" />
                3D Proof Approval Preference
              </div>
              <p className="text-neutral-500 text-[11px]">
                We send a 360° digital interactive proof before any resin is printed. Where should we send your proof?
              </p>
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="proof"
                    checked={formData.proofApprovalNotification === 'both'}
                    onChange={() => setFormData({ ...formData, proofApprovalNotification: 'both' })}
                    className="accent-[#FF6801]"
                  />
                  <span>Email & SMS Alert</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="proof"
                    checked={formData.proofApprovalNotification === 'email'}
                    onChange={() => setFormData({ ...formData, proofApprovalNotification: 'email' })}
                    className="accent-[#FF6801]"
                  />
                  <span>Email Only</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h4 className="font-brand font-bold text-sm text-[#111111] uppercase tracking-wider">
                2. Secure Payment
              </h4>
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <span className="text-xs font-bold text-neutral-800 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#FF6801]" /> Credit / Debit Card
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                    <span>Visa</span> • <span>Mastercard</span> • <span>Amex</span> • <span>Apple Pay</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={formData.cardNumber}
                    readOnly
                    className="col-span-2 px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-neutral-50 font-mono text-neutral-700"
                  />
                  <input
                    type="text"
                    value={formData.cardExp}
                    readOnly
                    className="px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-neutral-50 font-mono text-neutral-700 text-center"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-brand font-bold text-base shadow-lg orange-glow flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Commission Atelier...</span>
                ) : (
                  <>
                    <span>Confirm Commission • ${subtotal} USD</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>Full Money-Back Proof Guarantee • Insured Delivery</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
