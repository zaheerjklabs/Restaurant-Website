import React, { useState, useMemo } from 'react';
import { MenuCategory, MenuItem, DietaryTag } from '../../types';
import { MENU_ITEMS } from '../../data/menuData';
import { CategoryFilter } from './CategoryFilter';
import { MenuCard } from './MenuCard';
import { DishDetailModal } from './DishDetailModal';
import { Search, RotateCcw, ArrowUpDown, Filter } from 'lucide-react';

interface MenuSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  searchQuery,
  setSearchQuery,
  searchInputRef,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [selectedTag, setSelectedTag] = useState<DietaryTag | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);

  const dietaryFilterOptions: { id: DietaryTag | 'all'; label: string }[] = [
    { id: 'all', label: 'All Diets' },
    { id: 'Chef\'s Pick', label: 'Chef\'s Pick' },
    { id: 'Vegetarian', label: 'Vegetarian' },
    { id: 'Vegan', label: 'Vegan' },
    { id: 'Gluten-Free', label: 'Gluten-Free' },
    { id: 'Popular', label: 'Popular' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary tag filter
      if (selectedTag !== 'all' && !item.tags.includes(selectedTag)) {
        return false;
      }
      // Search keyword filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Recommended: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedTag('all');
    setSearchQuery('');
    setSortBy('recommended');
  };

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#FAF8F3]/80 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
              Artisanal Culinary Selection
            </span>
            <span className="h-px w-6 bg-[#E96A24]/40" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#171714] tracking-tight">
            Our Seasonal Menu
          </h2>
          <p className="text-sm sm:text-base text-[#77766F] mt-3">
            Handcrafted fresh daily with sustainably farmed produce, wild fisheries, and wood-fired mastery.
          </p>
        </div>

        {/* Category Filter Carousel */}
        <div className="mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Controls Toolbar: Search, Dietary Filter & Sort */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200/80 shadow-sm mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes by name or ingredient (e.g. sea bass, truffle, pizza)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#E96A24] focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Dietary Tags Dropdown / Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0 hidden sm:inline" />
              {dietaryFilterOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTag(opt.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    selectedTag === opt.id
                      ? 'bg-[#171714] text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 text-xs border border-stone-200 rounded-md px-2 py-1.5 bg-stone-50 text-stone-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none font-medium cursor-pointer"
                aria-label="Sort dishes"
              >
                <option value="recommended">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onOpenDetails={setActiveModalItem}
              />
            ))}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-[#E96A24]">
              <Search className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#171714] mb-2">
              No Dishes Found
            </h3>
            <p className="text-xs sm:text-sm text-[#77766F] mb-6">
              No menu items match your current search or diet filters. Try broadening your keywords.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#171714] hover:bg-[#E96A24] rounded-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Dish Detail Customization Modal */}
      <DishDetailModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />
    </section>
  );
};
