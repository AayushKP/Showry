"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Code2,
  Terminal,
  Cpu,
  Database,
  Layout,
  Server,
  Smartphone,
  Cloud,
  Layers,
  Box,
  ExternalLink,
} from "lucide-react";
import type { Portfolio } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import Marquee from "react-fast-marquee";
import ActivityCalendar from "react-activity-calendar";

interface PortfolioTemplateProps {
  portfolio: Partial<Portfolio>;
  isPreview?: boolean;
  isLoggedIn?: boolean;
}

// --- Icon & Color Mapping for Skills ---
const TechStackMap: Record<string, { icon: any; color: string }> = {
  react: { icon: Code2, color: "#61DAFB" },
  nextjs: { icon: Layers, color: "#FFFFFF" },
  typescript: { icon: Code2, color: "#3178C6" },
  javascript: { icon: Code2, color: "#F7DF1E" },
  node: { icon: Server, color: "#339933" },
  python: { icon: Terminal, color: "#3776AB" },
  tailwind: { icon: Layout, color: "#06B6D4" },
  css: { icon: Layout, color: "#1572B6" },
  html: { icon: Layout, color: "#E34F26" },
  git: { icon: Github, color: "#F05032" },
  docker: { icon: Box, color: "#2496ED" },
  aws: { icon: Cloud, color: "#FF9900" },
  firebase: { icon: Database, color: "#FFCA28" },
  mongodb: { icon: Database, color: "#47A248" },
  postgres: { icon: Database, color: "#4169E1" },
  postgresql: { icon: Database, color: "#4169E1" },
  supabase: { icon: Database, color: "#3ECF8E" },
  graphql: { icon: Database, color: "#E10098" },
  prisma: { icon: Database, color: "#2D3748" },
  flutter: { icon: Smartphone, color: "#02569B" },
  swift: { icon: Smartphone, color: "#F05138" },
  kotlin: { icon: Smartphone, color: "#0095D5" },
  rust: { icon: Terminal, color: "#000000" }, // usually white on dark
  go: { icon: Terminal, color: "#00ADD8" },
  solid: { icon: Code2, color: "#2C4F7C" },
  vue: { icon: Code2, color: "#4FC08D" },
  angular: { icon: Code2, color: "#DD0031" },
};

const DefaultIcon = Cpu;
const DefaultColor = "#A3A3A3"; // Neutral 400

const getSkillStyle = (skillName: string) => {
  const normalize = skillName.toLowerCase().replace(/[^a-z0-9]/g, "");
  // Try exact match or partial match
  const match = Object.keys(TechStackMap).find((k) => normalize.includes(k));
  return (
    TechStackMap[match || ""] || { icon: DefaultIcon, color: DefaultColor }
  );
};

// --- Components ---

// Ultra Cool Abstract SVG Placeholder
const CoolProjectPlaceholder = () => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#080808]">
    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-32 w-32 animate-pulse opacity-40"
    >
      <circle
        cx="100"
        cy="100"
        r="80"
        stroke="#d4a373"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <circle
        cx="100"
        cy="100"
        r="60"
        stroke="#d4a373"
        strokeWidth="1"
        strokeOpacity="0.3"
        run="indefinite"
      />
      <path
        d="M100 20V180M20 100H180"
        stroke="#d4a373"
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      <rect
        x="70"
        y="70"
        width="60"
        height="60"
        stroke="#d4a373"
        strokeWidth="2"
        transform="rotate(45 100 100)"
      />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
  </div>
);

