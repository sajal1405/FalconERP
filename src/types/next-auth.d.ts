// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

// Extend the built-in session and user types to include custom properties
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      id?: string;
      isAdmin?: boolean;
      isClient?: boolean;
      role?: string;
      isSuperAdmin?: boolean; // CRITICAL FIX: Add isSuperAdmin
      isEditor?: boolean;     // CRITICAL FIX: Add isEditor
      isTech?: boolean;       // CRITICAL FIX: Add isTech
      // Add any other custom properties you want to expose on the session user object
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object that is returned from a provider and saved to the session.
   */
  interface User extends DefaultUser {
    id?: string;
    isAdmin?: boolean;
    isClient?: boolean;
    role?: string;
    isSuperAdmin?: boolean; // CRITICAL FIX: Add isSuperAdmin
    isEditor?: boolean;     // CRITICAL FIX: Add isEditor
    isTech?: boolean;       // CRITICAL FIX: Add isTech
    // Add any other custom properties you want to store on the user object
  }
}

declare module "next-auth/jwt" {
  /**
   * The shape of the JWT token.
   */
  interface JWT {
    id?: string;
    isAdmin?: boolean;
    isClient?: boolean;
    role?: string;
    isSuperAdmin?: boolean; // CRITICAL FIX: Add isSuperAdmin
    isEditor?: boolean;     // CRITICAL FIX: Add isEditor
    isTech?: boolean;       // CRITICAL FIX: Add isTech
    // Add any other custom properties you want to store in the JWT
  }
}
