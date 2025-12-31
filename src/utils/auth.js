import { supabase } from '../lib/supabase'

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{data: any, error: any}>}
 */
export const login = async (email, password) => {
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

/**
 * Sign up with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} metadata - Additional user metadata (optional)
 * @returns {Promise<{data: any, error: any}>}
 */
export const signup = async (email, password, metadata = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata, // Additional user metadata like name, etc.
    },
  })

  if (error) {
    console.error('Signup error:', error.message)
    return { data: null, error }
  }

  return { data, error: null }
}

/**
 * Logout current user
 * @returns {Promise<{error: any}>}
 */
export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error.message)
    return { error }
  }

  return { error: null }
}

/**
 * Get current session
 * @returns {Promise<{data: any, error: any}>}
 */
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}

/**
 * Get current user
 * @returns {Promise<{data: any, error: any}>}
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { data: user, error }
}

/**
 * Reset password (sends reset email)
 * @param {string} email - User email
 * @returns {Promise<{data: any, error: any}>}
 */
export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    console.error('Password reset error:', error.message)
    return { data: null, error }
  }

  return { data, error: null }
}

/**
 * Update user password
 * @param {string} newPassword - New password
 * @returns {Promise<{data: any, error: any}>}
 */
export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    console.error('Password update error:', error.message)
    return { data: null, error }
  }

  return { data, error: null }
}




