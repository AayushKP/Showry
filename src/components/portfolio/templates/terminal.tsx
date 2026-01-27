"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  ExternalLink,
  Terminal,
  ChevronRight,
  Maximize2,
  Minus,
  X,
  Copy,
  Check,
} from "lucide-react";
import type { Portfolio, BlogData } from "@/db/schema";
import { cn } from "@/lib/utils";
import { dummyPortfolio } from "@/lib/dummy-data";
import type { PortfolioTemplateProps } from "./index";

// --- Utility Components ---

const Typewriter = ({
  text,
  delay = 0,
  className,
  onComplete,
}: {
  text?: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted || !text) return;

    let index = 0;
    const intervalId = setInterval(
      () => {
        setDisplayedText(text.slice(0, index + 1));
        index++;

        if (index === text.length) {
          clearInterval(intervalId);
          onComplete?.();
        }
      },
      30 + Math.random() * 20,
    ); // Random typing speed

    return () => clearInterval(intervalId);
  }, [isStarted, text, onComplete]);

  return <span className={className}>{displayedText}</span>;
};

const CommandPrompt = ({
  command,
  path = "~",
  delay = 0,
}: {
  command: string;
  path?: string;
  delay?: number;
}) => {
  const [showCursor, setShowCursor] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-sm md:text-base mb-4">
      <div className="flex items-center gap-1 text-[#4ade80]">
        <span>guest@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">{path}</span>
        <span className="text-white">$</span>
      </div>
      <div className="flex items-center">
        <Typewriter
          text={command}
          delay={delay}
          className="text-[#facc15]"
          onComplete={() => {
            setIsTypingDone(true);
            setShowCursor(true);
          }}
        />
        {isTypingDone && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1 inline-block h-4 w-2 bg-neutral-400 align-middle"
          />
        )}
      </div>
    </div>
  );
};

// --- Main Template Component ---

