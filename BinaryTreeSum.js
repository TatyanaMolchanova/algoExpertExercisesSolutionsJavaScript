class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function branchSums(root) {
  // Write your code here.
}


class Node {
    constructor(value) {
      this.value = value;
      this.right = null;
      this.left = null;
    }
  }
  
  class BinarySearchTree {
    constructor() {
      this.root = null;
    }
    //inserts a number into the tree. Returns the entire tree.
    insert(value) {
      const newNode = new Node(value);
      if (!this.root) {
        this.root = newNode;
        return this;
      }
      let current = this.root;
      const rnLoop = true;
      while (rnLoop) {
        if (value === current.value) return undefined;
        if (value < current.value) {
          if (!current.left) {
            current.left = newNode;
            return this;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            return this;
          }
          current = current.right;
        }
      }
    }
    //finds the given number and returns it. If its not found, returns `null` or `undefined`.
    find(value) {
      if (!this.root) return null;
      let current = this.root;
      const rnLoop = true;
      while (rnLoop) {
        if (!current) return undefined;
        if (value === current.value) return current;
        if (value < current.value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
    }
    //checks if a given number exists in the tree. If its in the tree, returns `true`, otherwise `false`
    contains(value) {
      if (!this.root) return null;
      let current = this.root;
      const rnLoop = true;
      while (rnLoop) {
        if (!current) return false;
        if (value === current.value) return true;
        if (value < current.value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
    }
  }
  
  
  
  
  //EXAMPLES==================================================================================
  
  const binarySearchTree = new BinarySearchTree();
  binarySearchTree.insert(1); //returns the entire list
  binarySearchTree.insert(2); //returns the entire list
  binarySearchTree.insert(4);
  binarySearchTree.insert(8);
  binarySearchTree.insert(9);
  binarySearchTree.insert(3);
  binarySearchTree.insert(6);
  binarySearchTree.insert(7);


  console.log('binarySearchTree', binarySearchTree)