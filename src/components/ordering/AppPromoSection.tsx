import React from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const AppPromoSection: React.FC = () => {
  const { setIsCartOpen } = useCart();

  return (
    <section className="py-20 bg-[#171714] text-white overflow-hidden relative">
      {/* Decorative radial gradients */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#243C24]/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 right-10 w-80 h-80 bg-[#E96A24]/15 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Prose & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
                Seamless Dining Anywhere
              </span>
              <span className="h-px w-6 bg-[#E96A24]/60" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Your Favorites, Just a Few Clicks Away
            </h2>

            <p className="text-sm sm:text-base text-stone-300 max-w-xl leading-relaxed">
              Order directly through our digital kitchen platform. Whether reserving a table in advance, 
              arranging priority courier delivery, or ordering at your table with contact-free ease.
            </p>

            {/* Benefit bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#E96A24]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Live Preparation Queue
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Real-time status from hearth to dispatch
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#E96A24]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Insulated Freshness
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Temperature-controlled luxury packaging
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#E96A24] hover:bg-[#D35817] rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Open Online Ordering</span>
              </button>

              <a
                href="#menu"
                className="px-6 py-3.5 text-xs font-semibold text-stone-300 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-colors text-center"
              >
                Browse Full Menu
              </a>
            </div>

          </div>

          {/* Right: Digital Experience Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-stone-800 to-stone-900 p-6 rounded-3xl border border-white/15 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-stone-200">Kitchen Live Dispatch</span>
                </div>
                <span className="text-stone-400 font-mono">12 min avg</span>
              </div>

              <div className="py-4 space-y-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">Chilean Sea Bass</div>
                    <div className="text-[11px] text-stone-400">Order #ORD-71932</div>
                  </div>
                  <span className="text-[#E96A24] font-medium text-[11px]">Plating Now</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">Wood-Fired Margherita</div>
                    <div className="text-[11px] text-stone-400">Order #ORD-71933</div>
                  </div>
                  <span className="text-amber-400 font-medium text-[11px]">At Hearth 800°</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                <span>Free delivery threshold:</span>
                <span className="text-white font-bold font-serif">$75.00+</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
