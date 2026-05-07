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
        duration: 0.25,
        delay: Math.min(index * 0.02, 0.3),
      }}
    >
      <button
        onClick={() => onSelect(thumbnail)}
        className="group relative w-full text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 rounded-md"
      >
        <div className="relative aspect-video overflow-hidden rounded-md bg-muted transition-shadow duration-200 ease-out group-hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] dark:group-hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] group-hover:ring-1 group-hover:ring-foreground/[0.06]">
          <Image
            src={thumbnail.thumbnail_url}
            alt={thumbnail.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />

          {thumbnail.featured && (
            <div className="absolute top-1.5 left-1.5">
              <span className="inline-flex items-center rounded-[3px] bg-primary/90 px-1 py-px text-[9px] font-medium text-primary-foreground leading-none">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="mt-1.5 px-px">
          <h3 className="line-clamp-1 text-[13px] font-medium leading-tight text-foreground/80 group-hover:text-foreground transition-colors duration-150">
            {thumbnail.title}
          </h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground/60 truncate">
            {thumbnail.channel_name}
          </p>
        </div>
      </button>
    </motion.div>
  );
}
