export function getStyle(el: Element, property: string): string {
  return window.getComputedStyle(el).getPropertyValue(property);
}

export function setStyle(el: Element, property: string, value: string): void {
  (el as HTMLElement).style.setProperty(property, value);
}

export function setStyles(el: Element, styles: Record<string, string>): void {
  Object.entries(styles).forEach(([key, value]) => {
    setStyle(el, key, value);
  });
}

export function removeStyle(el: Element, property: string): void {
  (el as HTMLElement).style.removeProperty(property);
}

export function getStyleMap(el: Element): CSSStyleDeclaration {
  return window.getComputedStyle(el);
}