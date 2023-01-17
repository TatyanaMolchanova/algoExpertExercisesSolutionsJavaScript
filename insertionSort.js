function insertionSort(array) {
    // for (let i = 1; i < array.length; i++) {
    //     let currentValue = array[i];
    //     let j;
        
    //     for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
    //         array[j + 1] = array[j];
    //     }
    //     array[j + 1] = currentValue;
    // }
    // return array;

    array.forEach((num, index) => {
        let currentValue = num;
        let j;
        for (let j = index - 1; j >= 0 && array[j] > currentValue; j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = currentValue;
    })
    return array;

    // array.forEach((num, index) => {
    //     let currentValue = num;
    //     array.forEach((number, idx) => {
    //         let j = index - 1;
    //         if (idx >= 0 && number > currentValue) {
    //             array[j + 1] = number;
    //             idx--;
    //         }
    //         array[j + 1] = currentValue;
    //     });
    // });
    // return array;
}

console.log("insertionSort([8, 5, 2, 9, 5, 6, 3])", insertionSort([8, 5, 2, 9, 5, 6, 3]))
