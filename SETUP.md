# VirtualFit - Virtual Try-On Web App Setup Guide

## Overview
VirtualFit is a cutting-edge web application that allows users to try on clothes, glasses, hats, jewelry, and watches in real-time using their webcam and augmented reality technology.

## Prerequisites
- Node.js 18+ and pnpm
- A Supabase account (free tier available at supabase.com)
- Vercel Blob storage enabled (integrated with Vercel)

## Installation Steps

### 1. Clone and Install Dependencies
```bash
git clone <repo-url>
cd virtualfit-try-on
pnpm install
```

### 2. Setup Supabase

1. Create a new Supabase project at https://supabase.com
2. In your Supabase project, go to **SQL Editor** and run the following:

```sql
-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('glasses', 'clothing', 'hats', 'jewelry', 'watches')),
  description TEXT,
  price DECIMAL(10, 2),
  image_url TEXT,
  model_url TEXT NOT NULL,
  color TEXT,
  brand TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create try_ons table
CREATE TABLE IF NOT EXISTS public.try_ons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  screenshot_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.try_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Products RLS policies (public read)
CREATE POLICY "products_select" ON public.products FOR SELECT USING (true);

-- Try-ons RLS policies
CREATE POLICY "try_ons_select_own" ON public.try_ons FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "try_ons_insert_own" ON public.try_ons FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "try_ons_delete_own" ON public.try_ons FOR DELETE USING (auth.uid() = user_id);

-- Favorites RLS policies
CREATE POLICY "favorites_select_own" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "favorites_insert_own" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "favorites_delete_own" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Profiles RLS policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);
```

3. Get your Supabase URL and Anon Key:
   - Go to **Settings** → **API**
   - Copy the Project URL and anon public key

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run Development Server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Features Implemented

### Authentication
- Email/password signup and login with Supabase Auth
- Protected routes for user dashboard
- Secure session management

### AR Try-On Experience
- Real-time face detection for glasses/hats
- Pose detection for clothing fit
- Hand detection for jewelry/watches
- TensorFlow.js + ML Kit for ML models
- Real-time video stream with AR overlay

### Product Management
- Browse 5+ product categories
- Search and filter by category, brand, price
- Product details with pricing
- Product images and descriptions

### User Features
- User dashboard with try-on history
- Save favorite products
- Capture screenshots of try-ons
- Share try-on results
- View past try-ons with product info

### Storage
- Vercel Blob for screenshot storage
- Supabase for user data and metadata
- Row Level Security (RLS) for data protection

## API Routes

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=glasses` - Get products by category

### Try-Ons
- `GET /api/try-ons` - Get user's try-on history
- `POST /api/try-ons` - Save a new try-on

### Favorites
- `GET /api/favorites` - Get user's favorite products
- `POST /api/favorites` - Add/remove favorites

## Technology Stack

### Frontend
- Next.js 16 with App Router
- React 19
- TypeScript
- TailwindCSS v4
- shadcn/ui components

### ML & AR
- TensorFlow.js
- ML Kit (Face Detection, Pose Estimation, Hand Pose)
- Canvas API for rendering

### Backend & Database
- Supabase (PostgreSQL + Auth)
- Row Level Security (RLS)
- Vercel Blob Storage

### Authentication
- Supabase Auth
- Email/Password auth
- Session-based with secure cookies

## Project Structure

```
app/
├── page.tsx                 # Home page
├── catalog/                 # Product catalog
├── try-on/[id]/            # AR try-on experience
├── dashboard/              # User dashboard
├── auth/                   # Authentication pages
│   ├── login/
│   ├── sign-up/
│   └── logout/
└── api/                    # API routes
    ├── products/
    ├── try-ons/
    └── favorites/

components/
├── try-on-studio.tsx       # Main AR experience component
├── product-catalog.tsx     # Product browsing
└── ui/                     # shadcn/ui components

lib/
├── ar-detection.ts         # AR detection logic
├── supabase/               # Supabase clients and utilities
│   ├── client.ts
│   ├── server.ts
│   └── proxy.ts

middleware.ts              # Auth middleware
```

## Browser Requirements
- Modern browser with WebGL support
- Webcam access permission
- WebRTC support for video streaming

## Performance Notes
- TensorFlow models are loaded on first AR experience use
- Models are cached in browser after initial load
- RLS policies ensure efficient database queries
- Image optimization through Next.js Image component

## Future Enhancements
- 3D model integration with Three.js
- Advanced styling options (colors, sizes)
- Social sharing to Instagram/TikTok
- Shopping cart integration
- Real product recommendations
- Mobile app version
- Video recording of try-ons

## Troubleshooting

### Models not loading
- Check browser console for errors
- Ensure webcam permissions are granted
- Verify internet connection for downloading models

### Database connection errors
- Verify Supabase credentials in `.env.local`
- Check Row Level Security policies
- Ensure user is authenticated for protected endpoints

### Storage issues
- Verify Vercel Blob integration is enabled
- Check screenshot blob size (keep under 5MB)
- Monitor Vercel Blob usage in dashboard

## License
MIT

## Support
For issues or questions, please open an issue on GitHub or contact support.
