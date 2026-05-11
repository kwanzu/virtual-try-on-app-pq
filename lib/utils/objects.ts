export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (!a || !b) return a === b;
  if (typeof a !== typeof b) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  return keysA.every(key => deepEqual(a[key], b[key]));
}

export function merge<T extends Record<string, any>>(target: T, source: T): T {
  return { ...target, ...source };
}

export function deepMerge<T extends Record<string, any>>(target: T, source: T): T {
  const result = { ...target };
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
}

export function isEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0;
}
