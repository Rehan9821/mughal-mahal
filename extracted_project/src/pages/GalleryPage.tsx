import React, { useState } from 'react';
import { Sparkles, Maximize2, X, Camera } from 'lucide-react';
import { galleryImages, restaurantInfo } from '../data/restaurantData.ts';
import { SafeImage } from '../components/SafeImage.tsx';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxImage, setLightboxImage] = useState<(typeof galleryImages)[0] | null>(null);

  const categories = ['ALL', 'FOOD', 'INTERIORS', 'AMBIENCE', 'DETAILS'];

  const filteredImages = galleryImages.filter(
    (img) => activeCategory === 'ALL' || img.category === activeCategory
  );

  return (
    <div id="gallery-page" className="min-h-screen bg-[#07070a] pt-32 pb-24 text-[#f4efe6]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-14 text-center">
        <span className="text-[10px] font-sans tracking-[0.3em] text-[#c5a059] uppercase block mb-2 font-semibold">
          Atmosphere & Culinary Glimpses
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4efe6] tracking-tight uppercase">
          Visual Gallery
        </h1>
        <div className="font-hindi text-lg text-[#c5a059] mt-1">
          मुगल महल रेस्टोरेंट • वातावरण एवं झलकियां
        </div>
        <p className="mt-4 text-xs sm:text-sm text-[#cfc8bc] max-w-xl mx-auto font-serif">
          Glimpses of authentic Mughlai handi curries, clay-fired tandoor specialties, and air-conditioned dining halls at 7, Sethi Bhawan, Rajendra Place.
        </p>
      </section>

      {/* Category Tabs with Glass Capsule */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-12">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#c5a059] text-[#0a0a0c] font-semibold shadow-[0_4px_20px_rgba(197,160,89,0.3)]'
                  : 'text-[#8e8779] hover:text-[#f4efe6] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.06)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Editorial Responsive Masonry Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img, index) => {
            // Varied aspect ratio pattern to give an authentic high-end editorial feel
            const aspectClass =
              index % 4 === 0
                ? 'aspect-[4/5]'
                : index % 3 === 0
                ? 'aspect-[16/11]'
                : 'aspect-[4/3]';

            return (
              <div
                key={img.id}
                id={`gallery-item-${img.id}`}
                onClick={() => setLightboxImage(img)}
                className="group relative cursor-pointer break-inside-avoid rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] hover:border-[rgba(218,179,106,0.5)] bg-[#0d0d11] transition-all duration-500 shadow-xl"
              >
                {/* Image with subtle hover zoom */}
                <div className="relative overflow-hidden">
                  <SafeImage
                    src={img.imageUrl}
                    alt={img.title}
                    aspectRatio={aspectClass}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle darkening gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090c]/90 via-[#09090c]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                </div>

                {/* Overlay Metadata */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-sans tracking-[0.25em] text-[#c5a059] uppercase px-2.5 py-1 rounded bg-[rgba(10,10,14,0.85)] border border-[rgba(218,179,106,0.3)] backdrop-blur-md">
                      {img.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[rgba(10,10,14,0.8)] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#f4efe6] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" />
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <div>
                    <h3 className="font-display text-base text-[#f4efe6] uppercase tracking-wide group-hover:text-[#c5a059] transition-colors leading-snug">
                      {img.title}
                    </h3>
                    <p className="text-[11px] text-[#cfc8bc] font-serif line-clamp-2 mt-1 opacity-90">
                      {img.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Factual Note */}
        <div className="mt-16 text-center text-xs text-[#8e8779] font-sans border-t border-[rgba(255,255,255,0.06)] pt-8">
          <span>7, Sethi Bhawan, Rajendra Place, New Delhi • Air-Conditioned Royal Seating & Banquet Hall</span>
        </div>
      </section>

      {/* Full-Screen Glass Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#060608]/90 backdrop-blur-2xl animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-[rgba(14,14,18,0.95)] border border-[rgba(218,179,106,0.3)] shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full text-[#8e8779] hover:text-[#f4efe6] bg-[rgba(10,10,14,0.7)] border border-[rgba(255,255,255,0.1)] transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] max-h-[70vh] bg-black">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[rgba(14,14,18,0.95)] border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#c5a059] block mb-1">
                  {lightboxImage.category} • MUGHAL MAHAL
                </span>
                <h3 className="font-display text-xl text-[#f4efe6] uppercase tracking-wide">
                  {lightboxImage.title}
                </h3>
                <p className="text-xs text-[#cfc8bc] font-serif mt-1 max-w-xl">
                  {lightboxImage.description}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[11px] font-sans text-[#8e8779] uppercase block">
                  7, Sethi Bhawan
                </span>
                <span className="text-[11px] font-sans text-[#c5a059] uppercase block font-medium">
                  Rajendra Place, New Delhi
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
