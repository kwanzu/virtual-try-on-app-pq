export function assert(condition: boolean, message: string = 'Assertion failed'): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function assertDefined<T>(value: T | undefined, message: string = 'Value is undefined'): asserts value is T {
  if (value === undefined) {
    throw new Error(message);
  }
}

export function assertNotNull<T>(value: T | null, message: string = 'Value is null'): asserts value is T {
  if (value === null) {
    throw new Error(message);
  }
}

export function assertIsString(value: any, message: string = 'Value is not a string'): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(message);
  }
}

export function assertIsNumber(value: any, message: string = 'Value is not a number'): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error(message);
  }
}