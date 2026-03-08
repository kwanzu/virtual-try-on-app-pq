import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('screenshot') as File;
    const productId = formData.get('productId') as string;

    if (!file || !productId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upload screenshot to Vercel Blob
    const blobResponse = await put(`try-ons/${user.id}/${Date.now()}-${file.name}`, file, {
      access: 'private',
    });

    // Save try-on record to database
    const { data, error } = await supabase.from('try_ons').insert([
      {
        user_id: user.id,
        product_id: productId,
        screenshot_url: blobResponse.url,
      },
    ]);

    if (error) {
      console.error('[v0] Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
      .from('try_ons')
      .select('*, products(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[v0] Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
