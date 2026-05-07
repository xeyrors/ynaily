"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";

const navLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/submit", label: "Submit" },
  { href: "/about", label: "About" },
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
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="mx-auto flex h-12 max-w-[1600px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-[14px] font-semibold tracking-tight">
          <span className="text-[#6366f1]">y</span>naily
        </Link>

        <div className="flex items-center gap-0.5">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                ref={inputRef}
                placeholder="Search..."
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
                className="h-7 w-48 rounded border border-border bg-secondary px-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
              />
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          )}

          {navLinks.map((item) => {
            const isActive =
              item.href === "/gallery" ? isGalleryActive : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-2 py-1 text-[13px] transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground/40 hover:text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="ml-1">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
