// src/components/header/Header.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, Briefcase, HelpCircle, Mail } from 'lucide-react'; // Lucide icons for nav items

import NavItem from './NavItem';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

// Header Component - This now represents ONLY the central pill-shaped navigation
const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { name: 'home', icon: Home },
    { name: 'about', icon: Info },
    { name: 'services', icon: Briefcase },
    { name: 'faqs', icon: HelpCircle },
    { name: 'contact', icon: Mail },
  ];

  return (
    <motion.header
      // This class defines the pill shape, background, border, and shadow for the NAVIGATION ITSELF
      className="p-2 md:p-3 rounded-full shadow-3xl ring-2 ring-indigo-500/50 holographic-background
                 flex items-center justify-center gap-2 w-fit h-20 /* Explicit h-20 (80px) for consistent measurement */
                 mx-auto"
      // Initial animation for the pill itself (this will now be part of a larger container's animation)
      initial={{ scale: 0.8, opacity: 0 }} // Keep initial state for individual pill animation
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.8 }}
    >
      <div className="relative flex items-center justify-around w-full">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            page={item.name}
            icon={item.icon} // Pass the Lucide icon component
            isActive={activePage === item.name}
            onClick={setActivePage}
          />
        ))}
      </div>
    </motion.header>
  );
};

export default Header;
