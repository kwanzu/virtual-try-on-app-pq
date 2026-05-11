export function milliseconds(n: number): number {
  return n;
}

export function seconds(n: number): number {
  return n * 1000;
}

export function minutes(n: number): number {
  return n * 60 * 1000;
}

export function hours(n: number): number {
  return n * 60 * 60 * 1000;
}

export function days(n: number): number {
  return n * 24 * 60 * 60 * 1000;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let lastRun = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastRun >= wait) {
      func(...args);
      lastRun = now;
    }
  };
}
