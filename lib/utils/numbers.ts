export function round(num: number, decimals: number = 0): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function clamp(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(num, max));
}

export function isEven(num: number): boolean {
  return num % 2 === 0;
}

export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

export function percentage(value: number, total: number): number {
  return total === 0 ? 0 : round((value / total) * 100, 2);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
