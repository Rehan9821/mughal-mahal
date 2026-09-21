import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Calendar, ShoppingBag, Send, Users, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { restaurantInfo, restaurantContact } from '../data/restaurantData.ts';

interface ContactPageProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenReservation, onOpenOrder }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Table Reservation');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#0a0a0c] pt-28 pb-24 text-[#f4efe6]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16 text-center">
        <span className="text-xs font-sans tracking-[0.25em] text-[#c5a059] uppercase block mb-2 font-medium">
          Location & Inquiries
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4efe6] tracking-tight uppercase">
          Find Mughal Mahal
        </h1>
        <div className="font-hindi text-lg text-[#c5a059] mt-1">
          मुगल महल रेस्टोरेंट • संपर्क एवं स्थान
        </div>
        <p className="mt-4 text-xs sm:text-sm text-[#a69e90] max-w-xl mx-auto font-serif">
          Centrally located in West Delhi at 7, Sethi Bhawan, Rajendra Place. Welcoming guests daily for dine-in, takeaway, and banquets.
        </p>
      </section>

      {/* Main Grid: Details Left, Interactive Form Right */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Left */}
          <div className="lg:col-span-5 space-y-8">
            {/* Address Box */}
            <div className="p-6 bg-[#111116] border border-[#1f1e26] space-y-3">
              <div className="flex items-center gap-2.5 text-[#c5a059]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-display text-base uppercase tracking-wider text-[#f4efe6]">
                  Restaurant Address
                </h3>
              </div>
              <p className="text-sm text-[#cfc8bc] font-serif leading-relaxed">
                <strong className="text-[#f4efe6]">7, Sethi Bhawan</strong>
                <br />
                Rajendra Place, New Delhi
                <br />
                Delhi 110008, India
              </p>
              <div className="pt-2">
                <a
                  href={restaurantInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#c5a059] hover:underline font-sans font-semibold uppercase tracking-wider"
                >
                  Open in Google Maps Application <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Verified Contact Details Card */}
            <div className="p-6 bg-[#111116] border border-[#1f1e26] space-y-4">
              <div className="flex items-center gap-2.5 text-[#c5a059]">
                <Phone className="w-5 h-5" />
                <h3 className="font-display text-base uppercase tracking-wider text-[#f4efe6]">
                  Direct Contact Desk
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {/* Phone */}
                <div className="p-3 bg-[#17171e] border border-[#23222d] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8e8779] block">
                      Front Desk & Reservations
                    </span>
                    <a
                      href={restaurantContact.telLink}
                      className="text-[#f4efe6] hover:text-[#c5a059] font-medium font-sans text-sm transition-colors mt-0.5 block"
                    >
                      {restaurantContact.phone}
                    </a>
                  </div>
                  <a
                    href={restaurantContact.telLink}
                    className="bg-[#c5a059] hover:bg-[#d6af66] text-[#0b0b0e] font-sans font-semibold text-[11px] uppercase tracking-wider px-3 py-1.5 transition-colors"
                  >
                    Call
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="p-3 bg-[#17171e] border border-[#23222d] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8e8779] block">
                      WhatsApp Inquiries
                    </span>
                    <a
                      href={restaurantContact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#52b788] hover:underline font-medium font-sans text-sm transition-colors mt-0.5 block"
                    >
                      {restaurantContact.phone}
                    </a>
                  </div>
                  <a
                    href={restaurantContact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#52b788]/50 hover:bg-[#52b788]/10 text-[#52b788] font-sans font-semibold text-[11px] uppercase tracking-wider px-3 py-1.5 transition-colors flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Chat
                  </a>
                </div>

                {/* Email */}
                <div className="p-3 bg-[#17171e] border border-[#23222d] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8e8779] block">
                      Official Inquiries Email
                    </span>
                    <a
                      href={restaurantContact.mailtoLink}
                      className="text-[#cfc8bc] hover:text-[#c5a059] font-medium font-sans text-xs transition-colors mt-0.5 block break-all"
                    >
                      {restaurantContact.email}
                    </a>
                  </div>
                  <a
                    href={restaurantContact.mailtoLink}
                    className="self-start sm:self-auto border border-[#c5a059]/40 hover:bg-[#c5a059]/10 text-[#c5a059] font-sans font-semibold text-[11px] uppercase tracking-wider px-3 py-1.5 transition-colors flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-6 bg-[#111116] border border-[#1f1e26] space-y-3">
              <div className="flex items-center gap-2.5 text-[#c5a059]">
                <Clock className="w-5 h-5" />
                <h3 className="font-display text-base uppercase tracking-wider text-[#f4efe6]">
                  Hours of Operation
                </h3>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="text-[#f4efe6] font-semibold">
                  Open Every Day: 11:30 AM – 11:30 PM
                </div>
                <div className="text-[#8e8779]">
                  Lunch Session: 11:30 AM – 4:00 PM
                </div>
                <div className="text-[#8e8779]">
                  Dinner Session: 6:30 PM – 11:30 PM
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={onOpenReservation}
                className="bg-[#c5a059] hover:bg-[#d6af66] text-[#0b0b0e] font-sans font-semibold text-xs tracking-wider uppercase py-3 px-4 text-center transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Reserve Table
              </button>
              <button
                onClick={onOpenOrder}
                className="border border-[#c5a059]/50 hover:bg-[#c5a059]/10 text-[#c5a059] font-sans text-xs tracking-wider uppercase py-3 px-4 text-center transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Order Delivery
              </button>
            </div>
          </div>

          {/* Form & Map Right */}
          <div className="lg:col-span-7 space-y-8">
            {/* Embedded Google Map Preview */}
            <div className="border border-[#c5a059]/30 bg-[#121217] overflow-hidden">
              <div className="p-4 bg-[#17161d] border-b border-[#222129] flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#c5a059] font-sans font-semibold">
                    Interactive Map Guide
                  </span>
                  <p className="text-[11px] text-[#8e8779]">
                    Rajendra Place Metro Station & Commercial Complex
                  </p>
                </div>
                <a
                  href={restaurantInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#c5a059] hover:underline flex items-center gap-1 font-sans"
                >
                  Directions <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Iframe */}
              <div className="w-full h-80 bg-[#0e0e11]">
                <iframe
                  title="Mughal Mahal Google Maps Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${restaurantInfo.googleMapsEmbedQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>

            {/* Direct Inquiry / Banquet Form */}
            <div className="p-6 md:p-8 bg-[#111116] border border-[#1f1e26]">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-sans tracking-[0.2em] text-[#c5a059] uppercase block mb-1">
                      Direct Message
                    </span>
                    <h3 className="font-display text-xl text-[#f4efe6] uppercase tracking-wide">
                      Inquire or Contact Management
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8e8779] mb-1 font-sans">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anish Gupta"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-[#18181f] border border-[#2e2d36] focus:border-[#c5a059] text-xs text-[#f4efe6] px-3.5 py-2.5 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8e8779] mb-1 font-sans">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98110 00000"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full bg-[#18181f] border border-[#2e2d36] focus:border-[#c5a059] text-xs text-[#f4efe6] px-3.5 py-2.5 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8e8779] mb-1 font-sans">
                      Inquiry Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-[#18181f] border border-[#2e2d36] focus:border-[#c5a059] text-xs text-[#f4efe6] px-3.5 py-2.5 outline-none transition-colors"
                    >
                      <option value="Table Reservation">Table Reservation (Lunch / Dinner)</option>
                      <option value="Banquet Hall Booking">Banquet Hall Booking (50–300 Guests)</option>
                      <option value="Party & Outdoor Catering">Party / Outdoor Catering</option>
                      <option value="Takeaway / Bulk Order">Takeaway / Bulk Order</option>
                      <option value="General Feedback">General Question or Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8e8779] mb-1 font-sans">
                      Message / Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify your date, estimated party size, or specific dietary requests..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full bg-[#18181f] border border-[#2e2d36] focus:border-[#c5a059] text-xs text-[#f4efe6] px-3.5 py-2.5 outline-none transition-colors placeholder:text-[#555]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#c5a059] hover:bg-[#d6af66] text-[#0b0b0e] font-sans font-semibold text-xs tracking-wider uppercase py-3 px-6 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Inquiry to Front Desk
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#182a1e] text-[#52b788] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl text-[#f4efe6] uppercase">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-[#cfc8bc] font-serif max-w-sm mx-auto">
                    Thank you, <strong className="text-[#f4efe6]">{inquiryName}</strong>. Our front office desk at 7, Sethi Bhawan will contact you on <strong className="text-[#c5a059]">{inquiryPhone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#c5a059] underline font-sans uppercase tracking-wider pt-2"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
