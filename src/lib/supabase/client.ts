import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ Falta configurar Supabase. Por favor:\n' +
    '1. Crea un archivo .env.local en la raíz del proyecto\n' +
    '2. Agrega tus credenciales de Supabase:\n' +
    '   VITE_SUPABASE_URL=tu_url_de_supabase\n' +
    '   VITE_SUPABASE_ANON_KEY=tu_anon_key\n' +
    '3. Consulta SETUP_SUPABASE.md para más detalles'
  )
}

// Usar valores dummy para permitir que la app cargue sin Supabase configurado
const url = supabaseUrl || 'https://placeholder.supabase.co'
const key = supabaseAnonKey || 'placeholder-key'

export const supabase = createClient<Database>(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Helper para verificar si Supabase está configurado
export const isSupabaseConfigured = () => {
  return supabaseUrl !== undefined &&
         supabaseAnonKey !== undefined &&
         supabaseUrl !== 'https://placeholder.supabase.co'
}
