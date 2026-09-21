import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, X } from 'lucide-react';
import { restaurantContact } from '../data/restaurantData.ts';

export const FloatingContact: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id="floating-contact-container" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Contact Menu */}
      {isExpanded && (
        <div className="mb-3 bg-[#111116] border border-[#c5a059]/40 p-3 shadow-2xl space-y-2 text-xs w-64 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#222129]">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
              Direct Assistance
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#888] hover:text-[#f4efe6] transition-colors p-1"
              aria-label="Close contact menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Call */}
          <a
            id="floating-call-btn"
            href={restaurantContact.telLink}
            className="flex items-center gap-2.5 p-2 bg-[#181820] hover:bg-[#23222d] border border-[#2a2935] text-[#f4efe6] hover:text-[#c5a059] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-[#8e8779] uppercase block font-sans">Front Desk</span>
              <span className="font-medium text-xs truncate block">{restaurantContact.phone}</span>
            </div>
          </a>

          {/* Quick WhatsApp */}
          <a
            id="floating-whatsapp-btn"
            href={restaurantContact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 bg-[#181820] hover:bg-[#23222d] border border-[#2a2935] text-[#f4efe6] hover:text-[#52b788] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#52b788]/20 text-[#52b788] flex items-center justify-center shrink-0">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-[#8e8779] uppercase block font-sans">WhatsApp Desk</span>
              <span className="font-medium text-xs truncate block">{restaurantContact.phone}</span>
            </div>
          </a>

          {/* Quick Email */}
          <a
            id="floating-email-btn"
            href={restaurantContact.mailtoLink}
            className="flex items-center gap-2.5 p-2 bg-[#181820] hover:bg-[#23222d] border border-[#2a2935] text-[#f4efe6] hover:text-[#c5a059] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center shrink-0">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-[#8e8779] uppercase block font-sans">Official Email</span>
              <span className="font-medium text-[11px] truncate block break-all">{restaurantContact.email}</span>
            </div>
          </a>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="floating-contact-trigger-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex items-center gap-2 bg-[#0d0d10] border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#0b0b0e] px-4 py-2.5 shadow-xl transition-all duration-300"
        aria-label="Toggle contact channels"
      >
        <div className="relative">
          <Phone className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#52b788] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#52b788] rounded-full" />
        </div>
        <span className="font-sans text-xs uppercase tracking-wider font-semibold">
          {isExpanded ? 'Close' : 'Desk & Help'}
        </span>
      </button>
    </div>
  );
};
