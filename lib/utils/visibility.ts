export function show(el: Element): void {
  (el as HTMLElement).style.display = '';
}

export function hide(el: Element): void {
  (el as HTMLElement).style.display = 'none';
}

export function toggle(el: Element): void {
  const style = window.getComputedStyle(el);
  if (style.display === 'none') {
    show(el);
  } else {
    hide(el);
  }
}

export function isVisible(el: Element): boolean {
  return window.getComputedStyle(el).display !== 'none';
}

export function fadeIn(el: Element, duration: number = 300): void {
  (el as HTMLElement).style.opacity = '0';
  show(el);
  let start = Date.now();
  const animate = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    (el as HTMLElement).style.opacity = String(progress);
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  animate();
}

export function fadeOut(el: Element, duration: number = 300): void {
  (el as HTMLElement).style.opacity = '1';
  let start = Date.now();
  const animate = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    (el as HTMLElement).style.opacity = String(1 - progress);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      hide(el);
    }
  };
  animate();
}