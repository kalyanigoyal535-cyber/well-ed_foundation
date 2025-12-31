import { supabase } from '../lib/supabase'

/**
 * Subscribe to real-time changes in a table
 * 
 * @param {string} tableName - Name of the table to watch
 * @param {Function} callback - Callback function to handle changes
 * @param {Object} options - Additional options
 * @param {string} options.filter - Filter expression (e.g., 'status=eq.pending')
 * @returns {Function} Unsubscribe function
 * 
 * @example
 * // Subscribe to donations table
 * const unsubscribe = subscribeToTable('donations', (payload) => {
 *   console.log('Change received!', payload)
 *   // Update your state here
 * })
 * 
 * // Later, unsubscribe
 * unsubscribe()
 */
export const subscribeToTable = (tableName, callback, options = {}) => {
  const channel = supabase
    .channel(`${tableName}_changes`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events: INSERT, UPDATE, DELETE
        schema: 'public',
        table: tableName,
        filter: options.filter,
      },
      (payload) => {
        callback(payload)
      }
    )
    .subscribe()

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}

/**
 * Subscribe to real-time changes with React hook pattern
 * Use this in a useEffect hook
 * 
 * @example
 * useEffect(() => {
 *   const unsubscribe = subscribeToDonations((payload) => {
 *     if (payload.eventType === 'INSERT') {
 *       setDonations(prev => [payload.new, ...prev])
 *     }
 *   })
 *   
 *   return () => unsubscribe()
 * }, [])
 */
export const subscribeToDonations = (callback) => {
  return subscribeToTable('donations', callback)
}

/**
 * Subscribe to specific donation status changes
 * @param {string} status - Status to filter by (pending, completed, failed)
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export const subscribeToDonationStatus = (status, callback) => {
  return subscribeToTable('donations', callback, {
    filter: `status=eq.${status}`,
  })
}




