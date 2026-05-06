"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Thumbnail } from "@/types";

interface FeaturedSectionProps {
  thumbnails: Thumbnail[];
}

export function FeaturedSection({ thumbnails }: FeaturedSectionProps) {
  if (thumbnails.length === 0) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured
            </h2>
            <p className="mt-1 text-muted-foreground">
              Hand-picked thumbnails that stand out
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 lg:gap-4">
          {thumbnails.slice(0, 6).map((thumbnail, index) => (
            <motion.div
              key={thumbnail.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/gallery?highlight=${thumbnail.id}`}
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-muted/50 ring-1 ring-border/50 transition-all duration-300 group-hover:ring-ynaily/30 group-hover:shadow-lg group-hover:shadow-ynaily/5">
                  <Image
                    src={thumbnail.thumbnail_url}
                    alt={thumbnail.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {thumbnail.category && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-ynaily/90 text-ynaily-foreground text-[10px] px-1.5 py-0.5 backdrop-blur-sm border-0">
                        {thumbnail.category}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <h3 className="line-clamp-2 text-sm font-medium">
                    {thumbnail.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {thumbnail.channel_name}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
