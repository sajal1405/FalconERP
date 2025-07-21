// D:\FALCONERP\src\components\ui\SlideToUnlockButton.tsx
import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { ChevronRight } from 'lucide-react'; // Icon for the slider

interface SlideToUnlockButtonProps {
  onSlideComplete: () => void; // Callback when the slide is successfully completed
  loading: boolean; // Indicates if the action triggered by slide is in progress
  buttonText?: string; // Optional text for the button
  loadingText?: string; // Optional text when loading
}

/**
 * SlideToUnlockButton Component
 * A reusable "slide to unlock/login" button with Framer Motion animations.
 * It provides visual feedback for dragging and completion, and handles loading states.
 */
const SlideToUnlockButton: React.FC<SlideToUnlockButtonProps> = ({
  onSlideComplete,
  loading,
  buttonText = 'Slide to Login', // Default text
  loadingText = 'Authenticating...' // Default loading text
}) => {
  const sliderRef = useRef<HTMLDivElement>(null); // Ref for the draggable container
  const x = useMotionValue(0); // Motion value for horizontal drag of the thumb
  const controls = useAnimation(); // Controls for animating the thumb

  // Animate background opacity and thumb color as it moves
  const backgroundOpacity = useTransform(x, [0, 200], [0.5, 1]); // Background fill effect
  const thumbColor = useTransform(x, [0, 200], ['#3B82F6', '#60A5FA']); // Blue-500 to Blue-400

  /**
   * Resets the slider thumb to the start position.
   * Called if the drag doesn't complete the slide.
   */
  const resetSlider = useCallback(() => {
    controls.start({ x: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } });
  }, [controls]);

  /**
   * Handles the end of a drag gesture.
   * Checks if the drag threshold is met to trigger onSlideComplete.
   */
  const handleDragEnd = useCallback(() => {
    if (loading) return; // Prevent interaction if already loading

    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      // Define a threshold (e.g., 70% of the slider width) for successful slide
      if (x.get() > sliderWidth * 0.7) {
        // Animate the thumb to the very end and then trigger completion
        controls.start({
          x: sliderWidth, // Animate fully to the end
          opacity: 0, // Fade out the thumb
          transition: { type: 'tween', duration: 0.3 }
        }).then(() => {
          onSlideComplete(); // Trigger the parent's completion callback
          // Reset thumb position for next interaction (after a short delay or on success)
          // We reset opacity here to make it visible again for subsequent interactions
          controls.set({ x: 0, opacity: 1 });
        });
      } else {
        resetSlider(); // Snap back if not enough drag
      }
    }
  }, [x, controls, onSlideComplete, loading, resetSlider]);


  return (
    <motion.div
      ref={sliderRef}
      className={`relative w-full h-12 bg-white/10 rounded-full flex items-center justify-start p-2 overflow-hidden cursor-grab flex-shrink-0
                  ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      whileTap={{ cursor: loading ? 'not-allowed' : 'grabbing' }}
    >
      {/* Fill background that expands with drag */}
      <motion.div
        className="absolute inset-0 bg-blue-600 rounded-full"
        style={{ scaleX: backgroundOpacity, originX: 0 }}
      />

      {/* Draggable thumb */}
      <motion.div
        className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-white text-lg"
        drag="x"
        dragConstraints={{ left: 0, right: sliderRef.current ? sliderRef.current.offsetWidth - 40 : 200 }}
        dragElastic={0.1}
        style={{ x, backgroundColor: thumbColor }}
        onDragEnd={handleDragEnd}
        animate={controls}
        layoutId="slide-thumb-login" // Unique layoutId for this component
        // Disable drag if loading
        dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
        onPointerDownCapture={(e) => { if (loading) e.stopPropagation(); }} // Prevent drag start if loading
      >
        {loading ? (
          // Simple loading spinner (replace with a proper spinner component if available)
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <ChevronRight size={24} />
        )}
      </motion.div>

      {/* Text Overlay */}
      <motion.span
        className="absolute left-1/2 -translate-x-1/2 text-sm md:text-base font-semibold whitespace-nowrap z-10"
        style={{ color: x.get() > 50 ? 'rgba(255,255,255,0.5)' : 'white' }}
      >
        {loading ? loadingText : buttonText}
      </motion.span>
    </motion.div>
  );
};

export default SlideToUnlockButton;
