import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Suspense } from "react";

export const metadata = {
  title: "Gallery",
  description: "Browse the best YouTube thumbnails for design inspiration.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 py-6">
        <Suspense fallback={null}>
          <GalleryGrid />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
