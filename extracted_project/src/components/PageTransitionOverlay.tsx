import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type SlideDirection = 'forward' | 'backward';

interface PageTransitionOverlayProps {
  isTransitioning: boolean;
  targetRoute: string;
  direction?: SlideDirection;
}

// Destination page display titles
const ROUTE_PAGE_TITLES: Record<string, string> = {
  '/': 'HOME',
  '/menu': 'THE CUISINE & MENU',
  '/about': 'OUR STORY & HERITAGE',
  '/gallery': 'THE GALLERY',
  '/reviews': 'GUEST EXPERIENCES',
  '/contact': 'LOCATION & DESK',
};

export const PageTransitionOverlay: React.FC<PageTransitionOverlayProps> = ({
  isTransitioning,
  targetRoute,
  direction = 'forward'
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const pageTitle = ROUTE_PAGE_TITLES[targetRoute] || 'MUGHAL MAHAL';

  // If user prefers reduced motion: simple graceful fade
  if (prefersReducedMotion) {
    return (
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-[#07070a] pointer-events-none"
          />
        )}
      </AnimatePresence>
    );
  }

  // Directional coordinates:
  // Forward: enters from Right (+100%) -> sweeps through screen -> exits Left (-100%)
  // Backward: enters from Left (-100%) -> sweeps through screen -> exits Right (+100%)
  const isForward = direction === 'forward';
  const initialX = isForward ? '100%' : '-100%';
  const exitX = isForward ? '-100%' : '100%';

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden select-none">
          {/* Layer 1: Leading Semi-transparent Glass Veil for Depth */}
          <motion.div
            initial={{ x: initialX }}
            animate={{ x: '0%' }}
            exit={{ x: exitX }}
            transition={{
              duration: 0.72,
              ease: [0.32, 0, 0.24, 1], // Luxury cubic-bezier
            }}
            className="absolute inset-0 w-full h-full bg-[rgba(18,18,24,0.7)] backdrop-blur-md z-10"
          />

          {/* Layer 2: Main Solid Deep Charcoal / Imperial Dark Sliding Curtain */}
          <motion.div
            initial={{ x: initialX }}
            animate={{ x: '0%' }}
            exit={{ x: exitX }}
            transition={{
              duration: 0.75,
              ease: [0.25, 1, 0.35, 1],
            }}
            className="absolute inset-0 w-full h-full bg-[#08080b] z-20 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.9)]"
          >
            {/* Subtle antique-gold leading edge border line */}
            <div
              className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#c5a059] to-transparent shadow-[0_0_12px_rgba(197,160,89,0.8)] z-30 ${
                isForward ? 'left-0' : 'right-0'
              }`}
            />

            {/* Subtle horizontal light streak traveling across */}
            <motion.div
              initial={{ x: isForward ? '100%' : '-100%', opacity: 0 }}
              animate={{ x: isForward ? '-100%' : '100%', opacity: [0, 0.45, 0] }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(218,179,106,0.12)_0%,transparent_70%)] pointer-events-none"
            />

            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

            {/* Elegant Brief Destination Page Name - Appears momentarily and fades before exit */}
            <motion.div
              initial={{ opacity: 0, y: 12, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.32em' }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              transition={{
                delay: 0.12,
                duration: 0.38,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-40 text-center px-6"
            >
              <div className="text-[10px] font-sans tracking-[0.45em] text-[#c5a059] uppercase mb-2 opacity-90">
                MUGHAL MAHAL
              </div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-[#f4efe6] font-bold tracking-[0.28em] uppercase">
                {pageTitle}
              </h2>
              {/* Subtle antique-gold minimalist divider */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.18, duration: 0.35 }}
                className="h-[1px] bg-[#c5a059] mx-auto mt-3.5 opacity-75"
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
