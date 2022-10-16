const isValidSubsequence = (array, sequence) => {
    let counter = 0

    array.map((element, index) => {
        
        if (sequence.includes(element)) {
            counter++
        }
    })
    console.log("sequence.length", sequence.length)
    console.log("counter", counter)
    

    return sequence.length <= counter ? true : false
}

console.log("", isValidSubsequence([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, -1, 10]))
console.log("", isValidSubsequence([-1, 5, 1, 22, 25, 6, 8, 10], [1, 6, -1, 10]))





