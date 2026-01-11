"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] px-6 py-12 md:px-12 lg:px-20 md:py-16 border-t border-white/10 flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <Link
              href="/"
              className="font-instrument text-2xl font-bold text-white"
            >
              Showry<span className="text-[#d4a373]">.</span>
            </Link>
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
