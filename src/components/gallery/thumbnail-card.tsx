"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Thumbnail } from "@/types";

interface ThumbnailCardProps {
  thumbnail: Thumbnail;
  index: number;
  onSelect: (thumbnail: Thumbnail) => void;
}

export function ThumbnailCard({ thumbnail, index, onSelect }: ThumbnailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.03, 0.4),
      }}
    >
      <button
        onClick={() => onSelect(thumbnail)}
        className="group relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-lg"
      >
        <div className="relative aspect-video overflow-hidden rounded-lg bg-[#111111]">
          <Image
            src={thumbnail.thumbnail_url}
            alt={thumbnail.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="object-cover transition-[transform,filter] duration-300 ease-out group-hover:scale-[1.02]"
          />

          <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06] rounded-lg pointer-events-none" />

          {thumbnail.featured && (
            <div className="absolute top-1.5 left-1.5">
              <span className="inline-flex items-center rounded bg-[#6366f1] px-1.5 py-0.5 text-[10px] font-medium text-white">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="mt-1.5 px-0.5">
          <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-[#e4e4e7]">
            {thumbnail.title}
          </h3>
          <p className="mt-0.5 text-[11px] text-[#71717a] line-clamp-1">
            {thumbnail.channel_name}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            {thumbnail.category && (
              <span className="text-[10px] text-[#52525b] uppercase tracking-wide">
                {thumbnail.category}
              </span>
            )}
            {thumbnail.style_tags.length > 0 && thumbnail.category && (
              <span className="text-[10px] text-[#3f3f46]">·</span>
            )}
            {thumbnail.style_tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] text-[#52525b]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>
    </motion.div>
  );
}
