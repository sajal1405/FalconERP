// src/components/header/Header.tsx
import React from 'react';
import { motion } from 'framer-motion'; // Removed AnimatePresence
import Image from 'next/image';
import Link from 'next/link';
import NavItem from './NavItem';
import { Home, Info, Briefcase, HelpCircle, Mail } from 'lucide-react';

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
      // Initial animation for the pill itself
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.8 }} // Slight delay after main header container appears
    >
      {/* Logo on the left side of the pill - Ensure parent div is 'relative' */}
      <Link href="/" passHref>
        <div className="relative w-24 h-6 md:w-28 md:h-7 flex-shrink-0"> {/* Added relative and flex-shrink-0 */}
          <Image
            src="/images/WLogo.svg" // Your white logo
            alt="Falcon ERP Logo"
            fill
            priority
            sizes="112px"
            className="object-contain"
          />
        </div>
      </Link>

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
