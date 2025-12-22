import { useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'
import type { UserRole } from '@/types/models'

export function useAuth() {
  const { user, profile, isLoading, isAuthenticated, setUser, setProfile, setLoading, reset } = useAuthStore()

  // Fetch profile data
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
      return data
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }, [setProfile])

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      try {
        setLoading(true)

        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error)
          if (mounted) reset()
          return
        }

        if (mounted) {
          if (session?.user) {
            setUser(session.user)
            // Try to fetch profile, but don't block if it fails
            try {
              await fetchProfile(session.user.id)
            } catch (profileError) {
              console.error('Error fetching profile:', profileError)
              // Continue anyway - user is authenticated even if profile fetch fails
            }
          } else {
            reset()
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        if (mounted) reset()
      } finally {
        if (mounted) setLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        try {
          await fetchProfile(session.user.id)
        } catch (error) {
          console.error('Error fetching profile after sign in:', error)
        }
      } else if (event === 'SIGNED_OUT') {
        reset()
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        setUser(session.user)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [setUser, setLoading, reset, fetchProfile])

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
