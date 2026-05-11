export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

export function average(arr: number[]): number {
  return arr.length === 0 ? 0 : sum(arr) / arr.length;
}

export function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function max(arr: number[]): number {
  return Math.max(...arr);
}

export function min(arr: number[]): number {
  return Math.min(...arr);
}

export function variance(arr: number[]): number {
  const avg = average(arr);
  return average(arr.map(val => Math.pow(val - avg, 2)));
}

export function stdDev(arr: number[]): number {
  return Math.sqrt(variance(arr));
}