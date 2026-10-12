import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Copy, Check, ArrowRight } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  const { applyDiscountCode, setIsCartOpen } = useCart();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const promoCode = 'LAMBRE20';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(promoCode);
    setCopied(true);
    applyDiscountCode(promoCode);
    showToast('Promo Code Applied!', '20% off will be deducted automatically in your cart.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaimOffer = () => {
    applyDiscountCode(promoCode);
    setIsCartOpen(true);
    showToast('Promotion Active', 'Enjoy 20% savings on your tasting experience.');
  };

  return (
    <section className="py-12 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#171714] via-[#243C24] to-[#171714] text-white shadow-xl border border-white/10">
          
          {/* Subtle decorative glow */}
          <div 
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#E96A24]/20 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center p-8 sm:p-12 gap-8 relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
                  Exclusive Tasting Privilege
                </span>
                <span className="h-px w-6 bg-[#E96A24]/60" aria-hidden="true" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                Something Special Awaits
              </h2>

              <p className="text-sm sm:text-base text-stone-300 max-w-xl leading-relaxed">
                Enjoy 20% off your first online order or tasting reservation. 
                Experience our wood-fired signatures, hand-rolled pastas, and cellar pairings.
              </p>

              {/* Promo code copy button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black/40 border border-white/20 text-xs font-mono">
                  <span className="text-stone-400">Code:</span>
                  <span className="font-bold tracking-wider text-amber-300">{promoCode}</span>
                  <button
                    onClick={handleCopyCode}
                    className="ml-1 p-1 hover:text-[#E96A24] text-stone-300 transition-colors"
                    title="Copy code and apply to cart"
                    aria-label="Copy code and apply to cart"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                
                <span className="text-xs text-stone-400 italic">
                  *Valid on orders and tasting reservations this season
                </span>
              </div>
            </div>

            {/* Action Call */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
              <button
                onClick={handleClaimOffer}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#E96A24] hover:bg-[#D35817] rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <span>Claim 20% Offer Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="#menu"
                className="text-xs text-stone-300 hover:text-white underline underline-offset-4 transition-colors"
              >
                Browse qualifying seasonal menu
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
