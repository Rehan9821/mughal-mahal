import React from 'react';
import { UtensilsCrossed, Sparkles, Flame, Crown } from 'lucide-react';

interface HighlightItem {
  id: string;
  title: string;
  hindiTitle: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentDetail: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'mughlai-heritage',
    title: 'Mughlai Cuisine',
    hindiTitle: 'शाही मुगलई स्वाद',
    subtitle: 'Slow Handi Simmering',
    description: 'Centuries-old recipes prepared with whole stone-ground masalas, creamy reductions, and unhurried simmering over mild embers.',
    icon: Crown,
    accentDetail: '4-Hour Makhani Simmer'
  },
  {
    id: 'north-indian-classics',
    title: 'North Indian Classics',
    hindiTitle: 'पारंपरिक व्यंजन',
    subtitle: 'Delhi Culinary Heritage',
    description: 'Iconic Delhi staples including creamy slow-simmered Dal Makhani, Paneer Lababdar, rich kormas, and aromatic dum-cooked basmati rice.',
    icon: UtensilsCrossed,
    accentDetail: 'Rich Butter Reductions'
  },
  {
    id: 'tandoor-specialties',
    title: 'Tandoor Specialties',
    hindiTitle: 'धधकते तंदूर की करामात',
    subtitle: 'Clay Oven Roasting',
    description: 'Prime marinated chicken and artisanal paneer charred over red-hot charcoal, alongside hand-stretched rotis, naans, and kulchas.',
    icon: Flame,
    accentDetail: 'Live Charcoal Hearth'
  },
  {
    id: 'royal-dining',
    title: 'Royal Dining Atmosphere',
    hindiTitle: 'शाही बैठक व आदर-सत्कार',
    subtitle: 'Comfort & Banquets',
    description: 'Air-conditioned dining halls at 7, Sethi Bhawan welcoming family dinners, corporate luncheons, and celebratory banquets up to 300 guests.',
    icon: Sparkles,
    accentDetail: 'Banquets for 200–300'
  }
];

export const SignatureHighlights: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {HIGHLIGHTS.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            id={`highlight-${item.id}`}
            className="group relative p-7 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(218,179,106,0.18)] hover:border-[rgba(218,179,106,0.45)] backdrop-blur-xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_12px_40px_-10px_rgba(197,160,89,0.15)]"
          >
            {/* Ambient inner soft glow */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[rgba(197,160,89,0.04)] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              {/* Icon badge */}
              <div className="w-12 h-12 rounded-lg bg-[rgba(197,160,89,0.08)] border border-[rgba(197,160,89,0.3)] flex items-center justify-center text-[#c5a059] group-hover:scale-110 transition-transform duration-300 mb-6">
                <Icon className="w-6 h-6" />
              </div>

              {/* Subtitle / Category */}
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#c5a059] uppercase block font-semibold mb-1">
                {item.subtitle}
              </span>

              {/* Title & Hindi */}
              <h3 className="font-display text-xl text-[#f4efe6] tracking-wide uppercase leading-snug group-hover:text-[#c5a059] transition-colors">
                {item.title}
              </h3>
              <div className="font-hindi text-xs text-[#8e8779] mt-0.5 mb-3">
                {item.hindiTitle}
              </div>

              {/* Description */}
              <p className="text-xs text-[#c9c3b6] font-serif leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom Accent */}
            <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <span className="text-[10px] tracking-wider font-sans text-[#8e8779] uppercase">
                {item.accentDetail}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
