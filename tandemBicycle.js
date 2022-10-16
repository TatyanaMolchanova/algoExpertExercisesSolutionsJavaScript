function tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest) {
    const redShirtSpeedsAsc = [...redShirtSpeeds.sort((a, b) => a - b)];
    const redShirtSpeedsDesc = [...redShirtSpeeds.sort((a, b) => b - a)];
    const blueShirtSpeedsDesc = [...blueShirtSpeeds.sort((a, b) => b - a)];
    let fastResult = [];
    let slowResult = [];
    
    const calculate = (sortedShirtSpeedAsc, resultArray, redArr, blueArr) => {
        for (let i = 0; i < sortedShirtSpeedAsc.length; i++) {
            resultArray.push(Math.max(redArr[i], blueArr[i]))
        }
        return resultArray.length > 0 ? resultArray.reduce((prev, next) => prev + next) : 0;
    }

    if (fastest) {
        return calculate(redShirtSpeedsAsc, fastResult, redShirtSpeedsAsc, blueShirtSpeedsDesc)
    } else {
        return calculate(redShirtSpeedsAsc, slowResult, redShirtSpeedsDesc, blueShirtSpeedsDesc)
    }
}

console.log("", tandemBicycle([5,5,3,9,2], [3,6,7,2,1], true))
console.log("", tandemBicycle([5,5,3,9,2], [3,6,7,2,1], false))
// console.log("", )
