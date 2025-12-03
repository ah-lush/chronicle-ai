export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      agent_jobs: {
        Row: {
          article_id: string | null
          completed_at: string | null
          created_at: string
          current_step: string | null
          error_message: string | null
          id: string
          inngest_run_id: string | null
          progress: number | null
          query: string
          research_data: Json | null
          retry_count: number | null
          search_queries: string[] | null
          started_at: string | null
          status: Database["public"]["Enums"]["agent_job_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          article_id?: string | null
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          id?: string
          inngest_run_id?: string | null
          progress?: number | null
          query: string
          research_data?: Json | null
          retry_count?: number | null
          search_queries?: string[] | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["agent_job_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          article_id?: string | null
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          id?: string
          inngest_run_id?: string | null
          progress?: number | null
          query?: string
          research_data?: Json | null
          retry_count?: number | null
          search_queries?: string[] | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["agent_job_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_jobs_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          article_images: string[] | null
          category: string
          content: string
          cover_image: string | null
          created_at: string
          id: string
          published_at: string | null
          status: Database["public"]["Enums"]["article_status"]
          summary: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          article_images?: string[] | null
          category: string
          content: string
          cover_image?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["article_status"]
          summary: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          article_images?: string[] | null
          category?: string
          content?: string
          cover_image?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["article_status"]
          summary?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_article_by_id: {
        Args: { p_article_id: string }
        Returns: {
          article_images: string[]
          category: string
          content: string
          cover_image: string
          created_at: string
          id: string
          published_at: string
          status: Database["public"]["Enums"]["article_status"]
          summary: string
          tags: string[]
          title: string
          updated_at: string
          user_id: string
          user_info: Json
        }[]
      }
      get_articles: {
        Args: {
          p_category?: string
          p_page?: number
          p_page_size?: number
          p_search?: string
          p_sort_by?: string
          p_sort_order?: string
          p_status?: Database["public"]["Enums"]["article_status"]
          p_user_id?: string
        }
        Returns: {
          article_images: string[]
          category: string
          content: string
          cover_image: string
          created_at: string
          id: string
          published_at: string
          status: Database["public"]["Enums"]["article_status"]
          summary: string
          tags: string[]
          title: string
          total_count: number
          updated_at: string
          user_id: string
          user_info: Json
        }[]
      }
      get_public_articles: {
        Args: {
          p_category?: string
          p_page?: number
          p_page_size?: number
          p_search?: string
          p_sort_by?: string
          p_sort_order?: string
          p_tags?: string[]
        }
        Returns: {
          article_images: string[]
          category: string
          content: string
          cover_image: string
          created_at: string
          id: string
          published_at: string
          summary: string
          tags: string[]
          title: string
          total_count: number
          user_id: string
          user_info: Json
        }[]
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      agent_job_status:
        | "QUEUED"
        | "ANALYZING"
        | "SEARCHING"
        | "RESEARCHING"
        | "WRITING"
        | "REVIEWING"
        | "COMPLETED"
        | "FAILED"
      article_status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_job_status: [
        "QUEUED",
        "ANALYZING",
        "SEARCHING",
        "RESEARCHING",
        "WRITING",
        "REVIEWING",
        "COMPLETED",
        "FAILED",
      ],
      article_status: ["DRAFT", "PUBLISHED", "ARCHIVED"],
    },
  },
} as const
