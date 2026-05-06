"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b border-[#1a1a1a]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center rounded-md border border-[#27272a] bg-[#111111] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#71717a]">
              Thumbnail research library
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#f1f1f1] sm:text-3xl">
              Thumbnails worth studying
            </h1>
            <p className="mt-1.5 text-sm text-[#71717a] max-w-md">
              Curated collection of the most effective YouTube thumbnails. Browse by pattern, niche, and composition technique.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Link
              href="/gallery"
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#6366f1] px-3 text-[13px] font-medium text-white transition-colors hover:bg-[#818cf8]"
            >
              Browse Gallery
            </Link>
            <Link
              href="/submit"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#27272a] bg-transparent px-3 text-[13px] font-medium text-[#a1a1aa] transition-colors hover:border-[#3f3f46] hover:text-[#f1f1f1]"
            >
              Submit a Thumbnail
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
