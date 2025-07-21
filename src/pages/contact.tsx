import React from 'react';
import { motion } from 'framer-motion';
import SeoHead from '../components/layout-parts/SeoHead';
import ScrollReveal from '../components/animations/ScrollReveal';

const ContactPage: React.FC = () => {
  return (
    <>
      <SeoHead title="Contact Falcon ERP" description="Get in touch with our ERP experts for consultations, demos, and support." />
      <motion.div
        key="contact"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full min-h-screen bg-gray-950 px-4 py-12 md:py-20 flex flex-col items-center justify-start text-white"
      >
        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
            Contact Us
          </h1>
        </ScrollReveal>

        <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-2xl border border-white/10 space-y-6 text-white">
          <ScrollReveal>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold">Your Name</label>
                <input data-cursor="input" id="name" type="text" className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <input data-cursor="input" id="email" type="email" className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold">Message</label>
                <textarea data-cursor="input" id="message" rows={4} className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
              </div>
              <button
                data-cursor="hover"
                type="submit"
                className="mt-4 px-6 py-2 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-700 text-white hover:scale-105 transition-transform"
              >
                Send Message
              </button>
            </form>
          </ScrollReveal>
        </div>
      </motion.div>
    </>
  );
};

export default ContactPage;
