import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Custom 404 Not Found Page
 * Shown when a route doesn't exist
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] p-8">
      <div className="flex flex-col items-center gap-8 text-center">
        {/* 404 display */}
        <div className="relative">
          <span className="font-instrument text-[150px] font-bold leading-none text-white/5 md:text-[200px]">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertTriangle className="h-16 w-16 text-[#d4a373]" />
          </div>
        </div>

        {/* Message */}
        <div>
          <h1 className="font-instrument text-4xl text-white">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-neutral-400">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link href="/">
            <Button className="bg-[#d4a373] text-black hover:bg-white">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Decorative gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4a373]/5 blur-3xl" />
        </div>
      </div>
    </div>
  );
}
