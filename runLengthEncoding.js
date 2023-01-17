const runLengthEncoding = (string) => {
    let letters = string.split('');
    let lettersEncoded = [];
    let counter = 1;
    letters.forEach((letter, index) => {
        if (letter === letters[index + 1]) {
            counter++;
            if (counter >= 9) {
                lettersEncoded.push(`${counter}${letter}`);
                counter = 0;
            }
        } else {
            lettersEncoded.push(`${counter ? counter : ''}${counter ? letter : ''}`);
            counter = 1;
        }
    })
    return lettersEncoded.join('');
}


console.log("runLengthEncoding", runLengthEncoding('AAAAAAAAAAAAABBCCCCDD'))
console.log("runLengthEncoding", runLengthEncoding('........______=========AAAA   AAABBBB   BBB'))













// function runLengthEncoding(string) {
//     let letters = string.split('');
//     let lettersEncoded = [];
//     let counter = 1;
//     let countCircle = 1;
//     for (let i = 0; i < letters.length; i++) {
//         if (letters[i] === letters[i + 1]) {
//             counter++;

//             if (counter >= 9) {
//                 lettersEncoded.push(`${counter}${letters[i]}`);
//                 counter = 0;
//             }
//             // `${counter++}${letters[i]}`;
//             // if (i > 9) {
//             //     countCircle++;
//             //     lettersEncoded.push(`${counter}${letters[i]}`);
//             //     counter = 1;
//             // }
//         } else {
//             lettersEncoded.push(`${counter}${letters[i]}`)
//             counter = 1;
//         }

//     }
//     console.log("lettersEncoded", lettersEncoded)
//     return lettersEncoded;
  
// }


// console.log("runLengthEncoding", runLengthEncoding('AAAAAAAAAAAAABBCCCCDD'))