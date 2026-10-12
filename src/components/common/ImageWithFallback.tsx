import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackGradient?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackGradient = 'from-stone-900 via-stone-800 to-black',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div 
        className={`relative flex flex-col items-center justify-center p-6 bg-gradient-to-br ${fallbackGradient} text-stone-200 overflow-hidden ${className}`}
        role="img"
        aria-label={alt || fallbackTitle || "Culinary dish presentation"}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400 to-transparent" />
        <UtensilsCrossed className="w-8 h-8 mb-2 text-[#E96A24]/70 stroke-[1.5]" />
        {fallbackTitle && (
          <span className="text-xs font-serif tracking-wider text-stone-300 text-center uppercase max-w-[85%] truncate">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt || "Culinary dish presentation"}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`w-full h-full object-cover transition-transform duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        {...rest}
      />
    </div>
  );
};
