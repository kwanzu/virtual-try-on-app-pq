'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import ProductCatalog from '@/components/product-catalog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  model_url: string;
  brand: string;
  color: string;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch products
        const productsRes = await fetch('/api/products');
        if (!productsRes.ok) throw new Error('Failed to load products');
        const productsData = await productsRes.json();
        setProducts(productsData);

        // Fetch user favorites
        try {
          const favoritesRes = await fetch('/api/favorites');
          if (favoritesRes.ok) {
            const favoritesData = await favoritesRes.json();
            setFavorites(favoritesData.favorites || []);
          }
        } catch {
          // User not logged in, that's okay
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load data';
        setError(message);
        console.error('[v0] Error loading catalog:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddToFavorite = async (productId: string) => {
    try {
      const action = favorites.includes(productId) ? 'remove' : 'add';
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, action }),
      });

      if (!res.ok) {
        // Might be unauthorized, redirect to login
        if (res.status === 401) {
          window.location.href = '/auth/login';
          return;
        }
        throw new Error('Failed to update favorites');
      }

      // Update local state
      if (action === 'add') {
        setFavorites([...favorites, productId]);
      } else {
        setFavorites(favorites.filter(id => id !== productId));
      }
    } catch (err) {
      console.error('[v0] Error updating favorites:', err);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Shop Our Collection</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Browse and try on thousands of items in AR
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6">
            <p className="text-destructive font-semibold">{error}</p>
          </div>
        ) : (
          <ProductCatalog
            products={products}
            onAddToFavorite={handleAddToFavorite}
            favorites={favorites}
          />
        )}
      </div>
    </main>
  );
}
