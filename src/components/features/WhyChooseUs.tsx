import React from 'react';
import { Leaf, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Tilt3DCard } from '../scrollytelling/Tilt3DCard';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Farm-to-Table Freshness',
      description: 'Zero artificial preservatives. We partner directly with organic regenerative growers and sustainable coastal fisheries.',
      icon: <Leaf className="w-6 h-6 text-[#243C24]" />,
    },
    {
      title: 'Master Culinary Craft',
      description: 'Led by Michelin-experienced chefs blending classical French precision with rustic open-fire oak hearth cooking.',
      icon: <Award className="w-6 h-6 text-[#E96A24]" />,
    },
    {
      title: 'Safe & Seamless Ordering',
      description: 'Encrypted online checkout, transparent dietary labeling, and insulated temperature-controlled culinary packaging.',
      icon: <ShieldCheck className="w-6 h-6 text-[#243C24]" />,
    },
    {
      title: 'Attentive Hospitality',
      description: 'Warm, unhurried service from arrival to farewell, honoring the rich tradition of gracious table hosting.',
      icon: <HeartHandshake className="w-6 h-6 text-[#E96A24]" />,
    },
  ];

  return (
    <section id="experience" className="py-20 lg:py-24 bg-white/70 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
              Standards of Excellence
            </span>
            <span className="h-px w-6 bg-[#E96A24]/40" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#171714] tracking-tight">
            Why Dine With Us
          </h2>
          <p className="text-sm sm:text-base text-[#77766F] mt-3">
            An uncompromising commitment to provenance, culinary discipline, and genuine warmth.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => (
            <Tilt3DCard key={pillar.title} maxTilt={8} scale={1.03} glare={true} className="h-full">
              <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-start h-full">
                <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200/60 flex items-center justify-center mb-5 shrink-0">
                  {pillar.icon}
                </div>

                <h3 className="font-serif font-bold text-lg text-[#171714] mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </Tilt3DCard>
          ))}
        </div>

      </div>
    </section>
  );
};
