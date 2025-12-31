# Supabase Integration Setup Guide

This guide will help you set up Supabase for your Welled Foundation website.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Your React project set up

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Welled Foundation (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be set up (takes 1-2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. **Important**: Make sure `.env` is in your `.gitignore` file (it should be by default)

## Step 4: Create the Donations Table

1. In your Supabase dashboard, go to **Table Editor**
2. Click **"New Table"**
3. Name it `donations`
4. Add the following columns:

| Column Name | Type | Default Value | Nullable | Description |
|------------|------|---------------|----------|-------------|
| id | uuid | gen_random_uuid() | No | Primary key |
| donation_type | text | - | No | Type of donation (general, honor, memory, etc.) |
| amount | numeric | - | No | Donation amount |
| title | text | - | No | Title (Mr, Mrs, Ms, M/S) |
| name | text | - | No | Donor name |
| email | text | - | No | Donor email |
| dob | date | - | Yes | Date of birth |
| mobile | text | - | No | Mobile number |
| whatsapp | boolean | false | No | WhatsApp consent |
| alternate_mobile | text | - | Yes | Alternate mobile |
| pan | text | - | Yes | PAN number |
| address | text | - | No | Address |
| pincode | text | - | No | Pincode |
| city | text | - | No | City |
| state | text | - | No | State |
| province | text | - | Yes | Province |
| preference_state | text | - | Yes | Preferred state for donation |
| want_80g | boolean | true | No | Want 80G certificate |
| honor_name | text | - | Yes | Honor donation name |
| honor_occasion | text | - | Yes | Honor occasion |
| honor_date | date | - | Yes | Honor date |
| memory_name | text | - | Yes | Memory donation name |
| occasion_type | text | - | Yes | Occasion type |
| occasion_date | date | - | Yes | Occasion date |
| company_name | text | - | Yes | Company name (SME) |
| company_type | text | - | Yes | Company type (SME) |
| gstin | text | - | Yes | GSTIN (SME) |
| school_name | text | - | Yes | School name |
| school_location | text | - | Yes | School location |
| donor_type | text | 'indian' | No | Donor type (indian/foreign) |
| status | text | 'pending' | No | Donation status |
| created_at | timestamptz | now() | No | Creation timestamp |
| updated_at | timestamptz | now() | No | Update timestamp |

5. Click **"Save"**

### Optional: Add Row Level Security (RLS)

For better security, you can enable Row Level Security:

1. Go to **Authentication** → **Policies**
2. Click on the `donations` table
3. Create a policy to allow inserts:
   - **Policy Name**: Allow public inserts
   - **Allowed Operation**: INSERT
   - **Target Roles**: anon
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`

**Note**: For production, you should restrict this further based on your needs.

## Step 5: Test the Integration

1. Make sure your `.env` file is set up correctly
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Navigate to the Donate page
4. Fill out the donation form
5. Submit the form
6. Check your Supabase dashboard → **Table Editor** → `donations` table to see if the data was saved

## Step 6: View Your Data

You can view donations in several ways:

1. **Supabase Dashboard**: Go to **Table Editor** → `donations`
2. **SQL Editor**: Write queries to filter and analyze donations
3. **API**: Use Supabase client in your code to fetch donations

### Example: Fetch Donations

```javascript
import { supabase } from './lib/supabase'

// Get all donations
const { data, error } = await supabase
  .from('donations')
  .select('*')
  .order('created_at', { ascending: false })

// Get donations by status
const { data, error } = await supabase
  .from('donations')
  .select('*')
  .eq('status', 'pending')
```

## Additional Features You Can Add

### 1. Email Notifications

Use Supabase Edge Functions or a service like Resend to send email notifications when donations are received.

### 2. Payment Gateway Integration

Integrate Razorpay, Stripe, or PayU to process payments and update donation status.

### 3. 80G Certificate Generation

Create a function to generate 80G certificates and store them in Supabase Storage.

### 4. Donor Dashboard

Create a page where donors can view their donation history.

### 5. Admin Dashboard

Create an admin panel to manage donations, update statuses, and generate reports.

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env` file exists in the root directory
- Check that variable names start with `VITE_`
- Restart your development server after adding environment variables

### Error: "relation 'donations' does not exist"
- Make sure you've created the `donations` table in Supabase
- Check that the table name matches exactly (case-sensitive)

### Error: "new row violates row-level security policy"
- Check your RLS policies in Supabase
- Make sure you have an INSERT policy for the `anon` role

### Data not saving
- Check the browser console for errors
- Verify your Supabase URL and API key are correct
- Check the Supabase dashboard logs for errors

## Security Best Practices

1. **Never commit `.env` file** to version control
2. **Use RLS policies** to restrict data access
3. **Validate data** on both client and server side
4. **Use environment-specific keys** (development vs production)
5. **Regularly rotate API keys** in production

## Next Steps

- Set up payment gateway integration
- Create admin dashboard
- Implement email notifications
- Set up automated backups
- Configure monitoring and alerts

## Support

For Supabase-specific issues, check:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Supabase GitHub](https://github.com/supabase/supabase)

For project-specific issues, refer to your project documentation or contact your development team.




