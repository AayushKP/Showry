"use client";

import Link from "next/link";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] px-6 py-10 md:px-12 lg:px-20 md:py-16 relative flex justify-center">
      {/* Smooth Gradient Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="w-full max-w-7xl">
        <div className="flex flex-col-reverse gap-8 mb-12">
          {/* Logo Section - Full Width Bottom */}
          <div className="flex flex-col items-center w-full">
            <div className="h-40 md:h-80 flex items-center justify-center w-full">
              <TextHoverEffect text="PROFILED" />
            </div>
            <p className="mt-2 font-mono text-xs text-neutral-600">
              Build your professional portfolio in minutes.
            </p>
          </div>

          {/* Links Section - Top Right */}
          <div className="w-full flex justify-center md:justify-end gap-8 items-center">
            <Link
              href="https://github.com/AayushKP/Profiled"
              target="_blank"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
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
            © {new Date().getFullYear()} Profiled Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
