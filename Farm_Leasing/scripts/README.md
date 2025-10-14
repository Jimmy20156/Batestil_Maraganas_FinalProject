# Supabase Database Setup

This directory contains SQL scripts to set up the Farm Equipment Leasing Platform database in Supabase.

## Setup Instructions

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be provisioned

### 2. Run SQL Scripts in Order

Execute the scripts in the Supabase SQL Editor in this order:

1. **01-create-tables.sql** - Creates all database tables and indexes
2. **02-row-level-security.sql** - Sets up Row Level Security policies
3. **03-functions-triggers.sql** - Creates database functions and triggers
4. **04-seed-data.sql** - (Optional) Adds sample data for testing
5. **05-storage-setup.sql** - Sets up storage bucket for equipment images

### 3. Configure Authentication

In your Supabase project dashboard:

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional)
4. Set up redirect URLs for your application

### 4. Get Your Environment Variables

From your Supabase project settings:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

Add these to your Vercel project or local `.env.local` file.

### 5. Update Application Code

Replace the mock data implementation with Supabase client calls:

- Update `lib/auth-context.tsx` to use Supabase Auth
- Replace mock data in `lib/mock-data.ts` with Supabase queries
- Implement real-time subscriptions for notifications

## Database Schema Overview

### Tables

- **profiles** - User profiles with role-based access (farmer, owner, admin)
- **equipment** - Farm equipment listings
- **bookings** - Equipment rental bookings
- **transactions** - Payment transactions
- **notifications** - User notifications
- **reviews** - Equipment reviews and ratings

### Security

All tables have Row Level Security (RLS) enabled with policies that:
- Allow users to view their own data
- Restrict modifications based on user roles
- Protect sensitive information
- Enable admins to manage all data

### Triggers

Automatic triggers handle:
- Updating timestamps on record changes
- Creating notifications for new bookings
- Updating equipment status based on bookings
- Notifying users of booking status changes

## Testing

After setup, test the following:

1. User registration and login
2. Creating equipment listings (as owner)
3. Browsing and booking equipment (as farmer)
4. Receiving notifications
5. Admin dashboard access

## Troubleshooting

- **RLS errors**: Ensure you're authenticated and have the correct role
- **Foreign key errors**: Check that referenced records exist
- **Permission errors**: Verify RLS policies are correctly applied
