// D:\FALCONERP\src\pages\_app.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';

// Global Toast Notifications
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { UIProvider } from '../contexts/UIContext';

// Components
import ErrorBoundary from '../components/common/ErrorBoundary';
import ParticlesBackground from '../components/animations/ParticlesBackground';
import Preloader from '../components/preloader/Preloader';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';
import ClientLayout from '../layouts/ClientLayout';

// CRITICAL FIX: Changed import path from '../app/globals.css' to '../styles/globals.css'
import '../styles/globals.css'; // Corrected path based on your file structure

// Main App component logic, wrapped by providers below
function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // Consume AuthContext to get authentication status and user roles
  const { isAuthenticated, status, isAdmin, isClient } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Global preloader state

  // Refs for layout measurements (used by DefaultLayout)
  // Removed: topNavRef
  const headerRef = useRef<HTMLDivElement>(null); // This now refers to the *overall* header container

  // States for dynamic layout measurements
  const [_viewportHeight, setViewportHeight] = useState(0);
  // Removed: topNavHeight
  const [headerHeight, setHeaderHeight] = useState(0); // This will be the height of the overall header container
  const [isMobile, setIsMobile] = useState(false);

  // Measure heights for responsive layout calculations
  const measureHeights = useCallback(() => {
    if (typeof window !== 'undefined') {
      setViewportHeight(window.innerHeight);
      // Removed: setTopNavHeight(topNavRef.current?.offsetHeight || 32);
      const currentHeaderContainerHeight = headerRef.current?.offsetHeight || 112; // Default to a reasonable height if not measured yet (e.g., 80px pill + 32px padding/margins)
      setIsMobile(window.innerWidth < 768);
      setHeaderHeight(currentHeaderContainerHeight);
    }
  }, []);

  // Effect to attach/detach resize listener for layout measurements
  useEffect(() => {
    measureHeights();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', measureHeights, { passive: true });
      return () => window.removeEventListener('resize', measureHeights);
    }
  }, [measureHeights]);

  // Callback for preloader completion
  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  /**
   * Determines the type of layout to apply based on the current route.
   * This is a crucial part of the dynamic layout system.
   */
  const getLayoutType = useCallback((pathname: string) => {
    if (pathname.startsWith('/auth')) return 'auth';
    if (pathname.startsWith('/admin')) return 'admin';
    if (pathname.startsWith('/client')) return 'client';
    return 'default'; // Default public website layout for all other paths
  }, []);

  const currentLayoutType = getLayoutType(router.pathname);

  // --- Authorization and Redirection Logic ---
  useEffect(() => {
    if (status === 'loading' || isLoading) return;

    const protectedRoutesPrefixes = ['/admin', '/client'];
    const authPages = ['/auth/login', '/auth/register'];

    if (!isAuthenticated && protectedRoutesPrefixes.some(prefix => router.pathname.startsWith(prefix))) {
      router.push('/auth/login');
      return;
    }

    if (isAuthenticated && authPages.includes(router.pathname) && router.pathname !== '/auth/logout') {
      if (isAdmin) {
        router.push('/admin');
      } else if (isClient) {
        router.push('/client');
      } else {
        router.push('/');
      }
      return;
    }
  }, [status, isAuthenticated, isAdmin, isClient, router, isLoading]);

  const activePageForHeader = router.pathname.split('/')[1] || 'home';

  const fabSize = 60;
  const fabSpacing = 16;
  const chatbotFabBottomBaseOffset = fabSpacing;
  const dynamicPaddingBottom = isMobile
    ? `${headerHeight + chatbotFabBottomBaseOffset + fabSize + fabSpacing + fabSize + 20}px` // Header bottom + FABs + extra space
    : '0px';


  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#00174F" />

        <link rel="icon" href="/BIcon.svg" />
        <link rel="mask-icon" href="/BIcon.svg" color="#00174F" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FALCON ERP" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>

      <ParticlesBackground />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} isMobile={isMobile} />}
      </AnimatePresence>

      {!isLoading && status !== 'loading' && (
        <ErrorBoundary>
          {currentLayoutType === 'auth' && (
            <AuthLayout>
              <Component {...pageProps} />
            </AuthLayout>
          )}
          {currentLayoutType === 'default' && (
            <DefaultLayout
              // Removed: topNavRef={topNavRef}
              headerRef={headerRef} // Pass the ref to the overall header container
              // Removed: topNavHeight={topNavHeight}
              headerHeight={headerHeight} // Pass the calculated height of the overall header container
              dynamicPaddingBottom={dynamicPaddingBottom}
              activePage={activePageForHeader}
              setActivePage={(page) => router.push(`/${page}`)}
              isMobile={isMobile}
              chatbotFabBottomBaseOffset={chatbotFabBottomBaseOffset}
              fabSize={fabSize}
              fabSpacing={fabSpacing}
            >
              <Component {...pageProps} />
            </DefaultLayout>
          )}
          {currentLayoutType === 'admin' && (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          )}
          {currentLayoutType === 'client' && (
            <ClientLayout>
              <Component {...pageProps} />
            </ClientLayout>
          )}
        </ErrorBoundary>
      )}

      <Toaster position="bottom-right" />
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <SessionProvider session={props.pageProps.session}>
      <AuthProvider>
        <UIProvider>
          <AppContent {...props} />
        </UIProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
