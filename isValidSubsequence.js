const isValidSubsequence = (array, sequence) => {
    const indexes = []

    for (x in array) {
        for (y in sequence) {
            if (y < x && sequence[y] === array[x]) {
                indexes.push(x)
            }
        }
    }
    
    if (indexes.length > 0) {
        const isValid = indexes.reduce((prev, next) => {
            if (prev < next) return true
            return false
        })
    
        return (indexes.length === sequence.length && isValid) ? true : false
    } else {
        return false
    }
    
}

console.log("", isValidSubsequence([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, -1, 10]))
console.log("", isValidSubsequence([-1, 5, 1, 22, 25, 6, 8, 10], [1, 6, -1, 10]))








// const isValidSubsequence = (array, sequence) => {
//     const indexes = []
//     const data = []

//     // array.map((number, index, arr) => {
//     //     // console.log("array[index]", array[index])
//     //     // console.log("sequence[index]", sequence[index])
        
//     //     if (number === sequence[index]) {
//     //         indexes.push(index)
//     //         data.push(number)
//     //     }
//     // })

//     for (x in array) {


//         for (y in sequence) {

//             // if (sequence[y] === array[x]) {
//             if (y < x && sequence[y] === array[x]) {
//                 indexes.push(x)
//                 data.y = x
//             }
//         }
//     }
//     console.log("indexes", indexes)
//     console.log("data", data)
    

//     const isValid = indexes.reduce((prev, next) => {
//         if (prev < next) return true
//         return false
//     })

//     if (indexes.length === sequence.length && isValid) {
//         return true
//     } else {
//         return false
//     }
    
// }

// console.log("", isValidSubsequence([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, -1, 10]))
// console.log("", isValidSubsequence([-1, 5, 1, 22, 25, 6, 8, 10], [1, 6, -1, 10]))
