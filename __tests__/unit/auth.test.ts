import { validateEmail, validatePassword, getUserDisplayName } from '@/lib/utils/auth';

describe('Authentication Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBeTruthy();
      expect(validateEmail('user+tag@domain.co.uk')).toBeTruthy();
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBeFalsy();
      expect(validateEmail('missing@domain')).toBeFalsy();
      expect(validateEmail('@nodomain.com')).toBeFalsy();
      expect(validateEmail('')).toBeFalsy();
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      expect(validatePassword('StrongPass123!')).toBeTruthy();
      expect(validatePassword('SecurePassword99')).toBeTruthy();
    });

    it('should reject weak passwords', () => {
      expect(validatePassword('short')).toBeFalsy();
      expect(validatePassword('12345678')).toBeFalsy();
      expect(validatePassword('onlyletters')).toBeFalsy();
    });

    it('should enforce minimum length', () => {
      expect(validatePassword('Pass1')).toBeFalsy();
    });
  });

  describe('getUserDisplayName', () => {
    it('should return full name when available', () => {
      const user = { id: '1', email: 'test@example.com', user_metadata: { full_name: 'John Doe' } };
      expect(getUserDisplayName(user as any)).toBe('John Doe');
    });

    it('should return email when full name not available', () => {
      const user = { id: '1', email: 'test@example.com', user_metadata: {} };
      expect(getUserDisplayName(user as any)).toBe('test@example.com');
    });

    it('should handle null user', () => {
      expect(getUserDisplayName(null as any)).toBe('Guest');
    });
  });
});
