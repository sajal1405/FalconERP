// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Uncomment if using Prisma with NextAuth
// import prisma from "../../../lib/db"; // Your Prisma client instance (ensure this path is correct)
import { AppUser } from '../../../contexts/AuthContext'; // Import AppUser interface for type safety

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, _req) { // _req is unused, so prefixed
        // Add your actual authentication logic here.
        // This is where you would typically query your database (e.g., using Prisma)
        // to verify the user's credentials.

        // Example with Prisma:
        // const user = await prisma.user.findUnique({
        //   where: { email: credentials.email },
        // });
        // if (user && await verifyPassword(credentials.password, user.hashedPassword)) {
        //   return { id: user.id, email: user.email, name: user.name, role: user.role };
        // } else {
        //   return null; // Return null if user not found or password doesn't match
        // }

        // --- MOCK AUTHENTICATION LOGIC FOR DEMONSTRATION ---
        // Replace this with your actual user validation
        if (credentials?.email === "test@example.com" && credentials?.password === "password") {
          // Return a user object that will be saved in the JWT and session
          // IMPORTANT: Ensure 'id' and 'role' are included here, as they are used in AuthContext
          const user: AppUser = { // Explicitly type the user object
            id: "user_12345", // Unique user ID
            name: "Test User",
            email: "test@example.com",
            role: "admin", // Assign a role for testing (e.g., 'admin', 'client', 'guest')
            image: "https://placehold.co/40x40/00174F/FFFFFF?text=TU" // Mock user image
          };
          return user;
        }
        // If you return null, the user will be prompted to log in again.
        return null;
      }
    })
    // Add other providers here (e.g., GoogleProvider, GitHubProvider)
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    // })
  ],

  // Optional: Add a database adapter if you want to persist user sessions in a database
  // adapter: PrismaAdapter(prisma), // Uncomment if using Prisma adapter

  // Callbacks are used to control what happens when a JWT is created, updated, or a session is accessed.
  callbacks: {
    // The `jwt` callback is called whenever a JSON Web Token is created or updated.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, user, account, profile }) { // Corrected: use actual parameter names and disable ESLint
      // `user` is present on first sign in
      if (user) {
        token.id = user.id;
        // Directly assign role from user, which is already typed as AppUser
        token.role = (user as AppUser).role; // Cast to AppUser to access custom 'role' property
      }
      // `account` and `profile` are available here but not used in this mock.
      // The eslint-disable-next-line comment above handles the unused variable warning.
      return token;
    },
    // The `session` callback is called whenever a session is checked.
    async session({ session, token }) {
      // Add custom properties to the session object
      if (token) {
        session.user.id = token.id as string;
        // Ensure the role type matches the union type defined in AppUser
        session.user.role = token.role as AppUser['role'];
      }
      return session;
    }
  },

  // Custom pages for authentication flow
  pages: {
    signIn: '/auth/login', // Specify your custom login page
    // signOut: '/auth/logout', // Optional: custom logout page
    // error: '/auth/error', // Optional: custom error page
    // newUser: '/auth/register', // Optional: custom new user registration page
  },

  // Session configuration
  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Secret for NextAuth.js (generate a strong one for production)
  secret: process.env.NEXTAUTH_SECRET,

  // Debug mode for development
  debug: process.env.NODE_ENV === 'development',
});
