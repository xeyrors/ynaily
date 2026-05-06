"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/submit", label: "Submit" },
  { href: "/about", label: "About" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/gallery?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue("");
    }
  };

  const isGalleryActive =
    pathname === "/gallery" || pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="text-[15px] font-semibold tracking-tight">
            <span className="text-[#6366f1]">y</span>naily
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#71717a]" />
                <input
                  ref={inputRef}
                  placeholder="Search thumbnails..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onBlur={() => {
                    if (!searchValue) setSearchOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setSearchOpen(false);
                      setSearchValue("");
                    }
                  }}
                  className="h-8 w-52 rounded-md border border-[#27272a] bg-[#111111] pl-8 pr-3 text-sm text-[#f1f1f1] placeholder:text-[#52525b] focus:border-[#6366f1] focus:outline-none focus:ring-1 focus:ring-[#6366f1]/50 transition-colors"
                />
              </div>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#71717a] transition-colors hover:bg-[#1a1a1a] hover:text-[#a1a1aa]"
            >
              <Search className="h-4 w-4" />
            </button>
          )}

          <div className="mx-1 h-4 w-px bg-[#27272a]" />

          {navLinks.map((item) => {
            const isActive =
              item.href === "/gallery" ? isGalleryActive : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors",
                  isActive
                    ? "text-[#f1f1f1] bg-[#1a1a1a]"
                    : "text-[#71717a] hover:text-[#a1a1aa] hover:bg-[#1a1a1a]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
