"use client";

import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { FilterChip } from "@/components/ui/filter-chip";
import { CATEGORIES, STYLE_TAGS, type SortOption } from "@/types";
import { cn } from "@/lib/utils";

const sortTabs: { value: SortOption; label: string }[] = [
  { value: "hot", label: "Hot" },
  { value: "latest", label: "Latest" },
  { value: "most-liked", label: "Top" },
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
    <div className="sticky top-12 z-40 bg-background -mx-4 sm:-mx-6 px-4 sm:px-6 pt-3 pb-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-0.5">
          {sortTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onSortChange(tab.value)}
              className={cn(
                "px-2 py-1 text-[13px] transition-colors rounded",
                activeSort === tab.value
                  ? "text-foreground"
                  : "text-muted-foreground/40 hover:text-muted-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}

          <span className="mx-1.5 text-border">|</span>

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 text-[13px] transition-colors rounded",
              filtersOpen || hasActive
                ? "text-primary"
                : "text-muted-foreground/40 hover:text-muted-foreground"
            )}
          >
            <SlidersHorizontal className="h-3 w-3" />
            {hasActive ? "Filtered" : "Filter"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground/25" />
            <input
              placeholder="Search..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="h-7 w-36 rounded border border-transparent bg-transparent pl-7 pr-2 text-[13px] text-foreground placeholder:text-muted-foreground/25 focus:border-border focus:bg-secondary focus:outline-none transition-all"
            />
          </form>

          <span className="text-[11px] text-muted-foreground/30 tabular-nums">
            {total}
          </span>
        </div>
      </div>

      {filtersOpen && (
        <div className="mt-2 space-y-2.5 rounded-md border border-border/50 bg-secondary/50 p-3">
          {hasActive && (
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
                Active filters
              </span>
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-[11px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                <X className="h-2.5 w-2.5" />
                Clear
              </button>
            </div>
          )}

          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
              Niche
            </p>
            <div className="flex flex-wrap gap-1">
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

          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
              Pattern
            </p>
            <div className="flex flex-wrap gap-1">
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
  );
}
