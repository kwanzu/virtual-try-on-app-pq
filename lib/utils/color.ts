export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

export function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(x => x / 255);
  return 0.299 * rs + 0.587 * gs + 0.114 * bs;
}

export function contrastColor(hex: string): 'black' | 'white' {
  const rgb = hexToRgb(hex);
  return rgb && luminance(rgb.r, rgb.g, rgb.b) > 0.5 ? 'black' : 'white';
}