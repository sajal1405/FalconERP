import React from 'react';
import { motion } from 'framer-motion';
import {
  Calculator, Package, ShoppingCart, DollarSign,
  BookOpenCheck, GitFork, Scale, ClipboardList,
  AlertCircle, Factory, Wallet, BarChart2, LineChart,
  Users, Briefcase, Puzzle, Building, Car, Lightbulb,
  ShieldCheck, Handshake, MapPin, LayoutGrid, User,
} from 'lucide-react';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Calculator, Package, ShoppingCart, DollarSign,
  BookOpenCheck, GitFork, Scale, ClipboardList,
  Factory, Wallet, BarChart2, LineChart,
  Users, Briefcase, Puzzle, Building, Car, Lightbulb,
  ShieldCheck, Handshake, MapPin, LayoutGrid, User,
};

interface ModuleTileProps {
  name: string;
  icon: string;
  delay: number;
}

const ModuleTile: React.FC<ModuleTileProps> = ({ name, icon, delay }) => {
  const IconComponent = iconMap[icon] || AlertCircle;

  return (
    <motion.div
      // Mobile (default): flex-col, icon above text, centered, square-like.
      // Desktop (md: and up): flex-row, icon left, text right, left-aligned.
      className="relative flex flex-col items-center justify-center /* Mobile: column, centered */
                 md:flex-row md:items-center md:justify-start /* Desktop: row, left-aligned */
                 p-5 rounded-2xl
                 module-tile-base /* Use custom class for animatable base background/border */
                 overflow-hidden
                 cursor-pointer group
                 w-full h-full min-h-[140px] aspect-square md:aspect-auto" /* Added aspect-square for mobile */
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: delay }} // Initial mount transition
      // Smoother, faster hover effects using spring transitions
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 40px rgba(50,100,250,0.6), 0 0 20px rgba(255,255,255,0.2)',
        borderColor: '#007bff',
        backgroundColor: 'rgba(255,255,255,0.08)', // Directly use rgba for animatable background color
        transition: { type: "spring", stiffness: 300, damping: 20, duration: 0.15 } // Quicker spring transition
      }}
      // Touch optimized animation for mobile (while tapping)
      whileTap={{
        scale: 0.95,
        boxShadow: '0 0 10px rgba(50,100,250,0.3)',
        borderColor: '#0056b3',
        transition: { type: "spring", stiffness: 400, damping: 25, duration: 0.1 } // Even quicker spring transition
      }}
    >
      {/* Icon Container with gold stroke box styling */}
      {/* Adjusted margins for responsive layout */}
      <div className="icon-gold-stroke-box flex-shrink-0 flex items-center justify-center p-2 mb-2 md:mb-0 md:mr-4">
        {IconComponent && (
          <IconComponent className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-150" />
        )}
      </div>

      {/* Module Name */}
      {/* Adjusted text alignment for responsive layout */}
      <h3 className="text-base font-normal text-white text-center md:text-left leading-tight flex-grow">
        {name}
      </h3>

      {/* Subtle background glow on hover - ensure this also transitions faster */}
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-150 rounded-2xl"></span>
    </motion.div>
  );
};

export default ModuleTile;
