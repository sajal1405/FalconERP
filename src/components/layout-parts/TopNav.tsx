// src/components/layout-parts/TopNav.tsx
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TopNav: React.FC = () => {
  return (
    <motion.div
      className="bg-zinc-800 text-gray-400 text-xs py-2 px-4 md:px-8 flex items-center justify-between"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {/* Contact Info */}
      <div className="flex items-center space-x-4">
        <span className="flex items-center gap-1">
          <Mail size={14} /> info@falconerp.com
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <Phone size={14} /> +971 50 123 4567
        </span>
        <span className="hidden md:flex items-center gap-1">
          <MapPin size={14} /> Dubai, UAE
        </span>
      </div>

      {/* Quick Links / Social Media (Placeholder) */}
      <div className="flex items-center space-x-4">
        <Link href="/support" className="hover:text-white transition-colors" data-cursor="hover">Support</Link>
        <Link href="/careers" className="hover:text-white transition-colors" data-cursor="hover">Careers</Link>
        {/* Add social media icons here if desired */}
      </div>
    </motion.div>
  );
};

export default TopNav;
