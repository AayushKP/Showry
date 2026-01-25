"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  Pencil,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Portfolio, BlogData } from "@/db/schema";

interface BlogsFormProps {
  initialData: Portfolio;
  onUpdate: (data: Partial<Portfolio>) => void;
}

const emptyBlog: BlogData = {
  id: "",
  title: "",
  description: "",
  link: "",
  image: "",
  date: "",
};

export default function BlogsForm({ initialData, onUpdate }: BlogsFormProps) {
  const [blogs, setBlogs] = useState<BlogData[]>(initialData.blogs || []);
  const [editingBlog, setEditingBlog] = useState<BlogData | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Fetch State
  const [isFetching, setIsFetching] = useState(false);

  const saveBlog = () => {
    if (!editingBlog?.title) return;

    const updatedBlog = {
      ...editingBlog,
      id: editingBlog.id || crypto.randomUUID(),
    };

    let newBlogs: BlogData[];
    if (blogs.find((b) => b.id === updatedBlog.id)) {
      newBlogs = blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
    } else {
      newBlogs = [...blogs, updatedBlog];
    }

    setBlogs(newBlogs);
    onUpdate({ blogs: newBlogs });
    setShowDialog(false);
    setEditingBlog(null);
  };

  const deleteBlog = (id: string) => {
    const newBlogs = blogs.filter((b) => b.id !== id);
    setBlogs(newBlogs);
    onUpdate({ blogs: newBlogs });
  };

  const handleFetch = async () => {
    if (!editingBlog?.link) {
      toast.error("Please enter a link first");
      return;
    }

    setIsFetching(true);
    try {
      const res = await fetch("/api/fetch-metadata", {
        method: "POST",
        body: JSON.stringify({ url: editingBlog.link }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setEditingBlog((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          title: prev.title || data.title || "",
          description: prev.description || data.description || "",
          image: prev.image || data.image || "",
        };
      });

      if (!data.image && !data.title) {
        toast.warning("Could not automatically fetch details.");
      } else {
        toast.success("Fetched available metadata");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch metadata");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Blogs & Articles</h2>
          <p className="mt-1 text-sm text-gray-400">
            Share your thoughts, articles, or tutorials
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingBlog({ ...emptyBlog, id: crypto.randomUUID() });
            setShowDialog(true);
          }}
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Article
        </Button>
      </div>

      {/* Blogs List */}
      {blogs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-700 p-8 text-center">
          <p className="text-gray-500">
            No articles yet. Add your first blog post!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                {/* Thumbnail Preview */}
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md bg-gray-800">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-600">
                      <LinkIcon className="h-5 w-5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white truncate">
                      {blog.title}
                    </h3>
                    {blog.date && (
                      <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400 shrink-0">
                        {blog.date}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-gray-400">
                    {blog.description || "No description"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {blog.link && (
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingBlog(blog);
                      setShowDialog(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteBlog(blog.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {editingBlog?.id && blogs.find((b) => b.id === editingBlog.id)
                ? "Edit Article"
                : "Add Article"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Link Input with Fetch */}
            <div className="space-y-2">
              <Label>Article Link (URL)</Label>
              <div className="flex gap-2">
                <Input
                  value={editingBlog?.link || ""}
                  onChange={(e) =>
                    setEditingBlog((prev) =>
                      prev ? { ...prev, link: e.target.value } : null,
                    )
                  }
                  placeholder="https://medium.com/..."
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleFetch}
                  disabled={isFetching || !editingBlog?.link}
                  className="shrink-0"
                >
                  {isFetching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Fetch Details"
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Click "Fetch Details" to auto-fill title, description and image.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={editingBlog?.title || ""}
                  onChange={(e) =>
                    setEditingBlog((prev) =>
                      prev ? { ...prev, title: e.target.value } : null,
                    )
                  }
                  placeholder="Article Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  value={editingBlog?.date || ""}
                  onChange={(e) =>
                    setEditingBlog((prev) =>
                      prev ? { ...prev, date: e.target.value } : null,
                    )
                  }
                  placeholder="Jan 2024"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Image URL</Label>
              <Input
                value={editingBlog?.image || ""}
                onChange={(e) =>
                  setEditingBlog((prev) =>
                    prev ? { ...prev, image: e.target.value } : null,
                  )
                }
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={editingBlog?.description || ""}
                onChange={(e) =>
                  setEditingBlog((prev) =>
                    prev ? { ...prev, description: e.target.value } : null,
                  )
                }
                placeholder="Brief summary..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveBlog} disabled={!editingBlog?.title}>
              Save Article
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
