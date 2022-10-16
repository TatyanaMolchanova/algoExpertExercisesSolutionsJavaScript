function classPhotos(redShirtHeights, blueShirtHeights) {
    let redRow = redShirtHeights.sort((a, b) => b - a);
    let blueRow = blueShirtHeights.sort((a, b) => b - a);

    const behindRow = redRow[0] > blueRow[0] ? redRow : blueRow;
    const frontRow = redRow[0] > blueRow[0] ? blueRow : redRow;

    const result = [];
    
    for (let i = 0; i < behindRow.length; i++) {
        
            if (behindRow[i] > frontRow[i]) {
                continue;
            } 
            return false;
       
    }

    return true;

}

console.log('', classPhotos([5, 8, 1, 3, 4], [6, 9, 2, 4, 5]));