// src/contexts/UIContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For modal animations

// Define the shape of the UIContext value
interface UIContextType {
  showModal: (content: React.ReactNode, options?: { title?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) => void;
  hideModal: () => void;
  // Add other global UI states like global loading, sidebar toggle, etc.
}

// Create the UIContext with an initial undefined value
const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

/**
 * UIProvider Component
 * Provides global UI state and functions (e.g., modal management) to the application.
 * It includes a basic Modal component that can be triggered from anywhere in the app.
 */
export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>('Information');
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  // Function to show a global modal
  const showModal = useCallback((content: React.ReactNode, options?: { title?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
    setModalContent(content);
    setModalTitle(options?.title || 'Information');
    setModalSize(options?.size || 'md');
    setIsModalOpen(true);
  }, []);

  // Function to hide the global modal
  const hideModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null); // Clear content on hide
    setModalTitle('Information');
    setModalSize('md');
  }, []);

  // Memoize the context value
  const contextValue = useMemo(() => ({
    showModal,
    hideModal,
  }), [showModal, hideModal]);

  // Determine modal width based on size prop
  const modalWidthClass = useMemo(() => {
    switch (modalSize) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-xl';
      default: return 'max-w-md';
    }
  }, [modalSize]);

  return (
    <UIContext.Provider value={contextValue}>
      {children}

      {/* Global Modal Component (simple implementation) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`bg-zinc-900 text-white w-full ${modalWidthClass} rounded-xl p-6 shadow-xl border border-zinc-700 relative`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              <button
                onClick={hideModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
                aria-label="Close"
              >
                {/* Using inline SVG for X icon to avoid Lucide import here */}
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
              <div>{modalContent}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </UIContext.Provider>
  );
};

/**
 * Custom hook to consume the UIContext.
 * Throws an error if used outside of a UIProvider.
 */
export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
