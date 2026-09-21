import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MughalLogo } from './MughalLogo.tsx';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const quickTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 400);
      return () => clearTimeout(quickTimer);
    }

    // Organic loading simulation (reaches ~100% in ~1.8-2.2s)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const remaining = 100 - prev;
        const step = Math.max(1, Math.floor(remaining * 0.16));
        return Math.min(100, prev + step);
      });
    }, 50);

    // Natural complete trigger
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 400);
      }, 300);
    }, 2000);

    // Absolute Safety timeout (4.0 seconds max) - Never traps the user
    const safetyTimeout = setTimeout(() => {
      clearInterval(interval);
      setIsVisible(false);
      onComplete();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimer);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="royal-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07070a] text-[#f4efe6] overflow-hidden select-none"
        >
          {/* Subtle atmospheric vignette & depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,14,24,0.18)_0%,rgba(7,7,10,0.98)_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,179,106,0.06)_0%,transparent_60%)] pointer-events-none" />

          {/* Centered Presentation container with responsive width */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full">
            {/* Official Mughal Mahal Logo Reveal Container */}
            <div className="relative flex items-center justify-center mb-6">
              {/* Circular Gold Progress Orbit around the Logo */}
              <svg className="absolute w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] pointer-events-none" viewBox="0 0 220 220">
                {/* Background faint guide track */}
                <circle
                  cx="110"
                  cy="110"
                  r="104"
                  fill="none"
                  stroke="rgba(218,179,106,0.12)"
                  strokeWidth="1.5"
                />
                {/* Animated active progress ring */}
                <circle
                  cx="110"
                  cy="110"
                  r="104"
                  fill="none"
                  stroke="url(#loadingGoldGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="653.45"
                  strokeDashoffset={653.45 - (653.45 * progress) / 100}
                  transform="rotate(-90 110 110)"
                  className="transition-[stroke-dashoffset] duration-150 ease-out"
                />
                <defs>
                  <linearGradient id="loadingGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f3d790" />
                    <stop offset="50%" stopColor="#c5a059" />
                    <stop offset="100%" stopColor="#8a611c" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Logo with gentle scale and opacity reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] flex items-center justify-center"
              >
                <MughalLogo size="100%" glow={true} />
              </motion.div>
            </div>

            {/* Brand Text Elements */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-1.5"
            >
              <h1 className="font-display text-lg sm:text-xl tracking-[0.3em] text-[#fbf8f2] uppercase font-bold">
                MUGHAL MAHAL
              </h1>
              <div className="font-hindi text-sm sm:text-base text-[#c5a059] tracking-wider font-normal">
                मुगल महल रेस्टोरेंट
              </div>
            </motion.div>

            {/* Progress indicator status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 flex flex-col items-center gap-1.5"
            >
              <div className="w-36 h-[1.5px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[rgba(197,160,89,0.2)] via-[#c5a059] to-[#fae29c] transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[9px] font-sans tracking-[0.25em] text-[#8e8779] uppercase">
                Opening Hospitality Experience
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
