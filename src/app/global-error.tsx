"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Next.js Global Error Component
 * Catches errors in the root layout (including layout.tsx errors)
 * This is a last-resort error boundary
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#050505] font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Icon */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>

            {/* Message */}
            <div>
              <h1 className="text-4xl font-bold text-white">Critical Error</h1>
              <p className="mt-4 max-w-md text-neutral-400">
                A critical error occurred. We apologize for the inconvenience.
              </p>
            </div>

            {/* Error details in development */}
            {process.env.NODE_ENV === "development" && (
              <div className="max-w-lg rounded-lg bg-red-500/5 p-4">
                <p className="mb-2 text-xs font-medium text-red-400">Error:</p>
                <pre className="overflow-auto text-left text-xs text-red-300">
                  {error.message}
                </pre>
              </div>
            )}

            {/* Retry button */}
            <button
              onClick={reset}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#111] px-6 py-3 text-white transition-colors hover:bg-white/5"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>

            {/* Refresh page option */}
            <p className="text-xs text-neutral-500">
              Or try{" "}
              <button
                onClick={() => window.location.reload()}
                className="text-[#d4a373] underline hover:no-underline"
              >
                refreshing the page
              </button>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
