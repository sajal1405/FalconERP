// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'; // Removed useCallback
import { useSession } from 'next-auth/react';
// Removed: import { useRouter } from 'next/router'; // useRouter is no longer directly used here

// Define the shape of the user object within our application context
interface AppUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: 'admin' | 'client' | 'guest' | string;
  isAdmin: boolean;
  isClient: boolean;
}

// Define the shape of the authentication context
interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  isAdmin: boolean;
  isClient: boolean;
}

// Create the context with a default null value
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AppUser | null>(null);
  // Removed: const router = useRouter(); // router is no longer used here

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const appUser: AppUser = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: (session.user.role || 'guest') as AppUser['role'],
        isAdmin: session.user.isAdmin || false,
        isClient: session.user.isClient || false,
      };
      setUser(appUser);
    } else if (status === 'unauthenticated') {
      setUser(null);
    }
  }, [session, status]);

  const isAuthenticated = status === 'authenticated';
  const isAdmin = user?.isAdmin || false;
  const isClient = user?.isClient || false;

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    status,
    isAdmin,
    isClient,
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
