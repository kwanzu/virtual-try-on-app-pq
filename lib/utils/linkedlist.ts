export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null = null;
  
  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private tail: LinkedListNode<T> | null = null;
  private length = 0;
  
  append(value: T): void {
    const node = new LinkedListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }
  
  remove(value: T): boolean {
    if (!this.head) return false;
    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;
      return true;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.length--;
        return true;
      }
      current = current.next;
    }
    return false;
  }
  
  size(): number {
    return this.length;
  }
}