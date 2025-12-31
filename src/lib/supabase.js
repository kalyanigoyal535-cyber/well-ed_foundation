import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a single supabase client for interacting with your database
// Only create client if both env vars are provided, otherwise create a no-op client
let supabase

if (supabaseUrl && supabaseAnonKey) {
  // Create real Supabase client if env vars are provided
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
} else {
  // Create a dummy client with a placeholder URL to prevent crashes
  // This client won't work, but it prevents the "supabaseUrl is required" error
  // All methods will fail gracefully when called
  if (import.meta.env.DEV) {
    console.warn('⚠️ Supabase environment variables are not set.')
    console.warn('   Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
    console.warn('   App will continue to work, but Supabase features will be disabled.')
  }
  
  // Use a placeholder URL that won't cause validation errors
  // The client will fail when making actual API calls, but won't crash on initialization
  supabase = createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0', {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export { supabase }

