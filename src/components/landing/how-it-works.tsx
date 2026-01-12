"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your account with Google in seconds.",
  },
  {
    number: "02",
    title: "Customize",
    description: "Add your projects, skills, and experience.",
  },
  {
    number: "03",
    title: "Publish",
    description: "Go live with your custom subdomain instantly.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full bg-[#050505] px-6 py-5 md:px-12 lg:px-20 xl:px-32 md:py-10 flex justify-center relative z-10"
    >
      <div className="w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-instrument text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Three steps to
            <br />
            <span className="italic text-[#d4a373]">your portfolio.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className="mb-6">
                <span className="font-mono text-6xl md:text-7xl text-white/5 font-bold">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-4 font-instrument text-3xl md:text-4xl text-white">
                {step.title}
              </h3>
              <p className="font-mono text-sm text-neutral-500 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
