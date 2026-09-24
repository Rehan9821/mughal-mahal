import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Utensils,
  ChevronDown,
  Sparkles,
  Award,
  Flame,
  Clock,
  ArrowRight,
} from 'lucide-react';

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

  // Frame Cache & Decoded State
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(totalFrames).fill(false));
  const actuallyDrawnIndexRef = useRef<number>(-1);

  // Synchronous & Inertia Scrubbing Refs
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [initialFrameReady, setInitialFrameReady] = useState(false);

  // Frame URL constructor
  const getFrameUrl = useCallback((index: number) => {
    const padded = String(index).padStart(3, '0');
    return `/frames/frame_${padded}.jpg`;
  }, []);

  // Main Canvas Setup & Scrubbing Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Retina & High-DPI Auto Scaling
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

    // Draw single frame with object-fit: cover logic and bicubic centering
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

    // Search outward for the best available loaded frame (closest to requested frame)
    const findBestFrame = (desiredIndex: number) => {
      const isLoaded = isLoadedRef.current;
      const images = imagesRef.current;

      // Exact match
      if (isLoaded[desiredIndex - 1] && images[desiredIndex - 1]) {
        return { img: images[desiredIndex - 1]!, frameIndex: desiredIndex };
      }

      // Outward search for nearest fallback
      for (let dist = 1; dist < totalFrames; dist++) {
        const prev = desiredIndex - 1 - dist;
        if (prev >= 0 && isLoaded[prev] && images[prev]) {
          return { img: images[prev]!, frameIndex: prev + 1 };
        }
        const next = desiredIndex - 1 + dist;
        if (next < totalFrames && isLoaded[next] && images[next]) {
          return { img: images[next]!, frameIndex: next + 1 };
        }
      }

      return null;
    };

    const drawCurrentFrame = (force = false) => {
      const frameIdx = Math.max(1, Math.min(totalFrames, Math.round(currentFrameRef.current)));

      const match = findBestFrame(frameIdx);
      if (!match) return;

      // Only draw if different from currently displayed bitmap, or if forced
      if (!force && match.frameIndex === actuallyDrawnIndexRef.current) {
        return;
      }

      if (drawFrame(match.img)) {
        actuallyDrawnIndexRef.current = match.frameIndex;
      }
    };

    // Ultra-Responsive Render Loop: Tracks user scroll tightly with silky sub-frame smoothness
    const renderLoop = () => {
      if (!isVisibleRef.current) {
        animFrameIdRef.current = null;
        return;
      }

      const diff = targetFrameRef.current - currentFrameRef.current;
      const absDiff = Math.abs(diff);

      if (absDiff > 0.001) {
        // Dynamic responsive lerp:
        // Fast scroll moves tightly with the user (0.42), gentle settling at the end (0.32)
        // Completely eliminates sluggish drift and ensures every frame scrolls synchronously
        const lerpFactor = absDiff > 3 ? 0.42 : 0.32;
        currentFrameRef.current += diff * lerpFactor;
        drawCurrentFrame();
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        drawCurrentFrame();
        animFrameIdRef.current = null;
      }
    };

    const startRenderLoop = () => {
      if (animFrameIdRef.current === null && isVisibleRef.current) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    // Scroll calculations relative to this exact container
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

    // Preload all 185 frames concurrently & prioritize neighborhood frames
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

      // 2. High-speed concurrent queue for remaining 184 frames
      const queue: number[] = [];
      for (let i = 2; i <= totalFrames; i++) {
        queue.push(i);
      }

      const CONCURRENCY = 24;
      let ptr = 0;

      const loadNext = () => {
        if (ptr >= queue.length) return;
        const frameNum = queue[ptr++];
        const idx = frameNum - 1;

        // Skip if already initiated
        if (imagesRef.current[idx]) {
          loadNext();
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(frameNum);
        imagesRef.current[idx] = img;

        const onDone = () => {
          isLoadedRef.current[idx] = true;

          // If scrub position is at or adjacent to this frame, render immediately
          const cur = Math.round(currentFrameRef.current);
          if (Math.abs(cur - frameNum) <= 1) {
            drawCurrentFrame(true);
          }
          loadNext();
        };

        img.onload = onDone;
        img.onerror = () => {
          loadNext();
        };
      };

      for (let c = 0; c < CONCURRENCY; c++) {
        loadNext();
      }
    };

    // Visibility Observer to pause RAF when user scrolls deep into other sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            startRenderLoop();
          }
        });
      },
      { threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    resizeCanvas();
    preloadFrames();
    handleScroll();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [totalFrames, getFrameUrl]);

  const scrollToStory = () => {
    const el = document.getElementById('culinary-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Narrative Card Phase thresholds (calibrated for 4 seamless chapters)
  const isPhase1 = scrollProgress < 0.28;
  const isPhase2 = scrollProgress >= 0.28 && scrollProgress < 0.62;
  const isPhase3 = scrollProgress >= 0.62 && scrollProgress < 0.85;
  const isPhase4 = scrollProgress >= 0.85;

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full"
      style={{ height: '380vh' }}
    >
      {/* Sticky Fullscreen Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#07070a]">
        {/* Hardware-Accelerated Video Canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            initialFrameReady ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Dynamic Warm Golden Ambient Aura (Centrally Focused, Radiating Luxury) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.12) 0%, rgba(7, 7, 10, 0.55) 60%, #07070a 100%)',
          }}
        />

        {/* Cinematic Film-Grain / 35mm Analog Micro-Texture for Billion-Dollar Tactile Warmth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.7'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Deep Imperial Vignette for Impeccable Foreground Typography Legibility */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#07070a] via-transparent to-[#07070a]/80" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(7,7,10,0.65)_70%,#07070a_100%)]" />

        {/* Top Spacer for Floating Glass Nav */}
        <div className="relative z-10 h-24" />

        {/* ====================================================
            MAIN FLOATING CONTENT STAGES (CINEMATIC PARALLAX)
        ==================================================== */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 h-[calc(100vh-14rem)] flex flex-col items-center justify-center text-center pointer-events-none">
          <AnimatePresence mode="wait">
            {/* PHASE 1: THE IMPERIAL GENESIS */}
            {isPhase1 && (
              <motion.div
                key="phase1"
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center max-w-3xl pointer-events-auto"
              >
                {/* Royal Eyebrow Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(218,179,106,0.4)] bg-[rgba(10,10,14,0.7)] backdrop-blur-xl mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                  <Award className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.32em] text-[#d8b46a] uppercase">
                    ESTABLISHED 1970s • RAJENDRA PLACE, NEW DELHI
                  </span>
                </div>

                {/* Main Display Heading */}
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.16em] text-[#fbf8f2] uppercase leading-[1.04] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  Mughal Mahal
                </h1>

                {/* Hindi Script Subheading */}
                <div className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#c5a059] tracking-wider mt-3 mb-4 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                  मुगल महल रेस्टोरेंट • शाही विरासत
                </div>

                {/* Supporting Narrative Statement */}
                <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#e2dcd2] font-serif leading-relaxed px-4 mb-7 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Delhi&apos;s celebrated home of authentic Mughlai gastronomy. Renowned for slow-simmered
                  signature Murg Makhani, charcoal-roasted tandoori feasts, and recipes handed down through generations.
                </p>

                {/* Interactive Prompt Notice */}
                <div className="inline-flex items-center gap-3 text-[11px] font-sans tracking-[0.24em] text-[#c5a059] uppercase bg-[rgba(10,10,14,0.75)] px-5 py-2.5 rounded-full border border-[rgba(197,160,89,0.3)] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <Flame className="w-3.5 h-3.5 text-[#d8b46a] animate-pulse" />
                  <span>Scroll down to experience our master chef at work</span>
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                </div>
              </motion.div>
            )}

            {/* PHASE 2: SPICE ALCHEMY & SLOW SIMMER */}
            {isPhase2 && (
              <motion.div
                key="phase2"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center bg-[rgba(10,10,14,0.72)] p-7 sm:p-10 rounded-2xl border border-[rgba(218,179,106,0.3)] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] max-w-2xl text-center pointer-events-auto"
              >
                <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.35em] text-[#c5a059] uppercase mb-2 font-semibold">
                  <Sparkles className="w-3 h-3 text-[#d8b46a]" />
                  <span>CULINARY ARTISTRY IN MOTION</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl text-[#f4efe6] tracking-wide uppercase mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  Slow-Simmered Perfection
                </h2>

                <div className="font-hindi text-base sm:text-lg text-[#c5a059] mb-4">
                  धीमी आंच • जाफरानी मसाले • शाही अंदाज
                </div>

                <p className="text-xs sm:text-sm text-[#cfc8bc] font-serif leading-relaxed px-2">
                  Every aromatic whole spice is toasted in rich desi ghee before joining vine-ripened tomatoes
                  and tender morsels in heavy copper handis. Watch the gravy attain its legendary silken viscosity.
                </p>

                <div className="mt-6 inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[rgba(197,160,89,0.1)] border border-[rgba(197,160,89,0.25)] text-[10px] font-mono tracking-[0.2em] text-[#e8dfcf] uppercase">
                  <span>VELVET REDUCTION ACTIVE</span>
                  <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
                </div>
              </motion.div>
            )}

            {/* PHASE 3: THE MASTER'S GARNISH */}
            {isPhase3 && (
              <motion.div
                key="phase3"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center bg-[rgba(10,10,14,0.75)] p-7 sm:p-10 rounded-2xl border border-[rgba(218,179,106,0.35)] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] max-w-2xl text-center pointer-events-auto"
              >
                <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.35em] text-[#c5a059] uppercase mb-2 font-semibold">
                  <Sparkles className="w-3 h-3 text-[#d8b46a]" />
                  <span>THE SIGNATURE PLATING</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl text-[#f4efe6] tracking-wide uppercase mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  The Master&apos;s Garnish
                </h2>

                <div className="font-hindi text-base sm:text-lg text-[#c5a059] mb-4">
                  ताजा मलाई • कस्तूरी मेथी • बारीक कटी अदरक
                </div>

                <p className="text-xs sm:text-sm text-[#cfc8bc] font-serif leading-relaxed px-2">
                  With surgical precision, our master ustad laces the simmering preparation with swirls of
                  churned malai, crisp ginger juliennes, and roasted kasuri methi crushed between open palms.
                </p>

                <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#c5a059] uppercase">
                  <span>Plating in Progress</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
                </div>
              </motion.div>
            )}

            {/* PHASE 4: THE ROYAL PLATING READY FOR TABLE */}
            {isPhase4 && (
              <motion.div
                key="phase4"
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center max-w-3xl pointer-events-auto"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(218,179,106,0.4)] bg-[rgba(10,10,14,0.75)] backdrop-blur-xl mb-4 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                  <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.3em] text-[#d8b46a] uppercase">
                    A ROYAL MASTERPIECE IS PLATED
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] text-[#fbf8f2] uppercase leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] mb-2">
                  Ready For Your Table
                </h2>

                <div className="font-hindi text-lg sm:text-2xl text-[#c5a059] tracking-wider mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  स्वाद जो इतिहास बन जाए
                </div>

                <p className="max-w-xl text-xs sm:text-sm md:text-base text-[#e2dcd2] font-serif leading-relaxed px-4 mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  The iconic Mughal Mahal dining experience awaits. Reserve your royal table or explore our legendary menu.
                </p>

                {/* Primary and Secondary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <button
                    id="hero-reserve-btn"
                    onClick={onOpenReservation}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#c5a059] to-[#d8b46a] hover:from-[#d8b46a] hover:to-[#fae29c] text-[#0a0a0c] font-sans font-semibold text-xs tracking-[0.24em] uppercase py-4 px-9 rounded-lg transition-all duration-300 shadow-[0_12px_36px_-6px_rgba(197,160,89,0.5)] flex items-center justify-center gap-2.5 hover:scale-[1.03] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#0a0a0c]" />
                    RESERVE A TABLE
                  </button>

                  <button
                    id="hero-menu-btn"
                    onClick={() => {
                      navigate('/menu');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto border border-[rgba(255,255,255,0.25)] hover:border-[#c5a059] bg-[rgba(10,10,14,0.7)] hover:bg-[rgba(197,160,89,0.18)] text-[#f4efe6] hover:text-[#c5a059] font-sans font-medium text-xs tracking-[0.24em] uppercase py-4 px-8 rounded-lg backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Utensils className="w-4 h-4" />
                    EXPLORE THE CUISINE
                  </button>

                  <button
                    id="hero-order-btn"
                    onClick={onOpenOrder}
                    className="w-full sm:w-auto border border-[rgba(218,179,106,0.35)] hover:border-[#c5a059] bg-[rgba(10,10,14,0.7)] hover:bg-[rgba(197,160,89,0.18)] text-[#c5a059] font-sans font-medium text-xs tracking-[0.24em] uppercase py-4 px-7 rounded-lg backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>ORDER ONLINE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ====================================================
            BOTTOM VERIFIED INFORMATION MICROBAR & PROGRESS
        ==================================================== */}
        <div className="absolute bottom-0 inset-x-0 z-30 border-t border-[rgba(218,179,106,0.2)] bg-[rgba(7,7,10,0.88)] backdrop-blur-2xl py-3 px-6 sm:px-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            {/* Left: Verified Location & Operating Info */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-[11px] font-sans tracking-wider text-[#a59e92] uppercase">
              <span className="text-[#f4efe6] font-medium">Rajendra Place, New Delhi</span>
              <span className="hidden sm:inline text-[rgba(255,255,255,0.2)]">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#c5a059]" />
                11:30 AM – 11:30 PM
              </span>
              <span className="hidden sm:inline text-[rgba(255,255,255,0.2)]">•</span>
              <span className="text-[#c5a059] font-semibold">3.9 ★ (1,142+ Google Reviews)</span>
            </div>

            {/* Right: Smooth Scroll Progress Gauge & Continuous Scroll Down Button */}
            <div className="flex items-center gap-5">
              {/* Scrub Progress Gauge */}
              <div className="flex items-center gap-2 hidden sm:flex">
                <span className="text-[10px] font-mono tracking-widest text-[#8e8779]">
                  {Math.round(scrollProgress * 100)}%
                </span>
                <div className="w-28 h-1.5 bg-[rgba(255,255,255,0.12)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#c5a059] via-[#d8b46a] to-[#fae29c] transition-all duration-75 ease-out rounded-full"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
              </div>

              {/* Seamless Jump to Culinary Story */}
              <button
                onClick={scrollToStory}
                className="flex items-center gap-2 text-[10px] font-sans tracking-[0.22em] text-[#c5a059] uppercase hover:text-[#fbf8f2] transition-colors focus:outline-none cursor-pointer"
              >
                <span>{scrollProgress >= 0.92 ? 'DISCOVER HERITAGE' : 'SCROLL DOWN'}</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#c5a059]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
