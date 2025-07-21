// src/pages/dashboard/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';

const FaqDashboardCard = dynamic(() => import('@/components/dashboards/FaqDashboardCard'), {
  ssr: false,
});

const DashboardHome: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dashboard | FalconERP</title>
        <meta name="description" content="FalconERP Admin Dashboard Overview" />
      </Head>

      <motion.div
        key="dashboard"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen w-full px-6 py-10 bg-gradient-to-tr from-gray-950 via-gray-900 to-black"
      >
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Admin Dashboard</h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <FaqDashboardCard />
          {/* Future: Add <ModulesDashboardCard />, <UsersDashboardCard />, etc. */}
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard/faqs">
            <span className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-6 py-3 rounded-xl transition duration-300 shadow-lg hover:scale-105">
              Manage FAQs
            </span>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default DashboardHome;
