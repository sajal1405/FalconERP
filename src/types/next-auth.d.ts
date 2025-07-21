// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth"; // Removed NextAuth
// Removed: import { JWT } from "next-auth/jwt"; // JWT import is not strictly needed here for declaration merging

// Extend the built-in session and user types to include custom properties
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      id?: string; // Add user ID if you store it
      isAdmin?: boolean; // Custom property for admin role
      isClient?: boolean; // Custom property for client role
      // Add any other custom properties you want to expose on the session user object
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object that is returned from a provider and saved to the session.
   */
  interface User extends DefaultUser {
    id?: string; // Add user ID
    isAdmin?: boolean; // Custom property for admin role
    isClient?: boolean; // Custom property for client role
    // Add any other custom properties you want to store on the user object
  }
}

declare module "next-auth/jwt" {
  /**
   * The shape of the JWT token.
   */
  interface JWT {
    id?: string; // Add user ID to JWT
    isAdmin?: boolean; // Custom property for admin role in JWT
    isClient?: boolean; // Custom property for client role in JWT
    // Add any other custom properties you want to store in the JWT
  }
}
