export function compose<T>(...fns: ((arg: T) => T)[]): (arg: T) => T {
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg);
}

export function pipe<T>(...fns: ((arg: T) => T)[]): (arg: T) => T {
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
}

export function curry<A, B, R>(fn: (a: A, b: B) => R) {
  return (a: A) => (b: B) => fn(a, b);
}

export function partial<T extends (...args: any[]) => any>(fn: T, ...args: any[]): (...rest: any[]) => any {
  return (...rest: any[]) => fn(...args, ...rest);
}