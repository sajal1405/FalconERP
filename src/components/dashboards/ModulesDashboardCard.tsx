import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileText } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Module {
  id: string;
  name: string;
  category: string | null;
  created_at: string;
}

const ModulesDashboardCard: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('modules')
        .select('id, name, category, created_at')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        toast.error('Failed to load modules');
        console.error('Supabase Error:', error);
      } else {
        setModules(data || []);
      }

      setLoading(false);
    };

    fetchModules();
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
        <LayoutDashboard className="text-cyan-400 w-6 h-6" />
        <h2 className="text-white text-lg font-semibold">Recent Modules</h2>
      </div>

      {loading ? (
        <div className="text-gray-400 animate-pulse text-sm">Loading modules...</div>
      ) : modules.length === 0 ? (
        <div className="text-gray-500 text-sm">No modules available.</div>
      ) : (
        <ul className="space-y-3">
          {modules.map((mod) => (
            <li
              key={mod.id}
              className="text-sm text-gray-300 bg-[#0F172A] border border-gray-700 p-3 rounded-md
                         hover:bg-[#1E293B] hover:border-cyan-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyan-300" />
                <div>
                  <p className="font-medium">{mod.name}</p>
                  {mod.category && (
                    <p className="text-xs text-gray-400">{mod.category}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default ModulesDashboardCard;
