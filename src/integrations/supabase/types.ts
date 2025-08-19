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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          add_ons: string[] | null
          add_ons_amount: number | null
          base_amount: number
          booking_date: string
          booking_reference: string
          booking_status: string
          cancellation_reason: string | null
          cancelled_at: string | null
          created_at: string
          id: string
          package_type: string
          participants: Json | null
          participants_count: number
          payment_gateway: string | null
          payment_id: string | null
          payment_status: string
          special_requests: string | null
          total_amount: number
          trek_end_date: string
          trek_id: string
          trek_start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          add_ons?: string[] | null
          add_ons_amount?: number | null
          base_amount: number
          booking_date?: string
          booking_reference: string
          booking_status?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string
          id?: string
          package_type: string
          participants?: Json | null
          participants_count: number
          payment_gateway?: string | null
          payment_id?: string | null
          payment_status?: string
          special_requests?: string | null
          total_amount: number
          trek_end_date: string
          trek_id: string
          trek_start_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          add_ons?: string[] | null
          add_ons_amount?: number | null
          base_amount?: number
          booking_date?: string
          booking_reference?: string
          booking_status?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string
          id?: string
          package_type?: string
          participants?: Json | null
          participants_count?: number
          payment_gateway?: string | null
          payment_id?: string | null
          payment_status?: string
          special_requests?: string | null
          total_amount?: number
          trek_end_date?: string
          trek_id?: string
          trek_start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_trek_id_fkey"
            columns: ["trek_id"]
            isOneToOne: false
            referencedRelation: "treks"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          add_ons: string[] | null
          created_at: string
          id: string
          package_type: string
          participants_count: number
          price_snapshot: number
          selected_date: string
          trek_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          add_ons?: string[] | null
          created_at?: string
          id?: string
          package_type: string
          participants_count?: number
          price_snapshot: number
          selected_date: string
          trek_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          add_ons?: string[] | null
          created_at?: string
          id?: string
          package_type?: string
          participants_count?: number
          price_snapshot?: number
          selected_date?: string
          trek_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_trek_id_fkey"
            columns: ["trek_id"]
            isOneToOne: false
            referencedRelation: "treks"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string
          created_at: string
          helpful_count: number | null
          id: string
          is_published: boolean | null
          is_verified: boolean | null
          photos: string[] | null
          rating: number
          review_text: string | null
          review_title: string | null
          trek_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_published?: boolean | null
          is_verified?: boolean | null
          photos?: string[] | null
          rating: number
          review_text?: string | null
          review_title?: string | null
          trek_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_published?: boolean | null
          is_verified?: boolean | null
          photos?: string[] | null
          rating?: number
          review_text?: string | null
          review_title?: string | null
          trek_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_trek_id_fkey"
            columns: ["trek_id"]
            isOneToOne: false
            referencedRelation: "treks"
            referencedColumns: ["id"]
          },
        ]
      }
      treks: {
        Row: {
          base_price: number
          best_season: string[] | null
          created_at: string
          description: string | null
          difficulty_level: string
          duration_days: number
          exclusions: string[] | null
          featured_image: string | null
          gallery_images: string[] | null
          highlights: string[] | null
          id: string
          inclusions: string[] | null
          is_active: boolean | null
          is_featured: boolean | null
          itinerary: Json | null
          max_altitude: number | null
          max_group_size: number | null
          min_group_size: number | null
          overview: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          base_price: number
          best_season?: string[] | null
          created_at?: string
          description?: string | null
          difficulty_level: string
          duration_days: number
          exclusions?: string[] | null
          featured_image?: string | null
          gallery_images?: string[] | null
          highlights?: string[] | null
          id?: string
          inclusions?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          itinerary?: Json | null
          max_altitude?: number | null
          max_group_size?: number | null
          min_group_size?: number | null
          overview?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          base_price?: number
          best_season?: string[] | null
          created_at?: string
          description?: string | null
          difficulty_level?: string
          duration_days?: number
          exclusions?: string[] | null
          featured_image?: string | null
          gallery_images?: string[] | null
          highlights?: string[] | null
          id?: string
          inclusions?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          itinerary?: Json | null
          max_altitude?: number | null
          max_group_size?: number | null
          min_group_size?: number | null
          overview?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          dietary_preferences: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string | null
          id: string
          medical_conditions: string | null
          phone: string | null
          trekking_experience: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          dietary_preferences?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          id?: string
          medical_conditions?: string | null
          phone?: string | null
          trekking_experience?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          dietary_preferences?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          id?: string
          medical_conditions?: string | null
          phone?: string | null
          trekking_experience?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
