"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Heart,
  Eye,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import type { Thumbnail } from "@/types";
import { CATEGORIES, STYLE_TAGS } from "@/types";

interface ThumbnailModalProps {
  thumbnail: Thumbnail | null;
  onClose: () => void;
  onNavigate?: (direction: "prev" | "next") => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function ThumbnailModal({
  thumbnail,
  onClose,
  onNavigate,
  hasPrev,
  hasNext,
}: ThumbnailModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate?.("prev");
      if (e.key === "ArrowRight" && hasNext) onNavigate?.("next");
    },
    [onClose, onNavigate, hasPrev, hasNext]
  );

  useEffect(() => {
    if (thumbnail) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [thumbnail, handleKeyDown]);

  const categoryLabel = thumbnail?.category
    ? CATEGORIES.find((c) => c.value === thumbnail.category)?.label
    : null;

  return (
    <AnimatePresence>
      {thumbnail && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/85"
            onClick={onClose}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[#27272a] bg-[#0f0f0f] lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-md bg-[#1a1a1a]/80 text-[#a1a1aa] backdrop-blur-sm transition-colors hover:text-[#f1f1f1]"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              {hasPrev && (
                <button
                  onClick={() => onNavigate?.("prev")}
                  className="absolute left-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md bg-[#1a1a1a]/80 text-[#a1a1aa] backdrop-blur-sm transition-colors hover:text-[#f1f1f1]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
              )}
              {hasNext && (
                <button
                  onClick={() => onNavigate?.("next")}
                  className="absolute right-3 top-1/2 z-10 hidden items-center justify-center rounded-md bg-[#1a1a1a]/80 text-[#a1a1aa] backdrop-blur-sm transition-colors hover:text-[#f1f1f1] lg:flex"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}

              <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden bg-black lg:aspect-auto lg:w-3/5 lg:flex-1">
                <Image
                  src={thumbnail.thumbnail_url}
                  alt={thumbnail.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto p-5 lg:max-w-xs">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-base font-semibold leading-snug text-[#f1f1f1]">
                      {thumbnail.title}
                    </h2>
                    {thumbnail.channel_name && (
                      <p className="mt-1 text-xs text-[#71717a]">
                        {thumbnail.channel_name}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#52525b]">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {thumbnail.views_count.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" />
                      {thumbnail.likes_count.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {categoryLabel && (
                      <span className="inline-flex items-center rounded bg-[#6366f1]/15 px-1.5 py-0.5 text-[10px] font-medium text-[#818cf8]">
                        {categoryLabel}
                      </span>
                    )}
                    {thumbnail.style_tags.map((tag) => {
                      const label = STYLE_TAGS.find(
                        (s) => s.value === tag
                      )?.label;
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded border border-[#27272a] px-1.5 py-0.5 text-[10px] text-[#71717a]"
                        >
                          {label ?? tag}
                        </span>
                      );
                    })}
                  </div>

                  {thumbnail.analysis && (
                    <>
                      <div className="h-px bg-[#1a1a1a]" />
                      <div>
                        <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#6366f1]">
                          Why it works
                        </h3>
                        <p className="text-[13px] leading-relaxed text-[#a1a1aa]">
                          {thumbnail.analysis}
                        </p>
                      </div>
                    </>
                  )}

                  {thumbnail.video_url && (
                    <>
                      <div className="h-px bg-[#1a1a1a]" />
                      <a
                        href={thumbnail.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-md bg-[#6366f1] text-[13px] font-medium text-white transition-colors hover:bg-[#818cf8]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Watch on YouTube
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
