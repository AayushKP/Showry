"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Minimal & Elegant",
    description: "Clean, professional templates that let your work shine.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Build and publish your portfolio in minutes, not days.",
  },
  {
    icon: Globe,
    title: "Custom Domain",
    description: "Get your own subdomain or connect a custom one.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="w-full bg-[#050505] px-6 py-10 md:px-12 lg:px-20 xl:px-32 md:py-20 flex justify-center relative z-10"
    >
      <div className="w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <h2 className="font-instrument text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Everything you need,
            <br />
            <span className="italic text-neutral-400">nothing you don't.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4a373]/10 text-[#d4a373] transition-all group-hover:bg-[#d4a373] group-hover:text-black">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-4 font-instrument text-2xl md:text-3xl text-white">
                {feature.title}
              </h3>
              <p className="font-mono text-sm text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
