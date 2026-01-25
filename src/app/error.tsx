"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Next.js App Router Error Component
 * Catches errors at the route segment level
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Route Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] p-8">
      <div className="flex flex-col items-center gap-8 text-center">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        {/* Message */}
        <div>
          <h1 className="font-instrument text-4xl text-white">
            Oops! Something went wrong
          </h1>
          <p className="mt-4 max-w-md text-neutral-400">
            We apologize for the inconvenience. An unexpected error occurred
            while processing your request.
          </p>
        </div>

        {/* Error details in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="max-w-lg rounded-lg bg-red-500/5 p-4">
            <p className="mb-2 text-xs font-medium text-red-400">
              Error Details:
            </p>
            <pre className="overflow-auto text-left text-xs text-red-300">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-neutral-500">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={reset}
            variant="outline"
            className="border-white/10 hover:bg-white/5"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button className="bg-[#d4a373] text-black hover:bg-white">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Help text */}
        <p className="text-xs text-neutral-500">
          If this problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
