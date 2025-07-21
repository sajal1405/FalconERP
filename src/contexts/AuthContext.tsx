// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

// Define the shape of the user object within our application context
// CRITICAL FIX: Ensure 'export' keyword is present here
export interface AppUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: 'admin' | 'client' | 'guest' | 'superadmin' | 'editor' | 'tech' | string;
  isAdmin: boolean;
  isClient: boolean;
  isSuperAdmin: boolean;
  isEditor: boolean;
  isTech: boolean;
}

// Define the shape of the authentication context
interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  isAdmin: boolean;
  isClient: boolean;
  isSuperAdmin: boolean;
  isEditor: boolean;
  isTech: boolean;
}

// Create the context with a default null value
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const userRole = (session.user.role || 'guest') as AppUser['role'];

      const appUser: AppUser = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: userRole,
        isAdmin: session.user.isAdmin || false,
        isClient: session.user.isAdmin || userRole === 'admin' || userRole === 'superadmin', // Ensure isAdmin is derived from session or role
        isSuperAdmin: session.user.isSuperAdmin || userRole === 'superadmin',
        isEditor: session.user.isEditor || userRole === 'editor',
        isTech: session.user.isTech || userRole === 'tech',
      };
      setUser(appUser);
    } else if (status === 'unauthenticated') {
      setUser(null);
    }
  }, [session, status]);

  const isAuthenticated = status === 'authenticated';
  const isAdmin = user?.isAdmin || false;
  const isClient = user?.isClient || false; // This should be derived from the user object
  const isSuperAdmin = user?.isSuperAdmin || false;
  const isEditor = user?.isEditor || false;
  const isTech = user?.isTech || false;

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    status,
    isAdmin,
    isClient,
    isSuperAdmin,
    isEditor,
    isTech,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
