"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Minimal Design",
    description: "Interfaces that breathe. We prioritize negative space.",
  },
  {
    title: "Custom Type",
    description: "Premium serif fonts that make your words stand out.",
  },
  {
    title: "My Subdomain",
    description: "Claim your corner with a .showry.com address.",
  },
  {
    title: "Zero Config",
    description: "We handle hosting, SSL, and optimization.",
  },
];

export function Features() {
  return (
    <section className="bg-[#050505] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-16 flex flex-col items-start gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <h2 className="font-instrument text-5xl leading-none text-white md:text-7xl lg:text-8xl">
            Everything you need,
            <br />
            <span className="italic text-neutral-500">
              nothing you don&apos;t.
            </span>
          </h2>
        </div>

        <div className="grid gap-px bg-neutral-900 border-t border-b border-neutral-900 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-[#050505] p-8 transition-colors hover:bg-[#0a0a0a] min-h-[240px] flex flex-col justify-between"
            >
              <span className="mb-4 block font-mono text-xs text-[#d4a373]">
                (0{i + 1})
              </span>
              <div>
                <h3 className="mb-3 font-instrument text-3xl text-white">
                  {feature.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-neutral-500 font-mono">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
