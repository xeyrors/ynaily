import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin",
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <AdminDashboard />
      </main>
      <Footer />
    </>
  );
}
