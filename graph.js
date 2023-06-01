/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (const vertex of vertexArray) this.nodes.add(vertex);
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    this.nodes.
      delete(vertex);
    for (const neighbor of vertex.adjacent) {
      neighbor.adjacent.delete(vertex);
    }
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    const values = [];
    function _depthFirstSearch(node, seen = new Set()) {
      values.push(node.value);
      seen.add(node);
      for (const n of node.adjacent) {
        if (!seen.has(n)) {
          _depthFirstSearch(n, seen);
        }
      }
    }
    _depthFirstSearch(start);
    console.log('values: ', values);
    return values;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    const queue = [start];
    const seen = new Set([]);
    const values = [];

    while (queue.length) {
      const curr = queue.shift();
      values.push(curr.value);
      seen.add(curr);
      for (const n of curr.adjacent) {
        if (!seen.has(n)) {
          queue.push(n);
        }
      }
    }
    return values;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    const queue = [start];
    const seen = new Set();
    const dist = 0;

    while (queue.length) {

      while (queue.length) {
        const curr = queue.shift();
        const tmp = [];

        if (curr === end) {
          return dist;
        } else {
          dist += 1;
        }

        for (const n of curr.adjacent) {
          if (!seen.has(n)) {
            seen.add(n);
            tmp.push(n);
          }
        }
      }
    }

  }
}

module.exports = { Graph, Node };
