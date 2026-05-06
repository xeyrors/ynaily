"use server";

import { MOCK_THUMBNAILS } from "@/data/mock-thumbnails";
import type { Thumbnail, StyleTag, SortOption } from "@/types";

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co";

export async function getThumbnails(params: {
  category?: string;
  style?: string;
  search?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
}): Promise<{ data: Thumbnail[]; total: number }> {
  if (USE_MOCK) {
    return getMockThumbnails(params);
  }

  const { createServerClient } = await import("@/lib/supabase-server");
  const supabase = createServerClient();

  let query = supabase
    .from("thumbnails")
    .select("*", { count: "exact" })
    .eq("status", "approved");

  if (params.category) {
    query = query.eq("category", params.category);
  }

  if (params.style) {
    query = query.contains("style_tags", [params.style]);
  }

  if (params.search) {
    query = query.or(
      `title.ilike.%${params.search}%,channel_name.ilike.%${params.search}%,video_title.ilike.%${params.search}%`
    );
  }

  switch (params.sort) {
    case "hot":
      query = query.order("views_count", { ascending: false });
      break;
    case "most-liked":
      query = query.order("likes_count", { ascending: false });
      break;
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "latest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 24;
  const from = (page - 1) * limit;
  query = query.range(from, from + limit - 1);

  const { data, count } = await query;
  return { data: (data as Thumbnail[]) ?? [], total: count ?? 0 };
}

export async function getFeaturedThumbnails(): Promise<Thumbnail[]> {
  if (USE_MOCK) {
    return MOCK_THUMBNAILS.filter((t) => t.featured && t.status === "approved").slice(0, 6);
  }

  const { createServerClient } = await import("@/lib/supabase-server");
  const supabase = createServerClient();

  const { data } = await supabase
    .from("thumbnails")
    .select("*")
    .eq("status", "approved")
    .eq("featured", true)
    .order("likes_count", { ascending: false })
    .limit(6);

  return (data as Thumbnail[]) ?? [];
}

export async function getThumbnailById(id: string): Promise<Thumbnail | null> {
  if (USE_MOCK) {
    return MOCK_THUMBNAILS.find((t) => t.id === id) ?? null;
  }

  const { createServerClient } = await import("@/lib/supabase-server");
  const supabase = createServerClient();

  const { data } = await supabase
    .from("thumbnails")
    .select("*")
    .eq("id", id)
    .single();

  return data as Thumbnail | null;
}

export async function getRelatedThumbnails(
  thumbnailId: string,
  category: string | null,
  styleTags: string[]
): Promise<Thumbnail[]> {
  if (USE_MOCK) {
    const current = MOCK_THUMBNAILS.find((t) => t.id === thumbnailId);
    if (!current) return [];

    return MOCK_THUMBNAILS
      .filter((t) => t.id !== thumbnailId && t.status === "approved")
      .filter((t) => {
        if (t.category === current.category) return true;
        return t.style_tags.some((s) => current.style_tags.includes(s));
      })
      .slice(0, 4);
  }

  const { createServerClient } = await import("@/lib/supabase-server");
  const supabase = createServerClient();

  let query = supabase
    .from("thumbnails")
    .select("*")
    .eq("status", "approved")
    .neq("id", thumbnailId)
    .limit(4);

  if (category) {
    query = query.eq("category", category);
  } else if (styleTags.length > 0) {
    query = query.overlaps("style_tags", styleTags);
  }

  const { data } = await query;
  return (data as Thumbnail[]) ?? [];
}

function getMockThumbnails(params: {
  category?: string;
  style?: string;
  search?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
}): { data: Thumbnail[]; total: number } {
  let filtered = MOCK_THUMBNAILS.filter((t) => t.status === "approved");

  if (params.category) {
    filtered = filtered.filter((t) => t.category === params.category);
  }

  if (params.style) {
    filtered = filtered.filter((t) => t.style_tags.includes(params.style as StyleTag));
  }

  if (params.search) {
    const search = params.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(search) ||
        t.channel_name?.toLowerCase().includes(search) ||
        t.video_title?.toLowerCase().includes(search)
    );
  }

  switch (params.sort) {
    case "hot":
      filtered.sort((a, b) => b.views_count - a.views_count);
      break;
    case "most-liked":
      filtered.sort((a, b) => b.likes_count - a.likes_count);
      break;
    case "oldest":
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      break;
    case "latest":
    default:
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      break;
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 24;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return { data, total: filtered.length };
}
