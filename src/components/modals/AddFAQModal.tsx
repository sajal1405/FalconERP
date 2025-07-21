// src/components/modals/AddFAQModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

interface AddFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const AddFAQModal: React.FC<AddFAQModalProps> = ({ isOpen, onClose, onRefresh }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      toast.error('Both fields are required.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/faqs', { question, answer });
      toast.success('FAQ added successfully.');
      setQuestion('');
      setAnswer('');
      onRefresh(); // Refresh FAQ list
      onClose();   // Close modal
    } catch (error) {
      console.error(error);
      toast.error('Failed to add FAQ. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-[90%] max-w-lg p-6 text-gray-800 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#00174F]">Add New FAQ</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter the question"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Answer</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter the answer"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-md bg-[#00174F] text-white font-medium hover:bg-[#002A80] transition"
                >
                  {loading ? 'Saving...' : 'Add FAQ'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddFAQModal;
