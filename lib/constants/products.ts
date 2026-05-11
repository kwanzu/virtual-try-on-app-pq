export const PRODUCT_CATEGORIES = [
  'glasses',
  'clothing',
  'hats',
  'jewelry',
  'watches',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  glasses: 'Glasses & Sunglasses',
  clothing: 'Clothing',
  hats: 'Hats & Headwear',
  jewelry: 'Jewelry',
  watches: 'Watches',
};

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Classic Aviator',
    category: 'glasses' as ProductCategory,
    price: 129.99,
    image_url: '/products/aviator.jpg',
    model_url: '/models/glasses/aviator.glb',
    brand: 'VirtualShades',
    color: 'Gold',
  },
  {
    id: '2',
    name: 'Casual Cotton T-Shirt',
    category: 'clothing' as ProductCategory,
    price: 39.99,
    image_url: '/products/tshirt.jpg',
    model_url: '/models/clothing/tshirt.glb',
    brand: 'VirtualWear',
    color: 'Navy',
  },
  {
    id: '3',
    name: 'Classic Beanie',
    category: 'hats' as ProductCategory,
    price: 49.99,
    image_url: '/products/beanie.jpg',
    model_url: '/models/hats/beanie.glb',
    brand: 'VirtualHats',
    color: 'Black',
  },
  {
    id: '4',
    name: 'Gold Ring',
    category: 'jewelry' as ProductCategory,
    price: 299.99,
    image_url: '/products/ring.jpg',
    model_url: '/models/jewelry/ring.glb',
    brand: 'VirtualJewels',
    color: 'Gold',
  },
  {
    id: '5',
    name: 'Digital Watch',
    category: 'watches' as ProductCategory,
    price: 199.99,
    image_url: '/products/watch.jpg',
    model_url: '/models/watches/watch.glb',
    brand: 'VirtualTime',
    color: 'Silver',
  },
];
