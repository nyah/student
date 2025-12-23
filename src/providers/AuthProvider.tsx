import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@supabase/supabase-js'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setProfile, setLoading, reset } = useAuthStore()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    let mounted = true

    const fetchProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) throw error
        if (mounted) setProfile(data)
      } catch (error) {
        console.error('[AuthProvider] Error fetching profile:', error)
      }
    }

    const initAuth = async () => {
      try {
        console.log('[AuthProvider] Initializing auth')
        setLoading(true)

        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('[AuthProvider] Error getting session:', error)
          if (mounted) reset()
          return
        }

        console.log('[AuthProvider] Session:', session?.user?.email || 'none')

        if (mounted) {
          if (session?.user) {
            setUser(session.user)
            await fetchProfile(session.user.id)
          } else {
            reset()
          }
          setInitialized(true)
        }
      } catch (error) {
        console.error('[AuthProvider] Error initializing auth:', error)
        if (mounted) {
          reset()
          setInitialized(true)
        }
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthProvider] Auth state changed:', event)
      if (!mounted) return

      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        reset()
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        setUser(session.user)
      }
    })

    return () => {
      console.log('[AuthProvider] Cleanup')
      mounted = false
      subscription.unsubscribe()
    }
  }, [setUser, setProfile, setLoading, reset])

  // Don't render children until auth is initialized
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eai-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
