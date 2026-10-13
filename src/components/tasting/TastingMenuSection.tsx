import React, { useState } from 'react';
import { TASTING_EXPERIENCES, TASTING_COURSES } from '../../data/tastingMenuData';
import { useCurrency } from '../../context/CurrencyContext';
import { Sparkles, Wine, Clock, Utensils, ArrowRight, Check } from 'lucide-react';
import { Tilt3DCard } from '../scrollytelling/Tilt3DCard';

interface TastingMenuSectionProps {
  onReserveTasting: (experienceId: string) => void;
}

export const TastingMenuSection: React.FC<TastingMenuSectionProps> = ({ onReserveTasting }) => {
  const { formatPrice } = useCurrency();
  const [selectedExperience, setSelectedExperience] = useState(TASTING_EXPERIENCES[0].id);
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);

  const activeExp = TASTING_EXPERIENCES.find(e => e.id === selectedExperience) || TASTING_EXPERIENCES[0];
  const activeCourse = TASTING_COURSES[activeCourseIndex] || TASTING_COURSES[0];

  return (
    <section id="tasting-menu" className="py-20 lg:py-28 bg-[#171714]/85 backdrop-blur-md text-white relative z-20 overflow-hidden">
      {/* Ambient background glows */}
      <div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-[#E96A24]/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 left-10 w-96 h-96 bg-[#243C24]/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
              The Chef's Degustation
            </span>
            <span className="h-px w-6 bg-[#E96A24]/60" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Multi-Course Tasting Experience
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
            A bespoke culinary progression curated by Executive Chef Antoine Laurent, paired harmoniously with vintage cellared wines.
          </p>
        </div>

        {/* Experience Selector Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          {TASTING_EXPERIENCES.map((exp) => {
            const isSelected = selectedExperience === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedExperience(exp.id)}
                className={`w-full sm:w-auto px-6 py-4 rounded-xl border text-left sm:text-center transition-all ${
                  isSelected
                    ? 'bg-white/10 border-[#E96A24] text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-stone-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="text-sm font-serif font-bold text-white flex items-center justify-between sm:justify-center gap-3">
                  <span>{exp.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#E96A24] text-white font-sans font-semibold">
                    {exp.coursesCount} Courses
                  </span>
                </div>
                <div className="text-xs text-stone-300 mt-1 font-serif">
                  {formatPrice(exp.pricePerGuest)} per guest · <span className="text-amber-400">+{formatPrice(exp.winePairingPrice)} Wine Pairing</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Course Stepper Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Course Stepper List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              Course-by-Course Progression
            </h3>

            <div className="space-y-2">
              {TASTING_COURSES.map((course, idx) => {
                const isActive = activeCourseIndex === idx;
                return (
                  <button
                    key={course.courseNumber}
                    onClick={() => setActiveCourseIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-white/15 border-[#E96A24] text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        isActive ? 'bg-[#E96A24] text-white' : 'bg-white/10 text-stone-400'
                      }`}>
                        0{course.courseNumber}
                      </div>
                      <div>
                        <div className="text-xs text-stone-400 uppercase tracking-wider">
                          {course.title}
                        </div>
                        <div className="text-sm font-serif font-bold text-white truncate max-w-[200px] sm:max-w-[260px]">
                          {course.dishName}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-[#E96A24]' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Course Spotlight with Sommelier Notes */}
          <div className="lg:col-span-7">
            <Tilt3DCard maxTilt={6} scale={1.01} glare={true} className="h-full">
              <div className="h-full bg-gradient-to-br from-stone-900 via-[#1e1e1a] to-[#243C24]/50 p-8 sm:p-10 rounded-2xl border border-white/20 shadow-2xl flex flex-col justify-between backdrop-blur-md">
                
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 pb-4 border-b border-white/10 mb-6">
                    <span className="font-mono text-[#E96A24] font-bold">COURSE 0{activeCourse.courseNumber} OF 05</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-stone-300 font-mono text-[10px]">{activeCourse.dietaryNotes}</span>
                  </div>

                  <div className="space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                      {activeCourse.title}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      {activeCourse.dishName}
                    </h3>
                    <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
                      {activeCourse.description}
                    </p>
                  </div>

                  {/* Sommelier Pairing Highlight */}
                  <div className="mt-8 p-5 rounded-xl bg-black/50 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                      <Wine className="w-4 h-4" />
                      <span>Sommelier Cellar Pairing</span>
                    </div>
                    
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="text-base font-serif font-bold text-white">
                        {activeCourse.winePairing.wine}
                      </h4>
                      <span className="text-xs font-mono text-stone-400">
                        {activeCourse.winePairing.vintage} · {activeCourse.winePairing.region}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 italic pt-1">
                      "{activeCourse.winePairing.sommelierNotes}"
                    </p>
                  </div>
                </div>

                {/* Booking CTA Footer */}
                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="text-xs text-stone-400">
                    <div className="font-semibold text-white">Seating Duration: {activeExp.duration}</div>
                    <div>Advance reservation requested. Vegetarian progression available.</div>
                  </div>

                  <button
                    onClick={() => onReserveTasting(selectedExperience)}
                    className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#E96A24] hover:bg-[#D35817] rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Reserve This Tasting</span>
                  </button>
                </div>

              </div>
            </Tilt3DCard>
          </div>

        </div>

      </div>
    </section>
  );
};
