import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Only warn in development, not in production to avoid console spam
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('⚠️ Supabase environment variables are not set. Please check your .env file.')
  console.warn('   Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
  console.warn('   App will continue to work, but Supabase features will be disabled.')
}

// Create a single supabase client for interacting with your database
// If env vars are missing, createClient will still work but API calls will fail gracefully
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

