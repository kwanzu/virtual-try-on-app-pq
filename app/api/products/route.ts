import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// Mock products data for initial testing
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Classic Aviator',
    category: 'glasses',
    price: 129.99,
    image_url: '/products/aviator.jpg',
    model_url: '/models/glasses/aviator.glb',
    brand: 'VirtualShades',
    color: 'Gold',
  },
  {
    id: '2',
    name: 'Casual Cotton T-Shirt',
    category: 'clothing',
    price: 39.99,
    image_url: '/products/tshirt.jpg',
    model_url: '/models/clothing/tshirt.glb',
    brand: 'VirtualWear',
    color: 'Navy',
  },
  {
    id: '3',
    name: 'Classic Beanie',
    category: 'hats',
    price: 49.99,
    image_url: '/products/beanie.jpg',
    model_url: '/models/hats/beanie.glb',
    brand: 'VirtualHats',
    color: 'Black',
  },
  {
    id: '4',
    name: 'Gold Ring',
    category: 'jewelry',
    price: 299.99,
    image_url: '/products/ring.jpg',
    model_url: '/models/jewelry/ring.glb',
    brand: 'VirtualJewels',
    color: 'Gold',
  },
  {
    id: '5',
    name: 'Digital Watch',
    category: 'watches',
    price: 199.99,
    image_url: '/products/watch.jpg',
    model_url: '/models/watches/watch.glb',
    brand: 'VirtualTime',
    color: 'Silver',
  },
];

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabase.from('products').select('*');

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    // If table doesn't exist, return mock data
    if (error && error.message.includes('relation "public.products" does not exist')) {
      console.log('[v0] Products table not found, returning mock data');
      let mockData = MOCK_PRODUCTS;
      if (category && category !== 'all') {
        mockData = mockData.filter(p => p.category === category);
      }
      return NextResponse.json(mockData);
    }

    if (error) {
      console.error('[v0] Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('[v0] API error:', error);
    // Return mock data on error
    let mockData = MOCK_PRODUCTS;
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    if (category && category !== 'all') {
      mockData = mockData.filter(p => p.category === category);
    }
    return NextResponse.json(mockData);
  }
}
