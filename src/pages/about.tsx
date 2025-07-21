// src/pages/about.tsx
import React from 'react';
import { motion } from 'framer-motion';
import SeoHead from '../components/layout-parts/SeoHead'; // Corrected import path
import ScrollReveal from '../components/animations/ScrollReveal';

const AboutPage: React.FC = () => {
  return (
    <>
      {/* SeoHead component for SEO optimization */}
      <SeoHead
        title="About Falcon ERP"
        description="Discover our vision, mission, and commitment to enterprise excellence in the Middle East."
        ogUrl="https://www.falconerp.com/about" // Specific URL for the About page
      />
      <motion.div
        key="about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full min-h-screen bg-gray-950 px-4 py-12 md:py-20 flex flex-col items-center justify-start text-white"
      >
        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
            About Falcon ERP
          </h1>
        </ScrollReveal>

        <div className="max-w-4xl text-lg md:text-xl text-center text-gray-300 space-y-6">
          <ScrollReveal>
            <p>
              Falcon ERP is built with precision to serve the diverse and demanding business needs of companies in the Middle East. We blend advanced technology with deep regional insights to create a system that empowers you to manage finance, operations, logistics, manufacturing, and intelligence—all in one secure suite.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p>
              With over a decade of domain expertise, our platform has become the preferred choice for trading, manufacturing, construction, automotive, and consultancy businesses across the UAE, Saudi Arabia, Qatar, Oman, and beyond.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p>
              Our mission is to bring transparency, control, and growth enablement to every department, making complex operations feel simple and fluid.
            </p>
          </ScrollReveal>
        </div>
      </motion.div>
    </>
  );
};

export default AboutPage;
