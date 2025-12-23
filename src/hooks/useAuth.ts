import { useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'
import type { UserRole } from '@/types/models'

export function useAuth() {
  const { user, profile, isLoading, isAuthenticated, reset } = useAuthStore()

  // Sign up
  const signUp = useCallback(async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole = 'student'
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      })

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      console.error('Error signing up:', error)
      return { data: null, error: error.message || 'Error al registrarse' }
    }
  }, [])

  // Sign in
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      console.error('Error signing in:', error)
      return { data: null, error: error.message || 'Error al iniciar sesión' }
    }
  }, [])

  // Sign out
  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      reset()
      return { error: null }
    } catch (error: any) {
      console.error('Error signing out:', error)
      return { error: error.message || 'Error al cerrar sesión' }
    }
  }, [reset])

  // Check if user has a specific role
  const hasRole = useCallback((role: UserRole) => {
    return profile?.role === role
  }, [profile])

  return {
    user,
    profile,
    isLoading,
    isAuthenticated,
    isAdmin: hasRole('admin'),
    isStudent: hasRole('student'),
    signUp,
    signIn,
    signOut,
    hasRole,
  }
}
