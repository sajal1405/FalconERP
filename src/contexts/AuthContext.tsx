// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

// Define the shape of the user object within our application context
interface AppUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: 'admin' | 'client' | 'guest' | 'superadmin' | 'editor' | 'tech' | string; // CRITICAL: Add new roles to union type
  isAdmin: boolean;
  isClient: boolean;
  isSuperAdmin: boolean; // CRITICAL FIX: Add isSuperAdmin
  isEditor: boolean;     // CRITICAL FIX: Add isEditor
  isTech: boolean;       // CRITICAL FIX: Add isTech
}

// Define the shape of the authentication context
interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  isAdmin: boolean;
  isClient: boolean;
  isSuperAdmin: boolean; // CRITICAL FIX: Add isSuperAdmin
  isEditor: boolean;     // CRITICAL FIX: Add isEditor
  isTech: boolean;       // CRITICAL FIX: Add isTech
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
      // Ensure session.user has the role property before using it
      const userRole = (session.user.role || 'guest') as AppUser['role'];

      const appUser: AppUser = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: userRole,
        isAdmin: session.user.isAdmin || false,
        isClient: session.user.isClient || false,
        isSuperAdmin: session.user.isSuperAdmin || userRole === 'superadmin', // Derive from session or role string
        isEditor: session.user.isEditor || userRole === 'editor',
        isTech: session.user.isTech || userRole === 'tech',
      };
      setUser(appUser);
    } else if (status === 'unauthenticated') {
      setUser(null);
    }
  }, [session, status]);

  // Derive boolean flags for roles from the `user` state
  const isAuthenticated = status === 'authenticated';
  const isAdmin = user?.isAdmin || false;
  const isClient = user?.isClient || false;
  const isSuperAdmin = user?.isSuperAdmin || false; // CRITICAL FIX: Derive from user state
  const isEditor = user?.isEditor || false;         // CRITICAL FIX: Derive from user state
  const isTech = user?.isTech || false;             // CRITICAL FIX: Derive from user state

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    status,
    isAdmin,
    isClient,
    isSuperAdmin, // CRITICAL FIX: Include in context value
    isEditor,     // CRITICAL FIX: Include in context value
    isTech,       // CRITICAL FIX: Include in context value
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
