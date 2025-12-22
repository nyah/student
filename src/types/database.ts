// This file will be generated from Supabase once the project is set up
// For now, we'll create the types manually based on our schema

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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'student' | 'admin'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: 'student' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'student' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          thumbnail_url: string | null
          is_published: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      modules: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          title: string
          content: string
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          module_id: string
          title: string
          content: string
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          title?: string
          content?: string
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          lesson_id: string
          title: string
          description: string | null
          passing_score: number
          max_attempts: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          title: string
          description?: string | null
          passing_score?: number
          max_attempts?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          title?: string
          description?: string | null
          passing_score?: number
          max_attempts?: number
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          assessment_id: string
          question_text: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          correct_answer: 'A' | 'B' | 'C' | 'D'
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          assessment_id: string
          question_text: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          correct_answer: 'A' | 'B' | 'C' | 'D'
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          assessment_id?: string
          question_text?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          correct_answer?: 'A' | 'B' | 'C' | 'D'
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          enrolled_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          enrolled_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          enrolled_at?: string
        }
      }
      lesson_progress: {
        Row: {
          id: string
          student_id: string
          lesson_id: string
          completed_at: string
        }
        Insert: {
          id?: string
          student_id: string
          lesson_id: string
          completed_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          lesson_id?: string
          completed_at?: string
        }
      }
      assessment_attempts: {
        Row: {
          id: string
          student_id: string
          assessment_id: string
          answers: Json
          score: number
          passed: boolean
          attempted_at: string
        }
        Insert: {
          id?: string
          student_id: string
          assessment_id: string
          answers: Json
          score: number
          passed: boolean
          attempted_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          assessment_id?: string
          answers?: Json
          score?: number
          passed?: boolean
          attempted_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          student_id: string
          course_id: string
          certificate_url: string | null
          issued_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          certificate_url?: string | null
          issued_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          certificate_url?: string | null
          issued_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_student_progress: {
        Args: {
          p_student_id: string
          p_course_id: string
        }
        Returns: number
      }
      get_student_stats: {
        Args: {
          p_student_id: string
        }
        Returns: {
          enrolled_courses: number
          completed_courses: number
          total_certificates: number
          avg_assessment_score: number
          total_assessments_passed: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
