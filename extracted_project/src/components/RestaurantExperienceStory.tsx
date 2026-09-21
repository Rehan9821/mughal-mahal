import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Wind, Users } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData.ts';
import { SafeImage } from './SafeImage.tsx';

interface RestaurantExperienceStoryProps {
  onExploreAbout: () => void;
}

export const RestaurantExperienceStory: React.FC<RestaurantExperienceStoryProps> = ({
  onExploreAbout
}) => {
  return (
    <div className="relative rounded-xl overflow-hidden border border-[rgba(218,179,106,0.2)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl p-8 md:p-12 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1.5">
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#c5a059] uppercase block font-semibold">
              The Rajendra Place Experience
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#f4efe6] tracking-tight uppercase leading-snug">
              Tradition Served with
              <br />
              <span className="text-[#c5a059]">Delhi Warmth</span>
            </h2>
            <div className="font-hindi text-sm text-[#8e8779]">
              स्वाद और आतिथ्य का संगम • 7, सेठी भवन
            </div>
          </div>

          <p className="text-sm text-[#cfc8bc] font-serif leading-relaxed">
            Centrally anchored at <strong className="text-[#f4efe6]">7, Sethi Bhawan</strong>, Mughal Mahal offers an authentic haven from the bustling corridors of Rajendra Place. Our spacious dining halls blend traditional royal hospitality with modern dining comfort.
          </p>

          {/* 4 Concise Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex items-center gap-2.5 text-xs text-[#cfc8bc]">
              <Wind className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Full Air Conditioning</span>
            </div>
            <div className="p-3 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex items-center gap-2.5 text-xs text-[#cfc8bc]">
              <Users className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Banquets (200–300 Guests)</span>
            </div>
            <div className="p-3 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex items-center gap-2.5 text-xs text-[#cfc8bc]">
              <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Wheelchair Accessible</span>
            </div>
            <div className="p-3 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex items-center gap-2.5 text-xs text-[#cfc8bc]">
              <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Live Evening Melodies</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onExploreAbout}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#c5a059] hover:text-[#f4efe6] transition-colors"
            >
              Learn More About Our Heritage <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Photo Framing */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-lg overflow-hidden border border-[rgba(218,179,106,0.25)] bg-[#111116] p-2 shadow-2xl">
            <SafeImage
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
              alt="Mughal Mahal Dining Hall"
              aspectRatio="aspect-[4/3]"
              className="w-full object-cover rounded"
            />
          </div>

          <div className="mt-3 text-center">
            <span className="text-[11px] font-sans tracking-widest text-[#8e8779] uppercase">
              7, Sethi Bhawan, Rajendra Place • 11:30 AM – 11:30 PM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
