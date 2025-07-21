// src/pages/dashboard/faqs.tsx
import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

const AdminFaqManager = dynamic(() => import('@/components/modals/AdminFaqManager'), { ssr: false });

const AdminFaqPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Manage FAQs | FalconERP Dashboard</title>
        <meta name="description" content="Admin interface to manage Frequently Asked Questions in FalconERP." />
      </Head>

      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        key="admin-faqs"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen w-full px-6 py-10 bg-gradient-to-tr from-gray-950 via-gray-900 to-black"
      >
        <h1 className="text-4xl font-extrabold text-white text-center mb-10">FAQ Management</h1>
        <AdminFaqManager />
      </motion.div>
    </>
  );
};

export default AdminFaqPage;
