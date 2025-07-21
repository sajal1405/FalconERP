import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react'; // Use LucideIcon type for better type safety

interface NavItemProps {
  page: string;
  icon: LucideIcon; // Now expecting a LucideIcon component
  isActive: boolean;
  onClick: (page: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ page, icon: Icon, isActive, onClick }) => {
  const itemVariants = {
    active: {
      width: 'auto', // Expands width when active
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8
      }
    },
    inactive: {
      width: '4rem', // Fixed width for icon only (e.g., 64px)
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8
      }
    }
  };

  const textVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.05 } },
    hidden: { opacity: 0, x: -10, transition: { duration: 0.15 } },
  };

  return (
    <motion.button
      className={`relative flex items-center justify-center p-3 rounded-full cursor-pointer transition-colors duration-300
                  ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
      onClick={() => onClick(page)}
      layout // Crucial for animating its own size/position changes
      variants={itemVariants}
      initial={isActive ? "active" : "inactive"}
      animate={isActive ? "active" : "inactive"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ minWidth: '4rem' }}
    >
      {/* Highlight Pill - Now rendered conditionally inside the active NavItem */}
      {isActive && (
        <motion.div
          layoutId="highlight-pill" // Shared layoutId for smooth transition across NavItems
          className="absolute bg-gradient-to-r from-blue-700 to-blue-900 rounded-full inset-0 shadow-lg"
          transition={{ type: "spring", stiffness: 250, damping: 30, mass: 0.8 }}
        />
      )}

      {/* Icon - now using the passed SVG component */}
      <Icon className="w-6 h-6 z-10" /> {/* z-10 to keep icon above highlight */}

      {/* Text - visible only when active, animates in/out */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            className="ml-2 whitespace-nowrap overflow-hidden text-sm md:text-base font-medium z-10"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default NavItem;
