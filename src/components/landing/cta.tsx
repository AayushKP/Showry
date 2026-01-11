"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { AuthModal } from "@/components/auth/auth-modal";

export function CTA() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <section className="w-full bg-[#050505] px-6 py-40 md:px-12 lg:px-20 md:py-60 lg:py-80 overflow-hidden flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="border-t border-white/10 pt-24 md:pt-32">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-12 md:gap-16">
              <div className="max-w-4xl relative text-center md:text-left">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100px" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -top-12 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 h-px bg-[#d4a373]"
                />
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="font-instrument text-6xl md:text-8xl lg:text-9xl leading-[0.85] text-[#e5e5e5] tracking-tight"
                >
                  Ready to <span className="italic text-[#d4a373]">show</span>
                  <br />
                  your work?
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-shrink-0"
              >
                <button
                  onClick={() => setAuthOpen(true)}
                  className="group flex h-40 w-40 md:h-56 md:w-56 lg:h-64 lg:w-64 items-center justify-center rounded-full bg-[#d4a373] text-black transition-all duration-500 hover:bg-white hover:scale-105"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-mono text-sm md:text-base font-bold uppercase tracking-widest">
                      Start
                    </span>
                    <ArrowRight className="h-6 w-6 md:h-8 md:w-8 transition-transform duration-500 group-hover:-rotate-45" />
                  </div>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultTab="signup"
      />
    </>
  );
}
