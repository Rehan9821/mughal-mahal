import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, ExternalLink, ShoppingBag, Clock, MapPin, MessageCircle } from 'lucide-react';
import { restaurantInfo, restaurantContact } from '../data/restaurantData.ts';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#060608]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-[#111115] border border-[#c5a059]/30 shadow-2xl p-6 md:p-8 text-[#f4efe6]"
          >
            {/* Close Button */}
            <button
              id="close-order-modal"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-[#a89f91] hover:text-[#f4efe6] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-[11px] font-sans tracking-[0.25em] text-[#c5a059] uppercase block mb-1">
                Direct & Partner Delivery
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-[#f4efe6] tracking-wide uppercase">
                Order Mughal Mahal
              </h2>
              <p className="font-hindi text-[#a89f91] text-sm mt-0.5">
                मुगल महल • ऑनलाइन ऑर्डर व पार्सल
              </p>
              <p className="text-xs text-[#a89f91] mt-2">
                Enjoy hot, authentic Mughlai curries, biryanis, and tandoori breads delivered fresh to your residence or office.
              </p>
            </div>

            {/* Ordering Options */}
            <div className="space-y-3">
              {/* Option 1: Direct Call Order & Takeaway */}
              <div className="p-4 bg-[#18181f] border border-[#c5a059]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[#23212b] rounded-full text-[#c5a059] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#f4efe6]">
                      Direct Kitchen & Takeaway Counter
                    </h4>
                    <p className="text-xs text-[#a89f91] mt-0.5">
                      Call desk for express pick-up or direct local neighborhood dispatch.
                    </p>
                    <span className="text-[11px] text-[#c5a059] font-medium block mt-1">
                      {restaurantContact.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={restaurantContact.telLink}
                    className="flex-1 sm:flex-none text-center bg-[#c5a059] hover:bg-[#d6af66] text-[#0c0c0e] font-sans font-semibold text-xs tracking-wider uppercase py-2.5 px-4 transition-colors"
                  >
                    Call Now
                  </a>
                  <a
                    href={restaurantContact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none text-center border border-[#52b788]/50 hover:bg-[#52b788]/10 text-[#52b788] font-sans font-semibold text-xs tracking-wider uppercase py-2.5 px-3 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Option 2: Swiggy Partner Link */}
              <div className="p-4 bg-[#18181f] border border-[#2e2d36] hover:border-[#c5a059]/40 transition-colors flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fc8019]/20 text-[#fc8019] flex items-center justify-center font-bold text-sm">
                    SW
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#f4efe6]">
                      Order via Swiggy
                    </h4>
                    <p className="text-xs text-[#a89f91]">
                      Mughal Mahal, Rajendra Place listing with live tracking.
                    </p>
                  </div>
                </div>

                <a
                  href={restaurantInfo.orderLinks.swiggy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#fc8019]/50 hover:bg-[#fc8019] hover:text-white text-[#fc8019] font-sans text-xs tracking-wider uppercase py-2 px-3.5 transition-all"
                >
                  Open Swiggy <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Option 3: Zomato Partner Link */}
              <div className="p-4 bg-[#18181f] border border-[#2e2d36] hover:border-[#c5a059]/40 transition-colors flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e23744]/20 text-[#e23744] flex items-center justify-center font-bold text-sm">
                    ZO
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#f4efe6]">
                      Order via Zomato
                    </h4>
                    <p className="text-xs text-[#a89f91]">
                      Full verified menu, ratings, and doorstep delivery.
                    </p>
                  </div>
                </div>

                <a
                  href={restaurantInfo.orderLinks.zomato}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#e23744]/50 hover:bg-[#e23744] hover:text-white text-[#e23744] font-sans text-xs tracking-wider uppercase py-2 px-3.5 transition-all"
                >
                  Open Zomato <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Operating info */}
            <div className="mt-6 pt-4 border-t border-[#222129] grid grid-cols-2 gap-3 text-xs text-[#a89f91]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c5a059]" />
                <span>Open Daily: 11:30 AM – 11:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c5a059]" />
                <span>Pickup: 7, Sethi Bhawan</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
