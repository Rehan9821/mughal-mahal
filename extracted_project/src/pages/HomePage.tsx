import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Utensils, ChevronDown } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData.ts';
import { HeroScrollStages } from '../components/HeroScrollStages.tsx';
import { SignatureDishStory } from '../components/SignatureDishStory.tsx';
import { RestaurantExperienceStory } from '../components/RestaurantExperienceStory.tsx';
import { SignatureHighlights } from '../components/SignatureHighlights.tsx';
import { CompactReservationCTA } from '../components/CompactReservationCTA.tsx';

interface HomePageProps {
  navigate: (route: string) => void;
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  navigate,
  onOpenReservation,
  onOpenOrder
}) => {
  return (
    <div id="home-page" className="relative">
      {/* ====================================================
          1. 185-FRAME SCROLL-SCRUBBING HERO EXPERIENCE (320vh)
      ==================================================== */}
      <HeroScrollStages
        navigate={navigate}
        onOpenReservation={onOpenReservation}
        onOpenOrder={onOpenOrder}
      />

      {/* ====================================================
          2. SIGNATURE DISH / CULINARY STORY (Smoothly reveals)
      ==================================================== */}
      <section id="culinary-story" className="py-20 md:py-28 bg-[#07070a] relative z-20 overflow-hidden border-t border-[rgba(218,179,106,0.2)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-sans tracking-[0.3em] text-[#c5a059] uppercase block mb-2 font-semibold">
              The Living Legacy
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#f4efe6] tracking-tight uppercase">
              Culinary Craftsmanship
            </h2>
            <div className="font-hindi text-sm text-[#8e8779] mt-1">
              धीमी आंच और परंपरागत मसाले
            </div>
          </div>

          <SignatureDishStory
            onExploreMenu={() => {
              navigate('/menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenOrder={onOpenOrder}
          />
        </div>
      </section>

      {/* ====================================================
          3. RESTAURANT EXPERIENCE (SHORT & CINEMATIC)
      ==================================================== */}
      <section id="restaurant-experience" className="py-16 md:py-24 bg-[#08080b] relative z-20 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <RestaurantExperienceStory
            onExploreAbout={() => {
              navigate('/about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      {/* ====================================================
          4. 3–4 SIGNATURE HIGHLIGHTS
      ==================================================== */}
      <section id="signature-highlights" className="py-20 md:py-28 bg-[#0a0a0d] relative z-20 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-sans tracking-[0.3em] text-[#c5a059] uppercase block mb-2 font-semibold">
              The Pillar Pillars of Taste
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#f4efe6] tracking-tight uppercase">
              Royal Dining Pillars
            </h2>
            <div className="font-hindi text-sm text-[#8e8779] mt-1">
              हमारी खासियत • मुगलई एवं उत्तर भारतीय परंपरा
            </div>
          </div>

          <SignatureHighlights />
        </div>
      </section>

      {/* ====================================================
          5. COMPACT RESERVATION CTA
      ==================================================== */}
      <section id="reservation-cta-section" className="py-20 md:py-28 bg-[#070709] relative z-20 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <CompactReservationCTA onOpenReservation={onOpenReservation} />
        </div>
      </section>
    </div>
  );
};
