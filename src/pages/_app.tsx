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

import '../styles/globals.css';

// Main App component logic, wrapped by providers below
function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { isAuthenticated, status, isAdmin, isClient } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const headerRef = useRef<HTMLDivElement>(null); // Ref for the TOP header container

  const [_viewportHeight, setViewportHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0); // This will be the height of the TOP header container
  const [isMobile, setIsMobile] = useState(false);

  const measureHeights = useCallback(() => {
    if (typeof window !== 'undefined') {
      setViewportHeight(window.innerHeight);
      const currentHeaderContainerHeight = headerRef.current?.offsetHeight || 80;
      setIsMobile(window.innerWidth < 768);
      setHeaderHeight(currentHeaderContainerHeight);
    }
  }, []);

  useEffect(() => {
    measureHeights();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', measureHeights, { passive: true });
      return () => window.removeEventListener('resize', measureHeights);
    }
  }, [measureHeights]);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const getLayoutType = useCallback((pathname: string) => {
    if (pathname.startsWith('/auth')) return 'auth';
    if (pathname.startsWith('/admin')) return 'admin';
    if (pathname.startsWith('/client')) return 'client';
    return 'default';
  }, []);

  const currentLayoutType = getLayoutType(router.pathname);

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
  const dynamicPaddingBottom = '0px';

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
              headerRef={headerRef}
              headerHeight={headerHeight}
              dynamicPaddingBottom={dynamicPaddingBottom}
              activePage={activePageForHeader}
              // CRITICAL FIX: Handle 'home' page navigation to '/'
              setActivePage={(page) => {
                if (page === 'home') {
                  router.push('/');
                } else {
                  router.push(`/${page}`);
                }
              }}
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
