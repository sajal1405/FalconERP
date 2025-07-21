import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface LogEntry {
  id: string;
  action: string;
  user_name: string;
  created_at: string;
}

const ActivityLogsCard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('activity_logs')
        .select('id, action, user_name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        toast.error('Failed to load activity logs');
        console.error('Supabase Log Error:', error);
      } else {
        setLogs(data || []);
      }

      setLoading(false);
    };

    fetchLogs();
  }, []);

  return (
    <motion.div
      className="col-span-1 bg-[#0C1125] border border-blue-900 rounded-xl p-4 shadow-md
                 hover:shadow-cyan-800/30 hover:-translate-y-1 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Clock className="text-cyan-400 w-5 h-5" />
        <h2 className="text-white text-lg font-semibold">Recent Activity</h2>
      </div>

      {loading ? (
        <div className="text-gray-400 animate-pulse text-sm">Loading activity logs...</div>
      ) : logs.length === 0 ? (
        <div className="text-gray-500 text-sm">No recent activity.</div>
      ) : (
        <ul className="space-y-3">
          {logs.map((log) => (
            <li
              key={log.id}
              className="text-sm text-gray-300 bg-[#0F172A] border border-gray-700 p-3 rounded-md
                         hover:bg-[#1E293B] hover:border-cyan-600 transition-colors"
            >
              <div className="flex justify-between">
                <p className="font-medium">{log.action}</p>
                <span className="text-xs text-gray-400">{dayjs(log.created_at).fromNow()}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">By {log.user_name}</p>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default ActivityLogsCard;
