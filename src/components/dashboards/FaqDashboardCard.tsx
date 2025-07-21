// src/components/dashboards/FaqDashboardCard.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import CreateFAQModal from '../modals/CreateFAQModal';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const FaqDashboardCard: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/faqs');
      setFaqs(res.data);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
      toast.error('Failed to load FAQs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <>
      <motion.div
        className="bg-gray-900 text-white rounded-xl shadow-lg border border-cyan-800 p-6 flex flex-col justify-between"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h2 className="text-xl font-bold text-cyan-400 mb-2">FAQs</h2>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : faqs.length === 0 ? (
            <p className="text-gray-400 text-sm">No FAQs yet.</p>
          ) : (
            <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
              {faqs.slice(0, 5).map((faq) => (
                <li key={faq.id} className="text-white truncate">
                  • {faq.question}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-cyan-700 hover:bg-cyan-800 rounded-md text-white text-sm font-semibold transition"
        >
          + Create FAQ
        </button>
      </motion.div>

      <CreateFAQModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchFaqs}
      />
    </>
  );
};

export default FaqDashboardCard;
