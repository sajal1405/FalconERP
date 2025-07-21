// src/components/faq/EditFAQModal.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; // Removed AxiosError from here

interface EditFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  faqId: number;
  initialQuestion: string;
  initialAnswer: string;
  onSave: () => void;
}

const EditFAQModal: React.FC<EditFAQModalProps> = ({
  isOpen,
  onClose,
  faqId,
  initialQuestion,
  initialAnswer,
  onSave,
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuestion(initialQuestion);
      setAnswer(initialAnswer);
      setError(null);
    }
  }, [isOpen, initialQuestion, initialAnswer]);

  const handleUpdate = async () => {
    if (!question.trim() || !answer.trim()) {
      setError('Both fields are required.');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`/api/faqs/${faqId}`, {
        question,
        answer,
      });
      onSave();
      onClose();
    } catch (err) {
      console.error('Update failed:', err);
      if (axios.isAxiosError(err)) { // This still works as isAxiosError is a method on the axios object
        setError(err.response?.data?.message || 'Update failed due to network error.');
      } else if (err instanceof Error) {
        setError(err.message || 'An unexpected error occurred.');
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-[#0A0A0A] rounded-2xl shadow-lg w-full max-w-xl p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Edit FAQ</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md text-sm bg-white dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Answer</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={4}
                  className="w-full border px-3 py-2 rounded-md text-sm bg-white dark:bg-gray-900 dark:text-white"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                className="px-4 py-2 rounded-md border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditFAQModal;