import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../data/restaurantData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { LightboxModal } from './LightboxModal';
import { Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FFFFFF] border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
              Visual Moments
            </span>
            <span className="h-px w-6 bg-[#E96A24]/40" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#171714] tracking-tight">
            The Restaurant & Craft
          </h2>
          <p className="text-sm sm:text-base text-[#77766F] mt-3">
            A glimpse into our open-hearth kitchen, artisanal wine vault, and warm dining salons.
          </p>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className={`group relative rounded-xl overflow-hidden cursor-pointer bg-stone-100 border border-stone-200/70 shadow-xs hover:shadow-md transition-all duration-300 ${item.span || 'col-span-1'} aspect-[4/3]`}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                fallbackTitle={item.title}
                fallbackGradient={item.fallbackGradient}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Hover Scrim & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E96A24]">
                      {item.category}
                    </span>
                    <h3 className="text-base font-serif font-bold mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-xs text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        items={GALLERY_ITEMS}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={setActiveLightboxIndex}
      />
    </section>
  );
};
