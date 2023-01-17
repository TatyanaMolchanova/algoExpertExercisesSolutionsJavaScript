function findThreeLargestNumbers(array) {
    let index = 3;
    const result = [];
    while (index) {
        const max = Math.max(...array);
        result.push(max)
        array.splice(array.indexOf(max), 1)
        index--;
    }
    return result.sort((a, b) => a - b);
}

console.log("findThreeLargestNumbers([141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7])", findThreeLargestNumbers([141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]))

  