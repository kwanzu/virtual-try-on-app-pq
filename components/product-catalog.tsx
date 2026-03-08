'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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

interface ProductCatalogProps {
  products: Product[];
  onAddToFavorite?: (productId: string) => void;
  favorites?: string[];
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'glasses', label: 'Glasses' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'hats', label: 'Hats' },
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'watches', label: 'Watches' },
];

export default function ProductCatalog({
  products,
  onAddToFavorite,
  favorites = [],
}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest'>('newest');

  const filteredAndSorted = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.color.toLowerCase().includes(query)
      );
    }

    // Sort
    const sorted = [...filtered];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Search by name, brand, or color..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full"
        />

        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
              size="sm"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="flex-1 px-3 py-2 border rounded-lg text-sm bg-background"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredAndSorted.length} product{filteredAndSorted.length !== 1 ? 's' : ''} found
      </div>

      {/* Product Grid */}
      {filteredAndSorted.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSorted.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="relative w-full aspect-square bg-muted">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No image
                  </div>
                )}

                {/* Category Badge */}
                <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded capitalize">
                  {product.category}
                </span>

                {/* Favorite Button */}
                <button
                  onClick={() => onAddToFavorite?.(product.id)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>
                  <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Color: {product.color}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">${product.price}</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                    In stock
                  </span>
                </div>

                {/* Try On Button */}
                <Button asChild size="sm" className="w-full">
                  <Link href={`/try-on/${product.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Try On
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
