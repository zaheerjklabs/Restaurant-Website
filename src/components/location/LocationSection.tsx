import React from 'react';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { MapPin, Phone, Mail, Clock, ExternalLink, Compass } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 lg:py-28 bg-white/75 backdrop-blur-md border-y border-stone-200/60 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
              Visit & Contact
            </span>
            <span className="h-px w-6 bg-[#E96A24]/40" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#171714] tracking-tight">
            Find Us in Mayfair
          </h2>
          <p className="text-sm sm:text-base text-[#77766F] mt-3">
            Nestled in the heart of London, an intimate sanctuary for food lovers and celebratory gatherings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Contact Cards & Operating Hours */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="p-6 bg-[#FAF8F3] rounded-2xl border border-stone-200/80">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 text-[#E96A24]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#171714]">
                    Our Address
                  </h3>
                  <p className="text-sm text-[#77766F] mt-1 leading-relaxed">
                    {RESTAURANT_INFO.address}<br />
                    {RESTAURANT_INFO.city}, {RESTAURANT_INFO.postalCode}<br />
                    {RESTAURANT_INFO.country}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.address + ' ' + RESTAURANT_INFO.city)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E96A24] hover:text-[#D35817] mt-3 transition-colors"
                  >
                    <span>Get Directions via Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 bg-[#FAF8F3] rounded-2xl border border-stone-200/80">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 text-[#243C24]">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#171714]">
                    Dining Hours
                  </h3>
                  
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between pb-1.5 border-b border-stone-200">
                      <span className="font-semibold text-stone-800">Monday – Friday</span>
                      <div className="text-right text-[#77766F]">
                        <div>Lunch: {RESTAURANT_INFO.hours.weekdays.lunch}</div>
                        <div>Dinner: {RESTAURANT_INFO.hours.weekdays.dinner}</div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="font-semibold text-stone-800">Saturday & Sunday</span>
                      <div className="text-right text-[#77766F]">
                        <div>Brunch: {RESTAURANT_INFO.hours.weekends.lunch}</div>
                        <div>Dinner: {RESTAURANT_INFO.hours.weekends.dinner}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect Card */}
            <div className="p-6 bg-[#FAF8F3] rounded-2xl border border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171714] mb-1">
                  <Phone className="w-4 h-4 text-[#E96A24]" />
                  <span>Telephone</span>
                </div>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-xs text-[#77766F] hover:text-[#E96A24] transition-colors"
                >
                  {RESTAURANT_INFO.phoneFormatted}
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171714] mb-1">
                  <Mail className="w-4 h-4 text-[#E96A24]" />
                  <span>Reservations</span>
                </div>
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="text-xs text-[#77766F] hover:text-[#E96A24] transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>

          </div>

          {/* Right: Interactive Stylized Map Preview */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 flex flex-col items-center justify-center p-6 text-center">
              
              {/* Map background illustration */}
              <div 
                className="absolute inset-0 opacity-40 bg-[radial-gradient(#d4cfc5_1px,transparent_1px)] [background-size:16px_16px]" 
                aria-hidden="true" 
              />
              
              {/* Stylized Map Roads SVG */}
              <svg 
                className="absolute inset-0 w-full h-full opacity-30 stroke-stone-400 stroke-[1.5] fill-none" 
                aria-hidden="true"
              >
                <path d="M0,100 Q300,120 600,80 T1200,150" />
                <path d="M0,250 Q400,280 800,220 T1200,300" />
                <path d="M200,0 Q240,300 220,600" />
                <path d="M550,0 Q530,300 580,600" />
                <path d="M900,0 Q920,300 880,600" />
              </svg>

              {/* Pin Callout Box */}
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl border border-stone-200/80 max-w-sm">
                <div className="w-12 h-12 rounded-full bg-[#E96A24] text-white flex items-center justify-center mx-auto mb-3 shadow-md animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#171714]">
                  {RESTAURANT_INFO.name}
                </h3>
                <p className="text-xs text-[#77766F] mt-1">
                  428 Heritage Boulevard, Mayfair, London
                </p>
                <p className="text-[11px] text-[#243C24] font-semibold mt-2">
                  Complimentary Valet Parking Available
                </p>
                
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.address + ' ' + RESTAURANT_INFO.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#171714] hover:bg-[#E96A24] rounded-lg transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Open in Navigation</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
