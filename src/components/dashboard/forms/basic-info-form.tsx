"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { debounce } from "@/lib/utils";
import type { Portfolio } from "@/db/schema";

interface BasicInfoFormProps {
  portfolio: Portfolio;
  onUpdate: (data: Partial<Portfolio>) => void;
}

export function BasicInfoForm({ portfolio, onUpdate }: BasicInfoFormProps) {
  const [username, setUsername] = useState(portfolio.username || "");
  const [fullName, setFullName] = useState(portfolio.fullName || "");
  const [title, setTitle] = useState(portfolio.title || "");

  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");
  const [usernameError, setUsernameError] = useState("");

  // Check username availability
  const checkUsername = useCallback(
    debounce(async (value: string) => {
      if (!value || value === portfolio.username) {
        setUsernameStatus("idle");
        return;
      }

      setUsernameStatus("checking");
      try {
        const res = await fetch("/api/check-username", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: value }),
        });
        const data = await res.json();

        if (data.available) {
          setUsernameStatus("available");
          setUsernameError("");
        } else {
          setUsernameStatus(
            data.error?.includes("taken") ? "taken" : "invalid",
          );
          setUsernameError(data.error || "Username not available");
        }
      } catch {
        setUsernameStatus("idle");
      }
    }, 500),
    [portfolio.username],
  );

  useEffect(() => {
    if (username && username !== portfolio.username) {
      checkUsername(username);
    }
  }, [username, checkUsername, portfolio.username]);

  const handleUsernameChange = (value: string) => {
    const formatted = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setUsername(formatted);
    if (formatted && formatted !== portfolio.username) {
      onUpdate({ username: formatted });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white">Basic Information</h2>
        <p className="mt-1 text-sm text-gray-400">
          Set up your portfolio basics and profile information
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={portfolio.profileImage || undefined} />
            <AvatarFallback className="bg-amber-500/20 text-2xl text-amber-500">
              {fullName?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-white">Profile Image</p>
            <p className="text-xs text-gray-500">
              Profile image is synced from your Google account
            </p>
          </div>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label>Username (for subdomain)</Label>
          <div className="relative">
            <Input
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="yourname"
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {usernameStatus === "checking" && (
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              )}
              {usernameStatus === "available" && (
                <Check className="h-4 w-4 text-green-500" />
              )}
              {(usernameStatus === "taken" || usernameStatus === "invalid") && (
                <X className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
          {usernameError && (
            <p className="text-xs text-red-400">{usernameError}</p>
          )}
          {usernameStatus === "available" && (
            <p className="text-xs text-green-400">Username is available!</p>
          )}
          <p className="text-xs text-gray-500">
            Your portfolio will be available at{" "}
            <span className="text-amber-500">
              {username || "yourname"}.portfolio.com
            </span>
          </p>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              onUpdate({ fullName: e.target.value });
            }}
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            value={portfolio.email}
            disabled
            className="cursor-not-allowed opacity-50"
          />
          <p className="text-xs text-gray-500">
            Email cannot be changed and is synced from your account
          </p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label>Title / Role</Label>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              onUpdate({ title: e.target.value });
            }}
            placeholder="Full Stack Developer"
          />
          <p className="text-xs text-gray-500">
            Your professional title or role
          </p>
        </div>
      </div>
    </motion.div>
  );
}
