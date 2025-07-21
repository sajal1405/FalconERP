// src/components/modals/CreateFAQModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

interface CreateFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateFAQModal: React.FC<CreateFAQModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      toast.error('Both question and answer are required.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/faqs/create', { question, answer });
      toast.success('FAQ created successfully!');
      setQuestion('');
      setAnswer('');
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to create FAQ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-md border border-cyan-700 shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">Create New FAQ</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Question</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 bg-gray-800 border border-cyan-500 rounded-md text-white placeholder-gray-400"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter FAQ question"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Answer</label>
                <textarea
                  rows={4}
                  className="w-full mt-1 p-2 bg-gray-800 border border-cyan-500 rounded-md text-white placeholder-gray-400"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter answer"
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 text-sm font-semibold"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateFAQModal;
