// src/layouts/ClientLayout.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth'; // Use the custom auth hook
import { signOut } from 'next-auth/react'; // For logout functionality
import { Home, LifeBuoy, MessageSquare, User, Download, LogOut } from 'lucide-react'; // Example icons

interface ClientLayoutProps {
  children: ReactNode;
}

/**
 * ClientLayout Component
 * Provides the layout for the client portal.
 * Includes a sidebar for navigation and a top bar with user information and logout.
 * Designed for the 'client' role.
 */
const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { user } = useAuth(); // Get user info

  const navItems = [
    { name: 'Dashboard', href: '/client', icon: Home },
    { name: 'Support Tickets', href: '/client/support', icon: LifeBuoy },
    { name: 'AI Chat', href: '/client/chat', icon: MessageSquare },
    { name: 'My Profile', href: '/client/profile', icon: User },
    { name: 'Downloads', href: '/client/downloads', icon: Download },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col lg:flex-row">
      {/* Client Sidebar */}
      <aside className="w-full lg:w-56 bg-gray-800 p-4 shadow-lg flex-shrink-0">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold text-white">Client Portal</h2>
          {/* Optional: Mobile sidebar toggle button */}
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition-colors duration-200">
              <item.icon size={20} className="text-green-400" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Client Top Bar / Header */}
        <header className="bg-gray-800 p-4 shadow-md flex justify-between items-center flex-shrink-0">
          <h1 className="text-xl font-bold text-white">Client Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Welcome, {user?.name || user?.email || 'Client'}</span>
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

export default ClientLayout;
