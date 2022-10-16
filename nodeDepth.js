class TreeNode
    {
        constructor(data) {
           this.left = null;
           this.right = null;
           this.data = data;
        }
    }
     
    // Function that allocates a new
    // node with data and NULL to its
    // left and right pointers
    function newNode(data)
    {
        let Node = new TreeNode(data);
        return (Node);
    }
 
    // Function to find the sum of depths of
    // all nodes in subtree of the current node
    function sumofdepth(root, d)
    {
 
        // If NULL node then return 0
        if (root == null)
            return 0;
 
        // Recursively find the sum of
        // depths of all nodes in the
        // left and right subtree
        return d + sumofdepth(root.left, d + 1) +
                  sumofdepth(root.right, d + 1);
    }
 
    // Function to calculate the sum
    // of depth of all the subtrees
    function sumofallsubtrees(root)
    {
 
        // If root is NULL return 0
        if (root == null)
            return 0;
 
        // Find the total depth sum of
        // current node and recursively
        return sumofdepth(root, 0) +
               sumofallsubtrees(root.left) +
               sumofallsubtrees(root.right);
    }
     
    // Given Tree
    let root = newNode(1);
    root.left = newNode(2);
    root.right = newNode(3);
    root.left.left = newNode(4);
    root.left.right = newNode(5);
    root.right.left = newNode(6);
    root.right.right = newNode(7);
    root.left.left.left = newNode(8);
    root.left.left.right = newNode(9);
    console.log("root", root)
    
      
    // Function Call
    console.log(sumofallsubtrees(root));