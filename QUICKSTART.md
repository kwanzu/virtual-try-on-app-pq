# VirtualFit - Quick Start Guide

## What is VirtualFit?
VirtualFit is a state-of-the-art virtual try-on web application that uses augmented reality (AR) and machine learning to let you try clothes, glasses, hats, jewelry, and watches **before you buy them**. Using just your webcam, the app overlays products on you in real-time using TensorFlow.js and face/pose/hand detection.

## 5-Minute Setup

### Step 1: Get Your Supabase Credentials (2 mins)
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon public` (your public key)

### Step 2: Create `.env.local` (1 min)
In the root directory, create a file named `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<your_project_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
```

### Step 3: Setup Database (1 min)
1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Paste the SQL from `scripts/001_create_schema.sql`
4. Click **Execute**

### Step 4: Run the App (1 min)
```bash
pnpm install
pnpm dev
```
Open http://localhost:3000

## How to Use

### For Shoppers
1. **Browse Products** - Go to Shop, filter by category (Glasses, Clothing, Hats, Jewelry, Watches)
2. **Try On** - Click "Try On" on any product
3. **Capture** - Allow camera access, position yourself, click "Capture" for a screenshot
4. **Save & Share** - Save to dashboard, share with friends

### For Developers
The app is built with modern tech:
- **Frontend**: Next.js 15, React 19, TypeScript
- **AR/ML**: TensorFlow.js + ML Kit (face, pose, hand detection)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Storage**: Vercel Blob

## File Structure

```
VirtualFit/
├── app/
│   ├── page.tsx                 # Home page
│   ├── catalog/page.tsx         # Product browsing
│   ├── try-on/[id]/page.tsx     # AR experience
│   ├── dashboard/page.tsx       # User dashboard
│   ├── auth/                    # Login/signup
│   └── api/                     # Backend endpoints
├── components/
│   ├── try-on-studio.tsx        # Main AR component
│   ├── product-catalog.tsx      # Product grid
│   ├── share-dialog.tsx         # Share feature
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── ar-detection.ts          # ML detection logic
│   └── supabase/                # Auth & DB clients
└── scripts/
    ├── 001_create_schema.sql    # Database setup
    └── 002_seed_products.sql    # Sample data
```

## Key Features

### 1. Real-Time AR Detection
- **Face Detection** - For glasses and hats
- **Pose Detection** - For clothing fit
- **Hand Detection** - For jewelry and watches
- Uses TensorFlow.js + MediaPipe for 60+ FPS performance

### 2. Product Management
- 5+ product categories
- Real-time search and filtering
- Price sorting
- Detailed product information

### 3. User Features
- Email/password authentication
- Save favorite products
- View try-on history
- Capture and save screenshots
- Share results on social media

### 4. Backend Integration
- Secure authentication with Supabase Auth
- PostgreSQL database with Row Level Security
- Vercel Blob for screenshot storage
- RESTful API endpoints

## API Routes

### Products API
```
GET /api/products              # Get all products
GET /api/products?category=    # Filter by category
```

### Try-Ons API
```
GET /api/try-ons              # Get user's history
POST /api/try-ons             # Save new try-on (requires auth)
```

### Favorites API
```
GET /api/favorites            # Get user's favorites
POST /api/favorites           # Add/remove favorite (requires auth)
```

## Component Architecture

### TryOnStudio
Main AR component that:
- Manages webcam stream
- Loads ML models
- Detects facial features/pose
- Renders product overlays
- Handles screenshot capture

### ProductCatalog
Browsing component with:
- Category filtering
- Search functionality
- Price sorting
- Favorite management

### ShareDialog
Social sharing component:
- Copy share link
- Twitter/Facebook sharing
- Email integration
- WhatsApp sharing

## Database Schema

### Products Table
```sql
id (UUID)              -- Unique identifier
name (TEXT)            -- Product name
category (TEXT)        -- Category type
price (DECIMAL)        -- Product price
image_url (TEXT)       -- Product image
model_url (TEXT)       -- 3D model URL
brand (TEXT)           -- Brand name
color (TEXT)           -- Color option
```

### Try-Ons Table
```sql
id (UUID)              -- Unique identifier
user_id (UUID)         -- References auth.users
product_id (UUID)      -- References products
screenshot_url (TEXT)  -- Blob storage URL
created_at (TIMESTAMP) -- Creation time
```

### Favorites Table
```sql
id (UUID)              -- Unique identifier
user_id (UUID)         -- References auth.users
product_id (UUID)      -- References products
```

## Extending VirtualFit

### Adding New Product Categories
1. Update category enum in database
2. Add category detection logic in `ar-detection.ts`
3. Add category filtering in product catalog

### Integrating E-Commerce
1. Add cart functionality to try-on page
2. Connect to Stripe/payment processor
3. Add checkout flow
4. Implement order management

### Implementing 3D Models
1. Add Three.js for 3D rendering
2. Create 3D product models
3. Replace canvas overlays with 3D meshes
4. Add lighting and shadows

### Mobile Optimization
1. Use responsive TailwindCSS classes
2. Optimize image sizes for mobile
3. Test on various devices
4. Add mobile-specific UX improvements

## Troubleshooting

### Models Not Loading
- **Issue**: "Loading AR models..." appears indefinitely
- **Solution**: Check browser console, verify internet connection, clear browser cache

### Camera Permission Denied
- **Issue**: Camera not accessible
- **Solution**: Check browser settings, ensure https (or localhost), grant camera permission

### Supabase Connection Error
- **Issue**: Can't connect to database
- **Solution**: Verify `.env.local` credentials, check Supabase project status

### Authentication Issues
- **Issue**: Can't login/signup
- **Solution**: Verify email is valid, check Supabase auth settings, clear cookies

## Performance Tips

1. **Lazy Load Models** - Models load only when AR experience starts
2. **Canvas Optimization** - Use requestAnimationFrame for smooth 60 FPS
3. **Image Optimization** - Next.js Image component for automatic optimization
4. **Database Queries** - RLS policies ensure efficient data access

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | Full |
| Firefox | 88+ | Full |
| Safari | 14.1+ | Full |
| Edge | 90+ | Full |
| Mobile (iOS Safari) | 14.5+ | Partial* |
| Mobile (Android Chrome) | 90+ | Full |

*Mobile Safari has limited WebRTC support

## Next Steps

1. Deploy to Vercel: `vercel deploy`
2. Set environment variables in Vercel dashboard
3. Create Supabase connection in production
4. Seed database with real products
5. Test on mobile devices
6. Gather user feedback
7. Implement additional features

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **TensorFlow.js**: https://www.tensorflow.org/js
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs

## License
MIT - Feel free to use and modify for your projects!

Happy trying on! 🎉
