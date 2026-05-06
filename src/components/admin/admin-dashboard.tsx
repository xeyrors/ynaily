"use client";

import { useState, useTransition, useCallback } from "react";
import Image from "next/image";
import {
  getAllThumbnailsForAdmin,
  updateThumbnailStatus,
  toggleFeatured,
  deleteThumbnail,
} from "@/lib/actions/thumbnails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  X,
  Star,
  Trash2,
  Loader2,
} from "lucide-react";
import type { Thumbnail } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AdminDashboard() {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [initialised, setInitialised] = useState(false);
  const [, startTransition] = useTransition();

  const fetchThumbnails = useCallback(async () => {
    setLoading(true);
    const data = await getAllThumbnailsForAdmin();
    startTransition(() => {
      setThumbnails(data);
      setLoading(false);
    });
  }, [startTransition]);

  if (!initialised) {
    setInitialised(true);
    void fetchThumbnails();
  }

  const handleApprove = async (id: string) => {
    const result = await updateThumbnailStatus(id, "approved");
    if (result.success) {
      toast.success("Thumbnail approved");
      fetchThumbnails();
    } else {
      toast.error(result.error);
    }
  };

  const handleReject = async (id: string) => {
    const result = await updateThumbnailStatus(id, "rejected");
    if (result.success) {
      toast.success("Thumbnail rejected");
      fetchThumbnails();
    } else {
      toast.error(result.error);
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    const result = await toggleFeatured(id, !featured);
    if (result.success) {
      toast.success(featured ? "Unfeatured" : "Featured");
      fetchThumbnails();
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this thumbnail?")) return;
    const result = await deleteThumbnail(id);
    if (result.success) {
      toast.success("Thumbnail deleted");
      fetchThumbnails();
    } else {
      toast.error(result.error);
    }
  };

  const filteredThumbnails = thumbnails.filter((t) => {
    if (activeTab === "all") return true;
    return t.status === activeTab;
  });

  const counts = {
    all: thumbnails.length,
    pending: thumbnails.filter((t) => t.status === "pending").length,
    approved: thumbnails.filter((t) => t.status === "approved").length,
    rejected: thumbnails.filter((t) => t.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage submitted thumbnails
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            All ({counts.all})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({counts.pending})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({counts.approved})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({counts.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredThumbnails.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No thumbnails in this category
            </div>
          ) : (
            <div className="space-y-3">
              {filteredThumbnails.map((thumbnail) => (
                <div
                  key={thumbnail.id}
                  className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4"
                >
                  <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={thumbnail.thumbnail_url}
                      alt={thumbnail.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium">
                      {thumbnail.title}
                    </h3>
                    <p className="truncate text-xs text-muted-foreground">
                      {thumbnail.channel_name} ·{" "}
                      {new Date(thumbnail.created_at).toLocaleDateString()}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px]",
                          thumbnail.status === "approved" &&
                            "border-green-500/30 text-green-500",
                          thumbnail.status === "pending" &&
                            "border-yellow-500/30 text-yellow-500",
                          thumbnail.status === "rejected" &&
                            "border-red-500/30 text-red-500"
                        )}
                      >
                        {thumbnail.status}
                      </Badge>
                      {thumbnail.featured && (
                        <Badge className="bg-ynaily/15 text-ynaily border-ynaily/20 text-[10px]">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {thumbnail.status === "pending" && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                          onClick={() => handleApprove(thumbnail.id)}
                          title="Approve"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                          onClick={() => handleReject(thumbnail.id)}
                          title="Reject"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "h-8 w-8",
                        thumbnail.featured
                          ? "text-ynaily hover:bg-ynaily/10"
                          : "text-muted-foreground hover:text-ynaily"
                      )}
                      onClick={() =>
                        handleToggleFeatured(thumbnail.id, thumbnail.featured)
                      }
                      title={thumbnail.featured ? "Unfeature" : "Feature"}
                    >
                      <Star
                        className={cn(
                          "h-4 w-4",
                          thumbnail.featured && "fill-current"
                        )}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(thumbnail.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
