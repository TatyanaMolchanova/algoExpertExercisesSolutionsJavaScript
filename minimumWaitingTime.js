function minimumWaitingTime(queries) {
    let nextTime = 0;
    let result = 0;
    queries.sort((a, b) => a - b);
    console.log("queries", queries)

    queries.map(time => {
        result += nextTime;
        nextTime += time;
    })

   return result;
  
}

console.log("minimumWaitingTime([3, 2, 1, 2, 6])", minimumWaitingTime([3, 2, 1, 2, 6]));
console.log("minimumWaitingTime([3, 2, 1, 2, 6])", minimumWaitingTime([3, 2, 1, 2, 6]));
