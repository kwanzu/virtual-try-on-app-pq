import { filterProductsByCategory, searchProducts, getProductById, sortProducts } from '@/lib/utils/products';
import { MOCK_PRODUCTS } from '@/lib/constants/products';

describe('Product Utilities', () => {
  describe('filterProductsByCategory', () => {
    it('should filter products by category', () => {
      const result = filterProductsByCategory(MOCK_PRODUCTS, 'sunglasses');
      expect(result.length).toBeGreaterThan(0);
      result.forEach(product => {
        expect(product.category).toBe('sunglasses');
      });
    });

    it('should return empty array for non-existent category', () => {
      const result = filterProductsByCategory(MOCK_PRODUCTS, 'nonexistent');
      expect(result).toEqual([]);
    });

    it('should handle empty array input', () => {
      const result = filterProductsByCategory([], 'sunglasses');
      expect(result).toEqual([]);
    });
  });

  describe('searchProducts', () => {
    it('should search products by name', () => {
      const result = searchProducts(MOCK_PRODUCTS, 'aviator');
      expect(result.length).toBeGreaterThan(0);
      result.forEach(product => {
        const searchFields = [product.name, product.brand, product.color].map(f => f?.toLowerCase() || '');
        expect(searchFields.some(f => f.includes('aviator'))).toBeTruthy();
      });
    });

    it('should be case-insensitive', () => {
      const result1 = searchProducts(MOCK_PRODUCTS, 'AVIATOR');
      const result2 = searchProducts(MOCK_PRODUCTS, 'aviator');
      expect(result1.length).toBe(result2.length);
    });

    it('should return empty array when no match found', () => {
      const result = searchProducts(MOCK_PRODUCTS, 'xyz123notfound');
      expect(result).toEqual([]);
    });
  });

  describe('getProductById', () => {
    it('should return product by id', () => {
      const product = getProductById(MOCK_PRODUCTS, '1');
      expect(product).toBeDefined();
      expect(product?.id).toBe('1');
    });

    it('should return undefined for non-existent id', () => {
      const product = getProductById(MOCK_PRODUCTS, '999');
      expect(product).toBeUndefined();
    });
  });

  describe('sortProducts', () => {
    it('should sort products by price ascending', () => {
      const result = sortProducts(MOCK_PRODUCTS, 'price', 'asc');
      for (let i = 1; i < result.length; i++) {
        expect(result[i].price).toBeGreaterThanOrEqual(result[i - 1].price);
      }
    });

    it('should sort products by price descending', () => {
      const result = sortProducts(MOCK_PRODUCTS, 'price', 'desc');
      for (let i = 1; i < result.length; i++) {
        expect(result[i].price).toBeLessThanOrEqual(result[i - 1].price);
      }
    });

    it('should handle empty array', () => {
      const result = sortProducts([], 'price', 'asc');
      expect(result).toEqual([]);
    });
  });
});
