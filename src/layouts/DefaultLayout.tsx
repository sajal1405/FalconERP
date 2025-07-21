// src/layouts/DefaultLayout.tsx
import React from 'react';
import Header from '../components/header/Header'; // The navigation pill
import ScrollToTopFab from '../components/common/ScrollToTopFab';
import ChatbotFab from '../components/common/ChatbotFab';
import Footer from '../components/layout-parts/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; // For the logo
import Link from 'next/link'; // For the "Get in Touch" button

interface DefaultLayoutProps {
  children: React.ReactNode;
  headerRef: React.RefObject<HTMLDivElement>;
  headerHeight: number; // This will now be the height of the entire header container
  dynamicPaddingBottom: string;
  activePage: string;
  setActivePage: (page: string) => void;
  isMobile: boolean;
  chatbotFabBottomBaseOffset: number;
  fabSize: number; // Size of a single FAB
  fabSpacing: number; // Spacing between FABs
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  headerRef,
  headerHeight, // This prop now represents the height of the ENTIRE header bar
  dynamicPaddingBottom,
  activePage,
  setActivePage,
  isMobile,
  chatbotFabBottomBaseOffset,
  fabSize,
  fabSpacing,
}) => {
  // Define the fixed height of the central navigation pill (from Header.tsx)
  const navPillHeight = 80; // h-20 in Header.tsx is 80px

  // Calculate main content padding top based only on the main Header height
  const mainContentPaddingTop = `${headerHeight + (isMobile ? 20 : 40)}px`; // Adjust spacing as needed

  // ScrollToTopFab will be the lowest one, closest to the bottom edge
  const scrollToTopFabActualBottomOffset = chatbotFabBottomBaseOffset; // e.g., 16px from bottom
  // ChatbotFab will be stacked directly above the ScrollToTopFab
  const chatbotFabActualBottomOffset = scrollToTopFabActualBottomOffset + fabSize + fabSpacing;


  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gray-950 font-inter">
      {/* --- Overall Header Container (Logo + Pill + Button) --- */}
      <motion.div
        ref={headerRef} // Attach ref to this overall container
        className={`fixed left-0 right-0 mx-auto z-50 w-full max-w-7xl px-4 md:px-8
                    flex items-center justify-between
                    ${isMobile ? 'bottom-4' : 'top-4'}
                    h-[calc(80px + 2rem)] md:h-[calc(80px + 2rem)]`} /* Example height to contain pill + padding */
        initial={{ y: isMobile ? 'calc(100% + 20px)' : -100, opacity: 0 }} // Animate based on mobile/desktop
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.5 }}
      >
        {/* Logo (Outside the pill, on the left) */}
        <Link href="/" passHref className="flex-shrink-0" onClick={() => setActivePage('home')}>
          <div className="relative w-32 h-8"> {/* Ensure relative for Image fill */}
            <Image
              src="/images/WLogo.svg"
              alt="Falcon ERP Logo"
              fill
              priority
              sizes="(max-width: 768px) 128px, 128px"
              className="object-contain"
            />
          </div>
        </Link>

        {/* Central Navigation Pill (Header Component) */}
        <Header activePage={activePage} setActivePage={setActivePage} />

        {/* Get in Touch Button (Outside the pill, on the right) */}
        <Link href="/contact" passHref className="flex-shrink-0 hidden md:block"> {/* Hidden on mobile */}
          <motion.button
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm
                       hover:bg-blue-700 transition-colors duration-200 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="hover"
            onClick={() => setActivePage('contact')}
          >
            Get in Touch
          </motion.button>
        </Link>
      </motion.div>
      {/* --- END: Overall Header Container --- */}

      {/* Main Content Area */}
      <main
        className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8"
        style={{
          paddingTop: mainContentPaddingTop,
          paddingBottom: dynamicPaddingBottom,
        }}
      >
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons (FABs) */}
      <ChatbotFab
        bottomOffset={chatbotFabActualBottomOffset}
        headerHeight={navPillHeight} // Pass the fixed nav pill height for mobile FAB adjustment
        isMobile={isMobile}
      />
      <ScrollToTopFab
        bottomOffset={scrollToTopFabActualBottomOffset}
        _fabSize={fabSize} // CRITICAL FIX: Changed to _fabSize
        _fabSpacing={fabSpacing} // CRITICAL FIX: Changed to _fabSpacing
        headerHeight={navPillHeight} // Pass the fixed nav pill height
        isMobile={isMobile}
      />
    </div>
  );
};

export default DefaultLayout;
