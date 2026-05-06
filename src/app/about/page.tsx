import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CATEGORIES, STYLE_TAGS } from "@/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ynaily — why it exists and how to use it.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About ynaily
        </h1>

        <div className="mt-8 space-y-8 text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              What is this?
            </h2>
            <p>
              ynaily is a curated gallery of the best YouTube thumbnails. We
              collect, categorize, and analyze thumbnails that work — so you can
              study what makes them effective and apply those patterns to your
              own content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              Who is it for?
            </h2>
            <ul className="list-disc space-y-1 pl-4">
              <li>YouTube creators looking to improve their click-through rate</li>
              <li>Thumbnail designers seeking inspiration and reference</li>
              <li>Growth marketers studying visual hooks</li>
              <li>Beginners who want to learn what works</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Badge key={cat.value} variant="secondary">
                  {cat.label}
                </Badge>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              Style Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {STYLE_TAGS.map((tag) => (
                <Badge key={tag.value} variant="outline" className="text-muted-foreground">
                  {tag.label}
                </Badge>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              How to contribute
            </h2>
            <p>
              Found a great thumbnail?{" "}
              <Link
                href="/submit"
                className="text-ynaily underline underline-offset-4 hover:text-ynaily/80"
              >
                Submit it here
              </Link>
              . Every submission is reviewed before being published to ensure
              quality and relevance.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
