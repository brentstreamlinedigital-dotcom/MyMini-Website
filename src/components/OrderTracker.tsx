import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Camera, 
  Box, 
  Cpu, 
  Sparkles, 
  Truck, 
  Gift, 
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { OrderRecord, OrderStatusStage } from '../types';
import { SAMPLE_ORDERS } from '../data/mockData';

interface OrderTrackerProps {
  initialOrderNumber?: string;
  onClose?: () => void;
  className?: string;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  initialOrderNumber = 'MM-84920',
  onClose,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialOrderNumber);
  const [activeOrder, setActiveOrder] = useState<OrderRecord>(SAMPLE_ORDERS[0]);
  const [searchError, setSearchError] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    const found = SAMPLE_ORDERS.find(
      (o) => o.orderNumber.toUpperCase() === query || o.email.toLowerCase() === searchQuery.toLowerCase()
    );

    if (found) {
      setActiveOrder(found);
      setSearchError('');
    } else {
      setSearchError(`No order found matching "${searchQuery}". Try sample orders: MM-84920 or MM-91044.`);
    }
  };

  const getStageIcon = (stage: OrderStatusStage) => {
    switch (stage) {
      case 'photo_received':
        return <Camera className="w-4 h-4" />;
      case 'model_in_progress':
        return <Box className="w-4 h-4" />;
      case 'model_approved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'in_production':
        return <Cpu className="w-4 h-4" />;
      case 'quality_check':
        return <Sparkles className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <Gift className="w-4 h-4" />;
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto py-10 px-4 sm:px-6 ${className}`}>
      {/* Header & Search Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-200/80 mb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6801]/10 text-[#FF6801] text-xs font-bold uppercase tracking-wider mb-2 font-brand">
            <Clock className="w-3.5 h-3.5" />
            Live Production Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-brand text-[#111111]">
            Track Your Miniature Journey
          </h2>
          <p className="text-sm text-neutral-600 mt-2 font-body">
            Every MyMini is individually sculpted, 3D printed in 8K resolution, and hand-finished. Follow every milestone in real time.
          </p>
        </div>

        {/* Order Search Form */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order # (e.g. MM-84920) or Email"
              className="w-full pl-11 pr-4 py-3 rounded-full border border-neutral-300 focus:outline-none focus:border-[#FF6801] text-xs sm:text-sm bg-[#F7F6F2]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#111111] hover:bg-black text-white font-brand font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Track Commission
          </button>
        </form>

        {searchError && (
          <p className="text-xs text-red-600 mt-3 font-medium">
            {searchError}
          </p>
        )}

        {/* Quick Sample Links */}
        <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
          <span>Try live sample orders:</span>
          {SAMPLE_ORDERS.map((ord) => (
            <button
              key={ord.orderNumber}
              type="button"
              onClick={() => {
                setSearchQuery(ord.orderNumber);
                setActiveOrder(ord);
                setSearchError('');
              }}
              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-[11px] font-bold"
            >
              {ord.orderNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Active Order Overview Card */}
      <div className="bg-[#111111] text-white rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono font-bold text-[#FF6801] text-lg sm:text-xl">
                {activeOrder.orderNumber}
              </span>
              <span className="bg-white/15 text-white text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {activeOrder.size}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-brand">
              {activeOrder.itemTitle}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Commissioned for: <span className="text-white font-medium">{activeOrder.customerName}</span> ({activeOrder.email})
            </p>
          </div>

          <div className="text-left md:text-right bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
              Estimated Delivery
            </span>
            <span className="text-xl sm:text-2xl font-bold font-brand text-[#FF6801]">
              {activeOrder.estimatedDelivery}
            </span>
            {activeOrder.carrier && (
              <span className="text-xs text-neutral-300 block mt-0.5">
                via {activeOrder.carrier}
              </span>
            )}
          </div>
        </div>

        {/* Order Reference Assets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-2">
              1. Customer Photo
            </span>
            <div className="aspect-video rounded-xl overflow-hidden bg-neutral-800">
              <img
                src={activeOrder.previewPhotoUrl}
                alt="Customer Reference"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-2">
              2. 3D Digital Sculpt
            </span>
            <div className="aspect-video rounded-xl overflow-hidden bg-neutral-800">
              <img
                src={activeOrder.digitalModelRenderUrl || activeOrder.previewPhotoUrl}
                alt="Digital 3D Model"
                className="w-full h-full object-cover filter contrast-125"
              />
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block mb-2">
              3. Physical Miniature
            </span>
            <div className="aspect-video rounded-xl overflow-hidden bg-neutral-800">
              <img
                src={activeOrder.finalPhotoUrl || activeOrder.previewPhotoUrl}
                alt="Finished Miniature"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 7-Stage Visual Production Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-200/80">
        <h4 className="text-xl font-bold font-brand text-[#111111] mb-6">
          Production Milestones
        </h4>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-neutral-200">
          {activeOrder.timeline.map((event, idx) => {
            return (
              <div key={event.stage} className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                    event.completed
                      ? 'bg-green-600 text-white ring-4 ring-green-100'
                      : event.current
                      ? 'bg-[#FF6801] text-white ring-4 ring-[#FF6801]/30 animate-pulse'
                      : 'bg-neutral-100 text-neutral-400 border border-neutral-300'
                  }`}
                >
                  {getStageIcon(event.stage)}
                </div>

                {/* Event Content */}
                <div className="flex-1 bg-[#F7F6F2] p-4 sm:p-5 rounded-2xl border border-neutral-200/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-brand font-bold text-base sm:text-lg text-[#111111]">
                        {event.label}
                      </span>
                      {event.current && (
                        <span className="bg-[#FF6801] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          In Progress
                        </span>
                      )}
                      {event.completed && (
                        <span className="text-green-700 text-[11px] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      )}
                    </div>
                    {event.date && (
                      <span className="text-xs font-mono text-neutral-500">
                        {event.date}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 font-body">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
