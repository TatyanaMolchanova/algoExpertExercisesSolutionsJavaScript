function bubbleSort(array) {
    // for (let i = 0; i < array.length; i++) {
    //     for (let j = 0; j < array.length; j++) {
            
    //         if (array[j] > array[j + 1]) {
    //             let temp = array[j];
    //             array[j] = array[j + 1];
    //             array[j + 1] = temp;
                
    //         }
    //     }
    // }
    // return array;

    return array.map((_, __, arr) => {

       arr.map((_, index, arr) => {
            if (arr[index] > arr[index + 1]) {
                let temp = arr[index];
                arr[index] = arr[index + 1];
                arr[index + 1] = temp;
            }
            return arr[index];
        })
        return arr;
    })[0];
}

console.log("bubbleSort([8, 5, 2, 9, 5, 6, 3])", bubbleSort([8, 5, 2, 9, 5, 6, 3]));
