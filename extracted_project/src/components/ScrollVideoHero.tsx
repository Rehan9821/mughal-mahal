import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Utensils, ChevronDown, Sparkles } from 'lucide-react';

interface ScrollVideoHeroProps {
  navigate: (route: string) => void;
  onOpenReservation: () => void;
  onOpenOrder: () => void;
  totalFrames?: number;
}

export const ScrollVideoHero: React.FC<ScrollVideoHeroProps> = ({
  navigate,
  onOpenReservation,
  onOpenOrder,
  totalFrames = 185,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(totalFrames).fill(false));
  const actuallyDrawnIndexRef = useRef<number>(-1);

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [initialFrameReady, setInitialFrameReady] = useState(false);

  const getFrameUrl = (index: number) => {
    const padded = String(index).padStart(3, '0');
    return `/frames/frame_${padded}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      drawCurrentFrame(true);
    };

    const drawFrame = (img: HTMLImageElement) => {
      if (!img || !img.complete || img.naturalWidth === 0) return false;

      const cw = canvas.width;
      const ch = canvas.height;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;

      const imgRatio = nw / nh;
      const canvasRatio = cw / ch;

      let rw: number, rh: number, ox: number, oy: number;

      if (canvasRatio > imgRatio) {
        rw = cw;
        rh = cw / imgRatio;
        ox = 0;
        oy = (ch - rh) / 2;
      } else {
        rh = ch;
        rw = ch * imgRatio;
        ox = (cw - rw) / 2;
        oy = 0;
      }

      ctx.drawImage(img, ox, oy, rw, rh);
      return true;
    };

    const findBestFrame = (desiredIndex: number) => {
      const isLoaded = isLoadedRef.current;
      const images = imagesRef.current;

      // Exact match
      if (isLoaded[desiredIndex - 1] && images[desiredIndex - 1]) {
        return { img: images[desiredIndex - 1]!, isExact: true };
      }

      // Outward search for nearest fallback
      for (let dist = 1; dist < totalFrames; dist++) {
        const prev = desiredIndex - 1 - dist;
        if (prev >= 0 && isLoaded[prev] && images[prev]) {
          return { img: images[prev]!, isExact: false };
        }
        const next = desiredIndex - 1 + dist;
        if (next < totalFrames && isLoaded[next] && images[next]) {
          return { img: images[next]!, isExact: false };
        }
      }

      return null;
    };

    const drawCurrentFrame = (force = false) => {
      const frameIdx = Math.max(1, Math.min(totalFrames, Math.round(currentFrameRef.current)));

      if (!force && frameIdx === actuallyDrawnIndexRef.current) {
        return;
      }

      const match = findBestFrame(frameIdx);
      if (match && drawFrame(match.img)) {
        if (match.isExact) {
          actuallyDrawnIndexRef.current = frameIdx;
        }
      }
    };

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.16;
        drawCurrentFrame();
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        drawCurrentFrame();
        animFrameIdRef.current = null;
      }
    };

    const startRenderLoop = () => {
      if (animFrameIdRef.current === null) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = scrolled / scrollableDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(progress);
      targetFrameRef.current = 1 + progress * (totalFrames - 1);
      startRenderLoop();
    };

    // Preload frames with high concurrency
    const preloadFrames = () => {
      // 1. Immediately load frame 1
      const firstImg = new Image();
      firstImg.src = getFrameUrl(1);
      imagesRef.current[0] = firstImg;
      firstImg.onload = () => {
        isLoadedRef.current[0] = true;
        setInitialFrameReady(true);
        drawCurrentFrame(true);
      };

      // 2. High-speed batch loading across 12 concurrent streams
      const indices: number[] = [];
      for (let i = 2; i <= totalFrames; i++) {
        indices.push(i);
      }

      const CONCURRENCY = 12;
      let ptr = 0;

      const loadNext = () => {
        if (ptr >= indices.length) return;
        const frameNum = indices[ptr++];
        const idx = frameNum - 1;

        const img = new Image();
        img.src = getFrameUrl(frameNum);
        imagesRef.current[idx] = img;

        img.onload = () => {
          isLoadedRef.current[idx] = true;
          // If current scrub position is near this frame, trigger repaint
          const cur = Math.round(currentFrameRef.current);
          if (cur === frameNum || Math.abs(cur - frameNum) <= 1) {
            drawCurrentFrame(true);
          }
          loadNext();
        };

        img.onerror = () => {
          loadNext();
        };
      };

      for (let c = 0; c < CONCURRENCY; c++) {
        loadNext();
      }
    };

    resizeCanvas();
    preloadFrames();
    handleScroll();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [totalFrames]);

  const scrollToStory = () => {
    const el = document.getElementById('culinary-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Phase visibility thresholds
  const isPhase1 = scrollProgress < 0.32;
  const isPhase2 = scrollProgress >= 0.32 && scrollProgress < 0.68;
  const isPhase3 = scrollProgress >= 0.68;

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full"
      style={{ height: '420vh' }}
    >
      {/* Sticky Fullscreen Viewport for Video Scrubbing & Overlays */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#070709]">
        {/* Hardware-Accelerated Video Canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            initialFrameReady ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Cinematic Vignettes for Maximum Legibility & Drama */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,rgba(7,7,9,0.78)_85%,#070709_100%)]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/75" />

        {/* Floating Top Spacer for Glass Nav */}
        <div className="relative z-10 h-24" />

        {/* Main Floating Content Stages based on Scroll Progress */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 h-[calc(100vh-14rem)] flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {isPhase1 && (
              <motion.div
                key="phase1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Royal Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(218,179,106,0.35)] bg-[rgba(10,10,14,0.65)] backdrop-blur-md mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.3em] text-[#c5a059] uppercase">
                    ESTABLISHED IN RAJENDRA PLACE • NEW DELHI
                  </span>
                </div>

                {/* Main Display Heading */}
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.16em] text-[#fbf8f2] uppercase leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                  Mughal Mahal
                </h1>

                {/* Hindi Script Subheading */}
                <div className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#c5a059] tracking-wider mt-2 mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  मुगल महल रेस्टोरेंट
                </div>

                {/* Supporting Statement */}
                <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#e2dcd2] font-serif leading-relaxed px-4 mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Authentic Mughlai & North Indian dining in Rajendra Place, New Delhi.
                  Renowned for iconic Murg Makhani, charcoal tandoori specialties, and timeless royal recipes.
                </p>

                {/* Scroll Prompt Notice */}
                <div className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.22em] text-[#c5a059] uppercase bg-[rgba(10,10,14,0.7)] px-4 py-2 rounded-full border border-[rgba(197,160,89,0.25)] backdrop-blur-sm animate-pulse">
                  <span>Scroll down to experience our master chef at work</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            )}

            {isPhase2 && (
              <motion.div
                key="phase2"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center bg-[rgba(10,10,14,0.65)] p-8 sm:p-10 rounded-2xl border border-[rgba(218,179,106,0.25)] backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.7)] max-w-2xl"
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
                <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#9f988b] uppercase">
                  <span>Plating in Progress</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
                </div>
              </motion.div>
            )}

            {isPhase3 && (
              <motion.div
                key="phase3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
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

                {/* Primary and Secondary CTA Buttons */}
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

        {/* Bottom Verified Information Microbar with Scroll Progress Gauge */}
        <div className="absolute bottom-0 inset-x-0 z-30 border-t border-[rgba(218,179,106,0.18)] bg-[rgba(7,7,10,0.85)] backdrop-blur-xl py-3 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 text-[11px] font-sans tracking-wider text-[#9f988b] uppercase">
              <span>Rajendra Place, New Delhi</span>
              <span className="hidden sm:inline">•</span>
              <span>11:30 AM – 11:30 PM</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-[#c5a059]">3.9 ★ (1,142+ Google Reviews)</span>
            </div>

            {/* Scroll Indicator & Progress */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden hidden sm:block">
                <div
                  className="h-full bg-gradient-to-r from-[#c5a059] to-[#fae29c] transition-all duration-100 ease-out"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <button
                onClick={scrollToStory}
                className="flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] text-[#c5a059] uppercase hover:text-[#f4efe6] transition-colors focus:outline-none cursor-pointer"
              >
                <span>{scrollProgress >= 0.95 ? 'Explore Heritage' : 'Scroll Down'}</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
