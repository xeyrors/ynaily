"use client";

import { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { FilterChip } from "@/components/ui/filter-chip";
import { CATEGORIES, STYLE_TAGS, type SortOption } from "@/types";
import { cn } from "@/lib/utils";

const sortTabs: { value: SortOption; label: string }[] = [
  { value: "hot", label: "Hot Picks" },
  { value: "latest", label: "Latest" },
  { value: "most-liked", label: "Most Liked" },
];

interface GalleryFiltersProps {
  activeSort: SortOption;
  activeCategory: string | null;
  activeStyle: string | null;
  searchQuery: string | null;
  onSortChange: (sort: SortOption) => void;
  onCategoryChange: (category: string | null) => void;
  onStyleChange: (style: string | null) => void;
  onSearchChange: (search: string | null) => void;
  total: number;
}

export function GalleryFilters({
  activeSort,
  activeCategory,
  activeStyle,
  searchQuery,
  onSortChange,
  onCategoryChange,
  onStyleChange,
  onSearchChange,
  total,
}: GalleryFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery ?? "");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch.trim() || null);
  };

  const clearAll = () => {
    onCategoryChange(null);
    onStyleChange(null);
    onSearchChange(null);
    setLocalSearch("");
  };

  const hasActive = activeCategory || activeStyle || searchQuery;

  return (
    <div className="sticky top-14 z-40 border-b border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur-md -mx-4 sm:-mx-6 px-4 sm:px-6 py-3">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            {sortTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onSortChange(tab.value)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors",
                  activeSort === tab.value
                    ? "bg-[#1a1a1a] text-[#f1f1f1]"
                    : "text-[#71717a] hover:text-[#a1a1aa] hover:bg-[#111111]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#52525b]" />
              <input
                placeholder="Search..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="h-8 w-40 rounded-md border border-[#27272a] bg-[#111111] pl-8 pr-3 text-[13px] text-[#f1f1f1] placeholder:text-[#52525b] focus:border-[#6366f1] focus:outline-none focus:ring-1 focus:ring-[#6366f1]/50 transition-colors"
              />
            </form>

            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={cn(
                "flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[13px] font-medium transition-colors",
                filtersOpen
                  ? "border-[#6366f1]/30 bg-[#6366f1]/10 text-[#818cf8]"
                  : "border-[#27272a] text-[#71717a] hover:border-[#3f3f46] hover:text-[#a1a1aa]"
              )}
            >
              Filters
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform",
                  filtersOpen && "rotate-180"
                )}
              />
            </button>
          </div>
        </div>

        {filtersOpen && (
          <div className="space-y-3 rounded-lg border border-[#27272a] bg-[#111111] p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#52525b]">
                {total} result{total !== 1 ? "s" : ""}
              </span>
              {hasActive && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-[11px] text-[#71717a] hover:text-[#a1a1aa] transition-colors"
                >
                  <X className="h-3 w-3" />
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#52525b]">
                Niche
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <FilterChip
                    key={cat.value}
                    label={cat.label}
                    active={activeCategory === cat.value}
                    onClick={() =>
                      onCategoryChange(
                        activeCategory === cat.value ? null : cat.value
                      )
                    }
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#52525b]">
                Pattern
              </p>
              <div className="flex flex-wrap gap-1.5">
                {STYLE_TAGS.map((tag) => (
                  <FilterChip
                    key={tag.value}
                    label={tag.label}
                    active={activeStyle === tag.value}
                    onClick={() =>
                      onStyleChange(
                        activeStyle === tag.value ? null : tag.value
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
