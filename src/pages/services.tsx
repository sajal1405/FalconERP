import React from 'react';
import { motion } from 'framer-motion';
import SeoHead from '../components/layout-parts/SeoHead';
import ScrollReveal from '../components/animations/ScrollReveal';

const ServicesPage: React.FC = () => {
  return (
    <>
      <SeoHead title="ERP Services" description="Explore Falcon ERP’s modular and industry-specific services crafted for the Middle East." />
      <motion.div
        key="services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full min-h-screen bg-gray-950 px-4 py-12 md:py-20 flex flex-col items-center justify-start text-white"
      >
        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
            Our ERP Services
          </h1>
        </ScrollReveal>

        <div className="max-w-5xl text-lg md:text-xl text-center text-gray-300 space-y-6">
          <ScrollReveal>
            <p>
              Falcon ERP offers a suite of modular services to optimize every core business function. From Finance and Inventory to Manufacturing and HR, our platform is tailored to meet the diverse demands of businesses operating in dynamic Gulf markets.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p>
              Each module is engineered for performance, scalability, and compliance—whether you’re a startup or a multi-entity enterprise.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <ul className="list-disc list-inside text-left max-w-3xl mx-auto text-base md:text-lg space-y-1">
              <li data-cursor="hover">Real-time financial consolidation & reporting</li>
              <li data-cursor="hover">Multi-currency, multi-company ERP handling</li>
              <li data-cursor="hover">Integrated Sales, CRM & Procurement workflows</li>
              <li data-cursor="hover">Manufacturing BOMs, Work Orders, and Production control</li>
              <li data-cursor="hover">AI-assisted forecasting and anomaly detection</li>
            </ul>
          </ScrollReveal>
        </div>
      </motion.div>
    </>
  );
};

export default ServicesPage;
