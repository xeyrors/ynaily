export interface Database {
  public: {
    Tables: {
      thumbnails: {
        Row: {
          id: string;
          video_id: string | null;
          video_url: string | null;
          title: string;
          video_title: string | null;
          channel_name: string | null;
          thumbnail_url: string;
          category: string | null;
          style_tags: string[] | null;
          analysis: string | null;
          likes_count: number;
          views_count: number;
          status: string;
          featured: boolean;
          submitted_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          video_id?: string | null;
          video_url?: string | null;
          title: string;
          video_title?: string | null;
          channel_name?: string | null;
          thumbnail_url: string;
          category?: string | null;
          style_tags?: string[] | null;
          analysis?: string | null;
          likes_count?: number;
          views_count?: number;
          status?: string;
          featured?: boolean;
          submitted_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          video_id?: string | null;
          video_url?: string | null;
          title?: string;
          video_title?: string | null;
          channel_name?: string | null;
          thumbnail_url?: string;
          category?: string | null;
          style_tags?: string[] | null;
          analysis?: string | null;
          likes_count?: number;
          views_count?: number;
          status?: string;
          featured?: boolean;
          submitted_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string | null;
          avatar_url: string | null;
          role: string;
          created_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
        };
        Update: {
          username?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          thumbnail_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          thumbnail_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
