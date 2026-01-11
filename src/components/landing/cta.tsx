"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="bg-[#050505] px-6 py-32 md:px-12">
      <div className="mx-auto max-w-[1800px] border-t border-white/10 pt-32">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <h2 className="font-instrument text-[10vw] leading-[0.8] text-[#e5e5e5] md:text-[8vw]">
              Ready to <span className="italic text-[#d4a373]">show</span>
              <br />
              your work?
            </h2>
          </div>

          <div className="mb-4">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex h-32 w-32 items-center justify-center rounded-full bg-[#d4a373] text-black transition-colors hover:bg-white md:h-48 md:w-48"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="font-mono text-sm font-semibold uppercase tracking-widest">
                    Start
                  </span>
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:-rotate-45" />
                </div>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
