"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Portfolio } from "@/db/schema";
import { cn } from "@/lib/utils";

interface PortfolioTemplateProps {
  portfolio: Partial<Portfolio>;
  isPreview?: boolean;
  isLoggedIn?: boolean;
}

export function PortfolioTemplate({
  portfolio,
  isPreview = false,
  isLoggedIn = false,
}: PortfolioTemplateProps) {
  const {
    fullName = "Your Name",
    title = "Creative Developer",
    tagline,
    bio,
    skills: rawSkills,
    projects: rawProjects,
    experience: rawExperience,
    socialLinks: rawSocialLinks,
  } = portfolio;

  const skills = rawSkills ?? [];
  const projects = rawProjects ?? [];
  const experience = rawExperience ?? [];
  const socialLinks = rawSocialLinks ?? {};

  const steps = [
    { label: "About", href: "#about" },
    { label: "Selected Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] selection:bg-[#d4a373] selection:text-black w-full overflow-x-hidden">
      {/* Edit Button */}
      {isPreview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
            <button className="flex items-center gap-2 rounded-full border border-white/20 bg-[#111] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/50 transition-all hover:bg-[#d4a373] hover:text-black hover:border-transparent">
              {isLoggedIn ? "Edit Portfolio" : "Create Your Own"}
            </button>
          </Link>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-40 bg-[#050505]/80 backdrop-blur-sm border-b border-white/5">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-6 md:px-12 lg:px-20 md:py-8">
          <span className="font-instrument text-xl font-normal tracking-wide md:text-2xl">
            {fullName}
          </span>
          <div className="hidden gap-8 md:flex">
            {steps.map((step) => (
              <a
                key={step.label}
                href={step.href}
                className="font-mono text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-white"
              >
                {step.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-end px-6 pb-32 pt-32 md:px-12 lg:px-20 md:pb-40 md:pt-40">
        <div className="mx-auto max-w-7xl w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 font-mono text-xs uppercase tracking-widest text-[#d4a373] md:mb-10 md:text-sm"
          >
            {title}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-instrument text-[14vw] leading-[0.9] text-[#e5e5e5] md:text-[9vw] lg:text-[7vw] xl:text-[6vw]"
          >
            {fullName.split(" ").map((word, i) => (
              <span
                key={i}
                className={i === 1 ? "italic text-neutral-300 block" : "block"}
              >
                {word}
              </span>
            ))}
          </motion.h1>
          {tagline && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 max-w-2xl md:mt-16"
            >
              <p className="font-instrument text-xl italic leading-relaxed text-neutral-400 md:text-2xl lg:text-3xl">
                {tagline}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="px-6 py-24 md:px-12 lg:px-20 md:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-24">
            <div className="md:w-1/4">
              <h2 className="sticky top-32 font-mono text-xs uppercase tracking-widest text-neutral-500 md:text-sm">
                (01) About
              </h2>
            </div>
            <div className="md:w-3/4 max-w-4xl">
              {bio && (
                <p className="mb-12 text-lg leading-relaxed text-neutral-300 md:text-xl lg:text-2xl font-light">
                  {bio}
                </p>
              )}

              {skills.length > 0 && (
                <div className="mt-16 md:mt-20">
                  <span className="mb-6 block font-mono text-[10px] uppercase tracking-wider text-neutral-600">
                    Toolbox
                  </span>
                  <div className="flex flex-wrap gap-x-6 gap-y-4">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-instrument text-lg text-neutral-400 md:text-xl"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="px-6 py-24 md:px-12 lg:px-20 md:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-8 md:mb-24">
            <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 md:text-sm">
              (02) Selected Work
            </h2>
            <span className="font-mono text-[10px] text-neutral-600">
              {projects.length} Projects
            </span>
          </div>

          <div className="grid gap-x-12 gap-y-20 md:grid-cols-2 md:gap-y-28">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={cn(
                  "group relative flex flex-col gap-6",
                  index % 2 === 1 ? "md:translate-y-24" : ""
                )}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#111] ring-1 ring-white/5 rounded-lg">
                  <div className="h-full w-full bg-neutral-900 transition-transform duration-700 group-hover:scale-105" />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-3 font-instrument text-2xl text-white transition-all duration-300 group-hover:italic md:text-3xl">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-widest text-neutral-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-colors hover:bg-white hover:text-black flex-shrink-0"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="px-6 py-24 md:px-12 lg:px-20 md:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 border-b border-white/10 pb-8 md:mb-20">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 md:text-sm">
                (03) Experience
              </h2>
            </div>

            <div className="max-w-5xl">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="group border-b border-white/5 py-10 transition-colors hover:border-white/20 md:py-14"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                    <h3 className="font-instrument text-3xl text-neutral-300 transition-colors group-hover:text-white md:text-4xl lg:text-5xl">
                      {exp.company}
                    </h3>
                    <div className="flex flex-col gap-2 md:items-end">
                      <span className="font-mono text-sm text-[#d4a373]">
                        {exp.position}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-neutral-600 md:text-xs">
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-500 md:mt-8 md:text-base">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Footer */}
      <footer
        id="contact"
        className="px-6 py-24 md:px-12 lg:px-20 md:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[60vh] flex-col justify-between rounded-2xl bg-[#111] p-8 md:p-16 lg:p-20">
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 md:text-sm">
                (04) Contact
              </h2>
              <div className="flex flex-wrap gap-6 md:gap-8">
                {Object.entries(socialLinks).map(
                  ([key, value]) =>
                    value && (
                      <a
                        key={key}
                        href={key === "email" ? `mailto:${value}` : value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 font-mono text-xs uppercase text-neutral-400 transition-colors hover:text-white"
                      >
                        {key}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    )
                )}
              </div>
            </div>

            <div className="mt-16 md:mt-0">
              <p className="mb-6 font-mono text-xs text-neutral-500 md:text-sm">
                Have an idea?
              </p>
              <a
                href={`mailto:${socialLinks.email}`}
                className="block font-instrument text-5xl text-white transition-all hover:text-[#d4a373] hover:italic md:text-7xl lg:text-8xl xl:text-9xl"
              >
                Let&apos;s talk.
              </a>
            </div>

            <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 md:mt-20 md:flex-row md:items-center md:justify-between">
              <span className="font-mono text-[10px] text-neutral-600 md:text-xs">
                © {new Date().getFullYear()} {fullName}
              </span>
              <Link
                href="/"
                className="font-mono text-[10px] text-neutral-600 hover:text-white md:text-xs"
              >
                Built with Showry
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
