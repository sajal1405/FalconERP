// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useSession } from 'next-auth/react'; // Integrate with NextAuth.js

// Define the shape of the user object (extend as needed with your Prisma User model)
export interface AppUser { // Exported for use in other types/components
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: 'guest' | 'client' | 'admin' | 'superadmin' | 'editor' | 'tech'; // Define your roles
}

// Define the shape of the AuthContext value
interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isClient: boolean;
  isAdmin: boolean; // Includes 'admin' and 'superadmin'
  isSuperAdmin: boolean;
  isEditor: boolean;
  isTech: boolean;
  status: 'loading' | 'authenticated' | 'unauthenticated'; // NextAuth.js session status
}

// Create the AuthContext with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component
 * Provides authentication state and user roles to the entire application.
 * It consumes the NextAuth.js session and derives derived authentication states.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession(); // Get session data and status from NextAuth.js

  // Derive user roles and authentication status from the session
  const user: AppUser | null = useMemo(() => {
    if (status === 'authenticated' && session?.user) {
      // Ensure the user object from session matches AppUser structure
      // IMPORTANT: Ensure your NextAuth.js callbacks add 'id' and 'role' to session.user
      return {
        id: session.user.id as string,
        email: session.user.email as string,
        name: session.user.name,
        image: session.user.image,
        role: (session.user.role || 'guest') as AppUser['role'], // Default to 'guest' if role is not set
      };
    }
    return null;
  }, [session, status]);

  const isAuthenticated = status === 'authenticated';
  const userRole = user?.role || 'guest';

  const isGuest = !isAuthenticated;
  const isClient = userRole === 'client';
  const isAdmin = userRole === 'admin' || userRole === 'superadmin';
  const isSuperAdmin = userRole === 'superadmin';
  const isEditor = userRole === 'editor';
  const isTech = userRole === 'tech';

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    isAuthenticated,
    isGuest,
    isClient,
    isAdmin,
    isSuperAdmin,
    isEditor,
    isTech,
    status,
  }), [user, isAuthenticated, isGuest, isClient, isAdmin, isSuperAdmin, isEditor, isTech, status]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to consume the AuthContext.
 * Throws an error if used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
