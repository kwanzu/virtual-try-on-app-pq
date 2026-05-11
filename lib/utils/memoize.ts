export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

export function memoizeWithTTL<T extends (...args: any[]) => any>(fn: T, ttl: number = 60000): T {
  const cache = new Map<string, { value: any; timestamp: number }>();
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }
    const result = fn(...args);
    cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  }) as T;
}