import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Architectural Model',
    estimatedBudget: '$500 - $1,500',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto select-none">
      <div className="max-w-2xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6801]/10 text-[#FF6801] text-xs font-bold uppercase tracking-wider font-brand">
          <Sparkles className="w-3.5 h-3.5" />
          Bespoke Concierge & Studio Quotes
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-brand tracking-tight text-[#111111]">
          Request a Custom Commission
        </h1>
        <p className="text-base text-neutral-600 font-body">
          Have an architectural development, complex multi-part mechanical assembly, historical museum replica, or corporate fleet of miniatures in mind? Speak directly with our lead artisans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information & Guarantee Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111111] text-white p-8 rounded-3xl shadow-xl space-y-6">
            <h3 className="font-brand font-bold text-2xl text-white">
              MYMINI Atelier
            </h3>
            <p className="text-xs text-neutral-400 font-body leading-relaxed">
              We operate private 3D modeling studios and precision manufacturing cleanrooms dedicated to one-of-a-kind physical recreations.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 text-[#FF6801] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Studio Direct</span>
                  <span className="font-bold text-white">concierge@myminis.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 text-[#FF6801] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Concierge Hotline</span>
                  <span className="font-bold text-white">+1 (800) 849-MINI (6464)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 text-[#FF6801] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Global Dispatch</span>
                  <span className="font-bold text-white">Austin, TX • Stockholm • Tokyo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-neutral-200 space-y-3 text-xs">
            <div className="font-bold text-[#111111] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6801]" />
              NDA & Confidentiality Guarantee
            </div>
            <p className="text-neutral-600 font-body leading-relaxed">
              For unreleased automotive prototypes, architectural estates, or sensitive family heirlooms, we routinely sign non-disclosure agreements. Your CAD and photography files are permanently deleted post-production upon request.
            </p>
          </div>
        </div>

        {/* Custom Quote Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-brand font-bold text-2xl text-[#111111]">
                Commission Brief Received
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto font-body">
                Our creative director will review your project parameters and respond within 24 hours with an initial feasibility assessment and timeline estimate.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-brand font-bold text-xs"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-brand font-bold text-xl text-[#111111] mb-2">
                Commission Consultation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-[#F7F6F2] focus:outline-none focus:border-[#FF6801]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@estate.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-[#F7F6F2] focus:outline-none focus:border-[#FF6801]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Project Category</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-[#F7F6F2] focus:outline-none focus:border-[#FF6801]"
                  >
                    <option>Architectural Model / Estate</option>
                    <option>Vintage / Custom Automobile</option>
                    <option>Corporate Fleet / Multiple Editions</option>
                    <option>Historical / Museum Replica</option>
                    <option>Large Collector Scale (1:8 Scale)</option>
                    <option>Other Bespoke Subject</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Target Budget Tier</label>
                  <select
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-[#F7F6F2] focus:outline-none focus:border-[#FF6801]"
                  >
                    <option>$500 - $1,500 (Single Specialty Piece)</option>
                    <option>$1,500 - $3,500 (Large Scale / Museum)</option>
                    <option>$3,500 - $10,000+ (Multi-Unit / Corporate)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Project Description & Special Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the subject, approximate physical dimensions desired, materials, deadlines, and reference assets you have available..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-[#F7F6F2] focus:outline-none focus:border-[#FF6801]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-brand font-bold text-xs tracking-wide shadow-md orange-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Bespoke Commission Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
