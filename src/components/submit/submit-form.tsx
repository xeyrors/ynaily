"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitThumbnailSchema, type SubmitThumbnailInput } from "@/lib/schemas";
import { submitThumbnail } from "@/lib/actions/thumbnails";
import { parseYouTubeUrl, getYouTubeThumbnailUrl } from "@/lib/youtube";
import { CATEGORIES, STYLE_TAGS } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader2, Link as LinkIcon, ImageIcon, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export function SubmitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SubmitThumbnailInput>({
    resolver: zodResolver(submitThumbnailSchema),
    defaultValues: {
      style_tags: [],
    },
  });

  const videoUrl = watch("video_url");

  const handleUrlBlur = () => {
    if (videoUrl) {
      const parsed = parseYouTubeUrl(videoUrl);
      if (parsed) {
        setPreviewUrl(getYouTubeThumbnailUrl(parsed.videoId));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const toggleTag = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : selectedTags.length < 5
        ? [...selectedTags, tag]
        : selectedTags;
    setSelectedTags(next);
    setValue("style_tags", next);
  };

  const onSubmit = async (data: SubmitThumbnailInput) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("video_url", data.video_url);
      formData.append("title", data.title);
      if (data.channel_name) formData.append("channel_name", data.channel_name);
      if (data.category) formData.append("category", data.category);
      formData.append("style_tags", JSON.stringify(data.style_tags));
      formData.append("analysis", data.analysis);

      const result = await submitThumbnail(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        setSubmitted(true);
        toast.success("Thumbnail submitted for review!");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl text-center py-16">
        <CheckCircle2 className="mx-auto h-16 w-16 text-ynaily" />
        <h2 className="mt-4 text-2xl font-bold">Submitted!</h2>
        <p className="mt-2 text-muted-foreground">
          Your thumbnail is now pending review. We&apos;ll notify you once
          it&apos;s approved.
        </p>
        <Button
          className="mt-6 bg-ynaily hover:bg-ynaily/90 text-ynaily-foreground"
          onClick={() => {
            setSubmitted(false);
            setPreviewUrl(null);
            setSelectedTags([]);
          }}
        >
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="video_url" className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4 text-ynaily" />
          YouTube URL
        </Label>
        <Input
          id="video_url"
          placeholder="https://www.youtube.com/watch?v=..."
          {...register("video_url")}
          onBlur={handleUrlBlur}
        />
        {errors.video_url && (
          <p className="text-xs text-destructive">{errors.video_url.message}</p>
        )}

        {previewUrl && (
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl border border-border/50 bg-muted/30">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
              <ImageIcon className="h-3 w-3" />
              Preview
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="A catchy title for this thumbnail"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="channel_name">Channel Name (optional)</Label>
        <Input
          id="channel_name"
          placeholder="e.g. Marques Brownlee"
          {...register("channel_name")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category (optional)</Label>
        <select
          id="category"
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("category")}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>
          Style Tags ({selectedTags.length}/5)
        </Label>
        <div className="flex flex-wrap gap-2">
          {STYLE_TAGS.map((tag) => (
            <Badge
              key={tag.value}
              variant={selectedTags.includes(tag.value) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                selectedTags.includes(tag.value)
                  ? "bg-ynaily text-ynaily-foreground hover:bg-ynaily/90"
                  : "hover:bg-secondary"
              )}
              onClick={() => toggleTag(tag.value)}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
        {errors.style_tags && (
          <p className="text-xs text-destructive">{errors.style_tags.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="analysis">Why is this thumbnail great?</Label>
        <Textarea
          id="analysis"
          placeholder="Describe what makes this thumbnail effective — composition, colors, text placement, emotional hook..."
          rows={4}
          {...register("analysis")}
        />
        {errors.analysis && (
          <p className="text-xs text-destructive">{errors.analysis.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full gap-2 bg-ynaily hover:bg-ynaily/90 text-ynaily-foreground"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Thumbnail"
        )}
      </Button>
    </form>
  );
}
