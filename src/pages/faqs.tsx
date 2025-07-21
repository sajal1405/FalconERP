// src/pages/faqs.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SeoHead from '../components/layout-parts/SeoHead';
import ScrollReveal from '../components/animations/ScrollReveal';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <SeoHead title="FAQs - Falcon ERP" description="Find answers to the most common questions about Falcon ERP." />
      <motion.div
        key="faqs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full min-h-screen bg-gray-950 px-4 py-12 md:py-20 text-white flex flex-col items-center"
      >
        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
        </ScrollReveal>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : faqs.length === 0 ? (
          <p className="text-center text-gray-400">No FAQs found.</p>
        ) : (
          <div className="w-full max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq.id}>
                <motion.div
                  className="bg-gray-800 rounded-lg p-6 shadow-md border border-cyan-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h2 className="text-xl font-semibold text-cyan-300 mb-2">{faq.question}</h2>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default FAQsPage;
