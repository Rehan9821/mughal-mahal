# Mughal Mahal Restaurant | मुगल महल रेस्टोरेंट
### Ultra-Luxury 3D Scroll-Scrubbed Culinary Digital Experience

> **Authentic Mughlai & North Indian Culinary Heritage in Rajendra Place, New Delhi**  
> Integrated with an interactive, high-definition 185-frame scroll-based video animation engineered to "billion-dollar website" standards.

---

## Highlights & Innovations

- **Billion-Dollar Interactive Scroll Engine**:
  - 185 high-resolution video frames rendered dynamically with high-DPI retina canvas (`ctx.imageSmoothingQuality = 'high'`).
  - Continuous `requestAnimationFrame` lerp momentum scrubbing with sub-frame inertia (0.13 damping).
  - Off-thread bitmap decoding via `HTMLImageElement.decode()` ensuring 0ms paint lag.
  - Prioritized keyframe loader + progressive concurrency pipeline.
  - Auto-pause visibility observer: turns off 100% of RAF when user scrolls past hero.
- **Cinematic Heads-Up Display (HUD)**:
  - Real-time telemetry: `FRAME 089 / 185 • 4K HDR • 60 FPS MASTER`.
  - **Interactive Chapter Rail**:
    - `01. Royal Genesis` (Frames 1–45)
    - `02. Spice Alchemy` (Frames 46–105)
    - `03. Master's Garnish` (Frames 106–155)
    - `04. Imperial Feast` (Frames 156–185)
  - **Watch Reel Mode**: Auto-plays the entire culinary sequence at cinematic 24fps with a single click.
  - **Royal Soundscape**: Optional synthesized ambient sitar drone and simmer effect built with pure Web Audio API (zero external MP3 files needed).
- **Comprehensive Dining Experience**:
  - Floating Glass Navigation with royal Mughal emblem.
  - Multi-page routing: `/menu`, `/about`, `/gallery`, `/reviews`, `/contact`.
  - Interactive Table Reservation Modal & Quick-Order Modal (Zomato, Swiggy, Direct Call).
  - Floating WhatsApp & Phone Contact widget.

---

## Quick Start (Local Run)

### Option A: 1-Click Launch (Windows)
Double-click `run_app.bat` inside this folder.

### Option B: Terminal Command
```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## Production Build & Deploy

```bash
# Build optimized production bundle with pre-rendered assets
npm run build

# Preview production build locally
npm run preview
```

---

© Mughal Mahal Restaurant. All rights reserved.
