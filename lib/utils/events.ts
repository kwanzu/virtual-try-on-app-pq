export function addEventListener(el: Element | Window, event: string, handler: EventListener): void {
  el.addEventListener(event, handler);
}

export function removeEventListener(el: Element | Window, event: string, handler: EventListener): void {
  el.removeEventListener(event, handler);
}

export function dispatchEvent(el: Element, event: Event): boolean {
  return el.dispatchEvent(event);
}

export function on(el: Element, event: string, handler: EventListener): void {
  addEventListener(el, event, handler);
}

export function off(el: Element, event: string, handler: EventListener): void {
  removeEventListener(el, event, handler);
}

export function once(el: Element, event: string, handler: EventListener): void {
  const wrapper = (e: Event) => {
    handler(e);
    removeEventListener(el, event, wrapper);
  };
  addEventListener(el, event, wrapper);
}