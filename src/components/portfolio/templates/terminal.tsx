"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Globe,
  ChevronDown,
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
    );

    return () => clearInterval(intervalId);
  }, [isStarted, text, onComplete]);

  return <span className={className}>{displayedText}</span>;
};

const CommandPrompt = ({
  command,
  path = "~",
  delay = 0,
  username = "guest",
}: {
  command: string;
  path?: string;
  delay?: number;
  username?: string;
}) => {
  const [showCursor, setShowCursor] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);

  // If username is "guest" or empty, default to "user" or keep it as is.
  // The user requested {username}.portfolio e.g. aayush.portfolio
  // We'll clean the username to be lowercase and single-word-like for the prompt.
  const displayUser = username.toLowerCase().replace(/\s+/g, "") || "guest";

  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-sm md:text-base mb-4">
      <div className="flex items-center gap-1 text-[#4ade80]">
        <span>{displayUser}.portfolio</span>
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

const TerminalPreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const bootText = [
    "Initializing system core...",
    "Loading kernel modules...",
    "> [OK] CPU Check verified",
    "> [OK] Memory Integrity verified",
    "Mounting file systems...",
    "Starting network services...",
    "Connecting to portfolio host...",
    "Fetching user data...",
    "Establishing secure connection...",
    "Access granted.",
  ];

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let delay = 0;

    bootText.forEach((line, index) => {
      delay += Math.random() * 300 + 150;
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line]);

        if (index === bootText.length - 1) {
          const completeTimeout = setTimeout(onComplete, 800);
          timeouts.push(completeTimeout);
        }
      }, delay);
      timeouts.push(timeout);
    });

    // Cleanup all timeouts on unmount
    return () => {
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // onComplete is stable from parent, bootText is static

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505] font-mono text-sm text-[#c9d1d9]">
      <div className="w-[350px] rounded-lg border border-[#30363d] bg-[#0d1117] p-0 shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#30363d] name-bar-gradient px-4 py-2 bg-[#161b22]">
          <span className="text-xs text-[#8b949e]">bash.exe</span>
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
        </div>
        {/* Terminal Body */}
        <div
          ref={scrollRef}
          className="h-64 overflow-y-auto p-4 font-mono text-xs space-y-1 scrollbar-hide"
        >
          {lines.map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-[#4ade80] shrink-0">$</span>
              <span
                className={
                  line.includes("[OK]") ? "text-[#4ade80]" : "text-[#c9d1d9]"
                }
              >
                {line}
              </span>
            </div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-[#4ade80] mt-2 block"
          >
            _
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ExpandableDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-start">
      <div
        className={cn(
          "text-[#c9d1d9] leading-relaxed opacity-90 border-l-2 border-[#30363d] pl-4 py-1 hover:border-[#4ade80] transition-colors relative",
          !isExpanded && "line-clamp-3 md:line-clamp-none",
        )}
      >
        {description}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[#4ade80] text-xs flex items-center gap-1 md:hidden ml-4 mt-2 hover:underline decoration-dashed underline-offset-4"
      >
        {isExpanded ? "Read Less" : "Read More"}
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform",
            isExpanded && "rotate-180",
          )}
        />
      </button>
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
    username = "guest",
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

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [heroDone, setHeroDone] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Smooth scroll
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["about", "projects", "skills", "experience", "contact"];

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <TerminalPreloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen w-full bg-[#111111] text-[#c9d1d9] font-mono selection:bg-[#4ade80] selection:text-[#0d1117] overflow-x-hidden p-4 md:p-8">
          <style
            dangerouslySetInnerHTML={{
              __html: `
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap');
            body { font-family: 'Fira Code', monospace; }
            ::-webkit-scrollbar { width: 10px; background: #111111; }
            ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; border: 1px solid #111111; }
            ::-webkit-scrollbar-thumb:hover { background: #4ade80; }
          `,
            }}
          />

          {/* Top Bar (Fake Window Controls) */}
          <div className="fixed top-0 left-0 right-0 z-40 bg-[#111111]/90 backdrop-blur border-b border-[#30363d] px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="group flex items-center gap-2 px-2 py-1 rounded bg-[#21262d] border border-[#30363d] text-xs text-[#8b949e]">
                <Terminal className="w-3 h-3" />
                <span>bash — {username.toLowerCase()}</span>
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
              <Link href={isLoggedIn ? "/dashboard" : "/"}>
                <button className="flex items-center gap-2 rounded border border-[#30363d] bg-[#161b22] px-4 py-2 text-sm text-[#4ade80] hover:bg-[#21262d] hover:border-[#4ade80] shadow-lg transition-all">
                  {isLoggedIn ? "> edit_portfolio" : "> create_yours"}
                </button>
              </Link>
            </div>
          )}

          {/* Main Container */}
          <div className="max-w-5xl mx-auto mt-16 pb-20 space-y-32">
            {/* Hero Section */}
            <section
              id="about"
              className="min-h-[80vh] flex flex-col justify-center"
            >
              <CommandPrompt
                command="./init.sh"
                delay={500}
                username={username}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
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
                    <span className="text-[#79c0ff] opacity-60">{"//"}</span>{" "}
                    {bio}
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
                            : key.includes("website")
                              ? Globe
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

                {/* Navbar Links */}
                <div className="flex flex-wrap gap-4 mt-8 text-sm border-t border-[#30363d] pt-6">
                  <div className="text-[#8b949e] italic w-full mb-2">
                    # Navigation
                  </div>
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

            {/* Projects Section - Renovated */}
            {projects.length > 0 && (
              <section id="projects" className="scroll-mt-24">
                <CommandPrompt
                  command="./list_projects.py --verbose"
                  delay={200}
                  path="~/code"
                  username={username}
                />

                <div className="mt-8 grid gap-10 lg:grid-cols-2">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col bg-[#0d1117] rounded-lg border border-[#30363d] shadow-xl overflow-hidden group hover:border-[#4ade80] transition-all duration-300"
                    >
                      {/* Terminal Window Header */}
                      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="text-xs text-[#8b949e] font-mono">
                          {project.title.toLowerCase().replace(/\s+/g, "-")}.sh
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-[#e6edf3] group-hover:text-[#4ade80] transition-colors">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="text-[10px] uppercase border border-[#facc15] text-[#facc15] px-2 py-0.5 rounded animate-pulse">
                              Featured
                            </span>
                          )}
                        </div>

                        <p className="text-[#8b949e] text-sm mb-6 leading-relaxed flex-1">
                          <span className="text-[#4ade80] mr-2">$</span>
                          {project.description}
                        </p>

                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] px-2 py-1 bg-[#21262d] text-[#79c0ff] rounded border border-[#30363d]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 pt-4 border-t border-[#30363d]">
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                className="text-sm flex items-center gap-1 text-[#e6edf3] hover:text-[#4ade80] transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>live</span>
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                className="text-sm flex items-center gap-1 text-[#e6edf3] hover:text-[#4ade80] transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills Section - Renovated */}
            {skills.length > 0 && (
              <section id="skills" className="scroll-mt-24">
                <CommandPrompt
                  command="grep -r 'proficiency' ./skills"
                  delay={200}
                  path="~/skills"
                  username={username}
                />

                <div className="mt-8 border border-[#30363d] bg-[#0d1117] p-6 rounded-lg relative overflow-hidden">
                  {/* Matrix effect or ASCII art background hint if valid, for now just clean grid */}
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <pre className="text-[10px] text-[#4ade80]">
                      {`
010101010101
101010101010
001100110011
`}
                    </pre>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                    {skills.map((skill, index) => {
                      const isHiddenOnMobile = index >= 7 && !showAllSkills;
                      return (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            "group",
                            isHiddenOnMobile && "hidden md:block",
                          )}
                        >
                          <div className="flex justify-between items-end mb-1">
                            <span className="text-sm font-bold text-[#e6edf3] group-hover:text-[#4ade80] transition-colors">
                              {">"} {skill}
                            </span>
                            <span className="text-xs text-[#8b949e]">100%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#21262d] rounded overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              transition={{
                                duration: 1,
                                delay: 0.2 + index * 0.05,
                              }}
                              className="h-full bg-[#4ade80] opacity-60 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* See More Button for Mobile */}
                  {skills.length > 7 && (
                    <button
                      onClick={() => setShowAllSkills(!showAllSkills)}
                      className="w-full mt-6 flex items-center justify-center gap-2 text-xs text-[#8b949e] hover:text-[#4ade80] transition-colors md:hidden border border-[#30363d] rounded py-2 bg-[#161b22] group"
                    >
                      {showAllSkills ? "Show Less" : "See More"}
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform group-hover:text-[#4ade80]",
                          showAllSkills && "rotate-180",
                        )}
                      />
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* Experience Section */}
            {experience.length > 0 && (
              <section id="experience" className="scroll-mt-24">
                <CommandPrompt
                  command="cat career_history.log"
                  delay={200}
                  path="~/history"
                  username={username}
                />

                <div className="mt-8 space-y-12 relative border-l border-[#30363d] ml-3 pl-10">
                  {experience.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute -left-[45px] top-1.5 h-4 w-4 rounded-full bg-[#0d1117] border-2 border-[#8b949e] group-hover:border-[#4ade80] group-hover:scale-110 transition-all" />

                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                        <h3 className="text-2xl font-bold text-[#e6edf3]">
                          {job.company}
                          <span className="text-[#4ade80] mx-2">@</span>
                          <span className="text-[#e6edf3] font-normal text-lg">
                            {job.position}
                          </span>
                        </h3>
                        <span className="text-sm text-[#8b949e] font-mono border border-[#30363d] px-2 py-1 rounded bg-[#161b22]">
                          {job.duration}
                        </span>
                      </div>
                      <ExpandableDescription
                        description={job.description || ""}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Blogs Section - Renovated */}
            {blogs.length > 0 && (
              <section id="blogs" className="scroll-mt-24">
                <CommandPrompt
                  command="ls -l ./thoughts"
                  delay={200}
                  path="~/blog"
                  username={username}
                />

                <div className="mt-6 border border-[#30363d] rounded-lg bg-[#0d1117] overflow-hidden">
                  <div className="px-4 py-2 border-b border-[#30363d] bg-[#161b22] text-xs text-[#8b949e] flex justify-between">
                    <span>File System</span>
                    <span>Total: {blogs.length} files</span>
                  </div>
                  <div className="divide-y divide-[#30363d]">
                    {blogs.map((blog: any, i: number) => {
                      // Generate stable binary hash based on index
                      const binaryHash = Array(10)
                        .fill(0)
                        .map((_, j) => ((i + j) % 2 === 0 ? "1" : "0"))
                        .join("");
                      return (
                        <a
                          key={i}
                          href={blog.link}
                          target="_blank"
                          className="flex flex-col sm:flex-row p-4 hover:bg-[#161b22] transition-colors group cursor-pointer gap-4"
                        >
                          <div className="font-mono text-xs text-[#8b949e] shrink-0 w-24 pt-1">
                            {binaryHash}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="w-4 h-4 text-[#4ade80]" />
                              <h3 className="text-[#e6edf3] font-bold group-hover:text-[#4ade80] transition-colors group-hover:underline">
                                {blog.title}
                              </h3>
                            </div>
                            <p className="text-sm text-[#8b949e] pl-6 mb-2 line-clamp-2">
                              {blog.description}
                            </p>
                            <div className="pl-6 text-xs text-[#4ade80] opacity-0 group-hover:opacity-100 transition-opacity">
                              click_to_open_file()
                            </div>
                          </div>
                          <div className="text-xs text-[#8b949e] shrink-0 self-start sm:self-center">
                            {blog.date || "2024"}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Contact Section */}
            <section id="contact" className="pb-32">
              <CommandPrompt
                command="./connect.sh --status"
                delay={200}
                path="~/network"
                username={username}
              />

              <div className="mt-8 border border-[#30363d] bg-[#0d1117] rounded-lg overflow-hidden shadow-2xl">
                {/* Terminal Window Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-xs text-[#8b949e] font-mono">
                      network_manager — v2.4.0
                    </span>
                  </div>
                  <div className="text-xs text-[#8b949e] font-mono">
                    UPTIME: <span className="text-[#4ade80]">99.9%</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 font-mono">
                  <div className="mb-6 text-sm text-[#8b949e] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[#4ade80]">$</span> netstat -an |
                      grep LISTEN
                      <br />
                      <span className="opacity-50">
                        # Scanning available communication channels...
                      </span>
                    </div>
                    <div className="px-3 py-1 border border-[#30363d] rounded bg-[#0d1117] text-xs">
                      STATUS:{" "}
                      <span className="text-[#4ade80] animate-pulse">
                        ONLINE
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {/* Table Header */}
                    <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[150px_1fr_150px] gap-4 text-xs text-[#6e7681] px-4 py-2 border-b border-[#30363d] uppercase tracking-wider">
                      <div>Protocol</div>
                      <div>Endpoint / Address</div>
                      <div className="text-right">Action</div>
                    </div>

                    {/* Rows */}
                    {socialLinks.email && (
                      <a
                        href={`mailto:${socialLinks.email}`}
                        className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[150px_1fr_150px] gap-4 items-center px-4 py-3 group hover:bg-[#161b22] border-b border-[#30363d]/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-[#e6edf3]">
                          <Mail className="w-4 h-4 text-[#facc15]" />
                          <span className="font-bold">MAILTO</span>
                        </div>
                        <div className="text-sm text-[#8b949e] truncate group-hover:text-[#4ade80] transition-colors">
                          {socialLinks.email}
                        </div>
                        <div className="text-right">
                          <span className="text-xs border border-[#30363d] px-2 py-1 rounded text-[#79c0ff] group-hover:border-[#79c0ff] bg-[#0d1117]">
                            CONNECT
                          </span>
                        </div>
                      </a>
                    )}

                    {socialLinks.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[150px_1fr_150px] gap-4 items-center px-4 py-3 group hover:bg-[#161b22] border-b border-[#30363d]/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-[#e6edf3]">
                          <Github className="w-4 h-4 text-[#facc15]" />
                          <span className="font-bold">SSH / GIT</span>
                        </div>
                        <div className="text-sm text-[#8b949e] truncate group-hover:text-[#4ade80] transition-colors">
                          {socialLinks.github.replace("https://", "")}
                        </div>
                        <div className="text-right">
                          <span className="text-xs border border-[#30363d] px-2 py-1 rounded text-[#79c0ff] group-hover:border-[#79c0ff] bg-[#0d1117]">
                            CONNECT
                          </span>
                        </div>
                      </a>
                    )}

                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[150px_1fr_150px] gap-4 items-center px-4 py-3 group hover:bg-[#161b22] border-b border-[#30363d]/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-[#e6edf3]">
                          <Linkedin className="w-4 h-4 text-[#facc15]" />
                          <span className="font-bold">LINKEDIN</span>
                        </div>
                        <div className="text-sm text-[#8b949e] truncate group-hover:text-[#4ade80] transition-colors">
                          {socialLinks.linkedin.split("in/")[1] || "profile"}
                        </div>
                        <div className="text-right">
                          <span className="text-xs border border-[#30363d] px-2 py-1 rounded text-[#79c0ff] group-hover:border-[#79c0ff] bg-[#0d1117]">
                            CONNECT
                          </span>
                        </div>
                      </a>
                    )}

                    {socialLinks.website && (
                      <a
                        href={socialLinks.website}
                        target="_blank"
                        className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[150px_1fr_150px] gap-4 items-center px-4 py-3 group hover:bg-[#161b22] border-b border-[#30363d]/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-[#e6edf3]">
                          <Globe className="w-4 h-4 text-[#facc15]" />
                          <span className="font-bold">HTTPS</span>
                        </div>
                        <div className="text-sm text-[#8b949e] truncate group-hover:text-[#4ade80] transition-colors">
                          {socialLinks.website.replace(/^https?:\/\//, "")}
                        </div>
                        <div className="text-right">
                          <span className="text-xs border border-[#30363d] px-2 py-1 rounded text-[#79c0ff] group-hover:border-[#79c0ff] bg-[#0d1117]">
                            CONNECT
                          </span>
                        </div>
                      </a>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#30363d] flex justify-between items-center text-xs text-[#8b949e]">
                    <div>
                      <span className="text-[#4ade80]">✔</span> 4 ports open
                    </div>
                    <div className="flex items-center gap-2">
                      <span>latency: 24ms</span>
                      <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                    </div>
                  </div>
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
      )}
    </>
  );
}
