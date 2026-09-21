import React, { useEffect, useRef } from 'react';

interface ScrollCanvasProps {
  totalFrames?: number;
  heroScrollDistance?: number;
}

export const ScrollCanvas: React.FC<ScrollCanvasProps> = ({
  totalFrames = 185,
  heroScrollDistance = 2600,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(totalFrames).fill(false));

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);

  const getFrameUrl = (index: number) => {
    const padded = String(index).padStart(3, '0');
    return `/frames/frame_${padded}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      drawCurrentFrame(true);
    };

    const drawCover = (img: HTMLImageElement) => {
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

    const findNearestFrame = (desired: number) => {
      const isLoaded = isLoadedRef.current;
      const images = imagesRef.current;

      if (isLoaded[desired - 1] && images[desired - 1]) {
        return images[desired - 1];
      }

      for (let d = 1; d < totalFrames; d++) {
        const prev = desired - 1 - d;
        if (prev >= 0 && isLoaded[prev] && images[prev]) return images[prev];
        const next = desired - 1 + d;
        if (next < totalFrames && isLoaded[next] && images[next]) return images[next];
      }
      return null;
    };

    const drawCurrentFrame = (force = false) => {
      const frameIdx = Math.max(1, Math.min(totalFrames, Math.round(currentFrameRef.current)));
      if (!force && frameIdx === lastDrawnFrameRef.current) return;

      const img = findNearestFrame(frameIdx);
      if (img && drawCover(img)) {
        if (isLoadedRef.current[frameIdx - 1]) {
          lastDrawnFrameRef.current = frameIdx;
        }
      }
    };

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.002) {
        currentFrameRef.current += diff * 0.18;
        drawCurrentFrame();
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        drawCurrentFrame();
        animFrameIdRef.current = null;
      }
    };

    const requestRender = () => {
      if (animFrameIdRef.current === null) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const progress = Math.max(0, Math.min(1, scrollY / heroScrollDistance));
      targetFrameRef.current = 1 + progress * (totalFrames - 1);
      requestRender();

      // Subtle dimming of canvas when scrolling past hero into the rest of the website
      if (canvas) {
        if (scrollY > heroScrollDistance) {
          const pastHero = scrollY - heroScrollDistance;
          const fade = Math.max(0.2, 1 - pastHero / 800);
          canvas.style.opacity = String(fade);
        } else {
          canvas.style.opacity = '1';
        }
      }
    };

    // Preloader: load frame 1 immediately, then all remaining frames
    const preload = () => {
      const first = new Image();
      first.src = getFrameUrl(1);
      imagesRef.current[0] = first;
      first.onload = () => {
        isLoadedRef.current[0] = true;
        drawCurrentFrame(true);
      };

      const queue: number[] = [];
      for (let i = 2; i <= totalFrames; i++) queue.push(i);

      const CONCURRENCY = 16;
      let cursor = 0;

      const worker = () => {
        if (cursor >= queue.length) return;
        const frameNum = queue[cursor++];
        const idx = frameNum - 1;

        const img = new Image();
        img.src = getFrameUrl(frameNum);
        imagesRef.current[idx] = img;

        img.onload = () => {
          isLoadedRef.current[idx] = true;
          const cur = Math.round(currentFrameRef.current);
          if (cur === frameNum || Math.abs(cur - frameNum) <= 1) {
            drawCurrentFrame(true);
          }
          worker();
        };
        img.onerror = () => {
          worker();
        };
      };

      for (let c = 0; c < CONCURRENCY; c++) worker();
    };

    resize();
    preload();
    onScroll();

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [totalFrames, heroScrollDistance]);

  return (
    <div
      id="fixed-video-canvas-container"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      {/* Subtle royal vignette to keep foreground typography crisp */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.12)_0%,rgba(7,7,10,0.72)_88%,#07070a_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-[#07070a]/70" />
    </div>
  );
};
