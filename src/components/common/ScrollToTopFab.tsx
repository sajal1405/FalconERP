// src/components/common/ScrollToTopFab.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react'; // Arrow up icon

interface ScrollToTopFabProps {
  bottomOffset: number; // Now represents its own base bottom offset
  _fabSize: number; // Renamed to _fabSize to mark as intentionally unused
  _fabSpacing: number; // Renamed to _fabSpacing to mark as intentionally unused
  headerHeight: number; // Height of the main header (for mobile adjustment)
  isMobile: boolean; // Flag for mobile view
}

const ScrollToTopFab: React.FC<ScrollToTopFabProps> = ({
  bottomOffset,
  _fabSize, // Destructured with underscore
  _fabSpacing, // Destructured with underscore
  headerHeight,
  isMobile,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Calculate dynamic bottom position for this FAB
  const dynamicBottom = isMobile
    ? `${bottomOffset + headerHeight + 16}px` // Adjusted for mobile header
    : `${bottomOffset}px`; // Standard offset for desktop

  // Effect to check scroll position and toggle visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) { // Show button after scrolling 300px down
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll animation
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed right-4 z-50 p-4 rounded-full bg-gray-700 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
          style={{ bottom: dynamicBottom }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          data-cursor="hover" // Mark for custom cursor hover effect
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopFab;
