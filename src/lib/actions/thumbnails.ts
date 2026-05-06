"use server";

import { revalidatePath } from "next/cache";
import { submitThumbnailSchema } from "@/lib/schemas";
import { parseYouTubeUrl, getYouTubeThumbnailUrl, getYouTubeVideoUrl } from "@/lib/youtube";
import { MOCK_THUMBNAILS } from "@/data/mock-thumbnails";
import type { Thumbnail } from "@/types";

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co";

export async function submitThumbnail(formData: FormData) {
  const raw = {
    video_url: formData.get("video_url") as string,
    title: formData.get("title") as string,
    channel_name: (formData.get("channel_name") as string) || undefined,
    category: (formData.get("category") as string) || undefined,
    style_tags: JSON.parse((formData.get("style_tags") as string) || "[]"),
    analysis: formData.get("analysis") as string,
  };

  const parsed = submitThumbnailSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const ytData = parseYouTubeUrl(parsed.data.video_url);
  if (!ytData) {
    return { error: "Could not parse YouTube URL" };
  }

  const thumbnail_url = getYouTubeThumbnailUrl(ytData.videoId);
  const video_url = getYouTubeVideoUrl(ytData.videoId);

  if (USE_MOCK) {
    const newThumbnail: Thumbnail = {
      id: `mock-${Date.now()}`,
      video_id: ytData.videoId,
      video_url,
      title: parsed.data.title,
      video_title: parsed.data.title,
      channel_name: parsed.data.channel_name ?? null,
      thumbnail_url,
      category: (parsed.data.category as Thumbnail["category"]) ?? null,
      style_tags: parsed.data.style_tags as Thumbnail["style_tags"],
      analysis: parsed.data.analysis,
      likes_count: 0,
      views_count: 0,
      status: "pending",
      featured: false,
      submitted_by: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    MOCK_THUMBNAILS.push(newThumbnail);
    revalidatePath("/gallery");
    return { success: true, id: newThumbnail.id };
  }

  const { createServerClient } = await import("@/lib/supabase-server");
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("thumbnails")
    .insert({
      video_id: ytData.videoId,
      video_url,
      title: parsed.data.title,
      channel_name: parsed.data.channel_name ?? null,
      thumbnail_url,
      category: parsed.data.category ?? null,
      style_tags: parsed.data.style_tags,
      analysis: parsed.data.analysis,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/gallery");
  return { success: true, id: data?.id };
}

export async function updateThumbnailStatus(
  id: string,
  status: "approved" | "rejected"
) {
  if (USE_MOCK) {
    const t = MOCK_THUMBNAILS.find((t) => t.id === id);
    if (t) t.status = status;
    revalidatePath("/admin");
    revalidatePath("/gallery");
    return { success: true };
  }

  const { createServerClient } = await import("@/lib/supabase-server");
  const supabase = createServerClient();

  const { error } = await supabase
    .from("thumbnails")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/gallery");
  return { success: true };
}

export async function toggleFeatured(id: string, featured: boolean) {
  if (USE_MOCK) {
    const t = MOCK_THUMBNAILS.find((t) => t.id === id);
    if (t) t.featured = featured;
    revalidatePath("/admin");
    revalidatePath("/gallery");
    revalidatePath("/");
    return { success: true };
  }

  const { createServerClient } = await import("@/lib/supabase-server");
  const supabase = createServerClient();

  const { error } = await supabase
    .from("thumbnails")
    .update({ featured, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function deleteThumbnail(id: string) {
  if (USE_MOCK) {
    const idx = MOCK_THUMBNAILS.findIndex((t) => t.id === id);
    if (idx !== -1) MOCK_THUMBNAILS.splice(idx, 1);
    revalidatePath("/admin");
    revalidatePath("/gallery");
    return { success: true };
  }

  const { createServerClient } = await import("@/lib/supabase-server");
  const supabase = createServerClient();

  const { error } = await supabase.from("thumbnails").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/gallery");
  return { success: true };
}

export async function getPendingThumbnails(): Promise<Thumbnail[]> {
  if (USE_MOCK) {
    return MOCK_THUMBNAILS.filter((t) => t.status === "pending");
  }

  const { createServerClient } = await import("@/lib/supabase-server");
  const supabase = createServerClient();

  const { data } = await supabase
    .from("thumbnails")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  return (data as Thumbnail[]) ?? [];
}

export async function getAllThumbnailsForAdmin(): Promise<Thumbnail[]> {
  if (USE_MOCK) {
    return [...MOCK_THUMBNAILS].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  const { createServerClient } = await import("@/lib/supabase-server");
  const supabase = createServerClient();

  const { data } = await supabase
    .from("thumbnails")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as Thumbnail[]) ?? [];
}
