import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Layers, Globe, RefreshCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface StatItem {
  id: string;
  label: string;
  value: number;
  icon: JSX.Element;
}

const QuickStatsPanel: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/stats');
        const { modules, users, industries, updates } = res.data;

        const formatted: StatItem[] = [
          {
            id: 'modules',
            label: 'Modules',
            value: modules,
            icon: <Layers className="w-5 h-5 text-cyan-400" />,
          },
          {
            id: 'users',
            label: 'Users',
            value: users,
            icon: <Users className="w-5 h-5 text-cyan-400" />,
          },
          {
            id: 'industries',
            label: 'Industries',
            value: industries,
            icon: <Globe className="w-5 h-5 text-cyan-400" />,
          },
          {
            id: 'updates',
            label: 'Recent Updates',
            value: updates,
            icon: <RefreshCcw className="w-5 h-5 text-cyan-400" />,
          },
        ];

        setStats(formatted);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch quick stats.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {loading
        ? Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#0C1125] animate-pulse rounded-xl h-24 w-full border border-gray-800"
            />
          ))
        : stats.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center bg-[#0C1125] border border-blue-900 rounded-xl p-4 shadow hover:shadow-cyan-800/20 transition-all duration-300"
            >
              <div className="p-2 bg-cyan-900/20 rounded-full mr-4">{stat.icon}</div>
              <div>
                <p className="text-white text-xl font-bold">{stat.value.toLocaleString()}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
    </motion.div>
  );
};

export default QuickStatsPanel;
