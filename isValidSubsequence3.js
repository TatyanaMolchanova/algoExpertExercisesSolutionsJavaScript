function isValidSubsequence(array, sequence) {
    let sequenceIndex = 0;
    for (const value of array) {
        if (value === sequence[sequenceIndex]) sequenceIndex++;
        if (sequenceIndex === sequence.length) return true;
    }

    return false;
}

console.log("", isValidSubsequence([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, -1, 10]))
console.log("", isValidSubsequence([1, 2, 3, 4], [1, 3, 4]))



// const isValidSubsequence = (array, sequence) => {
//     const result = [];

//     for (let j = 0; j < sequence.length; j++) {
//         if (array.includes(sequence[j])) {
//             let index = array.indexOf(sequence[j])
//             result.push(index)
//         }
        
//     }
//     console.log("result", result)

//     for (let i = 0; i < result.length; i++) {
//         if (result[i] < result[i + 1]) {
//             return true
//         } else {
//             return false
//         }
//     }
// }

// console.log("", isValidSubsequence([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, -1, 10]))
// console.log("", isValidSubsequence([1, 2, 3, 4], [1, 3, 4]))




