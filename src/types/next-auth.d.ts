// src/types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
import { AppUser } from '../contexts/AuthContext'; // Import AppUser interface

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Session {
    user: AppUser & DefaultSession["user"]; // Merge DefaultSession user with your AppUser
  }

  /**
   * The shape of the user object that is returned from the `authorize` callback
   * in `CredentialsProvider` or from other providers.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User extends AppUser {} // Extend the default NextAuth User with your AppUser properties
}

declare module "next-auth/jwt" {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface JWT extends AppUser {} // Extend the default JWT with your AppUser properties
}
