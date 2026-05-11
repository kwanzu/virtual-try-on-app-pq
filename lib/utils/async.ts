export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxAttempts?: number; delay?: number } = {},
): Promise<T> {
  const { maxAttempts = 3, delay = 1000 } = options;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Retry failed');
}

export async function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
  ]);
}

export async function parallel<T>(fns: (() => Promise<T>)[]): Promise<T[]> {
  return Promise.all(fns.map(fn => fn()));
}

export async function sequential<T>(fns: (() => Promise<T>)[]): Promise<T[]> {
  const results: T[] = [];
  for (const fn of fns) {
    results.push(await fn());
  }
  return results;
}