import React, { useState } from 'react';
import { TESTIMONIALS } from '../../data/restaurantData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F3] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
              Guest Acclaim & Reviews
            </span>
            <span className="h-px w-6 bg-[#E96A24]/40" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#171714] tracking-tight">
            What Our Guests Say
          </h2>
        </div>

        {/* Carousel Showcase Card */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-14 border border-stone-200/80 shadow-md">
          <div className="absolute top-8 left-8 sm:top-12 sm:left-12 text-[#E96A24]/20 pointer-events-none">
            <Quote className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            
            {/* 5-star rating */}
            <div className="flex items-center gap-1 mb-6 text-amber-500">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="font-serif italic text-lg sm:text-2xl text-[#171714] leading-relaxed mb-8">
              "{current.quote}"
            </p>

            {/* Author Attribution */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#243C24] text-white font-serif font-bold text-sm flex items-center justify-center">
                {current.initials}
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-[#171714]">
                  {current.author}
                </div>
                <div className="text-xs text-[#77766F]">
                  {current.role} {current.publication && `· ${current.publication}`}
                </div>
              </div>
            </div>

          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-stone-200 text-stone-600 hover:text-[#171714] hover:bg-stone-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-6 bg-[#E96A24]'
                      : 'bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-stone-200 text-stone-600 hover:text-[#171714] hover:bg-stone-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
