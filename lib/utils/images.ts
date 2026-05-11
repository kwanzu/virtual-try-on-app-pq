export interface ImageDimensions {
  width: number;
  height: number;
}

export function getImageAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

export async function getImageDimensions(src: string): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = reject;
    img.src = src;
  });
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert canvas to blob'));
        }
      },
      'image/png',
      0.95,
    );
  });
}

export function downloadImage(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateImageFileName(productName: string): string {
  const timestamp = Date.now();
  const sanitized = productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `virtualfit-${sanitized}-${timestamp}.png`;
}
