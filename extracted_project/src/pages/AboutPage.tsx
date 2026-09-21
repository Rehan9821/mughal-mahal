import React from 'react';
import { MapPin, Users, Utensils, Music, ShieldCheck, Heart, Sparkles, Award, Phone, Mail } from 'lucide-react';
import { restaurantInfo, restaurantContact } from '../data/restaurantData.ts';
import { SafeImage } from '../components/SafeImage.tsx';

interface AboutPageProps {
  onOpenReservation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenReservation }) => {
  return (
    <div id="about-page" className="min-h-screen bg-[#0a0a0c] pt-28 pb-24 text-[#f4efe6]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16 text-center">
        <span className="text-xs font-sans tracking-[0.25em] text-[#c5a059] uppercase block mb-2 font-medium">
          Heritage & Ethos
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4efe6] tracking-tight uppercase">
          The Mughal Mahal Story
        </h1>
        <div className="font-hindi text-lg text-[#c5a059] mt-1">
          मुगल महल रेस्टोरेंट • हमारी पहचान
        </div>
        <p className="mt-4 text-xs sm:text-sm text-[#a69e90] max-w-2xl mx-auto font-serif">
          Located at 7, Sethi Bhawan in the historic commercial hub of Rajendra Place, New Delhi.
          A dedicated sanctuary for genuine Mughlai gastronomy and warm North Indian hospitality.
        </p>
      </section>

      {/* Main Narrative with Large Imagery */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Large Editorial Photo */}
          <div className="lg:col-span-7">
            <div className="relative border border-[#c5a059]/30 p-2 bg-[#121216]">
              <SafeImage
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80"
                alt="Dining Hall at Mughal Mahal"
                aspectRatio="aspect-[16/11]"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Narrative Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-sans tracking-[0.2em] text-[#c5a059] uppercase font-semibold">
                The Philosophy
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#f4efe6] uppercase tracking-wide">
                Uncompromising North Indian Tradition
              </h2>
            </div>

            <p className="text-sm text-[#cfc8bc] font-serif leading-relaxed">
              At Mughal Mahal, North Indian cuisine is treated not as a fleeting culinary trend, but as an enduring craft rooted in patience and deep respect for Indian spices.
            </p>
            <p className="text-sm text-[#cfc8bc] font-serif leading-relaxed">
              Our gravies are never rushed. The iconic Murg Makhani is simmered slowly with ripe tomatoes, churned butter, and fragrant kasoori methi, producing that signature velvety profile that diners from all across Delhi travel to experience.
            </p>
            <p className="text-sm text-[#cfc8bc] font-serif leading-relaxed">
              Complementing our curries is the raw power of the charcoal clay tandoor. From crisp butter naans slapped against blistering earthen walls to skewered seekh kebabs and whole spring chickens infused with charcoal smoke, each dish delivers authentic depth.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars of Experience */}
      <section className="py-20 bg-[#0e0e12] border-y border-[#1c1b24] mb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans tracking-[0.25em] text-[#c5a059] uppercase block mb-2 font-medium">
              The Dining Hall
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#f4efe6] tracking-tight uppercase">
              Hospitality & Atmosphere
            </h2>
            <div className="font-hindi text-[#8e8779] text-sm mt-1">
              आतिथ्य सत्कार और पारिवारिक माहौल
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 bg-[#131218] border border-[#222129] hover:border-[#c5a059]/30 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-[#f4efe6] uppercase">
                Heritage Mughlai Kitchen
              </h3>
              <p className="text-xs text-[#a69e90] font-serif leading-relaxed">
                Authentic recipes centered on slow-braised handis, aromatic whole spices, and rich buttery reductions without modern compromises or artificial flavors.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 bg-[#131218] border border-[#222129] hover:border-[#c5a059]/30 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-[#f4efe6] uppercase">
                Family & Banquet Comfort
              </h3>
              <p className="text-xs text-[#a69e90] font-serif leading-relaxed">
                Comfortable air-conditioned dining halls built to host both intimate tables for two and large celebrations of up to 200–300 guests with seamless banquet coordination.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 bg-[#131218] border border-[#222129] hover:border-[#c5a059]/30 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-[#f4efe6] uppercase">
                Prime Rajendra Place Hub
              </h3>
              <p className="text-xs text-[#a69e90] font-serif leading-relaxed">
                Conveniently positioned at 7, Sethi Bhawan, easily accessible from Central, West, and North Delhi, with wheelchair access and commercial complex parking amenities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Facts & Atmosphere Table */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 mb-20">
        <div className="border border-[#c5a059]/30 bg-[#111116] p-8 md:p-12 space-y-8">
          <div>
            <span className="text-xs font-sans tracking-[0.25em] text-[#c5a059] uppercase block mb-1 font-semibold">
              Verified Specifications
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#f4efe6] uppercase">
              Establishment Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs divide-y md:divide-y-0 md:divide-x divide-[#222129]">
            <div className="space-y-4 pr-0 md:pr-6">
              <div className="flex justify-between py-2 border-b border-[#1f1e26]">
                <span className="text-[#8e8779]">Official Name</span>
                <span className="text-[#f4efe6] font-medium text-right">Mughal Mahal Restaurant (मुगल महल)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1f1e26]">
                <span className="text-[#8e8779]">Exact Address</span>
                <span className="text-[#f4efe6] font-medium text-right">7, Sethi Bhawan, Rajendra Place, New Delhi</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1f1e26]">
                <span className="text-[#8e8779]">Primary Cuisine</span>
                <span className="text-[#f4efe6] font-medium text-right">Mughlai, North Indian, Tandoori</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1f1e26]">
                <span className="text-[#8e8779]">Cost for Two</span>
                <span className="text-[#c5a059] font-medium text-right">₹1,100 – ₹1,400 approx.</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1f1e26]">
                <span className="text-[#8e8779]">Desk Contact</span>
                <a href={restaurantContact.telLink} className="text-[#c5a059] hover:underline font-medium text-right">
                  {restaurantContact.phone}
                </a>
              </div>
            </div>

            <div className="space-y-4 pt-4 md:pt-0 pl-0 md:pl-6">
              <div className="flex justify-between py-2 border-b border-[#1f1e26]">
                <span className="text-[#8e8779]">Guest Capacity</span>
                <span className="text-[#f4efe6] font-medium text-right">200 Seated / Up to 300 Standing</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1f1e26]">
                <span className="text-[#8e8779]">Accessibility</span>
                <span className="text-[#f4efe6] font-medium text-right">Wheelchair Accessible Entrance & Seating</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1f1e26]">
                <span className="text-[#8e8779]">Operating Hours</span>
                <span className="text-[#f4efe6] font-medium text-right">11:30 AM – 11:30 PM (All 7 Days)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1f1e26]">
                <span className="text-[#8e8779]">Official Email</span>
                <a href={restaurantContact.mailtoLink} className="text-[#c5a059] hover:underline font-medium text-right break-all">
                  {restaurantContact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={onOpenReservation}
              className="bg-[#c5a059] hover:bg-[#d6af66] text-[#0b0b0e] font-sans font-semibold text-xs tracking-[0.2em] uppercase py-3.5 px-8 transition-colors"
            >
              Reserve a Table Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
