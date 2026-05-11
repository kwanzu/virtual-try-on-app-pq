export function getElementById(id: string): HTMLElement | null {
  return document.getElementById(id);
}

export function querySelector(selector: string): Element | null {
  return document.querySelector(selector);
}

export function querySelectorAll(selector: string): Element[] {
  return Array.from(document.querySelectorAll(selector));
}

export function addClass(el: Element, className: string): void {
  el.classList.add(className);
}

export function removeClass(el: Element, className: string): void {
  el.classList.remove(className);
}

export function toggleClass(el: Element, className: string): void {
  el.classList.toggle(className);
}

export function hasClass(el: Element, className: string): boolean {
  return el.classList.contains(className);
}