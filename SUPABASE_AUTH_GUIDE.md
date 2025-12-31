# Supabase Authentication & Best Practices Guide

## 🔐 Authentication Setup

### Quick Setup

1. **Enable Authentication in Supabase**
   - Go to Authentication → Providers
   - Enable Email provider (enabled by default)
   - Configure email templates if needed

2. **Use Auth Context** (Already set up in `SupabaseContext.jsx`)

```javascript
import { useSupabase } from '../contexts/SupabaseContext'

function MyComponent() {
  const { user, login, signup, logout, isAuthenticated } = useSupabase()
  
  // User is automatically available when logged in
  // Session is managed automatically
}
```

### Login

```javascript
import { login } from '../utils/auth'

const handleLogin = async () => {
  const { data, error } = await login(email, password)
  
  if (error) {
    alert(error.message)
    return
  }
  
  // User is now logged in, session is automatically updated
  console.log('Logged in:', data.user)
}
```

### Signup

```javascript
import { signup } from '../utils/auth'

const handleSignup = async () => {
  const { data, error } = await signup(email, password, {
    name: 'John Doe', // Optional metadata
  })
  
  if (error) {
    alert(error.message)
    return
  }
  
  // User created, check email for confirmation
  alert('Please check your email to confirm your account')
}
```

### Logout

```javascript
import { logout } from '../utils/auth'

const handleLogout = async () => {
  const { error } = await logout()
  
  if (error) {
    alert(error.message)
    return
  }
  
  // User is logged out, session cleared automatically
}
```

## 👤 User Session Management

**Already implemented in `SupabaseContext.jsx`!**

The context automatically:
- ✅ Gets initial session on app load
- ✅ Listens for auth state changes
- ✅ Updates user state when login/logout happens
- ✅ Provides `user` and `session` to all components

### Access User Anywhere

```javascript
import { useSupabase } from '../contexts/SupabaseContext'

function MyComponent() {
  const { user, session, isAuthenticated, loading } = useSupabase()
  
  if (loading) return <div>Loading...</div>
  
  if (!isAuthenticated) {
    return <div>Please log in</div>
  }
  
  return <div>Welcome, {user.email}!</div>
}
```

## 🔍 Verify Connection

### Quick Test (in App.jsx or any component)

```javascript
import { testConnection } from '../utils/testConnection'

useEffect(() => {
  testConnection()
}, [])
```

### Test Specific Table

```javascript
import { testTableConnection } from '../utils/testConnection'

useEffect(() => {
  testTableConnection('donations')
}, [])
```

## 📦 Replace API Calls with Supabase

### Before (REST/Axios)

```javascript
// Old way
axios.get('/api/products')
axios.post('/api/orders', orderData)
```

### After (Supabase)

```javascript
import { supabase } from '../lib/supabase'

// Get all donations
const { data, error } = await supabase
  .from('donations')
  .select('*')

// Get filtered donations
const { data, error } = await supabase
  .from('donations')
  .select('*')
  .eq('status', 'pending')
  .order('created_at', { ascending: false })

// Insert donation
const { data, error } = await supabase
  .from('donations')
  .insert([donationData])
  .select()

// Update donation
const { data, error } = await supabase
  .from('donations')
  .update({ status: 'completed' })
  .eq('id', donationId)
  .select()

// Delete donation
const { error } = await supabase
  .from('donations')
  .delete()
  .eq('id', donationId)
```

## 🔒 Row Level Security (RLS)

### Enable RLS on Tables

```sql
-- Enable RLS on donations table
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
```

### Create Policies

```sql
-- Allow anyone to insert donations (for public donation form)
CREATE POLICY "Allow public inserts"
ON donations FOR INSERT
TO anon
WITH CHECK (true);

-- Allow users to view their own donations
CREATE POLICY "Users can view own donations"
ON donations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow admins to view all donations
CREATE POLICY "Admins can view all"
ON donations FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);
```

### Common Policy Patterns

```sql
-- Public read, authenticated write
CREATE POLICY "Public read"
ON donations FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated write"
ON donations FOR INSERT
TO authenticated
WITH CHECK (true);

-- User owns record
CREATE POLICY "User owns order"
ON orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
```

## ⚡ Real-Time Subscriptions

### Subscribe to Table Changes

