"use client";

import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Showry helped me land my dream job at a top tech company. The templates are simply stunning and so easy to use.",
    name: "Alex Rivera",
    title: "Senior Product Designer",
  },
  {
    quote:
      "I was able to build a professional portfolio in under an hour. The result looks like I spent weeks on custom code.",
    name: "Sarah Chen",
    title: "Frontend Developer",
  },
  {
    quote:
      "Finally, a portfolio builder that understands the needs of modern creatives. Minimal, fast, and beautiful.",
    name: "James Wilson",
    title: "UX Researcher",
  },
  {
    quote:
      "The custom domain feature is a game changer. It makes my portfolio look so much more professional.",
    name: "Emily Davis",
    title: "Graphic Designer",
  },
  {
    quote:
      "I've tried many portfolio builders, but Showry is by far the best. It's clean, fast, and the design is top-notch.",
    name: "Michael Brown",
    title: "Full Stack Developer",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="h-160 rounded-md flex flex-col antialiased bg-[#050505] dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 z-10 text-center px-4"
      >
        <h2 className="font-instrument text-3xl md:text-5xl lg:text-6xl text-white mb-4">
          Loved by <span className="text-[#d4a373] italic">creatives.</span>
        </h2>
        <p className="font-mono text-sm text-neutral-400 max-w-lg mx-auto">
          Join thousands of designers and developers who trust Showry with their
          professional presence.
        </p>
      </motion.div>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </section>
  );
}
