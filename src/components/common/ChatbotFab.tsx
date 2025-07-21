// src/components/common/ChatbotFab.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react'; // Chat and close icons

interface ChatbotFabProps {
  bottomOffset: number; // Offset from the bottom of the viewport
  headerHeight: number; // Height of the main header (for mobile adjustment)
  isMobile: boolean; // Flag for mobile view
}

const ChatbotFab: React.FC<ChatbotFabProps> = ({ bottomOffset, headerHeight, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate dynamic bottom position based on mobile view and header height
  const dynamicBottom = isMobile
    ? `${bottomOffset + headerHeight + 16}px` // Adjust for header on mobile
    : `${bottomOffset}px`; // Standard offset for desktop

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chatbot FAB Button */}
      <motion.button
        className="fixed right-4 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        style={{ bottom: dynamicBottom }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 3.5 }} // Delay after preloader
        onClick={toggleChatbot}
        aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
        data-cursor="hover" // Mark for custom cursor hover effect
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chatbot Modal/Panel (simple placeholder) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 z-50 w-80 h-96 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-700 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
              <h3 className="text-white font-semibold">FALCON AI Chat</h3>
              <button onClick={toggleChatbot} className="text-gray-400 hover:text-white" aria-label="Close Chat">
                <X size={20} />
              </button>
            </div>
            <div className="flex-grow p-4 text-gray-300 overflow-y-auto">
              <p>Hello! How can I assist you today?</p>
              {/* Chat messages would go here */}
            </div>
            <div className="p-4 border-t border-zinc-700">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white text-sm"
                data-cursor="input" // Mark for custom cursor input effect
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotFab;
