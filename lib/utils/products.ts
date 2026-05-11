import { MOCK_PRODUCTS, ProductCategory } from '@/lib/constants/products';

export function filterProductsByCategory(category?: string | null): typeof MOCK_PRODUCTS {
  if (!category || category === 'all') {
    return MOCK_PRODUCTS;
  }
  return MOCK_PRODUCTS.filter(p => p.category === category);
}

export function searchProducts(query: string): typeof MOCK_PRODUCTS {
  const lowerQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter(
    p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.color.toLowerCase().includes(lowerQuery),
  );
}

export function getProductById(id: string): (typeof MOCK_PRODUCTS)[0] | undefined {
  return MOCK_PRODUCTS.find(p => p.id === id);
}

export function sortProducts(
  products: typeof MOCK_PRODUCTS,
  sortBy?: 'price-low' | 'price-high' | 'newest',
): typeof MOCK_PRODUCTS {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
    default:
      return sorted;
  }
}
