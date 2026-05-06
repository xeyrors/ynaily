"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getThumbnails } from "@/lib/actions/gallery";
import { ThumbnailCard } from "./thumbnail-card";
import { GalleryFilters } from "./gallery-filters";
import { ThumbnailModal } from "./thumbnail-modal";
import type { Thumbnail, SortOption } from "@/types";

export function GalleryGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSort = (searchParams.get("sort") as SortOption) || "hot";
  const activeCategory = searchParams.get("category") || null;
  const activeStyle = searchParams.get("style") || null;
  const searchQuery = searchParams.get("search") || null;

  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchThumbnails = useCallback(async () => {
    setLoading(true);
    const result = await getThumbnails({
      category: activeCategory ?? undefined,
      style: activeStyle ?? undefined,
      search: searchQuery ?? undefined,
      sort: activeSort,
      page: 1,
      limit: 48,
    });
    setThumbnails(result.data);
    setTotal(result.total);
    setLoading(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [activeSort, activeCategory, activeStyle, searchQuery]);

  useEffect(() => {
    fetchThumbnails();
  }, [fetchThumbnails]);

  const selectedThumbnail = useMemo(
    () => thumbnails.find((t) => t.id === selectedId) ?? null,
    [thumbnails, selectedId]
  );

  const selectedIndex = useMemo(
    () =>
      selectedId
        ? thumbnails.findIndex((t) => t.id === selectedId)
        : -1,
    [thumbnails, selectedId]
  );

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <GalleryFilters
        activeSort={activeSort}
        activeCategory={activeCategory}
        activeStyle={activeStyle}
        searchQuery={searchQuery}
        onSortChange={(sort) => updateParams({ sort })}
        onCategoryChange={(category) => updateParams({ category })}
        onStyleChange={(style) => updateParams({ style })}
        onSearchChange={(search) => updateParams({ search })}
        total={total}
      />

      <div className="pt-4">
        {loading ? (
          <div className="grid-gallery">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="aspect-video rounded-lg bg-[#111111] animate-pulse" />
                <div className="h-3.5 w-4/5 rounded bg-[#111111] animate-pulse" />
                <div className="h-3 w-2/5 rounded bg-[#111111] animate-pulse" />
              </div>
            ))}
          </div>
        ) : thumbnails.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm font-medium text-[#a1a1aa]">
              No thumbnails found
            </p>
            <p className="mt-1 text-xs text-[#52525b]">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="grid-gallery">
            {thumbnails.map((thumbnail, index) => (
              <ThumbnailCard
                key={thumbnail.id}
                thumbnail={thumbnail}
                index={index}
                onSelect={(t) => setSelectedId(t.id)}
              />
            ))}
          </div>
        )}
      </div>

      <ThumbnailModal
        thumbnail={selectedThumbnail}
        onClose={() => setSelectedId(null)}
        onNavigate={(dir) => {
          const newIndex =
            dir === "prev" ? selectedIndex - 1 : selectedIndex + 1;
          if (newIndex >= 0 && newIndex < thumbnails.length) {
            setSelectedId(thumbnails[newIndex].id);
          }
        }}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex < thumbnails.length - 1}
      />
    </div>
  );
}
