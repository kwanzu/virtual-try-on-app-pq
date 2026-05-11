export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getOS(): 'Windows' | 'macOS' | 'Linux' | 'iOS' | 'Android' | 'Unknown' {
  if (!isBrowser()) return 'Unknown';

  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('win')) return 'Windows';
  if (ua.includes('mac')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  if (ua.includes('android')) return 'Android';
  return 'Unknown';
}

export function isMobile(): boolean {
  if (!isBrowser()) return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export function copyToClipboard(text: string): Promise<void> {
  if (!isBrowser()) return Promise.reject(new Error('Not in browser'));
  return navigator.clipboard.writeText(text);
}

export function requestFullscreen(element: HTMLElement): Promise<void> {
  return element.requestFullscreen?.() ?? Promise.reject(new Error('Fullscreen not supported'));
}

export function exitFullscreen(): Promise<void> {
  if (!isBrowser()) return Promise.reject(new Error('Not in browser'));
  return document.exitFullscreen?.() ?? Promise.reject(new Error('Fullscreen not supported'));
}
