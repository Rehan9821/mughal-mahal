import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Utensils, ChevronDown, Sparkles } from 'lucide-react';

interface HeroScrollStagesProps {
  navigate: (route: string) => void;
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export const HeroScrollStages: React.FC<HeroScrollStagesProps> = ({
  navigate,
  onOpenReservation,
  onOpenOrder,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset || 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStory = () => {
    const el = document.getElementById('culinary-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll stages calibrated for 320vh track (approx 2400px of scroll distance)
  const isStage1 = scrollY < 850;
  const isStage2 = scrollY >= 850 && scrollY < 1800;
  const isStage3 = scrollY >= 1800;

  const progress = Math.max(0, Math.min(1, scrollY / 2400));

  return (
    <section
      id="hero-track"
      className="relative w-full"
      style={{ height: '320vh' }}
    >
      {/* Sticky Fullscreen Overlay Layer */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pointer-events-none">
        {/* Top spacer for floating glass nav */}
        <div className="h-24" />

        {/* Central Stage Cards */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center my-auto text-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {isStage1 && (
              <motion.div
                key="stage1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(218,179,106,0.35)] bg-[rgba(10,10,14,0.65)] backdrop-blur-md mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.3em] text-[#c5a059] uppercase">
                    ESTABLISHED IN RAJENDRA PLACE • NEW DELHI
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.16em] text-[#fbf8f2] uppercase leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                  Mughal Mahal
                </h1>

                <div className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#c5a059] tracking-wider mt-2 mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  मुगल महल रेस्टोरेंट
                </div>

                <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#e2dcd2] font-serif leading-relaxed px-4 mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Authentic Mughlai & North Indian dining in Rajendra Place, New Delhi.
                  Renowned for iconic Murg Makhani, charcoal tandoori specialties, and timeless royal recipes.
                </p>

                <div className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.22em] text-[#c5a059] uppercase bg-[rgba(10,10,14,0.7)] px-5 py-2.5 rounded-full border border-[rgba(197,160,89,0.3)] backdrop-blur-sm animate-pulse">
                  <span>Scroll down to watch our chef plate the dish</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            )}

            {isStage2 && (
              <motion.div
                key="stage2"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center bg-[rgba(10,10,14,0.7)] p-8 sm:p-10 rounded-2xl border border-[rgba(218,179,106,0.25)] backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.7)] max-w-2xl"
              >
                <div className="text-[10px] font-sans tracking-[0.35em] text-[#c5a059] uppercase mb-2 font-semibold">
                  CULINARY ARTISTRY IN MOTION
                </div>
                <h2 className="font-display text-2xl sm:text-4xl text-[#f4efe6] tracking-wide uppercase mb-2">
                  Slow-Cooked Perfection
                </h2>
                <div className="font-hindi text-base sm:text-lg text-[#c5a059] mb-4">
                  धीमी आंच • परंपरागत मसाले • शाही अंदाज
                </div>
                <p className="text-xs sm:text-sm text-[#cfc8bc] font-serif leading-relaxed text-center">
                  Watch as every aromatic garnish and roasted spice is introduced by our master chef,
                  creating the rich velvet texture that has defined Mughal Mahal for generations.
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#c5a059] uppercase">
                  <span>Plating Masterpiece in Progress</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
                </div>
              </motion.div>
            )}

            {isStage3 && (
              <motion.div
                key="stage3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(218,179,106,0.35)] bg-[rgba(10,10,14,0.7)] backdrop-blur-md mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.3em] text-[#c5a059] uppercase">
                    A ROYAL MASTERPIECE IS PLATED
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] text-[#fbf8f2] uppercase leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mb-2">
                  Ready For Your Table
                </h2>

                <div className="font-hindi text-lg sm:text-2xl text-[#c5a059] tracking-wider mb-4">
                  स्वाद जो इतिहास बन जाए
                </div>

                <p className="max-w-xl text-xs sm:text-sm md:text-base text-[#e2dcd2] font-serif leading-relaxed px-4 mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  The iconic Mughal Mahal dining experience awaits. Reserve your royal table or explore our legendary menu.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <button
                    id="hero-reserve-btn"
                    onClick={onOpenReservation}
                    className="w-full sm:w-auto bg-[#c5a059] hover:bg-[#d8b46a] text-[#0a0a0c] font-sans font-semibold text-xs tracking-[0.22em] uppercase py-3.5 px-8 rounded transition-all duration-300 shadow-[0_10px_30px_-5px_rgba(197,160,89,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    RESERVE A TABLE
                  </button>

                  <button
                    id="hero-menu-btn"
                    onClick={() => {
                      navigate('/menu');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto border border-[rgba(255,255,255,0.3)] hover:border-[#c5a059] bg-[rgba(10,10,14,0.6)] hover:bg-[rgba(197,160,89,0.15)] text-[#f4efe6] hover:text-[#c5a059] font-sans font-medium text-xs tracking-[0.22em] uppercase py-3.5 px-8 rounded backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Utensils className="w-4 h-4" />
                    EXPLORE THE CUISINE
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Information Microbar with Real-Time Progress Bar */}
        <div className="relative z-20 border-t border-[rgba(218,179,106,0.18)] bg-[rgba(7,7,10,0.85)] backdrop-blur-xl py-3 px-6 pointer-events-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 text-[11px] font-sans tracking-wider text-[#9f988b] uppercase">
              <span>Rajendra Place, New Delhi</span>
              <span className="hidden sm:inline">•</span>
              <span>11:30 AM – 11:30 PM</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-[#c5a059]">3.9 ★ (1,142+ Google Reviews)</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-28 h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden hidden sm:block">
                <div
                  className="h-full bg-gradient-to-r from-[#c5a059] to-[#fae29c] transition-all duration-75 ease-out"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <button
                onClick={scrollToStory}
                className="flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] text-[#c5a059] uppercase hover:text-[#f4efe6] transition-colors focus:outline-none cursor-pointer"
              >
                <span>{progress >= 0.95 ? 'Explore Heritage' : 'Scroll Down'}</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