// Interactive Logo Component
const InteractiveLogo = ({ name }: { name: string }) => {
  const [colors, setColors] = useState<string[]>([]);
  const firstName = name.split(" ")[0] || "Portfolio";

  // Initialize colors
  useEffect(() => {
    setColors(new Array(firstName.length).fill("text-white"));
  }, [firstName]);

  const cycleColor = (index: number) => {
    const palette = [
      "text-blue-500",
      "text-purple-500",
      "text-[#fffdd0]", // Creamish
      "text-[#d4a373]",
      "text-white",
    ];
    setColors((prev) => {
      const newColors = [...prev];
      const currentColor = prev[index];
      const nextIndex = (palette.indexOf(currentColor) + 1) % palette.length;
      newColors[index] = palette[nextIndex === -1 ? 0 : nextIndex];
      return newColors;
    });
  };

  return (
    <div className="flex cursor-pointer select-none">
      {firstName.split("").map((char, i) => (
        <motion.span
          key={i}
          whileHover={{ scale: 1.2, rotate: Math.random() * 10 - 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => cycleColor(i)}
          className={cn(
            "font-sans text-xl font-bold tracking-tighter md:text-2xl transition-colors duration-300",
            colors[i] || "text-white",
          )}
        >
          {char}
        </motion.span>
      ))}
      <span className="font-sans text-xl font-bold text-[#d4a373] md:text-2xl">
        .
      </span>
    </div>
  );
};

// Heatmap Component with Real API
const RealHeatmap = ({ username }: { username?: string }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Extract pure username from github url if needed
  const cleanUsername = useMemo(() => {
    if (!username) return null;
    if (username.includes("github.com/")) {
      const parts = username.split("github.com/");
      return parts[1].replace(/\/$/, ""); // remove trailing slash
    }
    return username;
  }, [username]);

  useEffect(() => {
    if (!cleanUsername) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${cleanUsername}?y=last`,
        );
        const json = await res.json();
        if (json.contributions) {
          // Transform for react-activity-calendar
          // API returns contributions array. react-activity-calendar expects { date, count, level }
          // Actually api returns { date, count, level } already usually or simple structure.
          // The API returns: { total: { ... }, contributions: [ { date: "2023-01-01", count: 0, level: 0 }, ... ] }
          // We need to ensure types match.
          setData(json.contributions);
        }
      } catch (e) {
        console.error("Failed to fetch GitHub data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cleanUsername]);

  if (!cleanUsername) {
    // Fallback visual if no username
    return (
      <div className="rounded-xl border border-white/5 bg-[#0a0a0a] p-8 text-center text-neutral-500">
        No GitHub username linked.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] p-6 lg:p-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5 text-white" />
          <h3 className="font-sans text-sm font-medium text-neutral-200">
            @{cleanUsername}
          </h3>
        </div>
        <span className="text-xs text-neutral-500">Last Year Activity</span>
      </div>

      <div className="flex w-full justify-center overflow-x-auto pb-2">
        {loading ? (
          <div className="flex h-[120px] w-full items-center justify-center text-sm text-neutral-600 animate-pulse">
            Loading contributions...
          </div>
        ) : data.length > 0 ? (
          <ActivityCalendar
            data={data}
            theme={{
              light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
            }}
            blockSize={12}
            blockMargin={3}
            fontSize={12}
            hideColorLegend
            hideTotalCount
            style={{ color: "#fff" }}
          />
        ) : (
          <div className="text-sm text-neutral-600">
            No public contribution data found.
          </div>
        )}
      </div>
    </motion.div>
  );
};

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
    profileImage,
  } = portfolio;

  const skills = rawSkills ?? [];
  const projects = rawProjects ?? [];
  const experience = rawExperience ?? [];
  const socialLinks = rawSocialLinks ?? {};

  // Split skills for Marquee (Left/Right)
  const half = Math.ceil(skills.length / 2);
  const skillsRow1 = skills.slice(0, half);
  const skillsRow2 = skills.slice(half);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-neutral-200 selection:bg-[#d4a37333] selection:text-[#d4a373] font-sans">
      {/* Edit Button */}
      {isPreview && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
            <button className="flex items-center gap-2 rounded-full border border-white/10 bg-[#111] px-6 py-3 text-sm font-medium text-white shadow-xl backdrop-blur-md transition-all hover:bg-white hover:text-black">
              {isLoggedIn ? "Edit Portfolio" : "Create Your Own"}
            </button>
          </Link>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <InteractiveLogo name={fullName} />
          <div className="flex gap-8">
            {["About", "Projects", "Experience", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hidden text-sm font-medium text-neutral-400 transition-colors hover:text-white md:block"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center overflow-hidden"
      >
        {/* Radial Gradient Lowkey */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-[#050505] to-[#050505] z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          {profileImage && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 h-32 w-32 overflow-hidden rounded-full border-2 border-white/10 p-1 md:h-40 md:w-40 ring-4 ring-neutral-900"
            >
              <img
                src={profileImage}
                alt={fullName}
                className="h-full w-full rounded-full object-cover"
              />
            </motion.div>
          )}

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            {fullName}
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap justify-center gap-3 md:gap-4"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a373] md:text-sm">
              {title?.toUpperCase()}
            </span>
          </motion.div>

          {tagline && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 font-light md:text-xl"
            >
              {tagline}
            </motion.p>
          )}

          {/* Social Icons Row */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-6"
          >
            {Object.entries(socialLinks).map(([key, value]) => {
              if (!value) return null;
              // Map key to icon
              let Icon = Globe;
              if (key.includes("github")) Icon = Github;
              if (key.includes("linkedin")) Icon = Linkedin;
              if (key.includes("twitter")) Icon = Twitter;
              if (key.includes("email")) Icon = Mail;

              return (
                <a
                  key={key}
                  href={key === "email" ? `mailto:${value}` : value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-white/10 hover:-translate-y-1"
                >
                  <Icon className="h-4 w-4 text-neutral-400 group-hover:text-white" />
                </a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-20 border-y border-white/5 bg-[#080808]/50 overflow-hidden">
        <div className="mb-12 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-neutral-500">
            Technologies & Tools
          </span>
        </div>

        {/* Row 1 - Left */}
        <div className="mb-8">
          <Marquee
            gradient={true}
            gradientColor="#050505"
            speed={40}
            direction="left"
          >
            {skillsRow1.concat(skillsRow1).map((skill, i) => {
              // Duplicate for smoothness if few
              const { icon: Icon, color } = getSkillStyle(skill);
              return (
                <div
                  key={`${skill}-${i}-1`}
                  className="mx-6 flex items-center gap-3 rounded-full border border-white/5 bg-[#111] px-6 py-3"
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                  <span className="font-medium text-neutral-300">{skill}</span>
                </div>
              );
            })}
          </Marquee>
        </div>

        {/* Row 2 - Right */}
        <div>
          <Marquee
            gradient={true}
            gradientColor="#050505"
            speed={40}
            direction="right"
          >
            {skillsRow2.concat(skillsRow2).map((skill, i) => {
              const { icon: Icon, color } = getSkillStyle(skill);
              return (
                <div
                  key={`${skill}-${i}-2`}
                  className="mx-6 flex items-center gap-3 rounded-full border border-white/5 bg-[#111] px-6 py-3"
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                  <span className="font-medium text-neutral-300">{skill}</span>
                </div>
              );
            })}
          </Marquee>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-6 block font-mono text-xs font-medium uppercase tracking-wider text-[#d4a373]">
            About Me
          </span>
          <div
            className="prose prose-invert prose-xl bg-transparent font-light leading-relaxed text-neutral-300 mx-auto"
            dangerouslySetInnerHTML={{
              __html: (bio || "").replace(/\n/g, "<br />"),
            }}
          />
        </div>
      </section>

      {/* Heatmap Section */}
      <section className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-4xl">
          <RealHeatmap username={socialLinks.github} />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-24 md:px-10 bg-[#080808]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="mb-4 block font-mono text-xs font-medium uppercase tracking-wider text-[#d4a373]">
              Selected Work
            </span>
            <h2 className="font-sans text-4xl font-bold text-white md:text-5xl">
              Featured Projects
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0e0e0e] hover:border-white/10"
              >
                {/* Image Area */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050505]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <CoolProjectPlaceholder />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex gap-4">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-neutral-200"
                        >
                          Live Demo <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          className="flex items-center gap-2 rounded-full bg-[#111] border border-white/20 px-5 py-2 text-sm font-bold text-white hover:bg-[#222]"
                        >
                          Code <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-neutral-400">
                    {project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-wider text-[#d4a373] bg-[#d4a373]/5 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {experience.length > 0 && (
        <section id="experience" className="px-6 py-24 md:px-10">
          <div className="mx-auto max-w-4xl">
            <span className="mb-10 block text-center font-mono text-xs font-medium uppercase tracking-wider text-[#d4a373]">
              Experience
            </span>
            <div className="space-y-12 border-l border-white/10 ml-4 md:ml-0 md:pl-0">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="relative pl-8 md:pl-0 md:grid md:grid-cols-4 md:gap-8"
                >
                  {/* Timeline Dot (Mobile) */}
                  <span className="md:hidden absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-[#d4a373] bg-[#050505]" />

                  <div className="md:col-span-1 mb-2 md:mb-0 md:text-right">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-wide">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Timeline Dot (Desktop) */}
                  <div className="hidden md:flex flex-col items-center relative">
                    <div className="h-3 w-3 rounded-full border border-[#d4a373] bg-[#050505] z-10 my-1" />
                    <div className="absolute top-4 bottom-[-48px] w-px bg-white/10 last:hidden" />
                  </div>

                  <div className="md:col-span-2">
                    <h4 className="text-lg font-bold text-white">
                      {exp.company}
                    </h4>
                    <span className="text-sm text-[#d4a373] mb-3 block">
                      {exp.position}
                    </span>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <footer
        id="contact"
        className="px-6 py-24 md:px-10 relative overflow-hidden"
      >
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#d4a373]/5 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="mb-6 font-sans text-4xl font-bold text-white md:text-6xl">
            Let's work together.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-neutral-400">
            I'm always interested in hearing about new projects and
            opportunities.
          </p>
          <a
            href={`mailto:${socialLinks.email}`}
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-black transition-transform hover:scale-105"
          >
            Get in Touch
          </a>

          <div className="mt-20 flex justify-center gap-8">
            {Object.entries(socialLinks).map(([key, value]) => {
              if (!value || key === "email") return null;
              let Icon = Globe;
              if (key.includes("github")) Icon = Github;
              if (key.includes("linkedin")) Icon = Linkedin;
              if (key.includes("twitter")) Icon = Twitter;
              return (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
          <div className="mt-12 text-xs text-neutral-600">
            © {new Date().getFullYear()} {fullName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
