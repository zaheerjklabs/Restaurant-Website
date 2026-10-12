import React, { useState } from 'react';
import { MenuItem, MenuItemOption } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';
import { X, Plus, Minus, Clock, Flame, Check, Wine } from 'lucide-react';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ item, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();

  const [quantity, setQuantity] = useState(1);
  const [selectedPortion, setSelectedPortion] = useState<MenuItemOption | undefined>(
    item?.portionOptions ? item.portionOptions[0] : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<MenuItemOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!item) return null;

  const toggleAddon = (addon: MenuItemOption) => {
    if (selectedAddons.some(a => a.name === addon.name)) {
      setSelectedAddons(prev => prev.filter(a => a.name !== addon.name));
    } else {
      setSelectedAddons(prev => [...prev, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((acc, a) => acc + a.priceDelta, 0);
  const portionDelta = selectedPortion ? selectedPortion.priceDelta : 0;
  const singleUnitPrice = item.price + portionDelta + addonsTotal;
  const finalPrice = singleUnitPrice * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item, selectedPortion, selectedAddons, specialInstructions);
    }
    showToast('Added to Cart', `${item.name} (${quantity}x)`);
    setIsCartOpen(true);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
    >
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md transition-colors"
          aria-label="Close dish details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Image */}
        <div className="relative h-60 sm:h-72 w-full bg-stone-100">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            fallbackTitle={item.name}
            fallbackGradient={item.fallbackGradient}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          
          {/* Tags in Image Scrim */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-medium text-white/90">
            {item.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {i < item.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Details & Customizations */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 id="dish-modal-title" className="text-2xl font-serif font-bold text-[#171714]">
                {item.name}
              </h2>
              <div className="text-xl font-bold font-serif text-[#E96A24] tabular-nums whitespace-nowrap">
                {formatPrice(item.price)}
              </div>
            </div>

            <p className="text-sm text-[#77766F] mt-2 leading-relaxed">
              {item.description}
            </p>

            {/* Quick dish metadata */}
            <div className="flex items-center gap-4 mt-3 text-xs text-[#77766F] pt-2 border-t border-stone-100">
              {item.prepTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Prep time: {item.prepTime}</span>
                </div>
              )}
              {item.calories && (
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-stone-400" />
                  <span>{item.calories} kcal</span>
                </div>
              )}
            </div>
          </div>

          {/* Portion Options (if available) */}
          {item.portionOptions && item.portionOptions.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Select Portion Size
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.portionOptions.map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedPortion(opt)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left text-xs transition-colors ${
                      selectedPortion?.name === opt.name
                        ? 'border-[#E96A24] bg-[#E96A24]/5 text-[#171714]'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <span className="font-medium">{opt.name}</span>
                    <span className="text-stone-500 tabular-nums">
                      {opt.priceDelta === 0 ? 'Standard' : `+${formatPrice(opt.priceDelta)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Culinary Add-ons (if available) */}
          {item.addonOptions && item.addonOptions.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Culinary Enhancements & Add-ons
              </h3>
              <div className="space-y-2">
                {item.addonOptions.map((addon) => {
                  const isChecked = selectedAddons.some(a => a.name === addon.name);
                  return (
                    <button
                      key={addon.name}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border text-xs transition-colors ${
                        isChecked
                          ? 'border-[#243C24] bg-[#243C24]/5 text-[#171714]'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-[#243C24] border-[#243C24] text-white' : 'border-stone-300'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium">{addon.name}</span>
                      </div>
                      <span className="text-stone-600 font-semibold tabular-nums">
                        +{formatPrice(addon.priceDelta)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Kitchen Notes */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <label htmlFor="special-instructions" className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
              Special Kitchen Instructions (Optional)
            </label>
            <textarea
              id="special-instructions"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra virgin olive oil on the side, dressing lightly tossed..."
              rows={2}
              className="w-full text-xs p-3 rounded-lg border border-stone-200 focus:outline-none focus:border-[#E96A24] focus:ring-1 focus:ring-[#E96A24]"
            />
          </div>
        </div>

        {/* Modal Footer: Quantity & Add to Cart Action */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          <div className="flex items-center border border-stone-200 rounded-lg bg-white p-1">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-1.5 text-stone-500 hover:text-stone-800 disabled:opacity-40 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-bold text-stone-800 tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="p-1.5 text-stone-500 hover:text-stone-800 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-6 bg-[#E96A24] hover:bg-[#D35817] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>Add to Order</span>
            <span>·</span>
            <span className="tabular-nums">{formatPrice(finalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
