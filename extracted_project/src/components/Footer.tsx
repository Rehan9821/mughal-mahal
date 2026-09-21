import React from 'react';
import { MapPin, Phone, Clock, Star, ExternalLink, Mail, MessageCircle } from 'lucide-react';
import { restaurantInfo, restaurantContact } from '../data/restaurantData.ts';
import { MughalLogo } from './MughalLogo.tsx';

interface FooterProps {
  navigate: (route: string) => void;
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, onOpenReservation, onOpenOrder }) => {
  return (
    <footer id="main-footer" className="bg-[#060608] border-t border-[rgba(218,179,106,0.2)] text-[#d8d2c6] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[rgba(255,255,255,0.06)]">
          {/* Col 1: Identity & Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MughalLogo size={44} glow={true} className="shrink-0" />
              <div>
                <span className="font-display text-lg md:text-xl font-bold tracking-[0.24em] text-[#f4efe6] uppercase block">
                  Mughal Mahal
                </span>
                <span className="font-hindi text-sm text-[#c5a059] block mt-0.5">
                  मुगल महल रेस्टोरेंट
                </span>
              </div>
            </div>
            <span className="text-[11px] font-sans tracking-[0.2em] text-[#8e8779] uppercase block">
              7, Sethi Bhawan • Rajendra Place
            </span>

            <p className="text-xs text-[#b5ada0] leading-relaxed font-serif">
              An enduring dining destination in Central West Delhi, dedicated to authentic Mughlai handi curries, charcoal-blistered kebabs, and time-honored North Indian recipes.
            </p>

            {/* Verified Google Badge */}
            <div className="p-3.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(218,179,106,0.25)] flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(197,160,89,0.12)] text-[#c5a059]">
                <Star className="w-4 h-4 fill-[#c5a059]" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-[#f4efe6] flex items-center gap-1.5 font-sans">
                  <span>3.9 / 5.0 Rating</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#1b2b1d] text-[#63d471] rounded-sm font-sans">
                    Verified
                  </span>
                </div>
                <div className="text-[#8e8779] text-[11px]">Based on 1,142+ Google Reviews</div>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans tracking-[0.25em] uppercase text-[#c5a059] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { navigate('/menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#cfc8bc] hover:text-[#c5a059] transition-colors"
                >
                  Culinary Menu & Specialties
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('/about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#cfc8bc] hover:text-[#c5a059] transition-colors"
                >
                  Heritage & Delhi Legacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('/gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#cfc8bc] hover:text-[#c5a059] transition-colors"
                >
                  Atmosphere & Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('/reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#cfc8bc] hover:text-[#c5a059] transition-colors"
                >
                  Guest Experiences & Google Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#cfc8bc] hover:text-[#c5a059] transition-colors"
                >
                  Location, Map & Inquiries
                </button>
              </li>
            </ul>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenReservation}
                className="text-left text-xs text-[#c5a059] hover:text-[#f4efe6] font-medium uppercase tracking-wider transition-colors"
              >
                + Book Table or Banquet Hall
              </button>
              <button
                onClick={onOpenOrder}
                className="text-left text-xs text-[#c5a059] hover:text-[#f4efe6] font-medium uppercase tracking-wider transition-colors"
              >
                + Order Online (Swiggy / Zomato)
              </button>
            </div>
          </div>

          {/* Col 3: Hours & Dining */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans tracking-[0.25em] uppercase text-[#c5a059] font-semibold">
              Timings & Service
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#f4efe6]">Open 7 Days a Week</div>
                  <div className="text-[#a69e90]">11:30 AM – 11:30 PM Continuous</div>
                </div>
              </div>

              <div className="pl-6 text-[11px] text-[#8e8779] space-y-1">
                <div>Lunch: 11:30 AM – 4:00 PM</div>
                <div>Dinner: 6:30 PM – 11:30 PM</div>
              </div>

              <div className="pt-2 text-xs text-[#a69e90]">
                <strong className="text-[#f4efe6]">Services:</strong> Dine-in, Takeaway parcel counter, banquet hosting (up to 300 guests).
              </div>
            </div>
          </div>

          {/* Col 4: Verified Location & Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans tracking-[0.25em] uppercase text-[#c5a059] font-semibold">
              Location & Contact
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#f4efe6] block font-medium">
                    7, Sethi Bhawan
                  </span>
                  <span className="text-[#a69e90] block">
                    Rajendra Place, New Delhi, Delhi 110008
                  </span>
                  <a
                    href={restaurantInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#c5a059] hover:underline mt-1"
                  >
                    Open Google Maps Profile <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2.5 pt-2">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#8e8779] uppercase font-sans tracking-wider block">Desk & Bookings</span>
                  <a
                    href={restaurantContact.telLink}
                    className="block text-[#f4efe6] hover:text-[#c5a059] transition-colors font-medium text-xs font-sans"
                  >
                    {restaurantContact.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#52b788] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#8e8779] uppercase font-sans tracking-wider block">WhatsApp Connect</span>
                  <a
                    href={restaurantContact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#52b788] hover:underline transition-colors font-medium text-xs font-sans"
                  >
                    {restaurantContact.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#8e8779] uppercase font-sans tracking-wider block">Official Email</span>
                  <a
                    href={restaurantContact.mailtoLink}
                    className="block text-[#cfc8bc] hover:text-[#c5a059] transition-colors text-xs break-all"
                  >
                    {restaurantContact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#787266] gap-4">
          <div>
            © {new Date().getFullYear()} Mughal Mahal Restaurant (मुगल महल रेस्टोरेंट). 7, Sethi Bhawan, Rajendra Place, New Delhi. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Authentic Mughlai & North Indian Heritage</span>
            <span className="hidden sm:inline">•</span>
            <a
              href={restaurantInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] hover:underline flex items-center gap-1"
            >
              Google Maps Listing <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
