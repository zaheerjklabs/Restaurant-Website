import React from 'react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { MENU_ITEMS } from '../../data/menuData';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';
import { ArrowRight, Star, Plus } from 'lucide-react';

interface HeroSectionProps {
  onOpenReservationModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservationModal }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();

  const signatureDish = MENU_ITEMS[0]; // Chilean Sea Bass

  const handleQuickAddSignature = () => {
    addToCart(signatureDish);
    showToast('Added to Cart', `${signatureDish.name} (${formatPrice(signatureDish.price)})`);
    setIsCartOpen(true);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-[#FAF8F3]">
      {/* Subtle organic warmth in background */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#E96A24]/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
                Crafted With Passion
              </span>
              <span className="h-px w-8 bg-[#E96A24]/40" aria-hidden="true" />
              <span className="text-xs text-[#77766F] font-serif italic">
                Mayfair, London
              </span>
            </div>

            {/* Editorial Serif Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#171714] tracking-tight leading-[1.12] mb-6 text-balance">
              Delicious Food. <br />
              <span className="text-[#E96A24] italic font-normal">Unforgettable</span> Moments.
            </h1>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg text-[#77766F] leading-relaxed max-w-xl mb-8">
              Experience the harmony of wild-caught coastal delicacies and open-hearth cooking. 
              Every plate is a tribute to regenerative seasonal harvests, classical culinary craft, 
              and authentic table hospitality.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#E96A24] hover:bg-[#D35817] rounded-md transition-all duration-200 shadow-sm hover:shadow group text-center whitespace-nowrap"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenReservationModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#171714] bg-transparent hover:bg-stone-200/60 border border-stone-300 rounded-md transition-colors text-center whitespace-nowrap"
              >
                Reserve a Table
              </button>
            </div>

            {/* Quantitative Proof Adjacency */}
            <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#171714] tabular-nums">
                  35+
                </div>
                <div className="text-xs text-[#77766F] mt-0.5">
                  Artisanal Recipes
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#171714] tabular-nums">
                    4.9
                  </span>
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500 inline" />
                </div>
                <div className="text-xs text-[#77766F] mt-0.5">
                  Guest Acclaim
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#243C24] tabular-nums">
                  100%
                </div>
                <div className="text-xs text-[#77766F] mt-0.5">
                  Organic & Wild
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Centerpiece */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]">
                <ImageWithFallback
                  src={signatureDish.image}
                  alt={signatureDish.name}
                  fallbackTitle={signatureDish.name}
                  fallbackGradient={signatureDish.fallbackGradient}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle scrim at bottom for badge contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Dish Informational Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-stone-200/80 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#E96A24] uppercase tracking-wider">
                      <span>Chef's Signature</span>
                      <span>·</span>
                      <span className="text-stone-500 normal-case font-normal">Fresh Catch</span>
                    </div>
                    <h3 className="text-sm font-semibold text-[#171714] truncate font-serif">
                      {signatureDish.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#171714] tabular-nums">
                      {formatPrice(signatureDish.price)}
                    </div>
                  </div>

                  <button
                    onClick={handleQuickAddSignature}
                    className="p-2.5 bg-[#E96A24] hover:bg-[#D35817] text-white rounded-lg shadow transition-colors flex items-center justify-center shrink-0"
                    title={`Add ${signatureDish.name} to order`}
                    aria-label={`Add ${signatureDish.name} to order`}
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Decorative culinary stamp badge */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#243C24] text-white p-3 rounded-full shadow-lg border-2 border-white items-center justify-center w-20 h-20 text-center flex-col">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-amber-200">Wood Fired</span>
                <span className="text-[11px] font-serif font-bold">Hearth</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
