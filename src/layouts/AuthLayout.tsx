// D:\FALCONERP\src\layouts\AuthLayout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode; // The content of the authentication page
}

/**
 * AuthLayout Component
 * A minimal layout for authentication pages (login, register, etc.).
 * It provides a consistent, full-screen background and centers the child content.
 * Enhanced for dynamic responsiveness, branding, and a professional look.
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    // Outer container: Ensure it always takes full viewport height and width.
    // Increased padding for overall responsiveness, especially on smaller screens.
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-950 text-white font-inter relative overflow-hidden p-4 sm:p-6 md:p-8 lg:p-12">
      {/* Background gradient: Ensures it covers the entire container seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1128] via-[#00174F] to-[#0A1128] opacity-90"></div>
      {/* Optional: subtle dot pattern - removed for now to avoid "extra box" issue */}
      {/* <div className="absolute inset-0 bg-pattern-dots opacity-10"></div> */}

      {/* Main content container (the login card itself) */}
      <motion.div
        // Responsive max-width:
        // max-w-sm on small screens, growing to max-w-md, max-w-lg, max-w-xl
        className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl
                   mx-auto p-6 md:p-8 bg-[#0C1125] rounded-xl shadow-2xl border border-blue-900
                   flex flex-col items-center"
        
        // Dynamic minimum height:
        // Ensures the card has a reasonable height, especially on mobile landscape.
        // It will be 80vh or 600px, whichever is smaller, allowing content to stretch vertically.
        style={{ minHeight: 'min(80vh, 600px)' }}
        
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        {/* Falcon ERP Logo - Centered and prominent */}
        {/* >>> CRITICAL: Ensure 'relative' is on this parent div for Image fill prop <<< */}
        <div className="relative w-40 h-10 mb-8 sm:w-48 sm:h-12 md:w-56 md:h-14 flex-shrink-0">
          <Image
            src="/images/WLogo.svg" // Assuming this is your white logo
            alt="FALCON ERP Logo"
            fill // Fills the parent div, maintaining aspect ratio
            priority // Prioritize loading for LCP
            className="object-contain"
            sizes="(max-width: 768px) 160px, (max-width: 1200px) 192px, 224px"
          />
        </div>

        {children} {/* Renders the content passed to the layout (e.g., login form) */}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
