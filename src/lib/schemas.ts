import { z } from "zod/v4";

export const submitThumbnailSchema = z.object({
  video_url: z
    .string()
    .min(1, "YouTube URL is required")
    .refine(
      (val) => {
        const patterns = [
          /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
        ];
        return patterns.some((p) => p.test(val));
      },
      { message: "Please enter a valid YouTube URL" }
    ),
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  channel_name: z.string().optional(),
  category: z.string().optional(),
  style_tags: z.array(z.string()).min(1, "Select at least one style tag").max(5),
  analysis: z.string().min(10, "Analysis must be at least 10 characters").max(2000),
});

export type SubmitThumbnailInput = z.infer<typeof submitThumbnailSchema>;

export const updateThumbnailSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(200).optional(),
  channel_name: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  style_tags: z.array(z.string()).optional(),
  analysis: z.string().optional().nullable(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  featured: z.boolean().optional(),
});

export type UpdateThumbnailInput = z.infer<typeof updateThumbnailSchema>;
