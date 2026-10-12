import React from 'react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { RESTAURANT_INFO, PILLARS_OF_EXCELLENCE } from '../../data/restaurantData';
import { Leaf, ChefHat, Sparkles } from 'lucide-react';

interface StorySectionProps {
  onOpenReservationModal: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onOpenReservationModal }) => {
  const pillarIcons = [
    <Leaf className="w-5 h-5 text-[#243C24]" />,
    <ChefHat className="w-5 h-5 text-[#E96A24]" />,
    <Sparkles className="w-5 h-5 text-[#243C24]" />,
  ];

  return (
    <section id="story" className="py-20 lg:py-28 bg-[#FFFFFF] border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Architectural Atmosphere Photography */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/70 bg-stone-100 aspect-[4/3] sm:aspect-[4/3]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="Maison L'Ambre dining room ambiance and open kitchen hearth"
                fallbackTitle="Restaurant Interior & Hearth"
                fallbackGradient="from-stone-900 via-amber-950 to-stone-900"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping feature detail card */}
            <div className="mt-6 sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-6 bg-[#FAF8F3] p-5 rounded-xl border border-stone-200 shadow-lg sm:max-w-xs">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E96A24] mb-1">
                Open Hearth Kitchen
              </p>
              <p className="text-xs text-[#77766F] leading-relaxed">
                Wood-fired cooking over seasoned English oak and fruitwood logs at 800°F.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
                Welcome to {RESTAURANT_INFO.name}
              </span>
              <span className="h-px w-8 bg-[#E96A24]/40" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#171714] tracking-tight mb-6">
              Good Food. Good Life.
            </h2>

            <p className="text-base sm:text-lg text-[#77766F] leading-relaxed mb-4">
              Founded on the belief that dining is an art of intimacy and communion, 
              {RESTAURANT_INFO.name} merges time-honored Mediterranean wood-fire traditions 
              with modern culinary precision. 
            </p>

            <p className="text-sm sm:text-base text-[#77766F] leading-relaxed mb-8">
              We work directly with artisanal day-boat fishermen, heirloom vegetable growers, and heritage livestock estates. 
              Nothing arrives preserved; everything is prepared from scratch each dawn by our passionate culinary brigade.
            </p>

            {/* Three Compact Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 pt-4 border-t border-stone-200/60">
              {PILLARS_OF_EXCELLENCE.slice(0, 3).map((pillar, idx) => (
                <div key={pillar.title} className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                    {pillarIcons[idx]}
                  </div>
                  <h3 className="text-sm font-semibold text-[#171714] font-serif">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#77766F] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Chef attribution & Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-stone-200/80">
              <div>
                <span className="font-accent text-3xl sm:text-4xl text-[#171714] block leading-none">
                  {RESTAURANT_INFO.executiveChef}
                </span>
                <span className="text-xs text-[#77766F] tracking-wide uppercase mt-1 block">
                  Executive Chef & Co-Founder
                </span>
              </div>

              <button
                onClick={onOpenReservationModal}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#171714] hover:bg-[#E96A24] rounded-md transition-colors shadow-sm whitespace-nowrap"
              >
                Experience Our Table
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
