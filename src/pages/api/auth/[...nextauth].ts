// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AppUser } from '../../../contexts/AuthContext'; // Import AppUser interface for type safety

// import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Uncomment if using Prisma with NextAuth
// import prisma from "../../../lib/db"; // Your Prisma client instance (ensure this path is correct)

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, _req) {
                // CRITICAL FIX: Restructured authorize logic for correct type narrowing and flow

                // 1. Check for Admin User
                if (credentials?.email === "admin@example.com" && credentials?.password === "adminpass") {
                    const user: AppUser = {
                        id: "admin_123",
                        name: "Admin User",
                        email: "admin@example.com",
                        role: "superadmin", // Assign 'superadmin' role
                        image: "https://placehold.co/40x40/000000/FFFFFF?text=AD",
                        isAdmin: true,
                        isClient: false,
                        isSuperAdmin: true,
                        isEditor: false,
                        isTech: false,
                    };
                    return user;
                }
                // 2. Check for Client User
                else if (credentials?.email === "client@example.com" && credentials?.password === "clientpass") {
                    const user: AppUser = {
                        id: "client_123",
                        name: "Client User",
                        email: "client@example.com",
                        role: "client", // Assign 'client' role
                        image: "https://placehold.co/40x40/000000/FFFFFF?text=CL",
                        isAdmin: false,
                        isClient: true,
                        isSuperAdmin: false,
                        isEditor: false,
                        isTech: false,
                    };
                    return user;
                }
                // 3. Check for Test User (Guest)
                else if (credentials?.email === "test@example.com" && credentials?.password === "password") {
                    const user: AppUser = {
                        id: "user_12345",
                        name: "Test User",
                        email: "test@example.com",
                        role: "guest", // Default role for this test user
                        image: "https://placehold.co/40x40/000000/FFFFFF?text=TU",
                        isAdmin: false,
                        isClient: false,
                        isSuperAdmin: false,
                        isEditor: false,
                        isTech: false,
                    };
                    return user;
                }
                // 4. No match found
                else {
                    // If you return null then an error will be displayed advising the user they could not be signed in.
                    return null;
                }
            }
        })
        // Add other providers here if needed (e.g., GoogleProvider, GitHubProvider)
    ],
    // Optional: Add a database adapter if you want to persist sessions
    // adapter: PrismaAdapter(prisma), // Uncomment and configure if using Prisma

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },

    callbacks: {
        async jwt({ token, user, account: _account }) {
            // Persist the user ID and role from the user object to the JWT token
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.isAdmin = user.isAdmin;
                token.isClient = user.isClient;
                token.isSuperAdmin = user.isSuperAdmin;
                token.isEditor = user.isEditor;
                token.isTech = user.isTech;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, such as user ID and role from the JWT
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.isAdmin = token.isAdmin;
                session.user.isClient = token.isClient;
                session.user.isSuperAdmin = token.isSuperAdmin;
                session.user.isEditor = token.isEditor;
                session.user.isTech = token.isTech;
            }
            return session;
        },
    },

    pages: {
        signIn: '/auth/login', // Custom sign-in page
        // error: '/auth/error', // Custom error page
        // signOut: '/auth/signout', // Custom sign-out page
    },

    // A secret string used to sign and encrypt the session cookie.
    // This should be a long, random string.
    secret: process.env.NEXTAUTH_SECRET,
});
