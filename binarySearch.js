function binarySearchRecursive(array, target, start, end) {
    if (start > end) return -1;

    const mid = (end + start) / 2;

    if (target === array[mid]) {
        return mid;
    } 
    
    if (target < array[mid]) {
    
        return binarySearchRecursive(array, target, start, mid - 1);
    } else {

        return binarySearch(array, target, mid + 1, end);
    }
}

function binarySearch(array, target) {
  binarySearchRecursive(array, target, 0, array.length - 1);
}


// function binarySearch(array, target) {
//     return binarySearchImpl(array, target, 0, array.length - 1);
//   }
  
//   function binarySearchImpl(array, target, left, right) {
//     if (left > right) return -1;
  
//     // Avoid overflow
//     const mid = left + Math.floor((right - left) / 2);
  
//     if (target === array[mid]) return mid;
  
//     if (target < array[mid]) {
//       return binarySearchImpl(array, target, left, mid - 1);
//     } else {
//       return binarySearchImpl(array, target, mid + 1, right);
//     }
//   }


console.log("", binarySearch([0,1,21,33,45,45,61,71,72,73], 33))

