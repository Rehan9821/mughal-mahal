import React from 'react';
import { Calendar, Phone, Clock, Users } from 'lucide-react';
import { restaurantContact } from '../data/restaurantData.ts';

interface CompactReservationCTAProps {
  onOpenReservation: () => void;
}

export const CompactReservationCTA: React.FC<CompactReservationCTAProps> = ({
  onOpenReservation
}) => {
  return (
    <div className="relative rounded-xl overflow-hidden border border-[rgba(218,179,106,0.3)] bg-gradient-to-r from-[rgba(18,18,24,0.9)] via-[rgba(24,24,32,0.85)] to-[rgba(18,18,24,0.9)] backdrop-blur-2xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] text-center max-w-4xl mx-auto">
      {/* Subtle glowing radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 space-y-5">
        <span className="text-[11px] font-sans tracking-[0.3em] text-[#c5a059] uppercase block font-semibold">
          Tables & Large Gatherings
        </span>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#f4efe6] tracking-tight uppercase">
          Reserve Your Table
        </h2>

        <div className="font-hindi text-base text-[#c5a059]">
          मुगल महल में आपका स्वागत है
        </div>

        <p className="text-xs sm:text-sm text-[#d1cbc0] font-serif max-w-xl mx-auto leading-relaxed">
          Plan an evening of Mughlai dining at Mughal Mahal. Seating for intimate dinners, family feasts, and banquets accommodating up to 200–300 guests.
        </p>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="compact-cta-reserve-btn"
            onClick={onOpenReservation}
            className="w-full sm:w-auto bg-[#c5a059] hover:bg-[#d8b46a] text-[#0a0a0c] font-sans font-semibold text-xs tracking-[0.2em] uppercase py-3.5 px-8 rounded transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Reserve a Table
          </button>

          <a
            id="compact-cta-call-btn"
            href={restaurantContact.telLink}
            className="w-full sm:w-auto border border-[rgba(218,179,106,0.5)] hover:border-[#c5a059] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(197,160,89,0.1)] text-[#f4efe6] hover:text-[#c5a059] font-sans font-medium text-xs tracking-[0.2em] uppercase py-3.5 px-8 rounded transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            Call: {restaurantContact.phone}
          </a>
        </div>

        {/* Micro Information Line */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[11px] font-sans text-[#8e8779] uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
            11:30 AM – 11:30 PM
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#c5a059]" />
            Banquets Available
          </span>
          <span>•</span>
          <span>Rajendra Place, New Delhi</span>
        </div>
      </div>
    </div>
  );
};
