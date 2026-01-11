"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Globe, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Portfolio, SocialLinksData } from "@/db/schema";

interface SocialLinksFormProps {
  portfolio: Portfolio;
  onUpdate: (data: Partial<Portfolio>) => void;
}

const socialFields = [
  {
    key: "github" as keyof SocialLinksData,
    label: "GitHub",
    icon: Github,
    placeholder: "https://github.com/username",
  },
  {
    key: "linkedin" as keyof SocialLinksData,
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "https://linkedin.com/in/username",
  },
  {
    key: "twitter" as keyof SocialLinksData,
    label: "Twitter / X",
    icon: Twitter,
    placeholder: "https://twitter.com/username",
  },
  {
    key: "website" as keyof SocialLinksData,
    label: "Personal Website",
    icon: Globe,
    placeholder: "https://yourwebsite.com",
  },
  {
    key: "email" as keyof SocialLinksData,
    label: "Contact Email",
    icon: Mail,
    placeholder: "hello@example.com",
  },
];

export function SocialLinksForm({ portfolio, onUpdate }: SocialLinksFormProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLinksData>(
    portfolio.socialLinks || {}
  );

  const handleChange = (key: keyof SocialLinksData, value: string) => {
    const newSocialLinks = { ...socialLinks, [key]: value };
    setSocialLinks(newSocialLinks);
    onUpdate({ socialLinks: newSocialLinks });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white">Social Links</h2>
        <p className="mt-1 text-sm text-gray-400">
          Add links to your social profiles and contact information
        </p>
      </div>

      <div className="space-y-6">
        {socialFields.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key} className="space-y-2">
            <Label className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-gray-400" />
              {label}
            </Label>
            <Input
              value={socialLinks[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-4">
        <h3 className="mb-2 text-sm font-medium text-white">Tips:</h3>
        <ul className="space-y-1 text-xs text-gray-400">
          <li>• Use full URLs for all links (include https://)</li>
          <li>• For email, just enter the email address</li>
          <li>• Leave fields empty if you don&apos;t want to display them</li>
        </ul>
      </div>
    </motion.div>
  );
}
