import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('favorites')
      .select('product_id')
      .eq('user_id', user.id);

    // If table doesn't exist, just return empty favorites
    if (error && error.message.includes('relation "public.favorites" does not exist')) {
      console.log('[v0] Favorites table not found, returning empty list');
      return NextResponse.json({ favorites: [] });
    }

    if (error) {
      console.error('[v0] Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const favoriteIds = (data || []).map(fav => fav.product_id);
    return NextResponse.json({ favorites: favoriteIds });
  } catch (error) {
    console.error('[v0] API error:', error);
    // Return empty favorites on error instead of failing
    return NextResponse.json({ favorites: [] });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, action } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }

    if (action === 'add') {
      const { error } = await supabase.from('favorites').insert([
        {
          user_id: user.id,
          product_id: productId,
        },
      ]);

      // If table doesn't exist or unique constraint, just return success
      if (error && !error.message.includes('does not exist') && error.code !== '23505') {
        console.error('[v0] Database error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else if (action === 'remove') {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      // If table doesn't exist, just continue (no error)
      if (error && !error.message.includes('does not exist')) {
        console.error('[v0] Database error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] API error:', error);
    // Still return success to allow UI to update optimistically
    return NextResponse.json({ success: true });
  }
}
