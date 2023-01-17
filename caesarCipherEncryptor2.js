const caesarCipherEncryptor = (string, key) => {
    let newLetters = [];
    let newKey = key % 26;
    string.split('').map((letter) => newLetters.push(getNewLetter(letter, newKey)));
    return String.fromCharCode(...newLetters);
}
  
const getNewLetter = (letter, key) => {
    let newLetterCode = letter.charCodeAt() + key;
    return newLetterCode <= 122 ? newLetterCode : (96 + (newLetterCode % 122));
}

console.log("caesarCipherEncryptor", caesarCipherEncryptor('xyz', 2));
console.log("caesarCipherEncryptor", caesarCipherEncryptor('abc', 52));

















// function caesarCipherEncryptor(string, key) {
//     let newLetters = [];
//     let newKey = key % 26;
//     for (let i = 0; i < string.length; i++) {
//         newLetters.push(getNewLetter(string[i], key));
//     }
//     console.log("newLetters", newLetters)
//     String.fromCharCode(...newLetters)
//     console.log("String.fromCharCode(...newLetters)", String.fromCharCode(...newLetters))
    
//     return String.fromCharCode(...newLetters);
// }
  

// function getNewLetter(letter, key) {
//     let newLetter = letter.charCodeAt() + key;
//     return newLetter <= 122 ? newLetter : (96 + (newLetter % 122));
// }

// console.log("caesarCipherEncryptor", caesarCipherEncryptor('xyz', 2));
