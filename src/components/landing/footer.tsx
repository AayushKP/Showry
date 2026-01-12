"use client";

import Link from "next/link";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] px-6 py-10 md:px-12 lg:px-20 md:py-16 relative flex justify-center">
      {/* Smooth Gradient Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="h-80 flex items-center justify-center w-full">
              <TextHoverEffect text="Showry" />
            </div>
            <p className="mt-2 font-mono text-xs text-neutral-600">
              Build your professional portfolio in minutes.
            </p>
          </div>

          <div className="flex gap-8">
            <Link
              href="#"
              className="font-mono text-xs uppercase text-neutral-500 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="font-mono text-xs uppercase text-neutral-500 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="font-mono text-xs uppercase text-neutral-500 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="font-mono text-[10px] text-neutral-700 text-center md:text-left">
            © {new Date().getFullYear()} Showry Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
