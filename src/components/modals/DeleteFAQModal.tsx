import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';

interface DeleteFAQModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  faqTitle: string;
}

const DeleteFAQModal: React.FC<DeleteFAQModalProps> = ({ open, onClose, onConfirm, faqTitle }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-zinc-900 text-white w-full max-w-md rounded-xl p-6 shadow-xl border border-zinc-700 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <Trash2 size={48} className="text-red-500" />
              <h2 className="text-xl font-bold">Delete FAQ?</h2>
              <p className="text-sm text-gray-400">
                Are you sure you want to permanently delete the FAQ: <br />
                <span className="text-red-400 font-medium">&quot;{faqTitle}&quot;</span>? {/* Fixed: escaped double quotes */}
              </p>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-700 text-sm transition"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm transition shadow-md"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteFAQModal;