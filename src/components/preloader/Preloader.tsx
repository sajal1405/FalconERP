// src/components/preloader/Preloader.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react'; // Icon for the slider
import { DotLottieReact } from '@lottiefiles/dotlottie-react'; // Import DotLottieReact

interface PreloaderProps {
  onComplete: () => void;
  isMobile: boolean; // Prop to determine mobile/desktop view
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete, isMobile }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); // Motion value for horizontal drag
  const controls = useAnimation(); // Controls for drag animation

  // Animate background opacity and thumb color as it moves
  const backgroundOpacity = useTransform(x, [0, 200], [0.5, 1]); // Animate background opacity
  const thumbColor = useTransform(x, [0, 200], ['#3B82F6', '#60A5FA']); // Blue-500 to Blue-400

  // Reset slider if drag doesn't complete
  const resetSlider = useCallback(() => {
    controls.start({ x: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } });
  }, [controls]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      // If dragged more than 70% of the width, complete the preloader
      if (x.get() > sliderWidth * 0.7) {
        controls.start({
          x: sliderWidth, // Animate fully to the end
          opacity: 0, // Fade out the thumb
          transition: { type: 'tween', duration: 0.3 }
        }).then(() => {
          onComplete(); // Call onComplete to hide preloader
        });
      } else {
        resetSlider(); // Snap back if not enough drag
      }
    }
  }, [x, controls, onComplete, resetSlider]);

  // If not mobile, automatically complete after a short delay
  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500); // Shorter delay for non-interactive desktop preloader
      return () => clearTimeout(timer);
    }
  }, [isMobile, onComplete]);

  // Common Lottie animation properties
  const lottieProps = {
    src: "https://lottie.host/5cb24681-b4bd-4284-8174-d21ad5d52953/ZCbI5wi29A.lottie",
    loop: true,
    autoplay: true,
  };

  if (!isMobile) {
    // Desktop Preloader (Lottie animation)
    return (
      <motion.div
        key="desktop-preloader"
        className="fixed inset-0 z-[9999] bg-[#00174F] flex flex-col items-center justify-center text-white"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <div className="w-40 h-40"> {/* Container for Lottie, adjust size as needed */}
          <DotLottieReact {...lottieProps} />
        </div>
        <p className="mt-4 text-lg">Loading FALCON ERP...</p>
      </motion.div>
    );
  }

  // Mobile Preloader (interactive poster with Lottie prominent background)
  return (
    <motion.div
      key="mobile-preloader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between text-white p-4 overflow-hidden"
      style={{
        backgroundColor: '#00174F', // Solid dark blue background
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Background radial gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0A1128] via-[#00174F] to-[#0A1128]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Main Content Area - This flex container now explicitly controls spacing */}
      <div className="relative z-10 flex flex-col items-center justify-start text-center w-full h-full py-8">

        {/* Logo - Top */}
        {/* >>> CRITICAL: Ensure 'relative' is on this parent div for Image fill prop <<< */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.2 }}
          className="relative w-48 h-12 flex-shrink-0 mb-8"
        >
          <Image
            src="/images/WLogo.svg"
            alt="Falcon ERP Logo"
            fill
            priority
            sizes="192px"
            className="object-contain"
          />
        </motion.div>

        {/* One-liner - Below Logo */}
        <motion.p
          className="text-xl md:text-2xl font-semibold max-w-xs px-2 mb-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5, type: "spring", stiffness: 80 }}
        >
          Your Gateway to Enterprise Command.
        </motion.p>

        {/* Lottie Animation in Foreground - large, prominent, but below text content z-index */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <div className="w-full h-full max-w-sm max-h-sm md:max-w-md md:max-h-md flex items-center justify-center">
             <DotLottieReact {...lottieProps} className="object-contain w-full h-full" />
          </div>
        </motion.div>

        {/* --- New Group for Bottom Elements --- */}
        <div className="flex flex-col items-center w-full mt-auto">
          {/* Slide to Enter Button - Right above Copyright */}
          <motion.div
            ref={sliderRef}
            className="relative w-64 h-12 bg-white/10 rounded-full flex items-center justify-start p-2 overflow-hidden cursor-grab flex-shrink-0 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            whileTap={{ cursor: "grabbing" }}
          >
            {/* Fill background */}
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
              layoutId="slide-thumb"
            >
              <ChevronRight size={24} />
            </motion.div>

            {/* Text Overlay */}
            <motion.span
              className="absolute left-1/2 -translate-x-1/2 text-sm md:text-base font-semibold whitespace-nowrap z-10"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.1 }}
              style={{ color: x.get() > 50 ? 'rgba(255,255,255,0.5)' : 'white' }}
            >
              Slide to Enter
            </motion.span>
          </motion.div>

          {/* Copyright by Fedrix MediaLab - Absolute Bottom */}
          <motion.p
            className="text-xs text-gray-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.5 }}
          >
            Powered by{' '}
            <a href="https://www.fedrixgroup.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Fedrix MediaLab
            </a>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
