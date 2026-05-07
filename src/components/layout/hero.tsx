"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b border-[#1a1a1a]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[#f1f1f1] sm:text-2xl">
              Thumbnails worth studying
            </h1>
            <p className="mt-1 text-[13px] text-[#52525b]">
              Curated YouTube thumbnail patterns. Browse by niche, style, and composition.
            </p>
          </div>
          <Link
            href="/submit"
            className="text-[13px] text-[#52525b] hover:text-[#a1a1aa] transition-colors"
          >
            Submit +
          </Link>
        </div>
      </div>
    </section>
  );
}
