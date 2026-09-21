import React, { useEffect, useRef, useState } from 'react';

interface ScrollCanvasBackgroundProps {
  totalFrames?: number;
  className?: string;
  intensity?: number;
}

export const ScrollCanvasBackground: React.FC<ScrollCanvasBackgroundProps> = ({
  totalFrames = 185,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(totalFrames).fill(false));
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastDrawnIndexRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);

  // Helper to format frame filename: frame_001.jpg ... frame_185.jpg
  const getFrameUrl = (index: number) => {
    const padded = String(index).padStart(3, '0');
    return `/frames/frame_${padded}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Responsive Canvas Resize
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      drawCurrentFrame(true);
    };

    // Draw single frame with object-fit: cover logic
    const drawFrame = (img: HTMLImageElement) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;

      const imgRatio = nw / nh;
      const canvasRatio = cw / ch;

      let renderW: number, renderH: number, offsetX: number, offsetY: number;

      if (canvasRatio > imgRatio) {
        renderW = cw;
        renderH = cw / imgRatio;
        offsetX = 0;
        offsetY = (ch - renderH) / 2;
      } else {
        renderH = ch;
        renderW = ch * imgRatio;
        offsetX = (cw - renderW) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    };

    // Find nearest loaded frame if current frame is still downloading
    const findClosestLoadedFrame = (index: number) => {
      const isLoaded = isLoadedRef.current;
      const images = imagesRef.current;

      if (isLoaded[index - 1] && images[index - 1]) return images[index - 1];

      for (let dist = 1; dist < totalFrames; dist++) {
        const prev = index - 1 - dist;
        if (prev >= 0 && isLoaded[prev] && images[prev]) return images[prev];
        const next = index - 1 + dist;
        if (next < totalFrames && isLoaded[next] && images[next]) return images[next];
      }
      return null;
    };

    const drawCurrentFrame = (force = false) => {
      const frameIdx = Math.max(1, Math.min(totalFrames, Math.round(currentFrameRef.current)));
      if (!force && frameIdx === lastDrawnIndexRef.current) return;

      const imgToDraw = findClosestLoadedFrame(frameIdx);
      if (imgToDraw) {
        drawFrame(imgToDraw);
        lastDrawnIndexRef.current = frameIdx;
      }
    };

    // Smooth render loop with lerp dampening
    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.15;
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
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
      targetFrameRef.current = 1 + progress * (totalFrames - 1);
      startRenderLoop();
    };

    // Preloader
    const preloadFrames = () => {
      // 1. First frame immediately
      const firstImg = new Image();
      firstImg.src = getFrameUrl(1);
      imagesRef.current[0] = firstImg;
      firstImg.onload = () => {
        isLoadedRef.current[0] = true;
        setInitialFrameLoaded(true);
        drawCurrentFrame(true);
      };

      // 2. Sequential/batched preloading for all other frames
      const remaining: number[] = [];
      for (let i = 2; i <= totalFrames; i++) {
        remaining.push(i);
      }

      const BATCH_SIZE = 6;
      let cursor = 0;

      const loadNext = () => {
        if (cursor >= remaining.length) return;
        const frameNum = remaining[cursor++];
        const idx = frameNum - 1;

        const img = new Image();
        img.src = getFrameUrl(frameNum);
        imagesRef.current[idx] = img;

        img.onload = () => {
          isLoadedRef.current[idx] = true;
          const currentNearest = Math.round(currentFrameRef.current);
          if (currentNearest === frameNum) {
            drawCurrentFrame(true);
          }
          loadNext();
        };

        img.onerror = () => {
          loadNext();
        };
      };

      for (let b = 0; b < BATCH_SIZE; b++) {
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

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          initialFrameLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Subtle royal vignette overlay to make all foreground text crisp and readable */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070709]/40 to-[#070709]/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/70 via-transparent to-[#070709]/90" />
    </div>
  );
};
