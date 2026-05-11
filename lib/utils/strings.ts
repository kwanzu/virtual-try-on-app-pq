export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

export function kebabToCamel(str: string): string {
  return str.replace(/-./g, x => x[1].toUpperCase());
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]/g, '-')
    .replace(/-+/g, '-');
}

export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

export function padStart(str: string, length: number, char: string = ' '): string {
  return str.padStart(length, char);
}

export function padEnd(str: string, length: number, char: string = ' '): string {
  return str.padEnd(length, char);
}
