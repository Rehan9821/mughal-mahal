import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  fallbackTitle?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  fallbackTitle,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#141418] ${aspectRatio} ${className}`}>
      {/* Loading shimmer background */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#141418] via-[#1f1e24] to-[#141418] animate-pulse" />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          {...props}
        />
      ) : (
        /* Branded Luxury Placeholder */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#151419] border border-[#c5a059]/20">
          <div className="w-14 h-14 mb-3 rounded-full border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] bg-[#0c0c0e]">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2L4 9v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-8-7z" />
              <path d="M9 22V12h6v10" />
            </svg>
          </div>
          <span className="font-display text-xs tracking-widest text-[#c5a059] uppercase">
            Mughal Mahal
          </span>
          <span className="text-[11px] font-hindi text-[#8a8275] mt-0.5">
            मुगल महल • दिल्ली
          </span>
          <p className="mt-2 text-xs font-serif text-[#d8d2c7] line-clamp-2 max-w-[200px]">
            {fallbackTitle || alt}
          </p>
        </div>
      )}
    </div>
  );
};
