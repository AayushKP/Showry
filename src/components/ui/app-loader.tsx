"use client";

import { motion } from "framer-motion";

interface AppLoaderProps {
  mode?: "app" | "portfolio";
  name?: string;
}

export function AppLoader({ mode = "app", name }: AppLoaderProps) {
  const content = (() => {
    if (mode === "portfolio" && name) {
      const firstName = name.split(" ")[0] || "Portfolio";
      return (
        <span
          className="text-4xl md:text-5xl font-medium italic text-white tracking-tight select-none"
          style={{ fontFamily: "var(--font-instrument)" }}
        >
          {firstName}
          <span className="text-[#3b82f6]">.</span>
        </span>
      );
    }
    return (
      <span
        className="text-4xl md:text-5xl font-bold text-white tracking-tight select-none"
        style={{ fontFamily: "var(--font-instrument)" }}
      >
        Profiled<span className="text-[#d4a373]">.</span>
      </span>
    );
  })();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#050505] z-[9999] relative">
      <motion.div
        initial={{ scale: 0.9, opacity: 0.5 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="flex items-center"
      >
        {content}
      </motion.div>
    </div>
  );
}
