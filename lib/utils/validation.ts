export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateProductId(id: string): boolean {
  return /^[0-9]+$/.test(id);
}

export function validateUserId(id: string): boolean {
  return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id);
}

export function validatePrice(price: any): boolean {
  const num = parseFloat(price);
  return !isNaN(num) && num >= 0;
}

export function validateRequired(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

export function validateMinLength(value: string, min: number): boolean {
  return value.length >= min;
}

export function validateMaxLength(value: string, max: number): boolean {
  return value.length <= max;
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
