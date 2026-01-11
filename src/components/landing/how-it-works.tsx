"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Claim your name",
    desc: "Sign up and secure your unique .showry.com subdomain instantly. No configurations, no hassle.",
  },
  {
    num: "02",
    title: "Curate your work",
    desc: "Add your projects, experience, and thoughts. Our smart template applies professional typography automatically.",
  },
  {
    num: "03",
    title: "Publish to the world",
    desc: "One click to go live. Share your professional portfolio with clients, recruiters, and the world.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#050505] px-6 py-32 md:px-12">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-24 border-b border-white/10 pb-8">
          <h2 className="font-instrument text-5xl text-white md:text-7xl">
            The Process
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-24">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group flex flex-col justify-between"
            >
              <div>
                <span className="mb-6 block font-mono text-xs text-[#d4a373]">
                  ( {step.num} )
                </span>
                <h3 className="mb-4 font-instrument text-3xl text-neutral-200 transition-colors group-hover:text-white">
                  {step.title}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-neutral-500">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
