import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types/models'

interface AuthState {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: Profile | null) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => {
    console.log('[AuthStore] setUser:', user?.email, 'isAuthenticated:', !!user)
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false
    })
  },

  setProfile: (profile) => {
    console.log('[AuthStore] setProfile:', profile?.email, 'role:', profile?.role)
    set({ profile })
  },

  setLoading: (isLoading) => {
    console.log('[AuthStore] setLoading:', isLoading)
    set({ isLoading })
  },

  reset: () => {
    console.log('[AuthStore] reset')
    set({
      user: null,
      profile: null,
      isAuthenticated: false,
      isLoading: false
    })
  },
}))
