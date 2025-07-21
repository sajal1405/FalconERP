// src/components/animations/ScrollReveal.tsx
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  /**
   * Optional: Delay before the animation starts (in seconds).
   * @default 0
   */
  delay?: number;
  /**
   * Optional: Duration of the animation (in seconds).
   * @default 0.8
   */
  duration?: number;
  /**
   * Optional: Specifies the percentage of the target element which must be visible
   * in the viewport to trigger the animation.
   * @default 0.1 (10% visible)
   */
  threshold?: number;
  /**
   * Optional: Custom animation variants for more control.
   * If provided, `delay` and `duration` props might be overridden by variant settings.
   */
  variants?: Variants;
  /**
   * Optional: Tailwind CSS classes to apply to the wrapper div.
   */
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  variants,
  className,
}) => {
  // Create a ref to attach to the DOM element we want to observe
  const ref = useRef<HTMLDivElement>(null);

  // useInView hook to detect when the element is in the viewport
  // `once: true` ensures the animation only plays once when it enters the view
  // `amount` is the threshold for visibility (0.1 means 10% of the element must be visible)
  const isInView = useInView(ref, { once: true, amount: threshold });

  // useAnimation hook to manually control the animation
  const controls = useAnimation();

  // useEffect to trigger the animation when the element comes into view
  useEffect(() => {
    if (isInView) {
      // Start the 'visible' animation defined in the variants
      controls.start('visible');
    }
  }, [isInView, controls]); // Dependencies: re-run when isInView or controls change

  // Default animation variants for common reveal effects
  // These can be overridden by the `variants` prop
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 75 }, // Initial state: invisible and slightly below
    visible: { opacity: 1, y: 0 },  // Final state: fully visible and in original position
  };

  return (
    // motion.div is a Framer Motion component that enables animations
    <motion.div
      ref={ref} // Attach the ref to this div
      initial="hidden" // Set the initial animation state
      animate={controls} // Link the animation controls
      variants={variants || defaultVariants} // Use custom variants if provided, otherwise default
      transition={{
        duration, // Animation duration
        delay,    // Animation delay
        ease: 'easeOut', // Easing function for a smoother feel
      }}
      className={className} // Apply any additional Tailwind classes
    >
      {children} {/* Render the children passed to the component */}
    </motion.div>
  );
};

export default ScrollReveal;
