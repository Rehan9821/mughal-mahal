import React from 'react';

// Single centralized asset reference across the entire application
export const LOGO_ASSET_PATH = '/assets/mughal-mahal-logo.svg';

interface MughalLogoProps {
  className?: string;
  size?: number | string;
  glow?: boolean;
  withRing?: boolean;
}

export const MughalLogo: React.FC<MughalLogoProps> = ({
  className = '',
  size = 72,
  glow = false,
  withRing = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
    >
      {/* Subtle atmospheric golden & burgundy glow behind logo */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(218,179,106,0.35)_0%,rgba(138,11,24,0.25)_40%,transparent_75%)] blur-lg scale-140 pointer-events-none"
        />
      )}

      {/* Optional ultra-fine antique-gold circular dashed orbit accent */}
      {withRing && (
        <div
          className="absolute -inset-2 rounded-full border border-dashed border-[rgba(218,179,106,0.3)] animate-[spin_24s_linear_infinite] pointer-events-none"
        />
      )}

      {/* Official Mughal Mahal Restaurant Logo */}
      <img
        src={LOGO_ASSET_PATH}
        alt="Mughal Mahal Restaurant Official Logo"
        className="w-full h-full object-contain relative z-10 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
