function selectionSort(array) {
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        
        if (min !== i) {
            let tmp = array[i];
            array[i] = array[min];
            array[min] = tmp;
        }
    }
    return array;
}

console.log("selectionSort([8, 5, 2, 9, 5, 6, 3])", selectionSort([8, 5, 2, 9, 5, 6, 3]))
