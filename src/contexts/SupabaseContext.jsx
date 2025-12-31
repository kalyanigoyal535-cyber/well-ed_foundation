import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const SupabaseContext = createContext({})

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}

export const SupabaseProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    // If Supabase is not configured, skip initialization and just set loading to false
    if (!supabaseUrl || !supabaseAnonKey) {
      setLoading(false)
      return
    }

    // Get initial session and user
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error getting session:', error)
        setLoading(false)
      })

    // Listen for auth changes
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      })

      return () => {
        if (subscription) {
          subscription.unsubscribe()
        }
      }
    } catch (error) {
      console.error('Error setting up auth state listener:', error)
      setLoading(false)
    }
  }, [])

  // Auth helper methods
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error('Login error:', error.message)
      return { data: null, error }
    }
    return { data, error: null }
  }

  const signup = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata, // Additional user metadata
      },
    })
    if (error) {
      console.error('Signup error:', error.message)
      return { data: null, error }
    }
    return { data, error: null }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error.message)
      return { error }
    }
    return { error: null }
  }

  const value = {
    supabase,
    session,
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}

