import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Sparkles,
  Calendar,
  ShoppingBag,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronDown,
  Info
} from 'lucide-react';
import { conciergeEngine, formatINR } from '../concierge/conciergeEngine.ts';
import { ChatMessage } from '../concierge/conciergeTypes.ts';
import { MenuItem } from '../types.ts';

interface MughalConciergeProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
  navigate?: (route: string) => void;
}

const INITIAL_WELCOME_TEXT = `Namaste! Welcome to Mughal. 👋\nI'm your digital host.\n\nAsk me anything about our menu, dishes, prices, restaurant, reservations or dining experience.`;

const DEFAULT_QUICK_CHIPS = [
  'Explore Menu',
  'What should I try?',
  'Vegetarian',
  'Non-Veg',
  'Biryani',
  'Reserve a Table'
];

export const MughalConcierge: React.FC<MughalConciergeProps> = ({
  onOpenReservation,
  onOpenOrder,
  navigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasEverWaved, setHasEverWaved] = useState(() => {
    return sessionStorage.getItem('mughal_has_waved') === 'true';
  });
  const [isWavingActive, setIsWavingActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Message list initialized with official welcome message
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'concierge',
      text: INITIAL_WELCOME_TEXT,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: DEFAULT_QUICK_CHIPS
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatPanelRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new messages or typing state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle first-time hand-wave interaction (approx. 1.2–1.8 seconds)
  useEffect(() => {
    if (isOpen && !hasEverWaved) {
      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        setIsWavingActive(true);
        const waveTimer = setTimeout(() => {
          setIsWavingActive(false);
          setHasEverWaved(true);
          sessionStorage.setItem('mughal_has_waved', 'true');
        }, 1600); // 1.6s natural wave cycle
        return () => clearTimeout(waveTimer);
      } else {
        setHasEverWaved(true);
        sessionStorage.setItem('mughal_has_waved', 'true');
      }
    }
  }, [isOpen, hasEverWaved]);

  // Keyboard escape listener to close chat panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const playSoftChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5 note
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // AudioContext failure gracefully ignored
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Natural processing timing (250–400ms typing effect)
    const typingDelay = Math.min(380, Math.max(220, query.length * 8));

    setTimeout(() => {
      const botResponse = conciergeEngine.processUserMessage(query);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
      playSoftChime();
    }, typingDelay);
  };

  const handleResetConversation = () => {
    conciergeEngine.resetState();
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        sender: 'concierge',
        text: INITIAL_WELCOME_TEXT,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: DEFAULT_QUICK_CHIPS
      }
    ]);
  };

  const handleActionClick = (actionType?: string) => {
    if (actionType === 'reserve') {
      onOpenReservation();
    } else if (actionType === 'order') {
      onOpenOrder();
    } else if (actionType === 'menu_category' && navigate) {
      navigate('/menu');
    }
  };

  return (
    <>
      {/* 1. FLOATING CHATBOT BUTTON (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <motion.button
          id="mughal-concierge-trigger"
          aria-label="Open MUGHAL Digital Host Concierge"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center gap-3.5 pl-2.5 pr-4 py-2 rounded-full bg-[#111116]/95 border border-[#c5a059]/45 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.85)] hover:border-[#c5a059] hover:shadow-[0_10px_35px_rgba(197,160,89,0.25)] transition-all duration-300"
        >
          {/* Avatar Bezel with Golden Ring & Pulse */}
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#c5a059] shadow-inner bg-[#1a1922] shrink-0">
            <img
              src="/assets/mughal-ai-host.jpg"
              alt="MUGHAL Host"
              className="w-full h-full object-cover object-top filter brightness-105"
            />
            {/* Subtle Royal Attention Pulse */}
            <span className="absolute inset-0 rounded-full border border-[#c5a059]/50 animate-ping opacity-30 pointer-events-none" />
          </div>

          {/* Typography & Brand Indicator */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-sm tracking-wider font-semibold text-[#f4efe6] group-hover:text-[#c5a059] transition-colors">
                MUGHAL
              </span>
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
            </div>
            <span className="text-[9px] font-sans uppercase tracking-[0.18em] text-[#c5a059] font-medium -mt-0.5">
              Digital Host
            </span>
          </div>

          {/* Micro Status Dot */}
          <div className="ml-1 w-2 h-2 rounded-full bg-[#c5a059] shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
        </motion.button>
      </div>

      {/* 2. CHAT MODAL BACKDROP & PANEL */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Scrim with Glass Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#07070a]/60 backdrop-blur-sm z-50"
              aria-hidden="true"
            />

            {/* Chat Panel - Opens with fluid GPU transform & scale */}
            <motion.div
              ref={chatPanelRef}
              role="dialog"
              aria-modal="true"
              aria-label="MUGHAL Digital Host Concierge"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-24px)] sm:w-[420px] max-w-[440px] h-[84vh] sm:h-[620px] max-h-[660px] flex flex-col rounded-2xl bg-[#0f0e14] border border-[#c5a059]/40 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden"
            >
              {/* HEADER */}
              <div className="relative px-4 py-3.5 bg-gradient-to-r from-[#171620] via-[#14131b] to-[#171620] border-b border-[#282733] flex items-center justify-between shrink-0 shadow-md">
                <div className="flex items-center gap-3">
                  {/* Avatar with Hand-Wave Animation */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#c5a059] shadow-lg bg-[#181822] shrink-0">
                    {/* Relaxed Posture Image */}
                    <img
                      src="/assets/mughal-ai-host.jpg"
                      alt="MUGHAL Digital Host"
                      className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
                        isWavingActive ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    {/* Waving Posture Image (active during first-time welcome wave) */}
                    <img
                      src="/assets/mughal-ai-host-waving.jpg"
                      alt="MUGHAL Waving Welcome"
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ${
                        isWavingActive ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                      }`}
                      style={{
                        animation: isWavingActive ? 'mughal-subtle-wave 1.6s ease-in-out infinite' : 'none'
                      }}
                    />
                  </div>

                  {/* Identity */}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-serif text-base tracking-wider font-semibold text-[#f4efe6]">
                        MUGHAL
                      </h2>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c5a059]/20 text-[#c5a059] font-medium font-sans uppercase tracking-wider">
                        AI Host
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#9d978a]">
                      <span className="text-[11px] font-sans">Digital Host</span>
                      <span className="text-[9px] text-[#555]">•</span>
                      <span className="text-[11px] text-[#c5a059] font-medium">Here to help</span>
                    </div>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSoundEnabled((prev) => !prev)}
                    className="p-2 text-[#888] hover:text-[#c5a059] transition-colors rounded-lg hover:bg-[#201f2b]"
                    title={soundEnabled ? 'Mute sound' : 'Enable soft chime'}
                    aria-label={soundEnabled ? 'Mute sound' : 'Enable soft chime'}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleResetConversation}
                    className="p-2 text-[#888] hover:text-[#c5a059] transition-colors rounded-lg hover:bg-[#201f2b]"
                    title="Restart Conversation"
                    aria-label="Restart Conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-[#888] hover:text-[#f4efe6] transition-colors rounded-lg hover:bg-[#201f2b]"
                    title="Close Concierge"
                    aria-label="Close Concierge"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* MESSAGES SCROLL AREA */}
              <div
                className="flex-1 p-4 overflow-y-auto space-y-4 text-sm font-sans overscroll-contain"
                tabIndex={0}
                aria-live="polite"
              >
                {/* Privacy & Verified Knowledge Note */}
                <div className="p-2.5 rounded-lg bg-[#14141d]/70 border border-[#23222e] text-[11px] text-[#8e8779] flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span>
                    Direct offline intelligence. Answers strictly verified from Mughal Mahal Restaurant menu & records.
                  </span>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed text-sm ${
                        msg.sender === 'user'
                          ? 'bg-[#1b1a24] text-[#f4efe6] border border-[#c5a059]/40 shadow-md rounded-br-none'
                          : 'bg-[#14141c] text-[#ece6dc] border border-[#292837] shadow-lg rounded-bl-none'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {/* Attached Verified Dishes Cards */}
                      {msg.dishes && msg.dishes.length > 0 && (
                        <div className="mt-3 space-y-2 pt-2 border-t border-[#2a2936]">
                          {msg.dishes.map((dish) => (
                            <DishCard
                              key={dish.id}
                              dish={dish}
                              onReserve={onOpenReservation}
                              onOrder={onOpenOrder}
                            />
                          ))}
                        </div>
                      )}

                      {/* Direct Action Trigger Buttons */}
                      {msg.actionType === 'reserve' && (
                        <div className="mt-3 pt-2 border-t border-[#2a2936]">
                          <button
                            onClick={onOpenReservation}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#c5a059] hover:bg-[#d8b368] text-[#0d0d12] font-semibold text-xs tracking-wider uppercase transition-colors"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Reserve a Table</span>
                          </button>
                        </div>
                      )}

                      {msg.actionType === 'order' && (
                        <div className="mt-3 pt-2 border-t border-[#2a2936]">
                          <button
                            onClick={onOpenOrder}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#c5a059] hover:bg-[#d8b368] text-[#0d0d12] font-semibold text-xs tracking-wider uppercase transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Order Online</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <span className="text-[10px] text-[#6d685e] px-1 mt-1">
                      {msg.timestamp}
                    </span>

                    {/* Context Quick Reply Chips */}
                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 max-w-[92%]">
                        {msg.quickReplies.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (chip.toLowerCase().includes('reserve a table')) {
                                onOpenReservation();
                              } else if (chip.toLowerCase().includes('order online')) {
                                onOpenOrder();
                              } else {
                                handleSendMessage(chip);
                              }
                            }}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-[#181824] hover:bg-[#252435] text-[#c5a059] border border-[#c5a059]/35 hover:border-[#c5a059] transition-all text-left"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* TYPING INDICATOR */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-[#8e8779] bg-[#14141c] border border-[#272636] px-3.5 py-2.5 rounded-2xl rounded-bl-none w-20">
                    <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* INPUT BAR */}
              <div className="p-3 bg-[#13121a] border-t border-[#282736] shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask MUGHAL about dishes, prices, tables..."
                    className="flex-1 bg-[#1a1924] border border-[#323142] focus:border-[#c5a059] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-[#f4efe6] placeholder-[#797368] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-[#c5a059] text-[#0d0d12] hover:bg-[#d8b368] disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Sub-footer subtle badge */}
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#6d685e] px-1">
                  <span>MUGHAL • Digital Host</span>
                  <span>Zero-API Offline Engine</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Embedded CSS for natural wave animation keyframes */}
      <style>{`
        @keyframes mughal-subtle-wave {
          0% {
            transform: rotate(0deg) scale(1.05);
          }
          20% {
            transform: rotate(3deg) scale(1.05);
          }
          40% {
            transform: rotate(-2deg) scale(1.05);
          }
          60% {
            transform: rotate(3deg) scale(1.05);
          }
          80% {
            transform: rotate(-1.5deg) scale(1.05);
          }
          100% {
            transform: rotate(0deg) scale(1.05);
          }
        }
      `}</style>
    </>
  );
};

// Subcomponent: Verified Dish Preview Card
interface DishCardProps {
  dish: MenuItem;
  onReserve: () => void;
  onOrder: () => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, onReserve, onOrder }) => {
  return (
    <div className="flex items-start justify-between p-2 rounded-lg bg-[#1a1926] border border-[#2b2a3a] text-xs">
      <div className="space-y-0.5 pr-2">
        <div className="flex items-center gap-1.5">
          {/* Diet Emblem */}
          <span
            className={`w-2.5 h-2.5 border flex items-center justify-center shrink-0 ${
              dish.isVegetarian
                ? 'border-emerald-500'
                : 'border-amber-700'
            }`}
          >
            <span
              className={`w-1 h-1 rounded-full ${
                dish.isVegetarian ? 'bg-emerald-500' : 'bg-amber-700'
              }`}
            />
          </span>
          <span className="font-medium text-[#f4efe6]">{dish.name}</span>
        </div>
        {dish.hindiName && (
          <span className="text-[10px] text-[#8e8779] block">{dish.hindiName}</span>
        )}
        <p className="text-[11px] text-[#a59f92] line-clamp-2 leading-tight">
          {dish.description}
        </p>
        {dish.portion && (
          <span className="text-[10px] text-[#c5a059] block">{dish.portion}</span>
        )}
      </div>

      <div className="flex flex-col items-end shrink-0 pl-1">
        <span className="font-serif font-semibold text-[#c5a059] text-xs">
          {formatINR(dish.price)}
        </span>
      </div>
    </div>
  );
};
