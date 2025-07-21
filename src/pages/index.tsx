// src/pages/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ModuleTile from '../components/common/ModuleTile';
import ScrollDownArrow from '../components/common/ScrollDownArrow';

interface HomePageProps {
  viewportHeight: number;
  topNavHeight: number; // This might be 0 now if TopNav was removed from DefaultLayout
  headerHeight: number; // This is the height of the overall header container (from _app.tsx)
  isMobile: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ viewportHeight, topNavHeight, headerHeight, isMobile }) => {
  const modules = [
    { name: 'Finance & Accounting', icon: 'Calculator' },
    { name: 'Inventory Management', icon: 'Package' },
    { name: 'Purchase Management', icon: 'ShoppingCart' },
    { name: 'Sales Management', icon: 'DollarSign' },
    { name: 'Post Dated Cheques', icon: 'BookOpenCheck' },
    { name: 'Intercompany Transaction', icon: 'GitFork' },
    { name: 'Multi-Currency', icon: 'Scale' },
    { name: 'Letter of Credit (LC) & TR', icon: 'ClipboardList' },
    { name: 'Manufacturing Lite Options', icon: 'Factory' },
    { name: 'Prepaid Expense Recognition', icon: 'Wallet' },
    { name: 'Business Intelligence', icon: 'BarChart2' },
    { name: 'Sales Analysis', icon: 'LineChart' },
  ];

  const calculateHeroHeight = () => {
    return Math.max(0, viewportHeight - headerHeight - (topNavHeight || 0));
  };

  const heroSectionMinHeight = calculateHeroHeight();
  // CRITICAL FIX: Adjusted bottom value to move the arrow further down
  const scrollDownButtonBottom = '-150px'; // Adjusted from 30px to 10px. You can fine-tune this value.

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full relative z-10"
    >
      <section
        className="relative w-full flex flex-col md:flex-row items-center md:items-center md:justify-center px-4 md:px-8 py-0"
        style={{ minHeight: `${heroSectionMinHeight}px` }}
      >
        <motion.div
          className="md:w-[45%] flex items-center justify-center pt-10 pb-6 p-2 md:p-8 mt-0 md:mt-0 order-1 md:order-none"
          initial={{ x: 50, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 1.5, type: 'spring', stiffness: 100, damping: 20 }}
        >
          <Image
            data-cursor="hover"
            src="/images/hero-image.png"
            alt="ERP Dashboard Illustration"
            width={1000}
            height={1000}
            className="w-full h-auto rounded-lg image-glow-shadow transition-transform duration-500 hover:scale-105 max-w-xs md:max-w-full mx-auto"
            priority
          />
        </motion.div>

        <div className="flex flex-col items-start text-left md:items-start md:text-left md:w-[55%] p-2 md:p-8 space-y-4 md:space-y-6 z-10 order-2 md:order-none -mt-10 md:mt-0">
          <motion.h1
            className="text-2xl md:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            style={{ maxWidth: 'min(700px, 90vw)' }}
          >
            Command Your Enterprise with Precision
          </motion.h1>

          <motion.p
            className="text-xs md:text-2xl text-gray-300"
            style={isMobile ? { fontSize: '0.75rem' } : undefined}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            An Intelligent ERP Ecosystem Tailored for the Middle East.
          </motion.p>

          <motion.div
            className="flex flex-row space-x-2 mt-4 md:space-x-4 md:mt-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <button
              data-cursor="hover"
              className="metal-gold-button px-6 py-2 text-base rounded-2xl font-bold relative overflow-hidden group md:px-8 md:py-3 md:text-xl"
            >
              <span className="relative z-10 metal-gold-text-clip">Get Demo</span>
              <span className="absolute inset-0 metal-gold-bg rounded-2xl"></span>
            </button>

            <button
              data-cursor="hover"
              className="glass-button px-6 py-2 text-base rounded-2xl font-bold relative overflow-hidden group md:px-8 md:py-3 md:text-xl"
            >
              <span className="relative z-10 text-white">See Modules</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </button>
          </motion.div>
        </div>

        {/* ScrollDownArrow is conditionally rendered only on desktop based on your original code */}
        {/* It will be at the very bottom of the hero section, offset by scrollDownButtonBottom */}
        {!isMobile && (
          <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: scrollDownButtonBottom }}>
            <ScrollDownArrow targetSectionId="main-modules-section" />
          </div>
        )}
      </section>

      <section id="main-modules-section" className="w-full py-24 mt-16 md:mt-24">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          Main Modules
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center max-w-7xl mx-auto">
          {modules.map((module, index) => (
            <ModuleTile
              key={module.name}
              name={module.name}
              icon={module.icon}
              delay={index * 0.1}
              data-cursor="hover"
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
