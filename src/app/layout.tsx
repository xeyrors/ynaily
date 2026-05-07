import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "@/components/providers";
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
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </Providers>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
