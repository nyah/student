// Domain models derived from database types
import type { Database } from './database'

// Type helpers
type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']

// Core domain types
export type Profile = Tables<'profiles'>
export type Course = Tables<'courses'>
export type Module = Tables<'modules'>
export type Lesson = Tables<'lessons'>
export type Assessment = Tables<'assessments'>
export type Question = Tables<'questions'>
export type Enrollment = Tables<'enrollments'>
export type LessonProgress = Tables<'lesson_progress'>
export type AssessmentAttempt = Tables<'assessment_attempts'>
export type Certificate = Tables<'certificates'>

// Extended types with relations
export type CourseWithModules = Course & {
  modules: ModuleWithLessons[]
}

export type ModuleWithLessons = Module & {
  lessons: LessonWithAssessment[]
}

export type LessonWithAssessment = Lesson & {
  assessment?: Assessment
}

export type AssessmentWithQuestions = Assessment & {
  questions: QuestionForStudent[] // Without correct_answer
}

// Question type for students (without correct answer)
export type QuestionForStudent = Omit<Question, 'correct_answer'>

// Question type for grading (with correct answer, server-side only)
export type QuestionForGrading = Question

// Assessment attempt with details
export type AssessmentAttemptWithDetails = AssessmentAttempt & {
  assessment: Assessment
}

// Certificate with course details
export type CertificateWithCourse = Certificate & {
  course: Course
}

// Progress tracking
export interface CourseProgress {
  courseId: string
  completedLessons: string[] // lesson IDs
  totalLessons: number
  percentage: number
}

// Student stats
export interface StudentStats {
  enrolledCourses: number
  completedCourses: number
  totalCertificates: number
  avgAssessmentScore: number
  totalAssessmentsPassed: number
}

// Assessment submission
export interface AssessmentAnswers {
  [questionId: string]: 'A' | 'B' | 'C' | 'D'
}

// Assessment result
export interface AssessmentResult {
  score: number
  passed: boolean
  totalQuestions: number
  correctAnswers: number
}

// User role type
export type UserRole = 'student' | 'admin'
