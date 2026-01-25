import type { Portfolio } from "@/db/schema";

// Dummy data for demo preview
export const dummyPortfolio: Partial<Portfolio> = {
  fullName: "Aayush Kashyap",
  title: "SOFTWARE ENGINEER | PROBLEM SOLVER | FREELANCER",
  tagline:
    "Building scalable applications and solving real-world problems with modern web technologies.",
  bio: "I love solving problems, taking ownership end-to-end, and working in fast-paced, product-driven teams..",
  skills: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Docker",
    "AWS",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "WebRTC",
    "Python",
    "C++",
    "Tailwind CSS",
    "Hono.js",
    "Cloudflare",
  ],
  projects: [
    {
      id: "1",
      title: "P2P File Sharing System",
      description:
        "Built a peer-to-peer file sharing system using WebRTC DataChannels. Solved large file transfer failures by implementing streaming-based chunk dispatch and backpressure handling to prevent memory spikes.",
      tags: ["WebRTC", "React", "Node.js", "WebSockets"],
      github: "https://github.com/AayushKP",
      live: "https://p2p-share.example.com",
      featured: true,
    },
    {
      id: "2",
      title: "ComuniQ",
      description:
        "Full-stack real-time chat application with private/group chats. Features JWT + Google OAuth, secure media handling, and optimized rendering (40% less re-renders). Deployed on AWS EC2 with Docker & NGINX.",
      tags: ["React", "Node.js", "Docker", "AWS", "Socket.io"],
      github: "https://github.com/AayushKP",
      live: "https://comuniq.example.com",
      featured: true,
    },
    {
      id: "3",
      title: "Postly",
      description:
        "Serverless blogging platform using Cloudflare Workers and Hono.js. Integrated Mistral AI for content generation and Zod for validation.",
      tags: ["Hono.js", "Cloudflare", "PostgreSQL", "AI"],
      github: "https://github.com/AayushKP",
      live: "https://postly.example.com",
      featured: false,
    },
  ],
  experience: [
    {
      id: "1",
      company: "Optimence",
      position: "Software Development Intern",
      duration: "Oct 2025 - Nov 2025",
      description:
        "Developed production features for Transformik.com using Next.js and Supabase. Automated data-driven workflows with Python and LLMs.",
    },
    {
      id: "2",
      company: "Edunet Foundation",
      position: "AI & Cloud Intern",
      duration: "Jul 2025 - Aug 2025",
      description:
        "Built an Agentic AI application on IBM Cloud using watsonx.ai. Implemented RAG for improved response relevance.",
    },
    {
      id: "3",
      company: "Heritage Institute of Technology",
      position: "Frontend Engineer (Freelance)",
      duration: "May 2025 - Jun 2025",
      description:
        "Developed the official Resonance Music Club website using Next.js, Tailwind CSS, and Canvas animations.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "Heritage Institute of Technology",
      degree: "B.Tech in CSE (IoT & CS)",
      duration: "2022 - 2026",
      description: "CGPA: 8.08. Active in Resonance Music Club.",
    },
  ],
  socialLinks: {
    github: "https://github.com/AayushKP",
    linkedin: "https://linkedin.com/in/ayush-kashyap-26",
    email: "kashyaapayush26@gmail.com",
    twitter: "https://x.com/AayushKP",
    resume:
      "https://drive.google.com/file/d/1oRbgMiDWLJdVpa8Ne26X6wXhcHPqukOO/view?usp=sharing",
  },
  blogs: [
    {
      id: "1",
      title: "How the Javascript Engine Works",
      description: "Read more ...",
      link: "https://medium.com/@kashyaap.a/how-the-javascript-engine-works-c56e9536d808",
      date: "2024",
    },
    {
      id: "2",
      title: "Behind the Scenes of Javascript Asynchronous Magic",
      description: "Read more ...",
      link: "https://medium.com/@kashyaap.a/behind-the-scenes-of-javascript-asynchronous-magic-b257a74c5bb5",
      date: "2024",
    },
    {
      id: "3",
      title: "Making My App Faster and Scalable: What I Learned About Redis",
      description: "Read more ...",
      link: "https://medium.com/@kashyaap.a/making-my-app-faster-and-scalable-what-i-learned-about-redis-ac1256b8a68f",
      date: "2024",
    },
  ],
};
