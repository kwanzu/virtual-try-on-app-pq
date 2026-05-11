export interface StorageOptions {
  ttl?: number;
}

export function setLocalStorage(key: string, value: any, options?: StorageOptions): void {
  try {
    const item = {
      value,
      timestamp: Date.now(),
      ttl: options?.ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('[v0] Failed to set localStorage:', error);
  }
}

export function getLocalStorage<T = any>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);
    const { value, timestamp, ttl } = parsed;

    if (ttl && Date.now() - timestamp > ttl) {
      localStorage.removeItem(key);
      return null;
    }

    return value as T;
  } catch (error) {
    console.error('[v0] Failed to get localStorage:', error);
    return null;
  }
}

export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('[v0] Failed to remove localStorage:', error);
  }
}

export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('[v0] Failed to clear localStorage:', error);
  }
}
