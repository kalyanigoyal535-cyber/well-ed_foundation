import { supabase } from '../lib/supabase'

/**
 * Test Supabase connection
 * This is a simple utility to verify your Supabase setup is working
 * Tests connection without requiring any tables to exist
 * 
 * Usage in App.jsx or any component:
 * 
 * useEffect(() => {
 *   testConnection()
 * }, [])
 */
export const testConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...')
    
    // Test 1: Check if Supabase client is initialized
    if (!supabase) {
      console.error('❌ Supabase client not initialized')
      return false
    }

    // Test 2: Check if environment variables are set
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase environment variables')
      console.log('   Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env')
      return false
    }

    // Test 3: Try to get the current session (this tests the connection without requiring tables)
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('❌ Supabase connection error:', sessionError.message)
      return false
    }

    console.log('✅ Supabase connection working!')
    console.log('   URL:', supabaseUrl)
    console.log('   Session:', sessionData.session ? 'Active' : 'No active session')
    
    // Test 4: Optionally test donations table if it exists (silently fail if table doesn't exist)
    try {
      const { error: tableError } = await supabase
        .from('donations')
        .select('*')
        .limit(1)

      if (tableError) {
        if (tableError.code === 'PGRST116' || tableError.message.includes('does not exist') || tableError.message.includes('schema cache')) {
          // Silently skip - table doesn't exist yet, which is fine
          console.log('ℹ️  Table "donations" not found yet - create it in Supabase dashboard when ready')
        } else {
          console.log('⚠️  Could not access "donations" table:', tableError.message)
        }
      } else {
        console.log('✅ "donations" table is accessible!')
      }
    } catch (error) {
      // Silently handle any errors during table check
      console.log('ℹ️  Table check skipped (table may not exist yet)')
    }

    return true
  } catch (error) {
    console.error('❌ Connection test failed:', error)
    return false
  }
}

/**
 * Test connection to a specific table
 * @param {string} tableName - Name of the table to test
 * @returns {Promise<boolean>}
 */
export const testTableConnection = async (tableName = 'donations') => {
  try {
    console.log(`🔍 Testing connection to table: ${tableName}...`)
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)

    if (error) {
      console.error(`❌ Error accessing table "${tableName}":`, error.message)
      return false
    }

    console.log(`✅ Table "${tableName}" accessible!`, data)
    return true
  } catch (error) {
    console.error(`❌ Table test failed for "${tableName}":`, error)
    return false
  }
}


