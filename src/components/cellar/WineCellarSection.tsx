import React, { useState } from 'react';
import { SOMMELIER_CELLAR_ITEMS } from '../../data/tastingMenuData';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Wine, Plus, Sparkles, Compass } from 'lucide-react';
import { MenuItem } from '../../types';

export const WineCellarSection: React.FC = () => {
  const { formatPrice } = useCurrency();
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  const [activeType, setActiveType] = useState<string>('all');

  const filteredWines = activeType === 'all'
    ? SOMMELIER_CELLAR_ITEMS
    : SOMMELIER_CELLAR_ITEMS.filter(w => w.type.toLowerCase() === activeType.toLowerCase());

  const handleAddWineToCart = (wine: typeof SOMMELIER_CELLAR_ITEMS[0]) => {
    // Map Wine to a MenuItem format so it seamlessly works with the Cart
    const wineMenuItem: MenuItem = {
      id: wine.id,
      name: `${wine.name} (${wine.vintage})`,
      category: 'beverages',
      description: `${wine.region}, ${wine.country}. ${wine.tastingNotes}`,
      price: wine.bottlePrice,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
      fallbackGradient: 'from-rose-950 via-stone-900 to-black',
      tags: ['Chef\'s Pick'],
      prepTime: 'Cellar Temp 14°C',
    };

    addToCart(wineMenuItem);
    showToast('Bottle Added to Order', `${wine.name} · ${formatPrice(wine.bottlePrice)}`);
    setIsCartOpen(true);
  };

  return (
    <section id="cellar" className="py-20 lg:py-28 bg-[#FAF8F3] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
              Curated Grand Crus
            </span>
            <span className="h-px w-6 bg-[#E96A24]/40" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#171714] tracking-tight">
            The Sommelier's Cellar
          </h2>
          <p className="text-sm sm:text-base text-[#77766F] mt-3">
            Hand-selected rare vintages, biodynamic estates, and iconic French and Italian crus kept in our climate-controlled vaults.
          </p>
        </div>

        {/* Wine Type Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar py-1">
          {['all', 'Champagne', 'Red', 'White', 'Rosé'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeType === type
                  ? 'bg-[#171714] text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              {type === 'all' ? 'All Cellar Vintages' : type}
            </button>
          ))}
        </div>

        {/* Wine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWines.map((wine) => (
            <div
              key={wine.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E96A24]">
                      {wine.type} · {wine.vintage}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#171714] mt-0.5 leading-snug">
                      {wine.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-serif font-bold text-base text-[#171714] tabular-nums">
                      {formatPrice(wine.bottlePrice)}
                    </div>
                    {wine.glassPrice && (
                      <div className="text-[11px] text-stone-500 tabular-nums">
                        glass {formatPrice(wine.glassPrice)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{wine.region}, {wine.country}</span>
                </div>

                <p className="text-xs text-[#77766F] leading-relaxed mb-4">
                  "{wine.tastingNotes}"
                </p>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[11px] text-stone-600 mb-6">
                  <strong className="text-[#171714]">Chef Pairing:</strong> {wine.pairingDish}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => handleAddWineToCart(wine)}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-white bg-stone-100 hover:bg-[#171714] rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add Bottle to Order</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
