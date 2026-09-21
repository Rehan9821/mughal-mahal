import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Phone,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Utensils,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { restaurantInfo, restaurantContact } from '../data/restaurantData.ts';
import { MughalLogo } from './MughalLogo.tsx';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OCCASIONS = [
  'Regular Dining',
  'Family Gathering',
  'Birthday',
  'Anniversary',
  'Business Dinner',
  'Other'
];

const PREFERENCES = [
  'Indoor Seating',
  'Quiet Table',
  'Family Seating',
  'No Preference'
];

const LUNCH_SLOTS = ['11:30 AM', '12:15 PM', '01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM'];
const DINNER_SLOTS = ['06:30 PM', '07:15 PM', '08:00 PM', '08:45 PM', '09:30 PM', '10:15 PM', '11:00 PM'];

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('07:30 PM');
  const [mealPeriod, setMealPeriod] = useState<'DINNER' | 'LUNCH'>('DINNER');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [occasion, setOccasion] = useState<string>('Regular Dining');
  const [preference, setPreference] = useState<string>('Indoor Seating');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Reset states upon close
  const handleClose = () => {
    setIsRedirecting(false);
    setCurrentStep(1);
    onClose();
  };

  const handleContinueToReservation = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      // Direct user to the restaurant's actual reservation destination (verified phone reservation desk)
      window.location.href = restaurantContact.telLink;
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
          {/* Deep blurred backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#060608]/85 backdrop-blur-xl"
          />

          {/* Luxury Centered Glass Reservation Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-2xl bg-[rgba(14,14,18,0.92)] border border-[rgba(218,179,106,0.3)] shadow-[0_25px_80px_rgba(0,0,0,0.8)] p-6 sm:p-8 md:p-10 text-[#f4efe6] overflow-y-auto max-h-[92vh] backdrop-blur-2xl"
          >
            {/* Close Button */}
            <button
              id="close-reservation-modal"
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#8e8779] hover:text-[#f4efe6] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)] transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8 flex flex-col items-center">
              <MughalLogo size={56} glow={true} className="mb-3" />
              <span className="text-[10px] font-sans tracking-[0.3em] text-[#c5a059] uppercase block mb-1 font-semibold">
                Table & Banquet Planning
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#f4efe6] tracking-tight uppercase">
                RESERVE YOUR TABLE
              </h2>
              <p className="font-hindi text-[#c5a059] text-sm mt-0.5">
                मुगल महल रेस्टोरेंट • राजेंद्र प्लेस
              </p>
              <p className="text-xs text-[#cfc8bc] font-serif mt-2 max-w-md mx-auto italic">
                "Plan an evening of Mughlai dining at Mughal Mahal."
              </p>
            </div>

            {/* Step Progress Tracker with Gold Line */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-[10px] font-sans tracking-widest uppercase text-[#8e8779] mb-2 px-1">
                <span className={currentStep >= 1 ? 'text-[#c5a059] font-semibold' : ''}>1. Schedule</span>
                <span className={currentStep >= 2 ? 'text-[#c5a059] font-semibold' : ''}>2. Party</span>
                <span className={currentStep >= 3 ? 'text-[#c5a059] font-semibold' : ''}>3. Details</span>
                <span className={currentStep >= 4 ? 'text-[#c5a059] font-semibold' : ''}>4. Summary</span>
              </div>
              <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#c5a059] to-[#dfba6e] transition-all duration-400 ease-out"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Multi-Step Content */}
            <div>
              {/* ====================================================
                  STEP 1: DATE & TIME
              ==================================================== */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {/* STEP 1: Date Selection */}
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#c5a059] mb-2 font-medium">
                      Step 1 — Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(218,179,106,0.3)] focus:border-[#c5a059] rounded-lg p-3 text-sm text-[#f4efe6] outline-none transition-colors"
                    />
                  </div>

                  {/* STEP 2: Time Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#c5a059] font-medium">
                        Step 2 — Select Dining Time
                      </label>
                      {/* Lunch / Dinner Tabs */}
                      <div className="flex rounded-md p-0.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]">
                        <button
                          type="button"
                          onClick={() => setMealPeriod('LUNCH')}
                          className={`text-[10px] font-sans uppercase tracking-wider px-3 py-1 rounded transition-colors ${
                            mealPeriod === 'LUNCH'
                              ? 'bg-[#c5a059] text-[#0a0a0c] font-semibold'
                              : 'text-[#8e8779] hover:text-[#f4efe6]'
                          }`}
                        >
                          Lunch
                        </button>
                        <button
                          type="button"
                          onClick={() => setMealPeriod('DINNER')}
                          className={`text-[10px] font-sans uppercase tracking-wider px-3 py-1 rounded transition-colors ${
                            mealPeriod === 'DINNER'
                              ? 'bg-[#c5a059] text-[#0a0a0c] font-semibold'
                              : 'text-[#8e8779] hover:text-[#f4efe6]'
                          }`}
                        >
                          Dinner
                        </button>
                      </div>
                    </div>

                    {/* Time Slots Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {(mealPeriod === 'LUNCH' ? LUNCH_SLOTS : DINNER_SLOTS).map((slot) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2 px-3 rounded text-xs font-sans tracking-wider uppercase transition-all ${
                              isSelected
                                ? 'bg-[#c5a059] text-[#0a0a0c] font-semibold shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                                : 'bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#d4cebe]'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-[#c5a059] hover:bg-[#d8b46a] text-[#0a0a0c] font-sans font-semibold text-xs tracking-widest uppercase py-3 px-6 rounded transition-all flex items-center gap-2"
                    >
                      <span>Continue to Party Size</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ====================================================
                  STEP 2: GUESTS, OCCASION & PREFERENCES
              ==================================================== */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {/* STEP 3: Guests Selector (− 2 +) */}
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#c5a059] mb-2 font-medium">
                      Step 3 — Number of Guests
                    </label>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(218,179,106,0.3)] max-w-xs">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-10 h-10 rounded bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(197,160,89,0.2)] text-lg font-serif text-[#c5a059] flex items-center justify-center transition-colors"
                      >
                        −
                      </button>
                      <div className="text-center">
                        <span className="font-display text-2xl text-[#f4efe6] font-bold">
                          {guestCount}
                        </span>
                        <span className="text-[10px] text-[#8e8779] block uppercase tracking-wider font-sans">
                          {guestCount === 1 ? 'Guest' : 'Guests'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.min(30, guestCount + 1))}
                        className="w-10 h-10 rounded bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(197,160,89,0.2)] text-lg font-serif text-[#c5a059] flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                    {guestCount >= 8 && (
                      <p className="text-[11px] text-[#c5a059] font-sans mt-2">
                        For large groups and banquets exceeding 15 guests, our Sethi Bhawan banquet hall is available.
                      </p>
                    )}
                  </div>

                  {/* STEP 4: Occasion (Optional) */}
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#c5a059] mb-2 font-medium">
                      Step 4 — Occasion (Optional)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {OCCASIONS.map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setOccasion(occ)}
                          className={`p-2.5 rounded text-xs font-sans tracking-wide text-left transition-all ${
                            occasion === occ
                              ? 'bg-[#c5a059] text-[#0a0a0c] font-semibold'
                              : 'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] text-[#d4cebe] hover:bg-[rgba(255,255,255,0.05)]'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* STEP 5: Preference (Optional) */}
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#c5a059] mb-2 font-medium">
                      Step 5 — Seating Preference (Optional)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PREFERENCES.map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setPreference(pref)}
                          className={`p-2.5 rounded text-xs font-sans tracking-wide text-left transition-all ${
                            preference === pref
                              ? 'bg-[#c5a059] text-[#0a0a0c] font-semibold'
                              : 'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] text-[#d4cebe] hover:bg-[rgba(255,255,255,0.05)]'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-[#8e8779] block mt-1.5 font-sans">
                      * Seating preferences are accommodated subject to floor availability upon arrival.
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-[#8e8779] hover:text-[#f4efe6] font-sans uppercase tracking-wider flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="bg-[#c5a059] hover:bg-[#d8b46a] text-[#0a0a0c] font-sans font-semibold text-xs tracking-widest uppercase py-3 px-6 rounded transition-all flex items-center gap-2"
                    >
                      <span>Continue to Guest Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ====================================================
                  STEP 3: GUEST DETAILS
              ==================================================== */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#c5a059] block font-medium mb-1">
                    Step 6 — Guest Contact Information
                  </span>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a89f91] mb-1 font-sans">
                      Primary Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajiv Malhotra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.12)] focus:border-[#c5a059] rounded-lg p-3 text-xs text-[#f4efe6] outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#a89f91] mb-1 font-sans">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.12)] focus:border-[#c5a059] rounded-lg p-3 text-xs text-[#f4efe6] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#a89f91] mb-1 font-sans">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.12)] focus:border-[#c5a059] rounded-lg p-3 text-xs text-[#f4efe6] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a89f91] mb-1 font-sans">
                      Special Requests / Dietary Preferences
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. High-chair needed, Jain meal request, celebratory dessert..."
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.12)] focus:border-[#c5a059] rounded-lg p-3 text-xs text-[#f4efe6] outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-[#8e8779] hover:text-[#f4efe6] font-sans uppercase tracking-wider flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      disabled={!name.trim() || !phone.trim()}
                      onClick={() => setCurrentStep(4)}
                      className="bg-[#c5a059] hover:bg-[#d8b46a] disabled:opacity-40 disabled:hover:bg-[#c5a059] text-[#0a0a0c] font-sans font-semibold text-xs tracking-widest uppercase py-3 px-6 rounded transition-all flex items-center gap-2"
                    >
                      <span>Review Live Booking Summary</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ====================================================
                  STEP 4: LIVE BOOKING SUMMARY & DISPATCH
              ==================================================== */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {/* BEAUTIFUL LIVE BOOKING SUMMARY CARD */}
                  <div className="p-5 sm:p-6 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(218,179,106,0.35)] shadow-xl relative overflow-hidden">
                    <div className="border-b border-[rgba(218,179,106,0.2)] pb-3 mb-4 flex items-center justify-between">
                      <div>
                        <span className="font-display text-lg text-[#f4efe6] uppercase tracking-wider block">
                          MUGHAL MAHAL
                        </span>
                        <span className="font-hindi text-xs text-[#c5a059]">
                          7, Sethi Bhawan, Rajendra Place
                        </span>
                      </div>
                      <span className="text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded bg-[rgba(197,160,89,0.15)] text-[#c5a059] border border-[rgba(197,160,89,0.3)]">
                        Booking Summary
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-xs font-sans">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#8e8779] block">Date</span>
                        <span className="text-[#f4efe6] font-medium text-sm block mt-0.5">{selectedDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#8e8779] block">Time</span>
                        <span className="text-[#f4efe6] font-medium text-sm block mt-0.5">{selectedTime}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#8e8779] block">Guests</span>
                        <span className="text-[#f4efe6] font-medium text-sm block mt-0.5">{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#8e8779] block">Occasion</span>
                        <span className="text-[#c5a059] font-medium text-sm block mt-0.5">{occasion}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#8e8779] block">Preference</span>
                        <span className="text-[#d1cbc0] block mt-0.5">{preference}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#8e8779] block">Contact</span>
                        <span className="text-[#d1cbc0] block mt-0.5">{name} ({phone})</span>
                      </div>
                    </div>

                    {specialRequest && (
                      <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] text-xs text-[#a69e90]">
                        <span className="text-[10px] uppercase tracking-wider text-[#c5a059] block">Note:</span>
                        <p className="italic">{specialRequest}</p>
                      </div>
                    )}
                  </div>

                  {/* Factual Disclaimer */}
                  <div className="p-3.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-xs text-[#cfc8bc] leading-relaxed">
                    <p>
                      Your reservation request will be completed through the restaurant's official reservation service.
                    </p>
                  </div>

                  {/* Final Actions */}
                  <div className="space-y-3">
                    <button
                      id="confirm-reservation-continue-btn"
                      type="button"
                      disabled={isRedirecting}
                      onClick={handleContinueToReservation}
                      className="w-full bg-[#c5a059] hover:bg-[#d8b46a] text-[#0a0a0c] font-sans font-semibold text-xs tracking-[0.2em] uppercase py-3.5 px-6 rounded transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                      {isRedirecting ? (
                        <span>Connecting to Front Desk...</span>
                      ) : (
                        <>
                          <span>CONTINUE TO RESERVATION →</span>
                        </>
                      )}
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={restaurantContact.telLink}
                        className="p-2.5 rounded border border-[rgba(218,179,106,0.3)] hover:border-[#c5a059] text-[#c5a059] hover:bg-[rgba(197,160,89,0.08)] font-sans text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Restaurant</span>
                      </a>

                      <a
                        href={restaurantContact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded border border-[rgba(82,183,136,0.4)] hover:border-[#52b788] text-[#52b788] hover:bg-[rgba(82,183,136,0.08)] font-sans text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-xs text-[#8e8779] hover:text-[#f4efe6] font-sans uppercase tracking-wider flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Edit Information
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
