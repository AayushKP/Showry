"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AuthModal } from "@/components/auth/auth-modal";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = ["Home", "Features", "How It Works"];

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(
      sectionId.toLowerCase().replace(/\s+/g, "-"),
    );
    if (element) {
      const yOffset = -100; // Offset for fixed navbar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0a]/80 p-2 backdrop-blur-md shadow-2xl shadow-black/50"
        >
          <div className="flex items-center px-3 md:px-4">
            <span className="font-instrument text-lg font-bold text-white">
              Profiled<span className="text-[#d4a373]">.</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 rounded-full bg-white/5 px-1.5 py-1.5 border border-white/5">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors duration-200 z-10",
                  activeTab === item
                    ? "text-black font-bold"
                    : "text-neutral-400 hover:text-white",
                )}
              >
                {activeTab === item && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#d4a373] rounded-full -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                {item}
              </button>
            ))}
          </div>

          <div className="pl-1 pr-1 md:pl-2 md:pr-2">
            <button
              onClick={() => setAuthOpen(true)}
              className="group flex items-center justify-center gap-2 rounded-full bg-white px-3 md:px-5 py-2 transition-all hover:bg-[#d4a373]"
            >
              <span className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                Log in
              </span>
            </button>
          </div>
        </motion.nav>
      </div>
      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultTab="login"
      />
    </>
  );
}
