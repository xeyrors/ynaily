export type Category =
  | "tech"
  | "gaming"
  | "finance"
  | "education"
  | "entertainment"
  | "food"
  | "lifestyle"
  | "documentary"
  | "personal-brand"
  | "music";

export type StyleTag =
  | "minimal"
  | "bold-text"
  | "face-centric"
  | "product-shot"
  | "before-after"
  | "infographic"
  | "cinematic"
  | "high-contrast"
  | "illustrated"
  | "action-shot";

export type ThumbnailStatus = "pending" | "approved" | "rejected";

export type SortOption = "hot" | "latest" | "most-liked" | "oldest";

export interface Thumbnail {
  id: string;
  video_id: string | null;
  video_url: string | null;
  title: string;
  video_title: string | null;
  channel_name: string | null;
  thumbnail_url: string;
  category: Category | null;
  style_tags: StyleTag[];
  analysis: string | null;
  likes_count: number;
  views_count: number;
  status: ThumbnailStatus;
  featured: boolean;
  submitted_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ThumbnailWithAuthor extends Thumbnail {
  profiles?: {
    username: string | null;
    avatar_url: string | null;
  } | null;
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "tech", label: "Tech" },
  { value: "gaming", label: "Gaming" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
  { value: "food", label: "Food & Cooking" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "documentary", label: "Documentary" },
  { value: "personal-brand", label: "Personal Brand" },
  { value: "music", label: "Music" },
];

export const STYLE_TAGS: { value: StyleTag; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "bold-text", label: "Bold Text" },
  { value: "face-centric", label: "Face Centric" },
  { value: "product-shot", label: "Product Shot" },
  { value: "before-after", label: "Before / After" },
  { value: "infographic", label: "Infographic" },
  { value: "cinematic", label: "Cinematic" },
  { value: "high-contrast", label: "High Contrast" },
  { value: "illustrated", label: "Illustrated" },
  { value: "action-shot", label: "Action Shot" },
];
