import { supabase } from '../lib/supabase'

/**
 * Save a donation to Supabase
 * @param {Object} donationData - The donation data object
 * @returns {Promise<{data: any, error: any}>}
 */
export const saveDonation = async (donationData) => {
  const { data, error } = await supabase
    .from('donations')
    .insert([donationData])
    .select()

  return { data, error }
}

/**
 * Get all donations
 * @param {Object} options - Query options
 * @param {number} options.limit - Limit number of results
 * @param {string} options.status - Filter by status
 * @param {string} options.orderBy - Column to order by
 * @param {boolean} options.ascending - Sort order
 * @returns {Promise<{data: any, error: any}>}
 */
export const getDonations = async (options = {}) => {
  const {
    limit = 100,
    status = null,
    orderBy = 'created_at',
    ascending = false,
  } = options

  let query = supabase
    .from('donations')
    .select('*')
    .order(orderBy, { ascending })
    .limit(limit)

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query
  return { data, error }
}

/**
 * Get a single donation by ID
 * @param {string} donationId - The donation ID
 * @returns {Promise<{data: any, error: any}>}
 */
export const getDonationById = async (donationId) => {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .eq('id', donationId)
    .single()

  return { data, error }
}

/**
 * Update donation status
 * @param {string} donationId - The donation ID
 * @param {string} status - New status (pending, completed, failed)
 * @returns {Promise<{data: any, error: any}>}
 */
export const updateDonationStatus = async (donationId, status) => {
  const { data, error } = await supabase
    .from('donations')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', donationId)
    .select()

  return { data, error }
}

/**
 * Get donations by email
 * @param {string} email - Donor email
 * @returns {Promise<{data: any, error: any}>}
 */
export const getDonationsByEmail = async (email) => {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: false })

  return { data, error }
}

/**
 * Get donation statistics
 * @returns {Promise<{data: any, error: any}>}
 */
export const getDonationStats = async () => {
  // Get total donations count
  const { count: totalCount, error: countError } = await supabase
    .from('donations')
    .select('*', { count: 'exact', head: true })

  if (countError) {
    return { data: null, error: countError }
  }

  // Get total amount
  const { data: donations, error: donationsError } = await supabase
    .from('donations')
    .select('amount, status')

  if (donationsError) {
    return { data: null, error: donationsError }
  }

  const totalAmount = donations
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + parseFloat(d.amount || 0), 0)

  const pendingCount = donations.filter(d => d.status === 'pending').length
  const completedCount = donations.filter(d => d.status === 'completed').length

  return {
    data: {
      totalCount,
      totalAmount,
      pendingCount,
      completedCount,
    },
    error: null,
  }
}




