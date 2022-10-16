class BinarySearchTree
{
    constructor()
    {
        // root of a binary search tree
        this.root = null;
    }
 
    // helper method which creates a new node to
    // be inserted and calls insertNode
    insert(data) {
        // Creating a node and initialising
        // with data
        var newNode = new Node(data);
                        
        // root is null then node will
        // be added to the tree and made root.
        if(this.root === null)
            this.root = newNode;
        else
    
            // find the correct position in the
            // tree and add the node
            this.insertNode(this.root, newNode);
    }
    
    // Method to insert a node in a tree
    // it moves over the tree to find the location
    // to insert a node with a given data
    insertNode(node, newNode) {
        // if the data is less than the node
        // data move left of the tree
        if(newNode.data < node.data) {
            // if left is null insert node here
            if(node.left === null)
                node.left = newNode;
            else
    
                // if left is not null recur until
                // null is found
                this.insertNode(node.left, newNode);
        }
    
        // if the data is more than the node
        // data move right of the tree
        else
        {
            // if right is null insert node here
            if(node.right === null)
                node.right = newNode;
            else
    
                // if right is not null recur until
                // null is found
                this.insertNode(node.right,newNode);
        }
    }
}

class Node
{
    constructor(data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// create an object for the BinarySearchTree
var BST = new BinarySearchTree();
 
// Inserting nodes to the BinarySearchTree
BST.insert(1);
BST.insert(3);
BST.insert(2);
BST.insert(4);
BST.insert(6);
BST.insert(7);
BST.insert(8);
BST.insert(9);
BST.insert(10);

function branchSums(root) {
    const sums = [];
    const stack = [{ node: root, runningSum: 0 }];
  
    while (stack.length > 0) {
      const { node, runningSum } = stack.pop();
  
      const newRunningSum = runningSum + node.value;
  
      if (!node.left && !node.right) {
        sums.push(newRunningSum);
        continue;
      }
  
      if (node.right) {
        stack.push({ node: node.right, runningSum: newRunningSum });
      }
  
      if (node.left) {
        stack.push({ node: node.left, runningSum: newRunningSum });
      }
    }
  
    return sums;
  }

  console.log("BST", branchSums(BST))
  


// BST.insert(1);
// BST.insert(10);
// BST.insert(25);
// BST.insert(7);
// BST.insert(22);
// BST.insert(17);
// BST.insert(13);
// BST.insert(5);
// BST.insert(9);
// BST.insert(27);


console.log("BST", BST)

