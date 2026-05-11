import {
  validateProductId,
  validatePrice,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateUrl,
} from '@/lib/utils/validation';

describe('Validation Utilities', () => {
  describe('validateProductId', () => {
    it('should validate numeric product IDs', () => {
      expect(validateProductId('123')).toBeTruthy();
      expect(validateProductId('1')).toBeTruthy();
    });

    it('should reject non-numeric IDs', () => {
      expect(validateProductId('abc')).toBeFalsy();
      expect(validateProductId('123abc')).toBeFalsy();
    });

    it('should reject empty string', () => {
      expect(validateProductId('')).toBeFalsy();
    });
  });

  describe('validatePrice', () => {
    it('should validate positive numbers', () => {
      expect(validatePrice(99.99)).toBeTruthy();
      expect(validatePrice(0)).toBeTruthy();
      expect(validatePrice('49.99')).toBeTruthy();
    });

    it('should reject negative numbers', () => {
      expect(validatePrice(-10)).toBeFalsy();
    });

    it('should reject non-numeric values', () => {
      expect(validatePrice('abc')).toBeFalsy();
      expect(validatePrice(NaN)).toBeFalsy();
    });
  });

  describe('validateRequired', () => {
    it('should accept non-empty strings', () => {
      expect(validateRequired('test')).toBeTruthy();
      expect(validateRequired(' test ')).toBeTruthy();
    });

    it('should reject empty strings', () => {
      expect(validateRequired('')).toBeFalsy();
      expect(validateRequired('   ')).toBeFalsy();
    });

    it('should accept truthy values', () => {
      expect(validateRequired(123)).toBeTruthy();
      expect(validateRequired(true)).toBeTruthy();
      expect(validateRequired([1, 2, 3])).toBeTruthy();
    });

    it('should reject falsy values', () => {
      expect(validateRequired(null)).toBeFalsy();
      expect(validateRequired(undefined)).toBeFalsy();
    });
  });

  describe('validateMinLength', () => {
    it('should accept strings meeting minimum length', () => {
      expect(validateMinLength('hello', 5)).toBeTruthy();
      expect(validateMinLength('hello world', 5)).toBeTruthy();
    });

    it('should reject strings below minimum length', () => {
      expect(validateMinLength('hi', 5)).toBeFalsy();
    });
  });

  describe('validateMaxLength', () => {
    it('should accept strings within maximum length', () => {
      expect(validateMaxLength('hello', 10)).toBeTruthy();
      expect(validateMaxLength('hi', 5)).toBeTruthy();
    });

    it('should reject strings exceeding maximum length', () => {
      expect(validateMaxLength('hello world', 5)).toBeFalsy();
    });
  });

  describe('validateUrl', () => {
    it('should validate correct URLs', () => {
      expect(validateUrl('https://example.com')).toBeTruthy();
      expect(validateUrl('http://localhost:3000')).toBeTruthy();
    });

    it('should reject invalid URLs', () => {
      expect(validateUrl('not a url')).toBeFalsy();
      expect(validateUrl('htp://invalid')).toBeFalsy();
    });

    it('should handle edge cases', () => {
      expect(validateUrl('')).toBeFalsy();
    });
  });
});