export function TerminalTemplate({
  portfolio,
  isPreview = false,
  isLoggedIn = false,
}: PortfolioTemplateProps) {
  const mergedPortfolio = isPreview
    ? { ...dummyPortfolio, ...portfolio }
    : portfolio;

  const {
    fullName = "User Name",
    title = "Developer",
    bio,
    skills: rawSkills,
    projects: rawProjects,
    experience: rawExperience,
    socialLinks: rawSocialLinks,
    blogs: rawBlogs,
  } = mergedPortfolio;

  // Ensure non-null values for arrays and objects
  const skills = rawSkills ?? [];
  const projects = rawProjects ?? [];
  const experience = rawExperience ?? [];
  const socialLinks = rawSocialLinks ?? {};
  const blogs = rawBlogs ?? [];

  // State to sequentialize animations slightly
  const [heroDone, setHeroDone] = useState(false);

  // Smooth scroll
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["about", "projects", "experience", "contact"];

  return (
    <div className="min-h-screen w-full bg-[#0d1117] text-[#c9d1d9] font-mono selection:bg-[#4ade80] selection:text-[#0d1117] overflow-x-hidden p-4 md:p-8">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap');
        body { font-family: 'Fira Code', monospace; }
        ::-webkit-scrollbar { width: 10px; background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; border: 2px solid #0d1117; }
        ::-webkit-scrollbar-thumb:hover { background: #4ade80; }
      `,
        }}
      />

      {/* Top Bar (Fake Window Controls) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/90 backdrop-blur border-b border-[#30363d] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="group flex items-center gap-2 px-2 py-1 rounded bg-[#21262d] border border-[#30363d] text-xs text-[#8b949e]">
            <Terminal className="w-3 h-3" />
            <span>bash — {fullName.toLowerCase()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
      </div>

      {/* Edit Button */}
      {isPreview && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
            <button className="flex items-center gap-2 rounded border border-[#30363d] bg-[#161b22] px-4 py-2 text-sm text-[#4ade80] hover:bg-[#21262d] hover:border-[#4ade80] shadow-lg transition-all">
              {isLoggedIn ? "> edit_portfolio" : "> create_yours"}
            </button>
          </Link>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-4xl mx-auto mt-16 pb-20 space-y-24">
        {/* Hero Section */}
        <section
          id="about"
          className="min-h-[80vh] flex flex-col justify-center"
        >
          <CommandPrompt command="./init.sh" delay={500} />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            onAnimationComplete={() => setHeroDone(true)}
            className="mt-6 border-l-2 border-[#30363d] pl-4 md:pl-6 space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#e6edf3]">
              Hello, I'm <span className="text-[#4ade80]">{fullName}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-[#8b949e]">
              {">"} {title}
            </h2>

            {bio && (
              <p className="max-w-2xl text-[#c9d1d9] leading-relaxed text-lg">
                {/* Render bio but highlight keywords roughly if we could, for now plain text */}
                <span className="text-[#79c0ff] opacity-60">{"//"}</span> {bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 mt-8 pt-4">
              {Object.entries(socialLinks || {}).map(([key, value]) => {
                if (!value) return null;
                const Icon = key.includes("github")
                  ? Github
                  : key.includes("linkedin")
                    ? Linkedin
                    : key.includes("twitter")
                      ? Twitter
                      : key.includes("email")
                        ? Mail
                        : ExternalLink;
                return (
                  <a
                    key={key}
                    href={key === "email" ? `mailto:${value}` : value}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:border-[#4ade80] hover:text-[#4ade80] transition-colors text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{key}</span>
                  </a>
                );
              })}
            </div>

            {/* Navbar "Links" essentially */}
            <div className="flex flex-wrap gap-4 mt-8 text-sm">
              {navItems.map((item, i) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-[#8b949e] hover:text-[#facc15] hover:underline decoration-dashed underline-offset-4"
                >
                  {`[${i + 1}] jump_to_${item}`}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        {skills.length > 0 && (
          <section id="skills" className="scroll-mt-24">
            <CommandPrompt
              command="ls -la ./skills"
              delay={200}
              path="~/skills"
            />

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 p-2 group cursor-default"
                >
                  <span className="text-[#30363d] group-hover:text-[#4ade80] transition-colors">
                    permissions: r-x
                  </span>
                  <span className="text-[#c9d1d9] group-hover:text-white font-bold">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section id="experience" className="scroll-mt-24">
            <CommandPrompt
              command="tail -n 5 career.log"
              delay={200}
              path="~/history"
            />

            <div className="mt-6 space-y-8 relative border-l border-[#30363d] ml-2 pl-8">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[39px] top-1 h-3 w-3 rounded-full bg-[#21262d] border border-[#8b949e] group-hover:border-[#4ade80]" />

                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#e6edf3]">
                      {job.company}
                      <span className="text-[#8b949e] font-normal mx-2">@</span>
                      <span className="text-[#4ade80]">{job.position}</span>
                    </h3>
                    <span className="text-sm text-[#8b949e] font-mono whitespace-nowrap">
                      [{job.duration}]
                    </span>
                  </div>
                  <p className="text-[#c9d1d9] leading-relaxed opacity-90">
                    {job.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section id="projects" className="scroll-mt-24">
            <CommandPrompt
              command="./list_projects.py --featured"
              delay={200}
              path="~/code"
            />

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group border border-[#30363d] bg-[#0d1117] rounded hover:border-[#4ade80] transition-colors duration-300"
                >
                  {/* Header Bar */}
                  <div className="flex items-center justify-between border-b border-[#30363d] px-3 py-2 bg-[#161b22] group-hover:border-[#4ade80]/30 transition-colors">
                    <span className="text-xs text-[#8b949e]">
                      {project.title.toLowerCase().replace(/\s+/g, "_")}.exe
                    </span>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#30363d]" />
                      <div className="w-2 h-2 rounded-full bg-[#30363d]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#e6edf3] mb-2 group-hover:text-[#4ade80] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#8b949e] text-sm mb-4 h-12 overflow-hidden line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 border border-[#30363d] text-[#79c0ff] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mt-auto text-sm border-t border-[#30363d] pt-3">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          className="flex items-center gap-1 text-[#e6edf3] hover:text-[#4ade80] hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          run_demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          className="flex items-center gap-1 text-[#e6edf3] hover:text-[#4ade80] hover:underline"
                        >
                          <Github className="w-3 h-3" />
                          view_src
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Blogs Section (Fixed to use correct layout) */}
        {blogs.length > 0 && (
          <section id="blogs" className="scroll-mt-24">
            <CommandPrompt
              command="cat ./notes.md"
              delay={200}
              path="~/thoughts"
            />
            <div className="mt-6 flex flex-col gap-6">
              {blogs.map((blog: any, i: number) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-6 border border-[#30363d] p-4 bg-[#161b22]/50 hover:bg-[#161b22] hover:border-[#4ade80] transition-all group"
                >
                  {blog.image && (
                    <div className="w-full md:w-48 h-32 shrink-0 bg-[#0d1117] border border-[#30363d] overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-[#e6edf3] group-hover:text-[#4ade80] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-[#8b949e] mt-2 line-clamp-2">
                      {blog.description}
                    </p>
                    <a
                      href={blog.link}
                      target="_blank"
                      className="mt-3 text-xs text-[#79c0ff] hover:underline flex items-center gap-1"
                    >
                      <span>read_more</span>{" "}
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className="pb-32">
          <CommandPrompt
            command="./send_message.sh"
            delay={200}
            path="~/contact"
          />

          <div className="mt-8 border border-[#30363d] bg-[#161b22] p-6 max-w-xl">
            <p className="text-[#8b949e] mb-6">
              # You can reach me via email or social media endpoints.
              <br /># Initiating connection protocol...
            </p>

            <div className="space-y-3">
              <div className="grid grid-cols-[100px_1fr] items-center gap-2 text-sm">
                <span className="text-[#ff7b72]">$ email:</span>
                <a
                  href={`mailto:${socialLinks.email || ""}`}
                  className="text-[#a5d6ff] hover:underline"
                >
                  {socialLinks.email || "not_configured"}
                </a>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-2 text-sm">
                <span className="text-[#ff7b72]">$ linkedin:</span>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  className="text-[#a5d6ff] hover:underline"
                >
                  {socialLinks.linkedin || "not_configured"}
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-[#30363d] pt-4">
              <a
                href={`mailto:${socialLinks.email || ""}`}
                className="inline-flex items-center gap-2 bg-[#238636] text-white px-4 py-2 text-sm font-medium hover:bg-[#2ea043] transition-colors"
              >
                <Terminal className="w-4 h-4" />
                <span>sudo mail -s "Hello"</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#30363d] pt-8 text-center text-xs text-[#8b949e] font-mono">
          <p className="mb-2">Process completed with exit code 0</p>
          <p>
            © {new Date().getFullYear()} {fullName}. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
