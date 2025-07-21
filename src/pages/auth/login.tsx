// D:\FALCONERP\src\pages\auth\login.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Router is used for redirection
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react'; // Import signIn from NextAuth.js
import AuthLayout from '../../layouts/AuthLayout';
import SlideToUnlockButton from '../../components/ui/SlideToUnlockButton';
import { useUI } from '../../hooks/useUI'; // Import useUI hook

/**
 * LoginPage Component
 * Provides a user interface for logging into the application.
 * Uses AuthLayout for consistent styling and includes a login form.
 */
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const _router = useRouter(); // Renamed to _router to satisfy ESLint's no-unused-vars if not used directly for push
  const { showModal } = useUI(); // Use the showModal function from UIContext

  /**
   * Handles the login form submission via the SlideToUnlockButton.
   * This now uses NextAuth.js's signIn function.
   */
  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    if (!email || !password) {
      const missingFieldsError = 'Please enter both email and password.';
      setError(missingFieldsError);
      toast.error(missingFieldsError);
      setLoading(false);
      return;
    }

    try {
      // Use NextAuth.js signIn with credentials provider
      const result = await signIn('credentials', {
        redirect: false, // Do not redirect automatically, handle manually
        email,
        password,
      });

      if (result?.error) {
        // Display error from NextAuth.js
        setError(result.error);
        toast.error(result.error);
      } else if (result?.ok) {
        toast.success('Logged in successfully!');
        // The _app.tsx useEffect will handle the actual redirection based on session.
        // No need to router.push here, as _app.tsx will manage the redirect.
        // If you need immediate client-side redirect, uncomment: _router.push('/admin');
      } else {
        // Fallback for unexpected non-error results
        const unexpectedError = 'An unexpected login response occurred.';
        setError(unexpectedError);
        toast.error(unexpectedError);
      }
    } catch (err: unknown) { // Changed 'any' to 'unknown' for better type safety
      console.error('Login error:', err);
      let errorMessage = 'An unexpected error occurred during login.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      toast.error(errorMessage);
      // Optionally show a modal for critical errors
      showModal(<div><p>A critical error occurred during login. Please try again.</p><p>{errorMessage}</p></div>, { title: 'Login Error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Head>
        <title>Login - FALCON ERP</title>
        <meta name="description" content="Login to your FALCON ERP account." />
      </Head>

      <motion.div
        className="flex flex-col items-center justify-center text-center w-full flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome Back!</h1>
        <p className="text-gray-400 mb-8 max-w-[280px] sm:max-w-full">Sign in to access your FALCON ERP portal.</p>

        <div className="w-full space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              className="text-red-500 text-sm mt-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          {/* Slide to Login Button */}
          <SlideToUnlockButton
            onSlideComplete={handleLogin}
            loading={loading}
            buttonText="Slide to Login"
            loadingText="Authenticating..."
          />
        </div>

        {/* Links for Forgot Password and Register */}
        <div className="mt-6 text-sm text-gray-400 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <Link href="/auth/forgot-password" className="text-blue-400 hover:underline">
            Forgot Password?
          </Link>
          <span className="hidden sm:inline mx-2">|</span>
          <Link href="/auth/register" className="text-blue-400 hover:underline">
            Don&apos;t have an account? Register
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default LoginPage;
