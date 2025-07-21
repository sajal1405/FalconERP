// src/pages/faqs/index.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import AddFAQModal from '@/components/modals/AddFAQModal';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
}

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/faqs');
      setFaqs(data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <>
      <Head>
        <title>Manage FAQs | FalconERP</title>
      </Head>
      <Toaster position="top-right" />

      <motion.div
        className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-md font-medium transition"
          >
            + Add FAQ
          </button>
        </div>

        {loading ? (
          <div className="text-gray-400">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="text-gray-400 italic">No FAQs found.</div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                className="bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-md transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-semibold text-cyan-400">{faq.question}</h2>
                <p className="text-gray-300 mt-2">{faq.answer}</p>
                <div className="text-xs text-gray-500 mt-2">
                  Created on {new Date(faq.createdAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <AddFAQModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchFaqs}
      />
    </>
  );
};

export default FAQPage;
