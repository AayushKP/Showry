"use client";

import { GlowingCard } from "@/components/aceternity/cards";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for trying out Profiled.",
    features: [
      "1 Project",
      "Basic Themes",
      "Profiled Subdomain",
      "Community Support",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For serious professionals.",
    features: [
      "Unlimited Projects",
      "All Premium Themes",
      "Custom Domain",
      "Analytics",
      "Priority Support",
      "Remove Branding",
    ],
    highlight: true,
  },
  {
    name: "Agency",
    price: "$49",
    period: "/month",
    description: "Manage multiple portfolios.",
    features: [
      "10+ Portfolios",
      "Team Collaboration",
      "White Labeling",
      "API Access",
      "Dedicated Account Manager",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="w-full bg-[#050505] px-6 py-20 md:px-12 lg:px-20 xl:px-32 flex justify-center relative z-10"
    >
      <div className="w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="font-instrument text-3xl md:text-5xl lg:text-6xl text-white mb-4">
            Simple, transparent
            <br />
            <span className="italic text-[#d4a373]">pricing.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlowingCard className="h-full flex flex-col">
                <div className="mb-4">
                  <h3 className="font-instrument text-2xl text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="font-mono text-xs text-neutral-500">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-neutral-400 mt-2">
                    {plan.description}
                  </p>
                </div>

                <div className="grow space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#d4a373]/20 flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-[#d4a373]" />
                      </div>
                      <span className="font-mono text-xs text-neutral-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all ${
                    plan.highlight
                      ? "bg-[#d4a373] text-black hover:bg-white"
                      : "bg-white/10 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Get Started
                </button>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
