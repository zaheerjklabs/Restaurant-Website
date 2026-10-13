import React, { useEffect, useState } from 'react';
import { Sparkles, Flame, Wine, Compass } from 'lucide-react';

interface FloatingItem {
  id: number;
  type: 'ember' | 'leaf' | 'sparkle' | 'gold';
  x: number; // percentage across screen (0 - 100)
  initialY: number; // percentage down the document
  speed: number; // parallax multiplier
  size: number;
  rotationSpeed: number;
}

const ITEMS: FloatingItem[] = [
  { id: 1, type: 'ember', x: 8, initialY: 15, speed: 0.15, size: 28, rotationSpeed: 0.2 },
  { id: 2, type: 'gold', x: 88, initialY: 22, speed: -0.12, size: 36, rotationSpeed: -0.15 },
  { id: 3, type: 'sparkle', x: 92, initialY: 38, speed: 0.2, size: 24, rotationSpeed: 0.3 },
  { id: 4, type: 'leaf', x: 4, initialY: 48, speed: -0.18, size: 32, rotationSpeed: 0.25 },
  { id: 5, type: 'ember', x: 85, initialY: 62, speed: 0.14, size: 30, rotationSpeed: -0.2 },
  { id: 6, type: 'sparkle', x: 12, initialY: 74, speed: -0.16, size: 26, rotationSpeed: 0.18 },
  { id: 7, type: 'gold', x: 90, initialY: 88, speed: 0.22, size: 34, rotationSpeed: -0.3 },
];

export const ParallaxFloatingElements: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {ITEMS.map((item) => {
        const yOffset = scrollY * item.speed;
        const rotation = (scrollY * item.rotationSpeed) % 360;

        return (
          <div
            key={item.id}
            className="absolute transition-transform duration-75 will-change-transform opacity-70"
            style={{
              left: `${item.x}%`,
              top: `${item.initialY}%`,
              transform: `translate3d(0, ${yOffset}px, 0) rotate(${rotation}deg)`,
            }}
          >
            {item.type === 'ember' && (
              <div className="relative">
                <div
                  className="rounded-full bg-gradient-to-tr from-[#E96A24] via-amber-400 to-amber-200 blur-xs shadow-lg"
                  style={{ width: `${item.size}px`, height: `${item.size}px` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="w-3 h-3 text-white/80" />
                </div>
              </div>
            )}

            {item.type === 'gold' && (
              <div
                className="rounded-lg bg-gradient-to-br from-amber-300 via-[#D4AF37] to-amber-600 shadow-md border border-white/40 opacity-80 backdrop-blur-xs flex items-center justify-center p-1.5"
                style={{ width: `${item.size}px`, height: `${item.size}px` }}
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-900" />
              </div>
            )}

            {item.type === 'sparkle' && (
              <div
                className="w-3 h-3 bg-amber-200 rounded-full shadow-[0_0_12px_#ffcc00] animate-pulse"
                style={{ width: `${item.size * 0.5}px`, height: `${item.size * 0.5}px` }}
              />
            )}

            {item.type === 'leaf' && (
              <div
                className="rounded-full bg-gradient-to-br from-[#243C24] to-[#2E4B2E] text-emerald-200 border border-emerald-400/30 shadow-md flex items-center justify-center p-1.5"
                style={{ width: `${item.size}px`, height: `${item.size}px` }}
              >
                <Compass className="w-3 h-3 text-emerald-300" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
