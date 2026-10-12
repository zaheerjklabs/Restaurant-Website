import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { ShoppingBag, Menu, X, Phone, Clock, Sparkles } from 'lucide-react';
import { Currency } from '../../types';

interface NavbarProps {
  onOpenReservationModal: () => void;
  onOpenSearch: () => void;
  onOpenPrivateEvents: () => void;
  onOpenActiveOrder?: () => void;
  hasActiveOrder?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservationModal,
  onOpenSearch,
  onOpenPrivateEvents,
  onOpenActiveOrder,
  hasActiveOrder = false,
}) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Seasonal Menu', href: '#menu' },
    { label: 'Tasting Journey', href: '#tasting-menu' },
    { label: 'Grand Crus', href: '#cellar' },
    { label: 'Reservations', href: '#reservations' },
    { label: 'Visit', href: '#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F3]/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3'
            : 'bg-[#FAF8F3]/85 backdrop-blur-sm border-b border-stone-200/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            
            {/* Zone 1: Brand Wordmark */}
            <a 
              href="#" 
              className="group flex items-center gap-2 whitespace-nowrap shrink-0 text-decoration-none"
              aria-label={`${RESTAURANT_INFO.name} Home`}
            >
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#171714] group-hover:text-[#E96A24] transition-colors">
                {RESTAURANT_INFO.name}
              </span>
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#20211D]/80">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="whitespace-nowrap shrink-0 hover:text-[#E96A24] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E96A24] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={onOpenPrivateEvents}
                className="whitespace-nowrap shrink-0 hover:text-[#E96A24] transition-colors py-1 text-xs font-semibold uppercase tracking-wider text-[#243C24]"
              >
                Private Dining
              </button>
            </nav>

            {/* Zone 3: Actions & Currency Switcher */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              
              {/* Currency Selector */}
              <div className="flex items-center rounded-lg border border-stone-200 bg-white/80 p-0.5 text-xs font-semibold text-stone-700">
                {(['GBP', 'USD', 'EUR'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-1 rounded transition-colors ${
                      currency === c
                        ? 'bg-[#171714] text-white shadow-2xs'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                    title={`Switch currency to ${c}`}
                  >
                    {c === 'GBP' ? '£' : c === 'USD' ? '$' : '€'}
                  </button>
                ))}
              </div>

              {/* Active Order Pill (if placed) */}
              {hasActiveOrder && onOpenActiveOrder && (
                <button
                  onClick={onOpenActiveOrder}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E96A24]/10 text-[#E96A24] hover:bg-[#E96A24]/20 border border-[#E96A24]/30 rounded-full text-xs font-semibold transition-colors animate-pulse"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Order Active</span>
                </button>
              )}

              {/* Search Menu */}
              <button
                onClick={onOpenSearch}
                className="hidden sm:inline-flex p-2 text-[#20211D] hover:text-[#E96A24] hover:bg-stone-200/50 rounded-full transition-colors"
                aria-label="Search menu items"
                title="Search menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Shopping Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-[#20211D] hover:text-[#E96A24] hover:bg-stone-200/50 rounded-full transition-colors"
                aria-label={`View shopping cart, ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-[#E96A24] text-white text-[11px] font-semibold rounded-full flex items-center justify-center tabular-nums shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary Book a Table CTA */}
              <button
                onClick={onOpenReservationModal}
                className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#171714] hover:bg-[#E96A24] rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                Book a Table
              </button>

              {/* Mobile Drawer Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#20211D] hover:text-[#E96A24] rounded-md transition-colors"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FAF8F3] px-5 py-6 space-y-4 shadow-lg animate-in fade-in duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#20211D] hover:text-[#E96A24] py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPrivateEvents();
                }}
                className="text-left text-base font-medium text-[#243C24] hover:text-[#E96A24] py-1 transition-colors"
              >
                Private Dining & Events
              </button>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-col gap-3">
              {hasActiveOrder && onOpenActiveOrder && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenActiveOrder();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-[#E96A24] bg-[#E96A24]/10 rounded-md transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  <span>View Active Order Tracking</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-[#20211D] bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Menu Dishes
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservationModal();
                }}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#E96A24] hover:bg-[#D35817] rounded-md transition-colors shadow-sm"
              >
                Reserve a Table
              </button>
              
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-center justify-center gap-2 text-xs font-medium text-[#77766F] hover:text-[#20211D] pt-1"
              >
                <Phone className="w-3.5 h-3.5" />
                Concierge: {RESTAURANT_INFO.phoneFormatted}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16 sm:h-20" aria-hidden="true" />
    </>
  );
};
