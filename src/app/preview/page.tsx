"use client";

import { useEffect, useState } from "react";
import { PortfolioTemplate } from "@/components/portfolio/portfolio-template";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import type { Portfolio } from "@/db/schema";

// Dummy data for demo preview
export const dummyPortfolio: Partial<Portfolio> = {
  fullName: "Alex Johnson",
  title: "Full Stack Developer & Designer",
  tagline:
    "Building things that work outside the terminal and solve real problems for real people.",
  bio: "I'm a developer who loves creating elegant solutions to complex problems. Currently exploring the intersection of design and engineering, with a focus on building products that make a difference.\n\nWith over 5 years of experience in web development, I've worked with startups and established companies alike. I believe in writing clean, maintainable code and creating user experiences that delight.",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Figma",
    "Tailwind CSS",
    "Next.js",
    "GraphQL",
    "Docker",
    "AWS",
    "Git",
  ],
  projects: [
    {
      id: "1",
      title: "AI Content Studio",
      description:
        "A full-stack application helping creators generate and manage content using AI. Built with Next.js, OpenAI API, and PostgreSQL. Features include multi-language support, content scheduling, and analytics dashboard.",
      tags: ["Next.js", "AI", "PostgreSQL", "OpenAI"],
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
    },
    {
      id: "2",
      title: "Finance Tracker",
      description:
        "Personal finance management app with real-time insights and budget tracking. Features beautiful data visualizations and smart spending categories.",
      tags: ["React", "Charts", "Firebase", "TypeScript"],
      github: "https://github.com",
      live: "https://example.com",
      featured: false,
    },
    {
      id: "3",
      title: "DevConnect",
      description:
        "A social platform for developers to share projects, collaborate, and find mentors. Built with a focus on community and learning.",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com",
      live: "",
      featured: true,
    },
    {
      id: "4",
      title: "Weather Dashboard",
      description:
        "A beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.",
      tags: ["React", "APIs", "Geolocation"],
      github: "https://github.com",
      live: "https://example.com",
      featured: false,
    },
  ],
  experience: [
    {
      id: "1",
      company: "Tech Startup Inc.",
      position: "Senior Developer",
      duration: "2022 - Present",
      description:
        "Leading frontend development and mentoring junior developers. Architected and implemented a new design system that improved development velocity by 40%.",
    },
    {
      id: "2",
      company: "Digital Agency Co.",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      description:
        "Built custom web applications for clients across various industries. Worked closely with designers to implement pixel-perfect UIs.",
    },
    {
      id: "3",
      company: "Freelance",
      position: "Web Developer",
      duration: "2018 - 2020",
      description:
        "Developed websites and web applications for small businesses and startups. Handled everything from design to deployment.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "State University",
      degree: "B.S. in Computer Science",
      duration: "2014 - 2018",
      description:
        "Focused on software engineering and human-computer interaction. Dean's List all semesters.",
    },
  ],
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "alex@example.com",
  },
};

export default function PreviewPage() {
  const { data: session, isPending } = useSession();
  const [portfolio, setPortfolio] = useState<Partial<Portfolio> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (session?.user) {
        try {
          const res = await fetch("/api/portfolio");
          const data = await res.json();

          if (data.portfolio && data.portfolio.fullName) {
            setPortfolio(data.portfolio);
          } else {
            // User has portfolio but no data, show dummy
            setPortfolio(dummyPortfolio);
          }
        } catch {
          setPortfolio(dummyPortfolio);
        }
      } else {
        // Not logged in, show dummy
        setPortfolio(dummyPortfolio);
      }
      setIsLoading(false);
    };

    if (!isPending) {
      fetchPortfolio();
    }
  }, [session, isPending]);

  if (isPending || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <PortfolioTemplate
      portfolio={portfolio || dummyPortfolio}
      isPreview={true}
      isLoggedIn={!!session?.user}
    />
  );
}
