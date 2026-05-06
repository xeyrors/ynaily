import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SubmitForm } from "@/components/submit/submit-form";

export const metadata: Metadata = {
  title: "Submit a Thumbnail",
  description: "Submit a YouTube thumbnail to the ynaily gallery.",
};

export default function SubmitPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Submit a Thumbnail
          </h1>
          <p className="mt-2 text-muted-foreground">
            Found an amazing YouTube thumbnail? Share it with the community.
          </p>
        </div>
        <SubmitForm />
      </main>
      <Footer />
    </>
  );
}
