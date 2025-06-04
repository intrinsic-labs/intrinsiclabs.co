# Google OAuth with Supabase - Complete Setup Guide

This guide will walk you through setting up Google OAuth authentication with Supabase for your Next.js application.

## 📋 Prerequisites

- A Supabase project (create one at [supabase.com](https://supabase.com))
- A Google Cloud Platform account
- Your Next.js application with the required packages installed

## 🔧 Step 1: Environment Variables

Create a `.env.local` file in your project root and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase dashboard under **Project Settings > API**.

## 🌐 Step 2: Google Cloud Console Setup

### Create OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services > OAuth consent screen**
4. Configure your OAuth consent screen:
   - Application name: Your app name
   - User support email: Your email
   - Authorized domains: Add your domain (for production)
5. Go to **APIs & Services > Credentials**
6. Click **Create Credentials > OAuth client ID**
7. Choose **Web application**
8. Configure the OAuth client:

   **For Development:**
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth/callback`

   **For Production:**
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com/auth/callback`

8. Save your **Client ID** and **Client Secret**

## 🗄️ Step 3: Supabase Configuration

### Enable Google OAuth Provider

1. Go to your Supabase dashboard
2. Navigate to **Authentication > Providers**
3. Enable **Google** provider
4. Enter your Google **Client ID** and **Client Secret**
5. Save the configuration

### Configure Redirect URLs

1. Go to **Authentication > URL Configuration**
2. Add these redirect URLs:
   - For development: `http://localhost:3000/**`
   - For production: `https://yourdomain.com/**`
3. Set your **Site URL** to your primary domain (e.g., `https://yourdomain.com`)

## 🗃️ Step 4: Database Setup

Run the SQL commands from `supabase-setup.sql` in your Supabase SQL Editor:

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the SQL from `supabase-setup.sql`
3. Run the script to create:
   - User profiles table
   - Row Level Security policies
   - Automatic profile creation triggers
   - Optional client documents table

## 🎨 Step 5: Add Client Access to Your Site

Add the `ClientAccessButton` component to your main site where you want clients to access the portal:

```tsx
import ClientAccessButton from '@/components/ClientAccessButton'

export default function YourPage() {
  return (
    <div>
      {/* Your existing content */}
      <ClientAccessButton />
    </div>
  )
}
```

## 🧪 Step 6: Testing the Setup

### Local Development

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/auth/signin`
3. Click "Continue with Google"
4. Complete the OAuth flow
5. You should be redirected to `/client` dashboard

### Testing Protected Routes

- Try accessing `/client` without being logged in - you should be redirected to sign-in
- After signing in, you should have access to:
  - `/client` - Main dashboard
  - `/client/documents` - Documents page
  - Other protected routes you create

## 🔒 Security Features

✅ **Middleware Protection**: Routes starting with `/client` are automatically protected
✅ **Server-Side Validation**: All protected pages validate authentication server-side
✅ **Row Level Security**: Database access is restricted to authenticated users
✅ **Secure Session Management**: Sessions are handled securely with HTTP-only cookies

## 📱 Available Routes

- `/` - Public home page
- `/auth/signin` - Sign-in page
- `/auth/callback` - OAuth callback handler
- `/auth/auth-code-error` - Error page for failed authentication
- `/client` - Protected client dashboard
- `/client/documents` - Protected documents page
- `/client/files` - Protected files page (you can create this)
- `/client/support` - Protected support page (you can create this)

## 🚀 Deployment Checklist

Before deploying to production:

1. **Update Environment Variables**
   - Add your Supabase credentials to your hosting platform
   - Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set

2. **Update Google Cloud Console**
   - Add your production domain to Authorized JavaScript origins
   - Add your production callback URL to Authorized redirect URIs

3. **Update Supabase Settings**
   - Add your production domain to Redirect URLs in Supabase
   - Update the Site URL to your production domain

4. **Test Production Authentication**
   - Verify Google OAuth works in production
   - Test all protected routes
   - Ensure users can sign out properly

## 🛠️ Customization Options

### Adding More OAuth Providers

You can easily add more providers (GitHub, Twitter, etc.) by:
1. Enabling them in Supabase dashboard
2. Updating the sign-in page to include more provider buttons

### Custom User Profiles

Extend the `profiles` table with additional fields:
```sql
ALTER TABLE public.profiles 
ADD COLUMN company TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN preferences JSONB;
```

### Document Management

Use the `client_documents` table to:
- Store file metadata
- Control access to specific documents per user
- Track download history

## 🐛 Troubleshooting

### Common Issues

1. **Redirect URI Mismatch**
   - Ensure Google Cloud Console URLs match your callback URL exactly
   - Check both development and production URLs

2. **Environment Variables**
   - Verify all environment variables are set correctly
   - Restart your development server after changing `.env.local`

3. **Supabase Configuration**
   - Ensure Google provider is enabled in Supabase
   - Check that redirect URLs include wildcards (`/**`)

4. **Database Permissions**
   - Verify RLS policies are created correctly
   - Check that the trigger function exists

### Debug Mode

Enable debug logging by adding to your environment:
```env
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Review the Supabase logs in your dashboard
3. Verify all configuration steps were completed
4. Test with a fresh browser session (incognito mode)

---

Your Google OAuth authentication with Supabase is now fully configured! 🎉

Clients can now securely access their project resources through the `/auth/signin` portal. 