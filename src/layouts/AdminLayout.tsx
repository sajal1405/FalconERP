// src/layouts/AdminLayout.tsx
import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home, Users, Settings, BarChart2, BookOpen, FileText, Package, ShoppingCart,
  DollarSign, ClipboardList, Factory, Wallet, LineChart, LogOut, ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAdmin: _isAdmin, isSuperAdmin: _isSuperAdmin, isEditor: _isEditor, isTech: _isTech } = useAuth(); // Get user and role info
  const router = useRouter();

  // Admin navigation items, conditionally rendered based on user roles
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/admin/dashboard', roles: ['superadmin', 'editor', 'tech'] },
    { name: 'User Management', icon: Users, path: '/admin/users', roles: ['superadmin'] },
    { name: 'Settings', icon: Settings, path: '/admin/settings', roles: ['superadmin', 'tech'] },
    { name: 'Analytics', icon: BarChart2, path: '/admin/analytics', roles: ['superadmin', 'editor'] },
    { name: 'FAQs Management', icon: BookOpen, path: '/admin/faqs', roles: ['superadmin', 'editor'] },
    { name: 'Reports', icon: FileText, path: '/admin/reports', roles: ['superadmin', 'editor', 'tech'] },
    // Module-specific navigation (example, adjust as per your actual modules)
    { name: 'Finance', icon: DollarSign, path: '/admin/finance', roles: ['superadmin', 'editor'] },
    { name: 'Inventory', icon: Package, path: '/admin/inventory', roles: ['superadmin', 'tech'] },
    { name: 'Purchases', icon: ShoppingCart, path: '/admin/purchases', roles: ['superadmin', 'editor'] },
    { name: 'Sales', icon: LineChart, path: '/admin/sales', roles: ['superadmin', 'editor'] },
    { name: 'Cheques', icon: ClipboardList, path: '/admin/cheques', roles: ['superadmin', 'editor'] },
    { name: 'Manufacturing', icon: Factory, path: '/admin/manufacturing', roles: ['superadmin', 'tech'] },
    { name: 'Prepaid', icon: Wallet, path: '/admin/prepaid', roles: ['superadmin', 'editor'] },
  ];

  // Filter navigation items based on the user's role
  const filteredNavItems = navItems.filter(item => {
    if (!user || !user.role) return false; // No user or role, no access

    // Check if user's role is included in the item's allowed roles
    return item.roles.includes(user.role);
  });

  // Redirect if user is not authenticated or not an admin
  // This check is already done in _app.tsx, but can be a fallback
  if (!user || !user.isAdmin) {
    // router.push('/auth/login'); // This redirection logic is handled by _app.tsx
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <p>Access Denied. Please log in with appropriate credentials.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar Navigation */}
      <motion.aside
        className="w-64 bg-gray-950 p-6 flex flex-col shadow-lg border-r border-gray-800"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/admin/dashboard" passHref>
            <div className="relative w-36 h-10">
              <Image src="/images/WLogo.svg" alt="Admin Logo" fill className="object-contain" />
            </div>
          </Link>
        </div>

        {/* User Info */}
        {user && (
          <div className="text-center mb-8 pb-4 border-b border-gray-700">
            <p className="font-semibold text-lg">{user.name || 'Admin User'}</p>
            <p className="text-sm text-gray-400 capitalize">{user.role}</p>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-grow space-y-2">
          {filteredNavItems.map((item) => (
            <Link key={item.name} href={item.path} passHref>
              <motion.a
                className={`flex items-center p-3 rounded-lg transition-colors duration-200
                  ${router.pathname.startsWith(item.path) ? 'bg-blue-700 text-white shadow-md' : 'hover:bg-gray-800 text-gray-300'}
                `}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon size={20} className="mr-3" />
                <span className="font-medium">{item.name}</span>
                {router.pathname.startsWith(item.path) && (
                  <ChevronRight size={18} className="ml-auto text-white" />
                )}
              </motion.a>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-8">
          <Link href="/api/auth/signout" passHref>
            <motion.a
              className="flex items-center p-3 rounded-lg bg-red-600 text-white w-full justify-center
                hover:bg-red-700 transition-colors duration-200 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </motion.a>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
