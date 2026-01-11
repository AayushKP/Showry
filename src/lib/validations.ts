import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters")
  .regex(
    /^[a-z0-9-]+$/,
    "Username can only contain lowercase letters, numbers, and hyphens"
  )
  .refine(
    (val) => !val.startsWith("-") && !val.endsWith("-"),
    "Username cannot start or end with a hyphen"
  );

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  github: z.string().url().optional().or(z.literal("")),
  live: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().optional(),
});

export const socialLinksSchema = z.object({
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
});

export const portfolioSchema = z.object({
  username: usernameSchema,
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  profileImage: z.string().optional(),
  title: z.string().optional(),
  tagline: z
    .string()
    .max(200, "Tagline must be less than 200 characters")
    .optional(),
  bio: z.string().max(2000, "Bio must be less than 2000 characters").optional(),
  skills: z.array(z.string()),
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  socialLinks: socialLinksSchema,
  theme: z.string().default("minimal"),
  isPublished: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
