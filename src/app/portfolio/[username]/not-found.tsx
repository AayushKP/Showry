"use client";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
      <div className="max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-800/50">
            <FileQuestion className="h-12 w-12 text-gray-500" />
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-white">
          Portfolio Not Found
        </h1>

        <p className="mb-8 text-gray-400">
          This portfolio doesn&apos;t exist or hasn&apos;t been published yet.
          Check the URL or create your own portfolio.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              const domain = process.env.NEXT_PUBLIC_DOMAIN || "profiled.site";
              const protocol = window.location.protocol;
              window.location.href = `${protocol}//${domain}`;
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Home
          </Button>
          <Link href="/signup">
            <Button>Create Your Portfolio</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
