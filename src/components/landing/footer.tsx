"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-[#050505] px-6 pb-12 pt-32 md:px-12">
      <div className="mx-auto max-w-[1800px] border-t border-white/10 pt-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="font-instrument text-9xl leading-none text-[#1a1a1a]">
              Showry
            </span>
          </div>

          <div className="flex gap-8">
            <a
              href="#"
              className="font-mono text-xs uppercase text-neutral-500 hover:text-white"
            >
              Twitter
            </a>
            <a
              href="#"
              className="font-mono text-xs uppercase text-neutral-500 hover:text-white"
            >
              Instagram
            </a>
            <a
              href="#"
              className="font-mono text-xs uppercase text-neutral-500 hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
