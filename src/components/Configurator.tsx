import React, { useState } from 'react';
import { 
  Upload, 
  Check, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Info, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  FileQuestion,
  HelpCircle,
  Truck
} from 'lucide-react';
import { SIZE_OPTIONS, FINISH_OPTIONS, CATEGORIES_DATA } from '../data/mockData';
import { CategoryType, SizeTier, FinishTier, CartItem } from '../types';

interface ConfiguratorProps {
  initialCategory?: CategoryType;
  onAddToCart: (item: CartItem) => void;
  onRequestQuote?: (data: any) => void;
  className?: string;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
  initialCategory = 'cars',
  onAddToCart,
  onRequestQuote,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [category, setCategory] = useState<CategoryType>(initialCategory);
  const [customCategory, setCustomCategory] = useState<string>('');
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ id: string; url: string; name: string }>>([
    // Pre-seed 2 sample reference photos so user can test immediately or replace with their own!
    {
      id: 'photo-1',
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
      name: 'front_three_quarter.jpg',
    },
    {
      id: 'photo-2',
      url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=600&q=80',
      name: 'side_profile_view.jpg',
    }
  ]);
  const [showPhotoGuide, setShowPhotoGuide] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<SizeTier>('classic');
  const [selectedFinish, setSelectedFinish] = useState<FinishTier>('premium_painted');
  const [personalizationText, setPersonalizationText] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [includePlinth, setIncludePlinth] = useState<boolean>(true);
  const [rushProduction, setRushProduction] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Price Calculation
  const currentSizeObj = SIZE_OPTIONS.find((s) => s.id === selectedSize) || SIZE_OPTIONS[1];
  const currentFinishObj = FINISH_OPTIONS.find((f) => f.id === selectedFinish) || FINISH_OPTIONS[1];

  const calculatedBase = currentSizeObj.basePrice;
  const finishCost = currentFinishObj.addedCost;
  const plinthCost = selectedFinish === 'collector_edition' ? 0 : includePlinth ? 45 : 0;
  const rushCost = rushProduction ? 85 : 0;
  const totalPrice = calculatedBase + finishCost + plinthCost + rushCost;

  // File Upload Handlers
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedPhotos((prev) => [
            ...prev,
            {
              id: `upload-${Date.now()}-${Math.random()}`,
              url: e.target?.result as string,
              name: file.name,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id: string) => {
    setUploadedPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleFinishConfig = () => {
    const categoryName = category === 'other' && customCategory ? customCategory : category;
    const item: CartItem = {
      id: `myminis-${Date.now()}`,
      title: `Custom ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Miniature`,
      category,
      size: selectedSize,
      finish: selectedFinish,
      price: totalPrice,
      photos: uploadedPhotos.map((p) => p.url),
      personalizationText: personalizationText.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      includeDisplayPlinth: includePlinth || selectedFinish === 'collector_edition',
      rushProduction,
      createdAt: Date.now(),
    };

    onAddToCart(item);
  };

  return (
    <div id="create" className={`w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 ${className}`}>
      {/* Configurator Card Shell with Professional Polish Frame */}
      <div className="mini-shadow rounded-3xl p-1 bg-gradient-to-br from-[#E9E8E4] to-[#D8D7D3]">
        <div className="bg-white rounded-[22px] border border-[#E9E8E4] overflow-hidden">
          {/* Top Progress Tracker */}
          <div className="p-6 sm:p-8 bg-[#111111] text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#FF6801] block">
                  Bespoke Commission Configurator
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-jellee tracking-tight">
                  Create Your MyMini
                </h2>
              </div>

              {/* Estimated Price Indicator */}
              <div className="text-right bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-xs border border-white/10 self-start sm:self-auto">
                <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
                  Estimated Total
                </span>
                <span className="text-xl sm:text-2xl font-bold font-jellee text-[#FF6801]">
                  ${totalPrice} USD
                </span>
              </div>
            </div>

            {/* Stepper Dots & Labels */}
            <div className="grid grid-cols-5 gap-2 pt-2 border-t border-white/15">
            {[
              { num: 1, label: 'Subject' },
              { num: 2, label: 'Photos' },
              { num: 3, label: 'Scale' },
              { num: 4, label: 'Finish' },
              { num: 5, label: 'Review' },
            ].map((step) => {
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setCurrentStep(step.num)}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all mb-1 ${
                      isDone
                        ? 'bg-[#FF6801] text-white'
                        : isCurrent
                        ? 'bg-white text-[#111111] ring-4 ring-[#FF6801]/30'
                        : 'bg-white/15 text-neutral-400 group-hover:bg-white/25'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold truncate ${
                      isCurrent ? 'text-white' : 'text-neutral-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Body Container */}
        <div className="p-6 sm:p-10 min-h-[480px] flex flex-col justify-between">
          {/* STEP 1: What should we miniaturize? */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6801] font-brand">
                  Step 01
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-brand text-[#111111] mt-1">
                  What should we miniaturize?
                </h3>
                <p className="text-sm text-neutral-600 mt-1 font-body">
                  Select the primary category of your subject. Every subject receives dedicated 3D anatomical or architectural specialization.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {CATEGORIES_DATA.map((cat) => {
                  const isSelected = category === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as CategoryType)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-3 group relative overflow-hidden ${
                        isSelected
                          ? 'border-[#FF6801] bg-[#FF6801]/5 shadow-md'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-100">
                        <img
                          src={cat.heroImage}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="font-brand font-bold text-sm sm:text-base text-[#111111] block">
                          {cat.title}
                        </span>
                        <span className="text-[11px] text-neutral-500 line-clamp-1">
                          {cat.highlight.split(',')[0]}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#FF6801] text-white flex items-center justify-center shadow">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {category === 'other' && (
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Describe your custom item:
                  </label>
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="e.g., Grandfather's vintage lathe, childhood treehouse, custom watch..."
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#FF6801] bg-white text-sm"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Show us what you've got */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF6801] font-brand">
                    Step 02
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-brand text-[#111111] mt-1">
                    Show us what you've got.
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1 font-body">
                    More angles help us recreate your subject with greater precision and depth.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPhotoGuide(!showPhotoGuide)}
                  className="text-xs font-bold text-[#FF6801] hover:underline flex items-center gap-1.5 self-start"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showPhotoGuide ? 'Hide Photo Guide' : 'Photo Guide (Good vs Bad)'}</span>
                </button>
              </div>

              {/* Photo Guide Drawer */}
              {showPhotoGuide && (
                <div className="bg-[#F7F6F2] p-5 rounded-2xl border border-neutral-300 text-xs space-y-3">
                  <div className="font-bold text-sm text-[#111111] font-brand">
                    Recommended Reference Angles for {category.toUpperCase()}:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-3.5 rounded-xl border border-green-200">
                      <span className="font-bold text-green-700 flex items-center gap-1 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> Ideal Photos
                      </span>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1">
                        <li>Natural daylight or balanced indoor lighting</li>
                        <li>Multiple angles (Front, 3/4 front, side profile, rear)</li>
                        <li>Close-ups of wheels, license plates, badges, eyes or architectural trims</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-amber-200">
                      <span className="font-bold text-amber-700 flex items-center gap-1 mb-1">
                        <AlertCircle className="w-4 h-4 text-amber-600" /> Challenging Photos
                      </span>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1">
                        <li>Extreme harsh shadows or pitch black night shots</li>
                        <li>Heavy motion blur or obstructed views</li>
                        <li>Only a single extreme low-resolution thumbnail</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Drag & Drop Upload Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  handleFileUpload(e.dataTransfer.files);
                }}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all ${
                  isDragOver
                    ? 'border-[#FF6801] bg-[#FF6801]/10 scale-[1.01]'
                    : 'border-neutral-300 hover:border-[#FF6801] bg-[#F7F6F2]/60'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white text-[#FF6801] shadow-md mx-auto flex items-center justify-center mb-4">
                  <Upload className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold font-brand text-[#111111]">
                  Drag & Drop Photographs Here
                </h4>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  Supports JPG, PNG, HEIC, TIFF up to 50MB per file. Add multiple angles for maximum fidelity.
                </p>

                <div className="mt-4">
                  <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111111] hover:bg-neutral-800 text-white font-brand font-bold text-xs cursor-pointer shadow-md transition-all">
                    <span>Browse Device Photos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Uploaded Thumbnails Grid */}
              {uploadedPhotos.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-neutral-700">
                      Uploaded Reference Photos ({uploadedPhotos.length})
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Our 3D artists will review these during 3D sculpting
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {uploadedPhotos.map((photo, idx) => (
                      <div
                        key={photo.id}
                        className="relative rounded-xl overflow-hidden aspect-square bg-neutral-100 border border-neutral-200 group shadow-xs"
                      >
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removePhoto(photo.id)}
                            className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Choose your size */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6801] font-brand">
                  Step 03
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-brand text-[#111111] mt-1">
                  Choose your size.
                </h3>
                <p className="text-sm text-neutral-600 mt-1 font-body">
                  From pocket keepsakes to museum centerpiece scale. Larger sizes allow for extreme mechanical, facial, or architectural detail.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SIZE_OPTIONS.map((sizeOpt) => {
                  const isSelected = selectedSize === sizeOpt.id;

                  return (
                    <button
                      key={sizeOpt.id}
                      type="button"
                      onClick={() => setSelectedSize(sizeOpt.id)}
                      className={`p-5 rounded-3xl border-2 text-left transition-all flex flex-col justify-between relative ${
                        isSelected
                          ? 'border-[#FF6801] bg-[#FF6801]/5 shadow-lg ring-2 ring-[#FF6801]/20'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      {sizeOpt.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6801] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                          Most Popular
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-brand font-bold text-xl text-[#111111]">
                            {sizeOpt.name}
                          </span>
                          <span className="font-brand font-bold text-lg text-[#FF6801]">
                            ${sizeOpt.basePrice}
                          </span>
                        </div>

                        <span className="text-xs font-semibold text-neutral-500 block mb-3">
                          {sizeOpt.tagline}
                        </span>

                        <div className="bg-white/80 p-3 rounded-2xl border border-neutral-200 mb-3 space-y-1 text-xs">
                          <div className="font-bold text-[#111111]">
                            {sizeOpt.dimensions} ({sizeOpt.dimensionsMetric})
                          </div>
                          <div className="text-[11px] text-neutral-600 leading-snug">
                            {sizeOpt.comparisonObject}
                          </div>
                        </div>

                        <p className="text-xs text-neutral-600 italic">
                          "{sizeOpt.recommendedUse}"
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-neutral-400">
                          Base Model
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            isSelected ? 'bg-[#FF6801] text-white' : 'bg-neutral-100 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Choose your finish */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6801] font-brand">
                  Step 04
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-brand text-[#111111] mt-1">
                  Choose your finish.
                </h3>
                <p className="text-sm text-neutral-600 mt-1 font-body">
                  Select your physical finishing tier, from pure architectural resin to master-artisan hand painting and museum plinths.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {FINISH_OPTIONS.map((fin) => {
                  const isSelected = selectedFinish === fin.id;

                  return (
                    <button
                      key={fin.id}
                      type="button"
                      onClick={() => setSelectedFinish(fin.id)}
                      className={`p-6 rounded-3xl border-2 text-left transition-all flex flex-col justify-between relative ${
                        isSelected
                          ? 'border-[#FF6801] bg-[#FF6801]/5 shadow-xl ring-2 ring-[#FF6801]/20'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 mb-2">
                          {fin.badge}
                        </div>

                        <div className="flex items-baseline justify-between mb-1">
                          <h4 className="font-brand font-bold text-xl text-[#111111]">
                            {fin.name}
                          </h4>
                        </div>

                        <span className="text-xs font-bold text-[#FF6801] block mb-3">
                          {fin.addedCost === 0 ? 'Included in base' : `+$${fin.addedCost} USD`}
                        </span>

                        <p className="text-xs text-neutral-600 mb-4 font-body leading-relaxed">
                          {fin.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          {fin.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                              <Check className="w-3.5 h-3.5 text-[#FF6801] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          ~{fin.leadTimeDays} days production
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-[#FF6801] text-white' : 'bg-neutral-100 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Extra Customization Options */}
              <div className="bg-[#F7F6F2] p-5 rounded-2xl border border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Brass Plaque Plinth Engraving (Optional)
                  </label>
                  <input
                    type="text"
                    value={personalizationText}
                    onChange={(e) => setPersonalizationText(e.target.value)}
                    placeholder="e.g., '1971 Porsche 911 • Dad's 70th' or 'Barnaby 2010-2024'"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF6801]"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Laser-engraved onto solid brushed brass plate
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Special Artist Instructions
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g., 'Please include the scratch on right fender' or 'Show him sitting'"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF6801]"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Our modelers read all notes before beginning the 3D sculpt
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review your MyMini */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6801] font-brand">
                  Step 05
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-brand text-[#111111] mt-1">
                  Review your MyMini.
                </h3>
                <p className="text-sm text-neutral-600 mt-1 font-body">
                  Confirm your commission parameters. You will receive an interactive 3D digital proof before any physical printing begins.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Summary Card */}
                <div className="lg:col-span-2 bg-[#F7F6F2] p-6 rounded-3xl border border-neutral-200 space-y-4">
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-neutral-300/80 gap-2">
                    <div>
                      <span className="text-xs uppercase font-bold text-neutral-400">Item Concept</span>
                      <h4 className="font-brand font-bold text-xl text-[#111111]">
                        Custom {category.toUpperCase()} Miniature
                      </h4>
                    </div>
                    <span className="bg-[#FF6801] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {uploadedPhotos.length} Reference Photo{uploadedPhotos.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Summary Spec Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-neutral-200">
                      <span className="text-neutral-400 font-semibold block">Scale Tier</span>
                      <span className="font-bold text-[#111111] text-sm font-brand">{currentSizeObj.name}</span>
                      <span className="text-[11px] text-neutral-500 block">{currentSizeObj.dimensions}</span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-neutral-200">
                      <span className="text-neutral-400 font-semibold block">Finish & Craft</span>
                      <span className="font-bold text-[#111111] text-sm font-brand">{currentFinishObj.name}</span>
                      <span className="text-[11px] text-neutral-500 block">{currentFinishObj.badge}</span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-neutral-200">
                      <span className="text-neutral-400 font-semibold block">Turnaround</span>
                      <span className="font-bold text-[#111111] text-sm font-brand">
                        {rushProduction ? '5-7 Days (Rush)' : `~${currentFinishObj.leadTimeDays} Days`}
                      </span>
                      <span className="text-[11px] text-neutral-500 block">From proof approval</span>
                    </div>
                  </div>

                  {personalizationText && (
                    <div className="bg-white p-3.5 rounded-xl border border-neutral-200 text-xs">
                      <span className="font-bold text-neutral-700">Laser-Engraved Plaque Text:</span>
                      <p className="font-mono text-neutral-900 mt-0.5 bg-neutral-100 p-1.5 rounded">
                        "{personalizationText}"
                      </p>
                    </div>
                  )}

                  {/* Trust guarantees badge list */}
                  <div className="pt-2 border-t border-neutral-200 space-y-2 text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span><strong>100% Approval Guarantee:</strong> You inspect and approve a 360° digital 3D proof before printing.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#FF6801] shrink-0" />
                      <span><strong>Photo Privacy:</strong> Your personal photos are strictly used for your model and never shared.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-neutral-700 shrink-0" />
                      <span><strong>Insured Vault Delivery:</strong> Shipped in custom shock-absorbing foam case worldwide.</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Checkout Actions */}
                <div className="bg-[#111111] text-white p-6 rounded-3xl flex flex-col justify-between shadow-xl">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                      Order Breakdown
                    </span>

                    <div className="space-y-2.5 text-xs pb-4 border-b border-white/10">
                      <div className="flex justify-between">
                        <span className="text-neutral-300">{currentSizeObj.name} Miniature Base:</span>
                        <span className="font-bold">${calculatedBase}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-300">{currentFinishObj.name}:</span>
                        <span className="font-bold">+${finishCost}</span>
                      </div>
                      {plinthCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-neutral-300">American Walnut Plinth:</span>
                          <span className="font-bold">+${plinthCost}</span>
                        </div>
                      )}
                      {rushCost > 0 && (
                        <div className="flex justify-between text-[#FF6801]">
                          <span>Priority Studio Rush:</span>
                          <span className="font-bold">+${rushCost}</span>
                        </div>
                      )}
                    </div>

                    {/* Rush Toggle */}
                    <div className="mt-4 pt-2">
                      <label className="flex items-center gap-2 text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rushProduction}
                          onChange={(e) => setRushProduction(e.target.checked)}
                          className="rounded text-[#FF6801] focus:ring-[#FF6801] accent-[#FF6801]"
                        />
                        <span className="text-neutral-300">Add Priority Studio Rush (5-7 days)</span>
                      </label>
                    </div>

                    <div className="mt-6 flex items-baseline justify-between">
                      <span className="font-brand text-sm text-neutral-300">Total Investment:</span>
                      <span className="font-brand font-bold text-3xl text-[#FF6801]">${totalPrice}</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1">
                      Includes 3D modeling, revision rounds, precision printing & packaging
                    </span>
                  </div>

                  <div className="space-y-3 mt-6">
                    <button
                      type="button"
                      onClick={handleFinishConfig}
                      className="w-full py-3.5 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-brand font-bold text-sm tracking-wide transition-all shadow-lg orange-glow flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Create My Mini</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (onRequestQuote) {
                          onRequestQuote({
                            category,
                            size: selectedSize,
                            finish: selectedFinish,
                            photos: uploadedPhotos,
                          });
                        }
                      }}
                      className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-brand text-xs transition-colors text-center cursor-pointer"
                    >
                      Request a Custom Large Scale Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-[#E9E8E4] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-[#E9E8E4] text-[#1A1A1A] font-jellee font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="px-6 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#FF6801] text-white font-jellee font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-98"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishConfig}
                className="px-8 py-3.5 rounded-full bg-[#FF6801] hover:bg-[#e05b00] text-white font-jellee font-bold text-sm flex items-center gap-2 transition-all shadow-lg orange-glow cursor-pointer hover:scale-105 active:scale-98"
              >
                <span>Confirm & Proceed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
