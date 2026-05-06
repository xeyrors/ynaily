import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ynaily — Thumbnail research library",
    template: "%s | ynaily",
  },
  description:
    "A curated research library of the best YouTube thumbnails. Study composition, color, typography, and emotional hooks.",
  openGraph: {
    title: "ynaily — Thumbnail research library",
    description:
      "A curated research library of the best YouTube thumbnails for design inspiration.",
    type: "website",
    siteName: "ynaily",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a]">
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "bg-[#171717] border-[#27272a] text-[#f1f1f1]",
          }}
        />
      </body>
    </html>
  );
}
