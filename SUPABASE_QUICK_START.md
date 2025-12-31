# Supabase Quick Start

## Quick Setup (5 minutes)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Wait for project to initialize (~2 minutes)

2. **Get API Keys**
   - Go to Settings → API
   - Copy your Project URL and anon key

3. **Create `.env` file** in project root:
   ```env
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your_public_anon_key
   ```

4. **Create Database Table**
   - Go to Table Editor → New Table
   - Name: `donations`
   - See `SUPABASE_SETUP.md` for full table schema

5. **Restart Dev Server**
   ```bash
   npm run dev
   ```

6. **Test Connection**
   - Uncomment the test in `App.jsx` or use:
   ```javascript
   import { testConnection } from './utils/testConnection'
   useEffect(() => { testConnection() }, [])
   ```

7. **Test It!**
   - Go to `/donate` page
   - Fill out the form and submit
   - Check Supabase dashboard to see your data

## Files Created

- `src/lib/supabase.js` - Supabase client configuration
- `src/contexts/SupabaseContext.jsx` - React context with auth & session management
- `src/utils/auth.js` - Authentication helper functions
- `src/utils/supabaseHelpers.js` - Database helper functions
- `src/utils/testConnection.js` - Connection testing utilities
- `src/utils/realtime.js` - Real-time subscription helpers
- `SUPABASE_SETUP.md` - Detailed setup guide
- `SUPABASE_AUTH_GUIDE.md` - Authentication & best practices guide

## Usage Examples

### Authentication

```javascript
import { useSupabase } from '../contexts/SupabaseContext'

function MyComponent() {
  const { user, login, signup, logout, isAuthenticated } = useSupabase()
  
  // Login
  const handleLogin = async () => {
    const { error } = await login(email, password)
    if (error) alert(error.message)
  }
  
  // Check if user is logged in
  if (isAuthenticated) {
    return <div>Welcome, {user.email}!</div>
  }
}
```

### Save a donation (already integrated in Donate.jsx)
```javascript
import { saveDonation } from '../utils/supabaseHelpers'

const donationData = {
  donation_type: 'general',
  amount: 1000,
  name: 'John Doe',
  email: 'john@example.com',
  // ... other fields
}

const { data, error } = await saveDonation(donationData)
```

### Get all donations
```javascript
import { getDonations } from '../utils/supabaseHelpers'

const { data, error } = await getDonations({
  limit: 50,
  status: 'completed',
  orderBy: 'created_at',
  ascending: false
})
```

### Real-time subscriptions
```javascript
import { subscribeToDonations } from '../utils/realtime'

useEffect(() => {
  const unsubscribe = subscribeToDonations((payload) => {
    console.log('New donation!', payload.new)
  })
  return () => unsubscribe()
}, [])
```

### Use Supabase directly
```javascript
import { supabase } from '../lib/supabase'

// Query donations
const { data, error } = await supabase
  .from('donations')
  .select('*')
  .eq('status', 'pending')
```

## Need Help?

- **Setup**: See `SUPABASE_SETUP.md` for detailed instructions
- **Auth & Best Practices**: See `SUPABASE_AUTH_GUIDE.md` for authentication patterns and common mistakes
- **Troubleshooting**: Check both guides for solutions

