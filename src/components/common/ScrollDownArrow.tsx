import React, { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollDownArrowProps {
  targetSectionId: string;
}

const ScrollDownArrow: React.FC<ScrollDownArrowProps> = ({ targetSectionId }) => {
  // Corrected: Change the ref type to HTMLButtonElement
  const scrollRef = useRef<HTMLButtonElement>(null);

  // Track scroll position of the window
  const { scrollYProgress } = useScroll();

  // Define rotation for the circular text based on scroll progress
  // Rotates 360 degrees when scrolling from 0 to 1 of the page
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Function to handle smooth scroll to the target section
  const scrollToNextSection = useCallback(() => {
    const targetElement = document.getElementById(targetSectionId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  }, [targetSectionId]);

  return (
    <div className="relative flex justify-center items-center py-8">
      <motion.button
        ref={scrollRef} // This ref is now correctly typed for a button
        className="relative w-24 h-24 flex flex-col items-center justify-center cursor-pointer focus:outline-none"
        onClick={scrollToNextSection}
        // Add subtle pulse animation
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Circular text "SCROLL DOWN" */}
        <motion.div
          className="absolute w-full h-full text-white text-xs font-semibold uppercase flex items-center justify-center"
          style={{ rotate: rotation }} /* Apply scroll-based rotation */
        >
          {/* Using SVG path for circular text for precise positioning and rotation */}
          <svg viewBox="0 0 100 100" className="absolute w-full h-full">
            <path
              id="circlePath"
              fill="none"
              stroke="none"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
            <text fill="#FFFFFF">
              <textPath xlinkHref="#circlePath" className="rotate-circle-text text-sm"> {/* Added CSS class for base animation */}
                SCROLL DOWN • SCROLL DOWN •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Arrow Icon (Lucide Icon for better scaling/styling) */}
        <motion.div
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center z-10"
          initial={{ y: 0 }}
          animate={{ y: [0, 5, 0] }} /* Subtle up-down float for arrow */
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg className="lucide lucide-arrow-down w-6 h-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ScrollDownArrow;