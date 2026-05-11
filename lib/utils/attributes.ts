export function getAttribute(el: Element, attr: string): string | null {
  return el.getAttribute(attr);
}

export function setAttribute(el: Element, attr: string, value: string): void {
  el.setAttribute(attr, value);
}

export function removeAttribute(el: Element, attr: string): void {
  el.removeAttribute(attr);
}

export function hasAttribute(el: Element, attr: string): boolean {
  return el.hasAttribute(attr);
}

export function setAttributes(el: Element, attrs: Record<string, string>): void {
  Object.entries(attrs).forEach(([key, value]) => {
    setAttribute(el, key, value);
  });
}