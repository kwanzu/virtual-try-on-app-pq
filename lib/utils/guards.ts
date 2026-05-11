export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export function isArray<T = any>(value: any): value is T[] {
  return Array.isArray(value);
}

export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export function isPromise<T = any>(value: any): value is Promise<T> {
  return value?.then && typeof value.then === 'function';
}