```javascript
import { subscribeToTable } from '../utils/realtime'

useEffect(() => {
  const unsubscribe = subscribeToTable('donations', (payload) => {
    console.log('Change received!', payload)
    
    if (payload.eventType === 'INSERT') {
      // New donation added
      setDonations(prev => [payload.new, ...prev])
    } else if (payload.eventType === 'UPDATE') {
      // Donation updated
      setDonations(prev => 
        prev.map(d => d.id === payload.new.id ? payload.new : d)
      )
    } else if (payload.eventType === 'DELETE') {
      // Donation deleted
      setDonations(prev => 
        prev.filter(d => d.id !== payload.old.id)
      )
    }
  })
  
  return () => unsubscribe()
}, [])
```

### Subscribe to Specific Status

```javascript
import { subscribeToDonationStatus } from '../utils/realtime'

useEffect(() => {
  const unsubscribe = subscribeToDonationStatus('pending', (payload) => {
    // Only get notified about pending donations
    console.log('New pending donation:', payload.new)
  })
  
  return () => unsubscribe()
}, [])
```

## 🧠 Integration with Existing Architecture

### Recommended Approach

1. **Use Supabase for:**
   - ✅ Authentication
   - ✅ Database (PostgreSQL)
   - ✅ Real-time subscriptions
   - ✅ File storage (if needed)

2. **Keep Django/Backend for:**
   - Heavy business logic
   - Complex calculations
   - Third-party integrations
   - Scheduled tasks

3. **React + Supabase:**
   - Direct client-side queries
   - Real-time updates
   - Authentication state

### Example: Hybrid Approach

```javascript
// Use Supabase for data fetching
const { data: donations } = await supabase
  .from('donations')
  .select('*')

// Use backend API for complex operations
const response = await fetch('/api/generate-80g-certificate', {
  method: 'POST',
  body: JSON.stringify({ donationId }),
})
```

## ❌ Common Mistakes to Avoid

### 1. Using Service Role Key in Frontend

❌ **DON'T:**
```javascript
// NEVER use service role key in frontend!
const supabase = createClient(url, SERVICE_ROLE_KEY)
```

✅ **DO:**
```javascript
// Always use anon key in frontend
const supabase = createClient(url, ANON_KEY)
```

### 2. Forgetting to Enable RLS

❌ **DON'T:**
```sql
-- Table without RLS = security risk!
CREATE TABLE donations (...);
```

✅ **DO:**
```sql
CREATE TABLE donations (...);
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "..." ON donations ...;
```

### 3. Not Restarting Server After .env Changes

❌ **DON'T:**
```bash
# Changed .env but didn't restart
npm run dev  # Old env vars still loaded
```

✅ **DO:**
```bash
# Always restart after .env changes
# Stop server (Ctrl+C)
npm run dev  # Fresh start with new vars
```

### 4. Hardcoding Supabase Keys

❌ **DON'T:**
```javascript
const supabase = createClient(
  'https://xxxxx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
)
```

✅ **DO:**
```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 5. Not Handling Errors

❌ **DON'T:**
```javascript
const { data } = await supabase.from('donations').select('*')
// What if there's an error?
```

✅ **DO:**
```javascript
const { data, error } = await supabase.from('donations').select('*')

if (error) {
  console.error('Error:', error.message)
  // Handle error appropriately
  return
}

// Use data safely
```

## 📚 Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## 🎯 Quick Reference

### Auth Methods (from `src/utils/auth.js`)
- `login(email, password)`
- `signup(email, password, metadata)`
- `logout()`
- `getSession()`
- `getCurrentUser()`
- `resetPassword(email)`
- `updatePassword(newPassword)`

### Context Hook (from `src/contexts/SupabaseContext.jsx`)
- `useSupabase()` → `{ user, session, login, signup, logout, isAuthenticated, loading }`

### Database Helpers (from `src/utils/supabaseHelpers.js`)
- `saveDonation(donationData)`
- `getDonations(options)`
- `getDonationById(id)`
- `updateDonationStatus(id, status)`
- `getDonationsByEmail(email)`
- `getDonationStats()`

### Real-time (from `src/utils/realtime.js`)
- `subscribeToTable(tableName, callback, options)`
- `subscribeToDonations(callback)`
- `subscribeToDonationStatus(status, callback)`




