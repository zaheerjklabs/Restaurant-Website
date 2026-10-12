import React, { useState, useRef } from 'react';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { StorySection } from './components/story/StorySection';
import { TastingMenuSection } from './components/tasting/TastingMenuSection';
import { MenuSection } from './components/menu/MenuSection';
import { WineCellarSection } from './components/cellar/WineCellarSection';
import { PromotionalBanner } from './components/promo/PromotionalBanner';
import { WhyChooseUs } from './components/features/WhyChooseUs';
import { ReservationSection } from './components/reservation/ReservationSection';
import { ReservationModal } from './components/reservation/ReservationModal';
import { PrivateDiningModal } from './components/events/PrivateDiningModal';
import { OrderTrackingModal } from './components/tracking/OrderTrackingModal';
import { GallerySection } from './components/gallery/GallerySection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { AppPromoSection } from './components/ordering/AppPromoSection';
import { LocationSection } from './components/location/LocationSection';
import { NewsletterSection } from './components/newsletter/NewsletterSection';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { ToastContainer } from './components/common/ToastContainer';
import { ConfirmedReservation, ActiveOrder } from './types';
import { Clock } from 'lucide-react';

const MainContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<ConfirmedReservation | null>(null);
  const [presetExperience, setPresetExperience] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPrivateDiningOpen, setIsPrivateDiningOpen] = useState(false);
  
  // Active Order Live Tracking State
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenReservation = () => {
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReserveTasting = (experienceId: string) => {
    setPresetExperience(experienceId);
    handleOpenReservation();
  };

  const handleOpenSearch = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 350);
    }
  };

  const handleOrderPlaced = (order: ActiveOrder) => {
    setActiveOrder(order);
    setIsTrackingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#20211D]">
      {/* Navigation Header with Currency Switcher & Order Indicator */}
      <Navbar
        onOpenReservationModal={handleOpenReservation}
        onOpenSearch={handleOpenSearch}
        onOpenPrivateEvents={() => setIsPrivateDiningOpen(true)}
        onOpenActiveOrder={() => setIsTrackingOpen(true)}
        hasActiveOrder={activeOrder !== null}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onOpenReservationModal={handleOpenReservation} />

        {/* 2. Restaurant Introduction & Story */}
        <StorySection onOpenReservationModal={handleOpenReservation} />

        {/* 3. Chef's Multi-Course Tasting Menu Journey (Prix Fixe) */}
        <TastingMenuSection onReserveTasting={handleReserveTasting} />

        {/* 4. Categories & Interactive Seasonal Menu */}
        <MenuSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchInputRef={searchInputRef}
        />

        {/* 5. Sommelier Wine Vault & Grand Crus */}
        <WineCellarSection />

        {/* 6. Special Promotional Offer Banner */}
        <PromotionalBanner />

        {/* 7. Standards of Excellence / Why Choose Us */}
        <WhyChooseUs />

        {/* 8. Online Table Reservation Form with Table Floor Plan */}
        <ReservationSection
          presetExperience={presetExperience}
          onReservationConfirmed={(res) => setConfirmedReservation(res)}
        />

        {/* 9. Atmosphere & Culinary Gallery with Lightbox */}
        <GallerySection />

        {/* 10. Verified Gastronomy Reviews & Acclaim */}
        <TestimonialsSection />

        {/* 11. Online Kitchen Ordering Platform Highlights */}
        <AppPromoSection />

        {/* 12. Location, Hours, & Contact */}
        <LocationSection />

        {/* 13. Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Reservation Confirmation Modal */}
      <ReservationModal
        confirmedReservation={confirmedReservation}
        onClose={() => setConfirmedReservation(null)}
      />

      {/* Private Dining & Banquets Inquiry Modal */}
      <PrivateDiningModal
        isOpen={isPrivateDiningOpen}
        onClose={() => setIsPrivateDiningOpen(false)}
      />

      {/* Live Order Tracking Modal */}
      <OrderTrackingModal
        order={activeOrder}
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      {/* Floating Active Order Status Bar (when order exists) */}
      {activeOrder && (
        <aside
          aria-label="Active order status"
          className="fixed bottom-6 left-6 z-40 bg-[#171714] text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-[#E96A24]/20 text-[#E96A24] flex items-center justify-center">
            <Clock className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <div className="text-xs font-bold font-mono text-amber-300">
              {activeOrder.orderNumber} In Kitchen
            </div>
            <div className="text-[11px] text-stone-300">
              ~{activeOrder.estimatedMinutesLeft} mins dispatch
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(true)}
            className="ml-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-[#E96A24] hover:bg-[#D35817] rounded-lg transition-colors"
          >
            Track Live
          </button>
        </aside>
      )}

      {/* Global Non-intrusive Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <CurrencyProvider>
        <CartProvider>
          <MainContent />
        </CartProvider>
      </CurrencyProvider>
    </ToastProvider>
  );
}
