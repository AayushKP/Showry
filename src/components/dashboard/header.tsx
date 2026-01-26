"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut, Rocket, Check, ExternalLink, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  portfolio: {
    username: string;
    isPublished: boolean;
  };
  onPublish: () => void;
  isPublishing: boolean;
  onMenuClick?: () => void;
}

export function DashboardHeader({
  user,
  portfolio,
  onPublish,
  isPublishing,
  onMenuClick,
}: DashboardHeaderProps) {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const domain = process.env.NEXT_PUBLIC_DOMAIN || "profiled.site";
  // Use portfolio.username from props
  const portfolioUrl = portfolio.username
    ? `https://${portfolio.username}.${domain}`
    : "#";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-[#050505]/80 px-4 backdrop-blur-md md:h-20 md:px-10">
        {/* Left side - Menu + Logo on mobile, Dashboard on desktop */}
        <div className="flex items-center gap-3">
          {/* Mobile: Menu button + brand name */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onMenuClick}
              className="rounded-lg border border-white/10 bg-[#111] p-2 text-white hover:bg-white/5"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span className="font-instrument text-lg text-[#d4a373]">
              Profiled
            </span>
          </div>

          {/* Desktop: Show Dashboard title */}
          <div className="hidden md:flex md:flex-col">
            <h1 className="font-instrument text-2xl text-white">Dashboard</h1>
            <p className="font-mono text-xs text-neutral-500">
              Manage your portfolio content
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer transition-opacity hover:opacity-80">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-8 w-8 rounded-full border border-white/10"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-neutral-800 text-xs font-medium text-white">
                      {user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 border-white/10 bg-[#111] text-neutral-200"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-neutral-500">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="h-6 w-px bg-white/10 hidden md:block" />

          <div className="flex items-center gap-2">
            {portfolio.isPublished && (
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs uppercase text-white hover:bg-white/10 transition-colors md:px-4"
              >
                <ExternalLink className="h-3 w-3" />
                <span className="hidden sm:inline">Visit Site</span>
              </a>
            )}

            <Button
              onClick={onPublish}
              disabled={isPublishing}
              variant={portfolio.isPublished ? "outline" : "default"}
              className={
                portfolio.isPublished
                  ? "border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  : "bg-[#d4a373] text-black hover:bg-white"
              }
            >
              {isPublishing ? (
                <span className="font-mono text-xs uppercase">
                  Processing...
                </span>
              ) : portfolio.isPublished ? (
                <span className="font-mono text-xs uppercase flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Unpublish
                </span>
              ) : (
                <span className="font-mono text-xs uppercase flex items-center gap-2">
                  <Rocket className="h-3 w-3" />
                  Publish
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="border-white/10 bg-[#111] sm:max-w-md">
          <DialogHeader>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d4a373]/20 text-[#d4a373]">
              <Check className="h-6 w-6" />
            </div>
            <DialogTitle className="font-instrument text-3xl text-white">
              You are live!
            </DialogTitle>
            <DialogDescription className="text-neutral-400">
              Your portfolio is now accessible to the world.
            </DialogDescription>
          </DialogHeader>

          <div className="my-6 rounded-lg border border-white/10 bg-black/50 p-4">
            <div className="flex items-center justify-between">
              <code className="text-sm text-[#d4a373]">{portfolioUrl}</code>
              <Link href={portfolioUrl} target="_blank">
                <ExternalLink className="h-4 w-4 text-neutral-500 hover:text-white" />
              </Link>
            </div>
          </div>

          <DialogFooter>
            <div className="flex w-full gap-2">
              <Button
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?text=Check out my new portfolio! ${portfolioUrl}`,
                    "_blank",
                  );
                }}
                className="flex-1 bg-white text-black hover:bg-neutral-200"
              >
                Share on Twitter
              </Button>
              <Button
                onClick={() => setShowSuccessModal(false)}
                variant="outline"
                className="border-white/10 hover:bg-white/5"
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
