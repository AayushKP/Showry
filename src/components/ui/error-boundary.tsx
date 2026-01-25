"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary for catching JavaScript errors in child components
 * Provides a graceful fallback UI instead of crashing the entire app
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console (in production, you'd send to error tracking service)
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h2 className="font-instrument text-2xl text-white">
                Something went wrong
              </h2>
              <p className="mt-2 max-w-md text-sm text-neutral-400">
                We encountered an unexpected error. Please try again or return
                to the homepage.
              </p>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre className="mt-4 max-w-lg overflow-auto rounded-lg bg-red-500/5 p-4 text-left text-xs text-red-400">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3">
              <Button
                onClick={this.handleRetry}
                variant="outline"
                className="border-white/10 hover:bg-white/5"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Link href="/">
                <Button className="bg-[#d4a373] text-black hover:bg-white">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional wrapper for ErrorBoundary with custom message
 */
interface ErrorWrapperProps {
  children: ReactNode;
  message?: string;
}

export function ErrorWrapper({ children, message }: ErrorWrapperProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-white/5 bg-[#111] p-6">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-amber-500" />
            <p className="mt-3 text-sm text-neutral-400">
              {message || "Failed to load this section"}
            </p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
