"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-[#050505] px-6 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto flex max-w-[1800px] flex-col md:flex-row">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col items-start md:w-3/5">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-instrument text-[18vw] leading-[0.85] text-[#e5e5e5] mix-blend-difference md:text-[13vw]">
              Showry<span className="italic text-[#d4a373]">.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="ml-1 mt-6 max-w-xl md:ml-4 md:mt-10"
          >
            <p className="font-instrument text-2xl font-light leading-tight text-neutral-400 md:text-4xl text-balance">
              <span className="italic text-white">Craft</span> the portfolio you
              always wanted. <span className="italic text-white">Minimal</span>,
              impactful, and yours in minutes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex gap-4"
          >
            <Link href="/signup">
              <button className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#e5e5e5] px-8 py-4 text-black transition-all hover:bg-[#d4a373]">
                <span className="font-mono text-sm uppercase tracking-wider">
                  Start Building
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right Preview Card - Responsive positioning */}
        <div className="mt-20 w-full md:absolute md:right-[5%] md:top-[20%] md:mt-0 md:w-[45%] lg:w-[40%]">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#111] shadow-2xl shadow-black/80 ring-1 ring-white/10 md:aspect-[3/4] lg:aspect-[16/10]"
          >
            {/* Browser Bar */}
            <div className="flex h-8 items-center gap-2 border-b border-white/5 bg-[#1a1a1a]/80 px-4 backdrop-blur-md">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="mx-auto flex h-5 w-1/2 items-center justify-center rounded bg-black/20 text-[10px] text-neutral-500">
                alex.showry.com
              </div>
            </div>

            {/* Content */}
            <div className="relative flex h-full flex-col items-center justify-center p-8 text-center bg-[#050505]">
              <span className="font-instrument text-4xl text-white md:text-5xl lg:text-7xl">
                Alex <span className="italic text-[#d4a373]">Johnson</span>
              </span>
              <p className="mt-4 font-instrument text-lg text-neutral-500 italic md:text-xl">
                Full Stack Developer & Designer
              </p>
              <div className="mt-12 flex gap-4 opacity-50">
                <div className="h-24 w-32 rounded bg-[#1a1a1a] ring-1 ring-white/5" />
                <div className="h-24 w-32 rounded bg-[#1a1a1a] ring-1 ring-white/5 hidden md:block" />
              </div>
            </div>

            {/* Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
