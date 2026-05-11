export function encode(str: string): string {
  return Buffer.from(str).toString('base64');
}

export function decode(str: string): string {
  return Buffer.from(str, 'base64').toString();
}

export function isBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}