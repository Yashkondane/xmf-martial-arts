# XMF-EXTREME - Martial Arts & Fitness Website

A comprehensive full-stack web application for XMF-EXTREME Martial Arts Academy built with Next.js 14, TypeScript, and Supabase.

## Overview

XMF-EXTREME is a modern martial arts academy website featuring student authentication, personalized dashboards, AI-powered support, and an intuitive admin management system. The platform enables 44+ students to track their progress, view belt rankings, and access their personal information securely.

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - UI library with Server & Client Components
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Component library
- **Framer Motion** - Animation library
- **Next.js Image** - Optimized image loading

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication & authorization
  - Row Level Security (RLS)
  - Real-time subscriptions
- **Server Actions** - Next.js server-side operations
- **API Routes** - RESTful endpoints

### AI & Services
- **Google Gemini API** - AI chatbot support
- **Resend** - Email service for notifications

### DevOps
- **Vercel** - Deployment & hosting
- **Git** - Version control

## Key Features

### 1. Student Authentication & Dashboard System
- Secure login with pre-registered Gmail accounts
- Personalized dashboards at `/dashboard-[student-name]`
- Dynamic data fetching with Row Level Security
- Individual progress tracking and belt rankings
- Guardian and emergency contact information display

### 2. Optimized Image Slider
- Hero section with interactive image carousel
- Aggressive preloading for smooth transitions
- Manual navigation with arrow controls and dot indicators
- Loading states with visual feedback
- Error handling with fallback placeholders

### 3. AI-Powered Student Support Chatbot
- Bottom-left corner chat widget
- Context-aware responses using Google Gemini API
- Real-time answers about programs, schedules, and locations
- Streaming responses for better UX

### 4. Database Architecture & Admin Tools
- 44+ pre-seeded student records
- Row Level Security policies for data privacy
- Bulk account creation tools
- Admin dashboard for user management
- Automatic profile creation on signup

## Project Structure

```
xmf-website/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── reset-password/
│   │   └── update-password/
│   ├── admin/
│   │   ├── page.tsx
│   │   └── create-students/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── dashboard-[studentName]/
│   │   └── page.tsx
│   ├── student-login/
│   │   └── page.tsx
│   ├── student-signup/
│   │   └── page.tsx
│   ├── api/
│   │   ├── admin/
│   │   ├── contact/
│   │   └── gemini-chat/
│   ├── layout.tsx
│   ├── ClientLayout.tsx
│   ├── globals.css
│   └── page.tsx
├── components/
│   ├── ui/                  # Shadcn components
│   ├── chat-widget.tsx      # AI chatbot
│   ├── image-slider.tsx     # Hero image slider
│   ├── instructor-carousel.tsx
│   ├── gallery-section.tsx
│   └── ...
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Client-side Supabase
│   │   └── server.ts        # Server-side Supabase
│   ├── supabase.ts
│   ├── resend.ts
│   └── utils.ts
├── scripts/
│   ├── 003_create_students_table.sql
│   └── 004_seed_student_data.sql
├── public/
│   ├── images/
│   └── ...
└── styles/
    └── transitions.css
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Cloud account (for Gemini API)
- Resend account (for emails)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd xmf-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key

# Resend Email
RESEND_API_KEY=your_resend_api_key

# Vercel (optional for local development)
VERCEL_PROTECTION_BYPASS=your_bypass_key
```

4. **Set up Supabase database**

Go to your Supabase SQL Editor and run the scripts in order:

```bash
# First, create the students table
scripts/003_create_students_table.sql

# Then, seed the student data
scripts/004_seed_student_data.sql
```

5. **Create student auth accounts**

Navigate to `/admin/create-students` and click "Create All Student Accounts" to bulk-create authentication accounts for all students.

6. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Students Table

```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  dob DATE,
  gender TEXT,
  contact TEXT,
  address TEXT,
  guardian_name TEXT,
  guardian_contact TEXT,
  emergency_contact TEXT,
  emergency_name TEXT,
  current_belt TEXT,
  belt_progress INTEGER DEFAULT 0,
  date_of_joining DATE,
  branch TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Profiles Table (from auth)

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Deployment

### Deploy to Vercel

1. **Push code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Add all environment variables
- Deploy

3. **Configure custom domain**
- Add your domain (e.g., www.xmf.co.in) in Vercel project settings
- Update DNS records as instructed
- Update `NEXT_PUBLIC_SITE_URL` to your production domain

4. **Update Supabase settings**
- Go to Supabase Dashboard → Authentication → URL Configuration
- Add your production URL to "Site URL"
- Add callback URLs to "Redirect URLs":
  - `https://www.xmf.co.in/update-password`
  - `https://www.xmf.co.in/auth/callback`

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Key Routes

### Public Routes
- `/` - Home page
- `/about` - About XMF
- `/programs` - Programs overview
- `/gallery` - Photo gallery
- `/locations` - Branch locations
- `/contact` - Contact form

### Authentication Routes
- `/signin` - User sign in
- `/signup` - User registration
- `/reset-password` - Password reset request
- `/update-password` - Set new password
- `/student-login` - Student login portal
- `/student-signup` - Student registration form

### Protected Routes
- `/dashboard` - Main dashboard portal
- `/dashboard-[studentName]` - Personalized student dashboard
- `/admin` - Admin dashboard
- `/admin/create-students` - Bulk student account creation

### API Routes
- `/api/contact` - Contact form submission
- `/api/gemini-chat` - AI chatbot endpoint
- `/api/admin/create-student-accounts` - Bulk account creation

## Security Features

- Row Level Security (RLS) policies on all database tables
- Secure authentication with Supabase Auth
- Password hashing with bcrypt
- Server-side validation for all forms
- Protected API routes with authentication checks
- CORS configuration for production domain
- Environment variable validation

## Performance Optimizations

- Image optimization with Next.js Image component
- Aggressive preloading for critical images
- Server Components for faster initial load
- Client Components only where interactivity is needed
- CSS optimization with Tailwind JIT compiler
- Code splitting and lazy loading
- Font optimization with next/font

## Environment-Specific Configuration

### Development
- Uses `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- Hot module reloading enabled
- Development mode for Next.js

### Production
- Uses production domain in `NEXT_PUBLIC_SITE_URL`
- Optimized builds with minification
- Image optimization enabled
- Production-ready error handling

## Troubleshooting

### Images not loading in production
- Check that `next.config.mjs` includes your domain in `images.remotePatterns`
- Verify images exist in `public/images/` directory
- Clear Vercel cache and redeploy

### Database connection issues
- Verify all Supabase environment variables are set correctly
- Check RLS policies are properly configured
- Ensure service role key is used for admin operations

### Authentication errors
- Verify redirect URLs are configured in Supabase
- Check that `NEXT_PUBLIC_SITE_URL` matches your domain
- Ensure cookies are enabled in browser

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Contact

XMF-EXTREME Martial Arts Academy
- Website: [www.xmf.co.in](https://www.xmf.co.in)
- Email: info@xmf.co.in

---

Built with ❤️ by the XMF Development Team
