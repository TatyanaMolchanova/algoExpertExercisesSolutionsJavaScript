function productSum(array, currentLevel = 1) {
    let sum = 0
    for (const element of array) {
        if (Array.isArray(element)) {
            sum += productSum(element, currentLevel + 1)
            
        } else {
            sum += element
        }
    }

    return sum * currentLevel
}


console.log("", productSum([1, [2, [3]]]))
