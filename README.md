# XMF - Extreme Martial Arts and Fitness Website

A modern, responsive website for XMF martial arts academy built with Next.js 14, TypeScript, Supabase, and Resend.

## 🚀 Quick Start

### 1. Clone/Download the Project
Download the project files and extract them to your desired location.

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Resend Configuration (for email functionality)
RESEND_API_KEY=your_resend_api_key_here

# Optional: Vercel Protection Bypass
VERCEL_PROTECTION_BYPASS=your_bypass_token_here
\`\`\`

### 4. Set Up Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and keys from Settings > API
3. Run these SQL commands in your Supabase SQL Editor:

\`\`\`sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  program TEXT NOT NULL DEFAULT 'taekwondo',
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  program TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert profiles" ON profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for events
CREATE POLICY "Everyone can view events" ON events
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email, program)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'program', 'taekwondo')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
\`\`\`

### 5. Set Up Resend (Email Service)
1. Go to [resend.com](https://resend.com) and create an account
2. Create an API key in your dashboard
3. Add the API key to your `.env.local` file
4. (Optional) Verify your domain for production use

### 6. Create Admin User (Optional)
After creating your first user account, run this SQL to make them an admin:

\`\`\`sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
\`\`\`

### 7. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see your website!

## 📧 Email Features

The website includes email functionality powered by Resend:

- **Welcome Emails**: Automatically sent to new users
- **Contact Form**: Sends inquiries to your business email
- **Custom Templates**: Professional HTML email templates
- **Error Handling**: Graceful fallbacks when email service is unavailable

### Email Configuration

1. **Domain Verification** (Production):
   - Add your domain to Resend
   - Verify DNS records
   - Update the `from` addresses in `lib/resend.ts`

2. **Contact Email**:
   - Update the recipient email in `sendContactEmail` function
   - Replace `info@xmf.co.in` with your actual contact email

## 📁 Project Structure

\`\`\`
xmf-website/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── about/             # About page
│   ├── dashboard/         # User dashboard
│   └── ...               # Other pages
├── components/             # Reusable React components
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase configuration
│   └── resend.ts         # Email service configuration
├── public/                # Static assets
└── ...config files
\`\`\`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Features

- ✅ Modern responsive design
- ✅ User authentication & registration
- ✅ Admin dashboard
- ✅ Email notifications (Resend)
- ✅ Contact form with email delivery
- ✅ Class scheduling system
- ✅ Image galleries
- ✅ SEO optimized
- ✅ Performance optimized

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Email Service:** Resend
- **Animations:** Framer Motion
- **UI Components:** Radix UI

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | Yes |
| `RESEND_API_KEY` | Your Resend API key | Yes |
| `VERCEL_PROTECTION_BYPASS` | Vercel bypass token | No |

## 📞 Support

If you encounter any issues, check that:
1. All environment variables are correctly set
2. Supabase project is properly configured
3. Resend API key is valid
4. Database tables are created
5. Dependencies are installed

## NOTE :- This code is 1 version down 
