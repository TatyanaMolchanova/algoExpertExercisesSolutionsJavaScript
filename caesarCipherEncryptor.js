function caesarCipherEncryptor(string, key) {
    let result = string;
    let alphabet = ''; 
    let aaa = '';
    
    for (let i = 97; i <= 122; i++) {
        alphabet += String.fromCharCode(i)



        result.split('').map((letter, index) => {
            let numberOfIncreasing = letter.charCodeAt() + key;

                if (i === letter.charCodeAt()) {
                    if ((letter.charCodeAt() + key) > 122) {
                        numberOfIncreasing = 97 + key;
                       
                    }
                    console.log("letter.charCodeAt()", letter.charCodeAt());
                    console.log("letter.charCodeAt() + key", letter.charCodeAt() + key)
                    console.log("lString.fromCharCode(letter.charCodeAt() + key)", String.fromCharCode(numberOfIncreasing))
                    // console.log("lString.fromCharCode(letter.charCodeAt() + key)", String.fromCharCode(letter.charCodeAt() + key))
                    
                    
                    
                    aaa += String.fromCharCode(numberOfIncreasing)
                }

                console.log("aaa", aaa)
                
                aaa;

                // res += letter.charCodeAt() + key
            })

        
    }

    console.log("alphabet", alphabet)
    
    let res = '';

    // for (let i = 0; i < string.length; i++) {
        return 
    // }
        return result;
}

console.log("caesarCipherEncryptor('xyz', 2)", caesarCipherEncryptor("xyz", 2));
