"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AuthModal } from "@/components/auth/auth-modal";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = ["Home", "Features", "How It Works"];

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    setIsMobileOpen(false); // Close mobile menu on click
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
      {/* Desktop Navbar (Pill) */}
      <div className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center px-6">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0a]/80 p-2 backdrop-blur-md shadow-2xl shadow-black/50"
        >
          <div className="flex items-center px-3 md:px-4">
            <Link
              href="/"
              className="font-instrument text-lg font-bold text-white cursor-pointer"
            >
              Profiled<span className="text-[#d4a373]">.</span>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-1.5 py-1.5 border border-white/5">
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

      {/* Mobile Navbar (Corners Layout) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[2px]">
        <Link
          href="/"
          className="font-instrument text-2xl font-bold text-white drop-shadow-lg"
        >
          Profiled<span className="text-[#d4a373]">.</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="rounded-full border border-white/10 bg-[#0a0a0a]/90 p-3 text-white backdrop-blur-md shadow-lg"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#050505] p-6 md:hidden"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="font-instrument text-2xl font-bold text-white">
                Profiled<span className="text-[#d4a373]">.</span>
              </span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="rounded-full border border-white/10 bg-[#111] p-3 text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left font-instrument text-3xl font-medium text-white/90 hover:text-[#d4a373] transition-colors"
                >
                  {item}
                </button>
              ))}

              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  setAuthOpen(true);
                }}
                className="mt-4 w-full max-w-[200px] rounded-2xl bg-white py-4 text-center font-mono text-sm font-bold text-black uppercase tracking-wider"
              >
                Log in
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultTab="login"
      />
    </>
  );
}
