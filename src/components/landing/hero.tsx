"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { AuthModal } from "@/components/auth/auth-modal";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const rotateX = useTransform(scrollY, [0, 500], [0, 15]);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen w-full bg-[#050505] pt-40 md:pt-60 lg:pt-64 xl:pt-72 2xl:pt-96 pb-40 md:pb-60 overflow-visible flex flex-col items-center z-0">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#d4a373]/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Text Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-12"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#27c93f] animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-300">
              v2.0 Now Available
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-instrument text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[1.1] md:leading-[1.1] text-[#e5e5e5] tracking-tight mb-12 max-w-5xl"
          >
            Expert <span className="italic text-[#d4a373]">Portfolios</span>
            <br />
            for Modern Creatives.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-instrument text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-16"
          >
            We help you design and build portfolios that drive results and help
            your career grow. No styling headaches. Just results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <button
              onClick={() => setAuthOpen(true)}
              className="group flex items-center justify-center gap-3 rounded-full bg-[#e5e5e5] px-10 py-5 transition-all hover:bg-[#d4a373] hover:scale-105"
            >
              <span className="font-mono text-sm font-bold text-black uppercase tracking-wider">
                Start Building
              </span>
              <ArrowRight className="h-4 w-4 text-black transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border border-[#050505] bg-neutral-800"
                  />
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex text-[#d4a373]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="text-[10px]">
                      ★
                    </div>
                  ))}
                </div>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wide">
                  Trusted by 1000+
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Image (Desktop Component) */}
        <motion.div
          style={{ y, rotateX }}
          className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-32 md:mt-40 perspective-1000"
        >
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-2xl shadow-[#d4a373]/20"
          >
            {/* Browser Toolbar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex h-10 items-center gap-2 border-b border-white/5 bg-[#1a1a1a] px-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]/80" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]/80" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]/80" />
              </div>
              <div className="mx-auto flex h-6 w-auto min-w-[140px] items-center justify-center rounded bg-black/40 px-3 text-[10px] text-neutral-600 font-mono">
                showry.com/alex
              </div>
            </div>

            {/* Preview Content (Simulating the Portfolio) */}
            <div className="relative h-full w-full bg-[#050505] pt-10 flex items-center justify-center">
              <div className="text-center">
                <h2 className="font-instrument text-4xl md:text-6xl text-white mb-4">
                  Alex <span className="italic text-neutral-500">Morgan</span>
                </h2>
                <p className="font-mono text-xs text-[#d4a373] uppercase tracking-widest">
                  Product Designer
                </p>
                {/* Abstract visual */}
                <div className="mt-12 grid grid-cols-3 gap-4 opacity-20 max-w-lg mx-auto px-10">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded bg-white/10"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Shiny Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50" />
          </motion.div>
        </motion.div>

        <AuthModal
          open={authOpen}
          onOpenChange={setAuthOpen}
          defaultTab="signup"
        />
      </section>
    </>
  );
}
