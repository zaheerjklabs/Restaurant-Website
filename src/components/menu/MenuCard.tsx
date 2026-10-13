import React, { useState } from 'react';
import { MenuItem } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Plus, Heart, SlidersHorizontal, Wine } from 'lucide-react';
import { Tilt3DCard } from '../scrollytelling/Tilt3DCard';

interface MenuCardProps {
  item: MenuItem;
  onOpenDetails: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onOpenDetails }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
    showToast('Added to Cart', `${item.name} (${formatPrice(item.price)})`);
    setIsCartOpen(true);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    showToast(
      !isFavorited ? 'Saved to Favorites' : 'Removed from Favorites',
      item.name,
      'info'
    );
  };

  return (
    <Tilt3DCard maxTilt={7} scale={1.02} glare={true} className="h-full">
      <article
        onClick={() => onOpenDetails(item)}
        className="group cursor-pointer bg-white/95 backdrop-blur-md rounded-xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
      >
      <div>
        {/* Dish Photography with zoom hover */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            fallbackTitle={item.name}
            fallbackGradient={item.fallbackGradient}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Favorite Toggle Button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-colors ${
              isFavorited
                ? 'bg-rose-50 text-rose-500'
                : 'bg-white/80 hover:bg-white text-stone-500 hover:text-stone-800'
            }`}
            aria-label={isFavorited ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Zero-Pill Unboxed Dietary Tags */}
          {item.tags.length > 0 && (
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded text-[11px] font-medium text-white flex items-center gap-1.5 pointer-events-none">
              {item.tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  <span>{tag}</span>
                  {i < item.tags.length - 1 && <span aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#171714] group-hover:text-[#E96A24] transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="font-serif font-semibold text-base sm:text-lg text-[#171714] tabular-nums shrink-0">
              {formatPrice(item.price)}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#77766F] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-1 border-t border-stone-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(item);
          }}
          className="text-xs font-semibold text-[#77766F] hover:text-[#171714] flex items-center gap-1.5 transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
          <span>Customise</span>
        </button>

        <button
          type="button"
          onClick={handleQuickAdd}
          className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#171714] group-hover:bg-[#E96A24] rounded-md transition-colors flex items-center gap-1 shadow-sm shrink-0"
          aria-label={`Add ${item.name} to order`}
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add</span>
        </button>
      </div>
    </article>
  </Tilt3DCard>
);
};
