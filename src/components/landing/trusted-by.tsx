"use client";

import { motion } from "framer-motion";

const companies = [
  "Acme Corp",
  "Globex",
  "Soylent Corp",
  "Initech",
  "Umbrella Corp",
  "Stark Ind",
  "Cyberdyne",
  "Massive Dynamic",
];

export function TrustedBy() {
  return (
    <section className="w-full bg-[#050505] py-10 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
          Trusted by designers from
        </p>
      </div>

      <div className="flex overflow-hidden relative w-full">
        <div className="flex animate-scroll whitespace-nowrap gap-16 md:gap-32 w-max px-16 md:px-32">
          {[...companies, ...companies].map((company, i) => (
            <div key={i} className="flex items-center justify-center">
              <span className="font-instrument text-xl md:text-2xl font-bold text-neutral-700">
                {company}
              </span>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#050505] to-transparent" />
      </div>
    </section>
  );
}
