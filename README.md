# Mughal Mahal Restaurant | मुगल महल रेस्टोरेंट

> **Authentic Mughlai & North Indian Culinary Heritage in Rajendra Place, New Delhi**  
> Integrated with an interactive, high-definition 185-frame scroll-based video animation.

---

## Highlights

- **Scroll-Driven Frame Animation**: 185 high-resolution video frames rendered dynamically with high-DPI retina canvas and continuous `requestAnimationFrame` lerp inertia scrubbing.
- **Modern Tech Stack**: React 19, TypeScript, Tailwind CSS, Motion.
- **Comprehensive Digital Dining Experience**:
  - Floating Glass Navigation with royal Mughal logo.
  - Interactive Dining & Culinary Story (`SignatureDishStory`, `RestaurantExperienceStory`).
  - Royal Dining Pillars (`SignatureHighlights`).
  - Table Reservation Modal & Quick-Order Modal (Zomato / Swiggy / Direct Call).
  - Floating WhatsApp & Phone Contact widget.
  - Multi-stage scroll-scrubbing hero narrative.
  - Full multi-page routes: `/menu`, `/about`, `/gallery`, `/reviews`, `/contact`.

---

## Project Structure

```
├── extracted_project/         # Main React 19 + Vite web application
│   ├── src/                  # Components, Pages, Data, Styles
│   │   ├── components/       # UI Components, ScrollCanvas, HeroScrollStages
│   │   ├── pages/            # Multi-page layouts (Home, Menu, About, etc.)
│   │   └── data/             # Restaurant data & culinary items
│   ├── public/               # Public assets & 185 animation frames
│   │   ├── frames/           # 185 video frame images (frame_001.jpg - frame_185.jpg)
│   │   └── assets/           # Mughal Mahal official logo
│   └── package.json          # Node dependencies & scripts
├── Chef_finishing_gourmet_dish_with__20260921193130_gwr_video_mvp_frames/ # Video frames source
├── index.html                # Standalone pure animation page
└── server.js                 # Lightweight Node.js static server
```

---

## Getting Started

### 1. Main Application (React + Vite)
```bash
cd extracted_project
npm install --legacy-peer-deps
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 2. Standalone Pure Animation
```bash
node server.js
```
Open [http://localhost:3001/](http://localhost:3001/) in your browser.

---

## License
© 2026 Mughal Mahal Restaurant. All rights reserved.
