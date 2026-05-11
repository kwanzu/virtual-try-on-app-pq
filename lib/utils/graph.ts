export class Graph<T> {
  private adjacency = new Map<T, Set<T>>();
  
  addVertex(vertex: T): void {
    if (!this.adjacency.has(vertex)) {
      this.adjacency.set(vertex, new Set());
    }
  }
  
  addEdge(vertex1: T, vertex2: T): void {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacency.get(vertex1)?.add(vertex2);
    this.adjacency.get(vertex2)?.add(vertex1);
  }
  
  getNeighbors(vertex: T): T[] {
    return Array.from(this.adjacency.get(vertex) || []);
  }
  
  hasEdge(vertex1: T, vertex2: T): boolean {
    return this.adjacency.get(vertex1)?.has(vertex2) ?? false;
  }
}