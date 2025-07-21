// src/layouts/DefaultLayout.tsx
import React from 'react'; // Removed useRef
import Header from '../components/header/Header'; // The navigation pill component
import ScrollToTopFab from '../components/common/ScrollToTopFab';
import ChatbotFab from '../components/common/ChatbotFab';
import Footer from '../components/layout-parts/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; // For the logo
import Link from 'next/link'; // For the "Get in Touch" button

interface DefaultLayoutProps {
  children: React.ReactNode;
  headerRef: React.RefObject<HTMLDivElement>; // Ref for the main top header container
  headerHeight: number; // This will now be the height of the top header container
  dynamicPaddingBottom: string;
  activePage: string;
  setActivePage: (page: string) => void;
  isMobile: boolean;
  chatbotFabBottomBaseOffset: number;
  fabSize: number;
  fabSpacing: number;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  headerRef,
  headerHeight, // This prop now represents the height of the TOP header bar
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
  const mobileBottomNavHeight = navPillHeight + 32; // Pill height + some padding/margin for mobile bottom bar

  // Calculate main content padding top based on the TOP header's height
  const mainContentPaddingTop = `${headerHeight + (isMobile ? 20 : 40)}px`; // Add extra spacing

  // Calculate main content padding bottom based on mobile bottom nav and FABs
  const mainContentPaddingBottom = isMobile
    ? `${mobileBottomNavHeight + chatbotFabBottomBaseOffset + fabSize + fabSpacing + fabSize + 20}px` // Mobile bottom nav + FABs + extra space
    : dynamicPaddingBottom; // Desktop uses dynamicPaddingBottom (which is '0px')

  // Calculate specific bottom offsets for each FAB
  const scrollToTopFabActualBottomOffset = chatbotFabBottomBaseOffset; // e.g., 16px from bottom
  const chatbotFabActualBottomOffset = scrollToTopFabActualBottomOffset + fabSize + fabSpacing;


  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gray-950 font-inter">
      {/* --- TOP HEADER BAR (Logo + Get in Touch + Nav Pill for Desktop) --- */}
      <motion.div
        ref={headerRef} // Attach ref to this overall TOP header container
        className={`fixed left-0 right-0 mx-auto z-50 w-full max-w-7xl px-4 md:px-8
                    flex items-center justify-between
                    top-4`} // Always fixed to top
        initial={{ y: -100, opacity: 0 }} // Initial animation for the entire top bar
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.5 }}
      >
        {/* Logo (Left side of the top bar) */}
        <Link href="/" passHref className="flex-shrink-0" onClick={() => setActivePage('home')}>
          <div className="relative w-32 h-8">
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

        {/* Navigation Pill (Center of the top bar on Desktop, hidden on Mobile) */}
        {!isMobile && (
          <div className="flex-grow flex justify-center"> {/* Centering the pill */}
            <Header activePage={activePage} setActivePage={setActivePage} />
          </div>
        )}

        {/* Get in Touch Button (Right side of the top bar) */}
        <Link href="/contact" passHref className="flex-shrink-0">
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
      {/* --- END TOP HEADER BAR --- */}

      {/* --- MOBILE BOTTOM NAVIGATION PILL (Only visible on Mobile) --- */}
      {isMobile && (
        <motion.div
          className={`fixed left-0 right-0 mx-auto z-50 w-full max-w-md px-4
                      bottom-4`} // Fixed to bottom
          initial={{ y: navPillHeight + 20, opacity: 0 }} // Animate from below
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.5 }}
        >
          <Header activePage={activePage} setActivePage={setActivePage} />
        </motion.div>
      )}
      {/* --- END MOBILE BOTTOM NAVIGATION PILL --- */}


      {/* Main Content Area */}
      <main
        className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8"
        style={{
          paddingTop: mainContentPaddingTop,
          paddingBottom: mainContentPaddingBottom, // Use the new mainContentPaddingBottom
        }}
      >
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons (FABs) */}
      <ChatbotFab
        bottomOffset={chatbotFabActualBottomOffset}
        headerHeight={isMobile ? mobileBottomNavHeight : 0} // Adjust for mobile bottom nav
        isMobile={isMobile}
      />
      <ScrollToTopFab
        bottomOffset={scrollToTopFabActualBottomOffset}
        _fabSize={fabSize}
        _fabSpacing={fabSpacing}
        headerHeight={isMobile ? mobileBottomNavHeight : 0} // Adjust for mobile bottom nav
        isMobile={isMobile}
      />
    </div>
  );
};

export default DefaultLayout;
