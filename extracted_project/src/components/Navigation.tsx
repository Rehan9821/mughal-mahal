import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Calendar, ShoppingBag, Phone, Mail, MessageCircle } from 'lucide-react';
import { restaurantContact } from '../data/restaurantData.ts';
import { MughalLogo } from './MughalLogo.tsx';

interface NavigationProps {
  currentRoute: string;
  navigate: (route: string) => void;
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentRoute,
  navigate,
  onOpenReservation,
  onOpenOrder
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'MENU', path: '/menu' },
    { label: 'ABOUT', path: '/about' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'REVIEWS', path: '/reviews' },
    { label: 'CONTACT', path: '/contact' }
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-6 md:px-8 ${
          isScrolled ? 'pt-3 pb-3' : 'pt-5 pb-5'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-xl transition-all duration-500 flex items-center justify-between px-5 md:px-7 ${
            isScrolled
              ? 'py-3 bg-[rgba(10,10,13,0.88)] backdrop-blur-2xl border border-[rgba(218,179,106,0.25)] shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
              : 'py-4 bg-[rgba(10,10,14,0.45)] backdrop-blur-md border border-[rgba(255,255,255,0.08)]'
          }`}
        >
          {/* Brand Left */}
          <button
            id="nav-logo"
            onClick={() => handleLinkClick('/')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <MughalLogo size={36} glow={true} className="shrink-0 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-display tracking-[0.24em] text-sm md:text-base font-bold text-[#f4efe6] group-hover:text-[#c5a059] transition-colors uppercase">
                MUGHAL MAHAL
              </span>
              <span className="font-hindi text-[10px] sm:text-[11px] text-[#c5a059] tracking-wider leading-none mt-0.5">
                मुगल महल रेस्टोरेंट
              </span>
            </div>
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.path;
              return (
                <button
                  key={link.path}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-[11px] uppercase tracking-[0.22em] font-medium transition-all relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-[#c5a059]'
                      : 'text-[#d6d0c2] hover:text-[#f4efe6]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#c5a059]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-order-online-btn"
              onClick={onOpenOrder}
              className="text-[11px] uppercase tracking-[0.18em] font-sans text-[#cfc8bc] hover:text-[#c5a059] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] hover:border-[rgba(218,179,106,0.3)] px-3.5 py-2 rounded transition-all duration-300 flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#c5a059]" />
              ORDER ONLINE
            </button>

            <button
              id="nav-reserve-btn"
              onClick={onOpenReservation}
              className="group bg-[#c5a059] hover:bg-[#d8b46a] text-[#0a0a0c] font-sans font-semibold text-[11px] tracking-[0.2em] uppercase py-2 px-4.5 rounded transition-all duration-300 shadow-md flex items-center gap-2 hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>RESERVE A TABLE</span>
            </button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-reserve-quick-btn"
              onClick={onOpenReservation}
              className="text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#c5a059] text-[#0a0a0c] py-1.5 px-3 rounded sm:hidden"
            >
              BOOK
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#f4efe6] hover:text-[#c5a059] rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Premium Glass Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 bg-[rgba(10,10,13,0.96)] backdrop-blur-2xl border-b border-[rgba(218,179,106,0.2)] animate-in fade-in duration-300">
          <div className="flex flex-col space-y-6 pt-2">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
              <div className="flex items-center gap-3">
                <MughalLogo size={36} glow={true} className="shrink-0" />
                <div>
                  <span className="font-display tracking-[0.24em] text-base font-bold text-[#f4efe6] block uppercase">
                    MUGHAL MAHAL
                  </span>
                  <span className="font-hindi text-xs text-[#c5a059]">
                    मुगल महल रेस्टोरेंट • राजेंद्र प्लेस
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#8e8779] hover:text-[#f4efe6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`text-left text-base font-display uppercase tracking-[0.2em] transition-colors flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.03)] ${
                      isActive ? 'text-[#c5a059]' : 'text-[#d6d0c2] hover:text-[#c5a059]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#c5a059]" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile Drawer Bottom Actions */}
          <div className="space-y-3 pt-6 border-t border-[rgba(255,255,255,0.08)]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full bg-[#c5a059] text-[#0a0a0c] font-sans font-semibold text-xs tracking-widest uppercase py-3 rounded text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              RESERVE A TABLE
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full border border-[rgba(255,255,255,0.15)] text-[#f4efe6] hover:text-[#c5a059] font-sans font-medium text-xs tracking-widest uppercase py-3 rounded text-center flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#c5a059]" />
              ORDER ONLINE
            </button>

            <div className="pt-2 flex items-center justify-center gap-4 text-xs text-[#8e8779]">
              <a href={restaurantContact.telLink} className="flex items-center gap-1 hover:text-[#c5a059]">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <span>•</span>
              <a href={restaurantContact.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#52b788]">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <span>•</span>
              <a href={restaurantContact.mailtoLink} className="flex items-center gap-1 hover:text-[#c5a059]">
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
