import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Users, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface User {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

const UsersDashboardCard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, created_at')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        toast.error('Failed to fetch users');
        console.error('Supabase Error:', error);
      } else {
        setUsers(data || []);
      }

      setLoading(false);
    };

    fetchUsers();
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
        <Users className="text-cyan-400 w-6 h-6" />
        <h2 className="text-white text-lg font-semibold">New Users</h2>
      </div>

      {loading ? (
        <div className="text-gray-400 animate-pulse text-sm">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-gray-500 text-sm">No users found.</div>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="text-sm text-gray-300 bg-[#0F172A] border border-gray-700 p-3 rounded-md
                         hover:bg-[#1E293B] hover:border-cyan-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <UserCircle className="w-5 h-5 text-cyan-300" />
                <div>
                  <p className="font-medium">
                    {user.full_name || 'Unnamed User'}
                  </p>
                  <p className="text-gray-400 text-xs">{user.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default UsersDashboardCard;
