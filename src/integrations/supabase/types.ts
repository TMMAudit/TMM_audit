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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      assessment_sessions: {
        Row: {
          business_name: string | null
          completed: boolean
          completed_assessment_id: string | null
          created_at: string
          current_question_index: number
          current_screen: string
          email: string | null
          first_name: string | null
          id: string
          industry: string | null
          last_name: string | null
          referrer: string | null
          responses: Json
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          business_name?: string | null
          completed?: boolean
          completed_assessment_id?: string | null
          created_at?: string
          current_question_index?: number
          current_screen?: string
          email?: string | null
          first_name?: string | null
          id?: string
          industry?: string | null
          last_name?: string | null
          referrer?: string | null
          responses?: Json
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          business_name?: string | null
          completed?: boolean
          completed_assessment_id?: string | null
          created_at?: string
          current_question_index?: number
          current_screen?: string
          email?: string | null
          first_name?: string | null
          id?: string
          industry?: string | null
          last_name?: string | null
          referrer?: string | null
          responses?: Json
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      assessments: {
        Row: {
          business_name: string | null
          composite_pct: number
          composite_raw: number
          composite_tier: string
          created_at: string
          email: string
          first_name: string
          id: string
          industry: string | null
          last_name: string | null
          lowest_s1_domain: string | null
          lowest_s2_domain: string | null
          responses: Json
          s1_one_thing_domain: string | null
          s1_one_thing_statement: string | null
          s2_one_thing_domain: string | null
          s2_one_thing_statement: string | null
          section1_pct: number
          section1_raw: number
          section1_tier: string
          section2_pct: number
          section2_raw: number
          section2_tier: string
        }
        Insert: {
          business_name?: string | null
          composite_pct: number
          composite_raw: number
          composite_tier: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          industry?: string | null
          last_name?: string | null
          lowest_s1_domain?: string | null
          lowest_s2_domain?: string | null
          responses: Json
          s1_one_thing_domain?: string | null
          s1_one_thing_statement?: string | null
          s2_one_thing_domain?: string | null
          s2_one_thing_statement?: string | null
          section1_pct: number
          section1_raw: number
          section1_tier: string
          section2_pct: number
          section2_raw: number
          section2_tier: string
        }
        Update: {
          business_name?: string | null
          composite_pct?: number
          composite_raw?: number
          composite_tier?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          industry?: string | null
          last_name?: string | null
          lowest_s1_domain?: string | null
          lowest_s2_domain?: string | null
          responses?: Json
          s1_one_thing_domain?: string | null
          s1_one_thing_statement?: string | null
          s2_one_thing_domain?: string | null
          s2_one_thing_statement?: string | null
          section1_pct?: number
          section1_raw?: number
          section1_tier?: string
          section2_pct?: number
          section2_raw?: number
          section2_tier?: string
        }
        Relationships: []
      }
      diagnostic_submissions: {
        Row: {
          ai_tier: string
          business_name: string | null
          constraint_name: string
          created_at: string
          email: string
          first_name: string
          id: string
          responses: Json
          section_scores: Json
          stage: string
          total_score: number
        }
        Insert: {
          ai_tier: string
          business_name?: string | null
          constraint_name: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          responses: Json
          section_scores: Json
          stage: string
          total_score: number
        }
        Update: {
          ai_tier?: string
          business_name?: string | null
          constraint_name?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          responses?: Json
          section_scores?: Json
          stage?: string
          total_score?: number
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_cents: number | null
          created_at: string
          currency: string | null
          email: string | null
          id: string
          metadata: Json | null
          status: string
          stripe_session_id: string | null
        }
        Insert: {
          amount_cents?: number | null
          created_at?: string
          currency?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          stripe_session_id?: string | null
        }
        Update: {
          amount_cents?: number | null
          created_at?: string
          currency?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          stripe_session_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
