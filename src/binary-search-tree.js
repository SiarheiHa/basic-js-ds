const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return searchNode(this.rootNode, data);

    function searchNode(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      if (data < node.data) {
        return searchNode(node.left, data);
      } else {
        return searchNode(node.right, data);
      }
    }
  }

  find(data) {
    if(!this.has(data)) {
      return null
    }
    return findNode(this.rootNode, data);

    function findNode(node, data) {
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        return findNode(node.left, data);
      } else {
        return findNode(node.right, data);
      }
    }
  }

  remove(data) {
    // throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } /*if (node.data === data)*/ else {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (!node.left) {
          // если нет левого потомка, просто удалить узел
          node = node.right;
          return node;
        }
        if (!node.right) {
          // если нет правого потомка, просто удалить узел
          node = node.left;
          return node;
        }
        // и левый и правый есть
        let min = node.right; //минимум среди правого поддерева
        while (min.left) {
          min = min.left;
        }
        node.data = min.data; // на место удаляемого минимум из правого поддерева
        node.right = removeNode(node.right, min.data); // удалить минимум из правого поддерева
      }
      return node;
    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }
    let min = this.rootNode;
    while (min.left) {
      min = min.left;
    }
    return min.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }
    let max = this.rootNode;
    while (max.right) {
      max = max.right;
    }
    return max.data;
  }
}

module.exports = {
  BinarySearchTree,
};
