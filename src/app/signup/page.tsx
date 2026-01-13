"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SignupPage() {
  const handleGoogleSignup = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (ctx: any) {
      toast.error("Failed to sign up", {
        description: ctx.error?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#050505] text-[#e5e5e5]">
      <nav className="absolute left-0 right-0 top-0 z-50 px-6 py-6 md:px-12">
        <Link
          href="/"
          className="font-instrument text-2xl font-bold text-white"
        >
          Showry<span className="text-[#d4a373]">.</span>
        </Link>
      </nav>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center">
            <h1 className="mb-3 font-instrument text-5xl text-white md:text-6xl">
              Start creating
            </h1>
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-wide">
              Your professional journey begins here.
            </p>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-4 transition-all hover:bg-white hover:text-black"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-mono text-xs uppercase tracking-wider group-hover:font-semibold">
              Sign up with Google
            </span>
          </button>

          <div className="mt-8 text-center">
            <p className="font-mono text-[10px] text-neutral-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#d4a373] hover:text-white transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <Link
              href="#"
              className="font-mono text-[10px] uppercase text-neutral-700 hover:text-neutral-500"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="font-mono text-[10px] uppercase text-neutral-700 hover:text-neutral-500"
            >
              Privacy
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Simple Footer */}
      <div className="w-full px-6 py-6 text-center md:px-12 md:text-left">
        <span className="font-mono text-[10px] uppercase text-neutral-700">
          © 2024 Showry Inc.
        </span>
      </div>
    </div>
  );
}
