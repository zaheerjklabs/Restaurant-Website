import React from 'react';
import { MenuCategory } from '../../types';
import { CATEGORIES } from '../../data/menuData';

interface CategoryFilterProps {
  selectedCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div 
        className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl max-w-fit mx-auto border border-stone-200/60"
        role="tablist"
        aria-label="Menu categories"
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white text-[#171714] shadow-sm font-bold border border-stone-200/50'
                  : 'text-[#77766F] hover:text-[#171714] hover:bg-stone-200/50'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] tabular-nums ${isActive ? 'text-[#E96A24]' : 'text-stone-400'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
