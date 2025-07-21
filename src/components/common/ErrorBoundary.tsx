// src/components/common/ErrorBoundary.tsx
import React, { ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary Component
 * A React Error Boundary that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the application.
 *
 * Usage: Wrap components that might throw errors with <ErrorBoundary>.
 * <ErrorBoundary>
 * <MyPotentiallyBuggyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // This lifecycle method is called if an error is thrown in a child component.
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null }; // errorInfo will be set in componentDidCatch
  }

  // This lifecycle method is called after an error has been thrown.
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service (e.g., Sentry, LogRocket)
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
    // Example: Sentry.captureException(error, { extra: errorInfo });
    this.setState({ errorInfo }); // Store errorInfo for display/debugging
  }

  // Reset error state when navigating or retrying
  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if an error occurred
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-950 text-red-500 flex-col p-4 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Oops! Something went wrong.</h1>
          <p className="text-lg text-gray-400 mb-6">
            We&apos;re sorry for the inconvenience. Please try refreshing the page or navigating back.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={this.resetError}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md"
            >
              Try Again
            </button>
            <Link href="/" passHref>
              <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition shadow-md">
                Go to Home
              </button>
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-8 bg-gray-800 p-6 rounded-lg text-sm text-gray-300 max-w-xl overflow-auto text-left break-words">
              <h3 className="font-semibold text-red-400 mb-2">Error Details (Development Only):</h3>
              <pre className="whitespace-pre-wrap">{this.state.error.message}</pre>
              {this.state.errorInfo && (
                <pre className="whitespace-pre-wrap mt-4 text-xs">{this.state.errorInfo.componentStack}</pre>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
