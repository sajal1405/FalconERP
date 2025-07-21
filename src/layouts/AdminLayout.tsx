// src/layouts/AdminLayout.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth'; // Use the custom auth hook
import { signOut } from 'next-auth/react'; // For logout functionality
import { Home, Users, BookOpen, Settings, LogOut, BarChart2 } from 'lucide-react'; // Example icons

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * AdminLayout Component
 * Provides the layout for the administrative portal.
 * Includes a sidebar for navigation and a top bar with user information and logout.
 * Designed for roles like 'admin', 'superadmin', 'editor', 'tech'.
 */
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  // Prefix unused variables with underscore to satisfy ESLint's no-unused-vars rule
  const { user, isAdmin: _isAdmin, isSuperAdmin: _isSuperAdmin, isEditor: _isEditor, isTech: _isTech } = useAuth(); // Get user and role info

  // Admin navigation items, conditionally rendered based on user roles
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: Home, roles: ['admin', 'superadmin', 'editor', 'tech'] },
    { name: 'User Management', href: '/admin/users', icon: Users, roles: ['superadmin'] },
    { name: 'Content Management', href: '/admin/content', icon: BookOpen, roles: ['admin', 'superadmin', 'editor'] },
    { name: 'Reports', href: '/admin/reports', icon: BarChart2, roles: ['admin', 'superadmin', 'tech'] },
    { name: 'Settings', href: '/admin/settings', icon: Settings, roles: ['superadmin'] },
  ];

  // Function to check if the user has access to a given role
  const hasAccess = (requiredRoles: string[]) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-gray-800 p-4 shadow-lg flex-shrink-0">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          {/* Optional: Mobile sidebar toggle button */}
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            hasAccess(item.roles) && (
              <Link key={item.name} href={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <item.icon size={20} className="text-blue-400" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Admin Top Bar / Header */}
        <header className="bg-gray-800 p-4 shadow-md flex justify-between items-center flex-shrink-0">
          <h1 className="text-xl font-bold text-white">
            {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Guest'} Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Welcome, {user?.name || user?.email || 'Admin'}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })} // Redirect to login after logout
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
