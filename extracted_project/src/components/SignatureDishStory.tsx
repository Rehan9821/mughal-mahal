import React from 'react';
import { ArrowRight, Utensils, Sparkles } from 'lucide-react';
import { signatureDishes } from '../data/restaurantData.ts';
import { SafeImage } from './SafeImage.tsx';

interface SignatureDishStoryProps {
  onExploreMenu: () => void;
  onOpenOrder: () => void;
}

export const SignatureDishStory: React.FC<SignatureDishStoryProps> = ({
  onExploreMenu,
  onOpenOrder
}) => {
  // Focus on the verified iconic dish: Murg Makhani (Butter Chicken)
  const heroDish = signatureDishes.find(d => d.id === 'murg-makhani') || signatureDishes[0];
  const secondaryDish = signatureDishes.find(d => d.id === 'mughal-dal-makhani') || signatureDishes[1];

  return (
    <div className="space-y-12">
      {/* Primary Hero Showcase: Murg Makhani */}
      <div className="relative rounded-xl overflow-hidden border border-[rgba(218,179,106,0.22)] bg-[rgba(255,255,255,0.03)] backdrop-blur-xl p-6 md:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Dish Image with Glass Overlay */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-lg overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#0d0d10]">
              <SafeImage
                src={heroDish.imageUrl}
                alt={heroDish.name}
                aspectRatio="aspect-[16/10]"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-transparent to-transparent opacity-60" />

              {/* Glass Tag Bottom Left */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[rgba(12,12,16,0.85)] border border-[rgba(218,179,106,0.3)] backdrop-blur-md px-4 py-2.5 rounded flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-sans tracking-[0.2em] text-[#c5a059] uppercase block font-semibold">
                    The Delhi Icon
                  </span>
                  <span className="font-display text-sm text-[#f4efe6] uppercase">
                    {heroDish.englishTitle}
                  </span>
                </div>
                <span className="font-display text-base text-[#c5a059] font-bold">
                  ₹{heroDish.price}
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[rgba(197,160,89,0.1)] border border-[rgba(197,160,89,0.3)] text-[#c5a059] text-[11px] font-sans tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Imperial Signature Dish</span>
            </div>

            <div>
              <h3 className="font-display text-3xl sm:text-4xl text-[#f4efe6] tracking-tight uppercase leading-none">
                {heroDish.name}
              </h3>
              <div className="font-hindi text-lg text-[#c5a059] mt-1">
                {heroDish.hindiName}
              </div>
              <p className="text-xs uppercase tracking-wider text-[#8e8779] font-sans mt-0.5">
                {heroDish.category}
              </p>
            </div>

            <p className="text-sm text-[#cfc8bc] font-serif leading-relaxed">
              {heroDish.description}
            </p>

            {/* Tasting Notes Pill */}
            <div className="p-3.5 rounded bg-[rgba(255,255,255,0.02)] border-l-2 border-[#c5a059] border-y border-r border-[rgba(255,255,255,0.04)] text-xs text-[#d1cbc0] italic">
              "{heroDish.tastingNote}"
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#c5a059] hover:text-[#f4efe6] transition-colors"
              >
                View Full Menu <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenOrder}
                className="text-xs uppercase tracking-wider text-[#a89f91] hover:text-[#c5a059] transition-colors border-b border-dashed border-[#8e8779] pb-0.5"
              >
                Order for Takeaway
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Companion Feature: Mughal Dal Makhani */}
      {secondaryDish && (
        <div className="p-6 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-md overflow-hidden shrink-0 border border-[rgba(218,179,106,0.3)] bg-[#0d0d10]">
              <SafeImage
                src={secondaryDish.imageUrl}
                alt={secondaryDish.name}
                aspectRatio="aspect-square"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2d6a3f]" title="Vegetarian" />
                <h4 className="font-display text-base text-[#f4efe6] uppercase tracking-wide">
                  {secondaryDish.name}
                </h4>
                <span className="font-hindi text-xs text-[#c5a059]">
                  {secondaryDish.hindiName}
                </span>
              </div>
              <p className="text-xs text-[#9d9588] font-serif line-clamp-1 max-w-xl mt-0.5">
                {secondaryDish.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
            <span className="font-display text-base text-[#c5a059] font-bold">
              ₹{secondaryDish.price}
            </span>
            <button
              onClick={onExploreMenu}
              className="text-[11px] font-sans uppercase tracking-widest text-[#f4efe6] hover:text-[#c5a059] px-3.5 py-1.5 rounded border border-[rgba(255,255,255,0.12)] hover:border-[#c5a059] transition-all"
            >
              Explore Dish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
