export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      magicwords: {
        Row: {
          date: string | null
          guessed_state: boolean | null
          hint: string | null
          id: number
          winner_username: string | null
          word: string | null
        }
        Insert: {
          date?: string | null
          guessed_state?: boolean | null
          hint?: string | null
          id?: never
          winner_username?: string | null
          word?: string | null
        }
        Update: {
          date?: string | null
          guessed_state?: boolean | null
          hint?: string | null
          id?: never
          winner_username?: string | null
          word?: string | null
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
