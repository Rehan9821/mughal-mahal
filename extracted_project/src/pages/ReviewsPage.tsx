import React from 'react';
import { Star, ExternalLink, CheckCircle2, MessageSquareQuote, ShieldCheck, ThumbsUp } from 'lucide-react';
import { restaurantInfo, reviews } from '../data/restaurantData.ts';

export const ReviewsPage: React.FC = () => {
  return (
    <div id="reviews-page" className="min-h-screen bg-[#0a0a0c] pt-28 pb-24 text-[#f4efe6]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16 text-center">
        <span className="text-xs font-sans tracking-[0.25em] text-[#c5a059] uppercase block mb-2 font-medium">
          Verified Guest Feedback
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4efe6] tracking-tight uppercase">
          Google Maps Reviews
        </h1>
        <div className="font-hindi text-lg text-[#c5a059] mt-1">
          मुगल महल रेस्टोरेंट • अतिथियों की प्रतिक्रियाएं
        </div>
        <p className="mt-4 text-xs sm:text-sm text-[#a69e90] max-w-xl mx-auto font-serif">
          Direct experiences and verified reviews from diners who visited Mughal Mahal at 7, Sethi Bhawan, Rajendra Place, New Delhi.
        </p>
      </section>

      {/* Verified Google Maps Rating Hero Card */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 mb-20">
        <div className="p-8 md:p-12 bg-[#111116] border border-[#c5a059]/30 text-center relative overflow-hidden">
          {/* Watermark Logo */}
          <div className="absolute -right-8 -bottom-8 opacity-5 select-none pointer-events-none text-9xl font-display">
            MM
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#182a1d] text-[#52b788] text-xs font-sans rounded-full mb-4 border border-[#2d6a3f]/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Google Maps Listing</span>
          </div>

          <div className="flex items-baseline justify-center gap-2">
            <span className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-[#f4efe6]">
              {restaurantInfo.rating}
            </span>
            <span className="text-xl sm:text-2xl text-[#8e8779] font-serif">/ 5.0</span>
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-2 my-4 text-[#c5a059]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < 4 ? 'fill-[#c5a059]' : 'fill-[#c5a059]/40'
                }`}
              />
            ))}
          </div>

          <p className="text-xs sm:text-sm text-[#cfc8bc] font-serif">
            Based on <strong className="text-[#f4efe6]">{restaurantInfo.reviewCount.toLocaleString()}+ verified reviews</strong> on Google Maps for the Rajendra Place location.
          </p>

          <div className="mt-6 pt-6 border-t border-[#222129] flex flex-wrap items-center justify-center gap-6 text-xs text-[#a69e90]">
            <div>
              <span className="text-[#f4efe6] font-semibold">Most Praised Dishes:</span> Butter Chicken, Dal Makhani, Fish Tikka, Tandoori Chicken, Keema Kulcha
            </div>
            <div>•</div>
            <a
              href={restaurantInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] hover:underline flex items-center gap-1 font-sans"
            >
              Verify on Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Editorial Reviews Presentation */}
      <section className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="space-y-8">
          {reviews.map((rev, index) => (
            <div
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="p-6 md:p-8 bg-[#111116] border border-[#1f1e26] hover:border-[#c5a059]/30 transition-colors relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f1e26] pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#181820] border border-[#c5a059]/30 flex items-center justify-center font-display text-sm text-[#c5a059]">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-sm text-[#f4efe6]">
                      {rev.author}
                    </h3>
                    <span className="text-[11px] text-[#8e8779] block">
                      {rev.role} • {rev.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {rev.highlightDish && (
                    <span className="text-[10px] px-2.5 py-1 bg-[#17161f] border border-[#c5a059]/20 text-[#c5a059] font-sans uppercase tracking-wider">
                      Highlighted: {rev.highlightDish}
                    </span>
                  )}

                  <div className="flex items-center gap-1 text-[#c5a059]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c5a059]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Snippet Text */}
              <div className="relative pl-6">
                <MessageSquareQuote className="w-4 h-4 text-[#c5a059]/40 absolute left-0 top-0.5" />
                <p className="font-serif text-sm sm:text-base text-[#cfc8bc] leading-relaxed italic">
                  "{rev.snippet}"
                </p>
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between text-[10px] text-[#787266] uppercase tracking-wider font-sans border-t border-[#17161d]">
                <span>Source: {rev.source} Verified Listing</span>
                <span>Location: 7, Sethi Bhawan, Rajendra Place</span>
              </div>
            </div>
          ))}
        </div>

        {/* View on Google Maps Link Button */}
        <div className="mt-16 text-center">
          <a
            href={restaurantInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#181820] hover:bg-[#20202a] border border-[#c5a059]/40 text-[#c5a059] font-sans font-semibold text-xs tracking-widest uppercase py-3.5 px-8 transition-colors"
          >
            <span>Read All 1,142+ Reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};
