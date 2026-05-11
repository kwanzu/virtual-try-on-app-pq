export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  
  constructor(value: T) {
    this.value = value;
  }
}

export class BinaryTree<T> {
  root: TreeNode<T> | null = null;
  
  insert(value: T): void {
    const node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }
  }
  
  private insertNode(parent: TreeNode<T>, node: TreeNode<T>): void {
    if (Math.random() < 0.5) {
      if (!parent.left) {
        parent.left = node;
      } else {
        this.insertNode(parent.left, node);
      }
    } else {
      if (!parent.right) {
        parent.right = node;
      } else {
        this.insertNode(parent.right, node);
      }
    }
  }
  
  traverse(callback: (value: T) => void): void {
    this.traverseNode(this.root, callback);
  }
  
  private traverseNode(node: TreeNode<T> | null, callback: (value: T) => void): void {
    if (!node) return;
    callback(node.value);
    this.traverseNode(node.left, callback);
    this.traverseNode(node.right, callback);
  }
}