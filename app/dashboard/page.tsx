'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, LogOut, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TryOn {
  id: string;
  screenshot_url: string;
  created_at: string;
  products: {
    id: string;
    name: string;
    category: string;
    price: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [tryOns, setTryOns] = useState<TryOn[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push('/auth/login');
          return;
        }

        setUser(user);

        // Fetch try-ons
        const res = await fetch('/api/try-ons');
        if (!res.ok) throw new Error('Failed to load try-ons');
        const data = await res.json();
        setTryOns(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load data';
        setError(message);
        console.error('[v0] Error loading dashboard:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/');
    } catch (err) {
      console.error('[v0] Logout error:', err);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Your Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome, {user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/catalog">Shop More</Link>
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {error ? (
          <Card className="p-6 bg-destructive/10 border-destructive">
            <p className="text-destructive font-semibold">{error}</p>
          </Card>
        ) : tryOns.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">You haven't captured any try-ons yet.</p>
            <Button asChild>
              <Link href="/catalog">Start Shopping</Link>
            </Button>
          </Card>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-6">Your Try-On History</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tryOns.map(tryOn => (
                <Card key={tryOn.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {tryOn.screenshot_url && (
                    <div className="relative w-full aspect-video bg-muted">
                      <Image
                        src={tryOn.screenshot_url}
                        alt={tryOn.products?.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="font-semibold">{tryOn.products?.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {tryOn.products?.category}
                    </p>
                    <p className="text-sm font-semibold mt-2">${tryOn.products?.price}</p>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Share
                      </Button>
                    </div>
                  </div>

                  <div className="px-4 pb-4 text-xs text-muted-foreground">
                    {new Date(tryOn.created_at).toLocaleDateString()}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
