"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-6 py-6 md:px-12"
    >
      <div className="flex items-center justify-between rounded-full bg-[#111]/50 px-6 py-3 backdrop-blur-md ring-1 ring-white/5">
        <Link
          href="/"
          className="font-instrument text-2xl font-bold text-white"
        >
          Showry<span className="text-[#d4a373]">.</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="hidden font-mono text-xs uppercase tracking-wider text-neutral-400 transition-colors hover:text-white md:block"
          >
            Log in
          </Link>
          <Link href="/signup">
            <button className="rounded-full bg-white px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-black transition-colors hover:bg-[#d4a373]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
