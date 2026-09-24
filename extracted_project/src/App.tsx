import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation.tsx';
import { Footer } from './components/Footer.tsx';
import { LoadingScreen } from './components/LoadingScreen.tsx';
import { ReservationModal } from './components/ReservationModal.tsx';
import { OrderModal } from './components/OrderModal.tsx';
import { FloatingContact } from './components/FloatingContact.tsx';
import { PageTransitionOverlay, SlideDirection } from './components/PageTransitionOverlay.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { MenuPage } from './pages/MenuPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';
import { ReviewsPage } from './pages/ReviewsPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';

// Ordered route hierarchy to smartly determine slide direction
const ROUTE_ORDER = ['/', '/menu', '/about', '/gallery', '/reviews', '/contact'];

function determineSlideDirection(from: string, to: string): SlideDirection {
  const fromIndex = ROUTE_ORDER.indexOf(from);
  const toIndex = ROUTE_ORDER.indexOf(to);
  if (fromIndex === -1 || toIndex === -1) return 'forward';
  return toIndex >= fromIndex ? 'forward' : 'backward';
}

export default function App() {
  // Existing initial loading screen - strictly preserved with Mughal Mahal official logo
  const [initialLoading, setInitialLoading] = useState(true);

  const [currentRoute, setCurrentRoute] = useState(() => {
    const pathname = window.location.pathname;
    return ROUTE_ORDER.includes(pathname) ? pathname : '/';
  });

  // Cinematic Horizontal Slide Transition States
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string>(currentRoute);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('forward');

  // Modals
  const [reservationOpen, setReservationOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  // Timers ref for clean tear-down and safety timeout prevention
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isNavigatingRef = useRef<boolean>(false);

  // Clean transition orchestrator
  const triggerNavigation = useCallback(
    (toRoute: string, updateHistory = true, forcedDirection?: SlideDirection) => {
      // Prevent redundant transition or double-triggering during active transition
      if (toRoute === currentRoute) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (isNavigatingRef.current) return;

      // Clear any pending timeouts
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);

      isNavigatingRef.current = true;

      // Direction calculation
      const direction = forcedDirection || determineSlideDirection(currentRoute, toRoute);
      setSlideDirection(direction);
      setTargetRoute(toRoute);

      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        if (updateHistory) window.history.pushState({}, '', toRoute);
        setCurrentRoute(toRoute);
        window.scrollTo({ top: 0, behavior: 'auto' });
        isNavigatingRef.current = false;
        return;
      }

      // Initiate cinematic horizontal sliding curtain
      setIsTransitioning(true);

      // Total sequence timing ~700-750ms:
      // Halfway through (at ~380ms when sliding panel covers viewport), swap page content
      transitionTimeoutRef.current = setTimeout(() => {
        if (updateHistory) {
          window.history.pushState({}, '', toRoute);
        }
        setCurrentRoute(toRoute);
        window.scrollTo({ top: 0, behavior: 'auto' });

        // Unmount transition panel as reveal completes
        setTimeout(() => {
          setIsTransitioning(false);
          isNavigatingRef.current = false;
        }, 360);
      }, 380);

      // Hard safety timeout: max 1200ms under any circumstance
      safetyTimeoutRef.current = setTimeout(() => {
        setCurrentRoute(toRoute);
        setIsTransitioning(false);
        isNavigatingRef.current = false;
      }, 1200);
    },
    [currentRoute]
  );

  // Synchronize browser history (Back / Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const validRoute = ROUTE_ORDER.includes(pathname) ? pathname : '/';
      // Automatically reverse direction for back navigation
      const direction = determineSlideDirection(currentRoute, validRoute);
      triggerNavigation(validRoute, false, direction);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, [triggerNavigation, currentRoute]);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/menu':
        return (
          <MenuPage
            onOpenReservation={() => setReservationOpen(true)}
            onOpenOrder={() => setOrderOpen(true)}
          />
        );
      case '/about':
        return <AboutPage onOpenReservation={() => setReservationOpen(true)} />;
      case '/gallery':
        return <GalleryPage />;
      case '/reviews':
        return <ReviewsPage />;
      case '/contact':
        return (
          <ContactPage
            onOpenReservation={() => setReservationOpen(true)}
            onOpenOrder={() => setOrderOpen(true)}
          />
        );
      case '/':
      default:
        return (
          <HomePage
            navigate={(route) => triggerNavigation(route, true)}
            onOpenReservation={() => setReservationOpen(true)}
            onOpenOrder={() => setOrderOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-[#f4efe6] selection:bg-[#c5a059] selection:text-[#0a0a0c] relative overflow-x-clip">
      {/* Existing Initial Logo-Based Loading Experience - EXACTLY PRESERVED */}
      {initialLoading && <LoadingScreen onComplete={() => setInitialLoading(false)} />}

      {/* Cinematic Horizontal Slide Page Transition Overlay */}
      <PageTransitionOverlay
        isTransitioning={isTransitioning}
        targetRoute={targetRoute}
        direction={slideDirection}
      />

      {/* Floating Glass Navigation */}
      <Navigation
        currentRoute={currentRoute}
        navigate={(route) => triggerNavigation(route, true)}
        onOpenReservation={() => setReservationOpen(true)}
        onOpenOrder={() => setOrderOpen(true)}
      />

      {/* Main Page Content - Pure opacity fade to avoid CSS transform traps */}
      <main className="relative min-h-[85vh] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer
        navigate={(route) => triggerNavigation(route, true)}
        onOpenReservation={() => setReservationOpen(true)}
        onOpenOrder={() => setOrderOpen(true)}
      />

      {/* Global Floating Quick Contact */}
      <FloatingContact />

      {/* Global Modals */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      <OrderModal
        isOpen={orderOpen}
        onClose={() => setOrderOpen(false)}
      />
    </div>
  );
}
