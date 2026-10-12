import React from 'react';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { CATEGORIES } from '../../data/menuData';
import { Instagram, Facebook, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171714] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="inline-block text-2xl font-serif font-bold text-white tracking-tight">
              {RESTAURANT_INFO.name}
            </a>
            
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Contemporary coastal cuisine and wood-fired hearth dining in Mayfair. 
              {RESTAURANT_INFO.tagline}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E96A24] border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E96A24] border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Explore
            </h3>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#story" className="hover:text-white transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Seasonal Menu</a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-white transition-colors">Table Reservations</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">The Experience</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Atmosphere Gallery</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Find Us</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Menu Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Cuisine Categories
            </h3>
            <ul className="space-y-2 text-xs text-stone-400">
              {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <a href="#menu" className="hover:text-[#E96A24] transition-colors flex items-center justify-between pr-4">
                    <span>{cat.label}</span>
                    <span className="text-[10px] text-stone-500 font-mono">({cat.count})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Contact & Hours
            </h3>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E96A24] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E96A24] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E96A24] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-stone-500 border-t border-white/5">
                Dinner Service daily from 5:30 PM until late.
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            
            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
