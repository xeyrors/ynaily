"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b border-border/50">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Thumbnails worth studying
            </h1>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Curated YouTube thumbnail patterns. Browse by niche, style, and composition.
            </p>
          </div>
          <Link
            href="/submit"
            className="text-[13px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            Submit +
          </Link>
        </div>
      </div>
    </section>
  );
}
