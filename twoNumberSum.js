const twoNumberSum =  (array, targetSum) => {
    const result = [];

    for (let x in array) {
        for (let y in array) { 
            if (x !== y) {
                if (array[x] + array[y] === targetSum) {
                    result.push(array[x], array[y]);
                }
            }
            
        }
    }

    return Array.from(new Set(result));
}

console.log("twoNumberSum([3, 5, -4, 8, 11, 1, -1, 6], 10)", twoNumberSum([3, 5, -4, 8, 11, 1, -1, 6], 10))
