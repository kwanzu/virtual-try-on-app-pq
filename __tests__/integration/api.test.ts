import { fetchAPI, buildQueryString } from '@/lib/utils/api';

describe('API Utilities', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchAPI', () => {
    it('should successfully fetch and parse JSON', async () => {
      const mockData = { id: 1, name: 'Test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchAPI('/api/test');
      expect(result.success).toBeTruthy();
      expect(result.data).toEqual(mockData);
    });

    it('should handle API errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'API Error' }),
      });

      const result = await fetchAPI('/api/test');
      expect(result.success).toBeFalsy();
      expect(result.error).toBe('API Error');
    });

    it('should handle network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchAPI('/api/test');
      expect(result.success).toBeFalsy();
      expect(result.error).toContain('Network error');
    });

    it('should include custom headers', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await fetchAPI('/api/test', {
        headers: { 'X-Custom': 'value' },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({ 'X-Custom': 'value' }),
        })
      );
    });
  });

  describe('buildQueryString', () => {
    it('should build query string from object', () => {
      const result = buildQueryString({ name: 'test', age: 25 });
      expect(result).toContain('name=test');
      expect(result).toContain('age=25');
      expect(result.startsWith('?')).toBeTruthy();
    });

    it('should filter out null and undefined values', () => {
      const result = buildQueryString({
        name: 'test',
        value: null,
        empty: undefined,
      });
      expect(result).toContain('name=test');
      expect(result).not.toContain('value');
      expect(result).not.toContain('empty');
    });

    it('should return empty string for empty object', () => {
      const result = buildQueryString({});
      expect(result).toBe('');
    });

    it('should encode special characters', () => {
      const result = buildQueryString({ search: 'hello world' });
      expect(result).toContain('hello%20world');
    });
  });
});
