import { supabase } from '../lib/supabase'

/**
 * 🧪 TEST FUNCTION: Test Supabase donation insertion
 * 
 * Usage:
 * 1. Import in any component: import { testDonationInsert } from '../utils/testDonationInsert'
 * 2. Call it: testDonationInsert()
 * 
 * Or call from browser console (if exposed globally):
 * window.testDonationInsert()
 */
export const testDonationInsert = async () => {
  console.log('🧪 Testing Supabase donation insertion...')
  
  try {
    // Try with 'donations' table first (our main table)
    let { data, error } = await supabase
      .from('donations')
      .insert({
        name: 'Test User',
        amount: 500,
        email: 'test@example.com',
        mobile: '9876543210',
        address: 'Test Address',
        pincode: '123456',
        city: 'Test City',
        state: 'Test State',
        donation_type: 'general',
        status: 'pending',
        title: 'Mr',
        whatsapp: false,
        want_80g: true,
        donor_type: 'indian',
      })
      .select()

    // If 'donations' table doesn't exist, try 'donation_intents'
    if (error && (error.code === 'PGRST116' || error.message.includes('does not exist'))) {
      console.log('⚠️  "donations" table not found, trying "donation_intents"...')
      
      const result = await supabase
        .from('donation_intents')
        .insert({
          name: 'Test User',
          amount: 500,
          cause: 'Food for children',
          status: 'pending'
        })
        .select()
      
      data = result.data
      error = result.error
    }

    if (error) {
      console.error('❌ Error inserting donation:', error)
      alert(`❌ Error: ${error.message}\n\nMake sure the table exists in Supabase!`)
      return { success: false, error }
    }

    console.log('✅ Donation intent saved!', data)
    alert('✅ Donation intent saved successfully!\n\nCheck your Supabase dashboard to see the data.')
    return { success: true, data }
  } catch (error) {
    console.error('❌ Test failed:', error)
    alert(`❌ Test failed: ${error.message}`)
    return { success: false, error }
  }
}

// Simple version matching the user's example exactly
export const submitDonation = async () => {
  const { error } = await supabase
    .from('donation_intents')
    .insert({
      name: 'Test User',
      amount: 500,
      cause: 'Food for children',
      status: 'pending'
    })

  if (error) {
    console.error(error)
    alert(`Error: ${error.message}`)
  } else {
    alert('Donation intent saved!')
  }
}



