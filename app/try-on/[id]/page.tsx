'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TryOnStudio from '@/components/try-on-studio';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  model_url: string;
  brand: string;
  color: string;
  description: string;
}

export default function TryOnPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`/api/products?id=${productId}`);
        if (!res.ok) throw new Error('Failed to load product');

        const products = await res.json();
        const found = products.find((p: Product) => p.id === productId);

        if (!found) {
          throw new Error('Product not found');
        }

        setProduct(found);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load product';
        setError(message);
        console.error('[v0] Error loading product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleCapture = async (screenshot: Blob) => {
    try {
      const formData = new FormData();
      formData.append('screenshot', screenshot);
      formData.append('productId', productId);

      const res = await fetch('/api/try-ons', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/auth/login';
          return;
        }
        throw new Error('Failed to save try-on');
      }

      // Show success message
      alert('Try-on captured and saved to your dashboard!');
    } catch (err) {
      console.error('[v0] Error saving try-on:', err);
      alert('Failed to save try-on. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading try-on experience...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="p-6 max-w-md w-full bg-destructive/10 border-destructive">
          <p className="text-destructive font-semibold">{error || 'Product not found'}</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TryOnStudio product={product} onCapture={handleCapture} />
      </div>
    </main>
  );
}
