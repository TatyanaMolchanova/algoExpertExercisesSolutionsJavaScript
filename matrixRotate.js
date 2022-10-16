const matrix = [[1,0,1],[0,0,1],[1,1,1]];

const rotateMatrix90Left = (matrix) => {
    const matrixLength = matrix.length;
    console.log("matrixLength", matrixLength)
    console.log("matrixLength / 2", matrixLength / 2)
    

    for (let i = 0; i < matrixLength / 2; i++) {
        console.log("i", i)
        
        for (let j = i; j < matrixLength - i - 1; j++) {
            console.log("j", j)
            
            const temp = matrix[i][j];
            console.log("temp", temp)
            
            matrix[i][j] = matrix[j][matrixLength - 1 - i]
            console.log("matrixLength - 1 - i", matrixLength - 1 - i)
            console.log("matrix[i][j]", matrix[i][j])

            matrix[j][matrixLength - 1 - i] = matrix[matrixLength - 1 - i][matrixLength - 1 - j]
            
            console.log("matrix[j][matrixLength - 1 - i]", matrix[j][matrixLength - 1 - i])
            console.log("matrix[j][matrixLength - 1 - j]", matrix[j][matrixLength - 1 - j])
            console.log("matrix[matrixLength - 1 - i][matrixLength - 1 - j]", matrix[matrixLength - 1 - i][matrixLength - 1 - j])
            matrix[matrixLength - 1 - i][matrixLength - 1 - j] = matrix[matrixLength - 1 - j][i]

            matrix[matrixLength - 1 - j][i] = temp

        }
    }
}

rotateMatrix90Left(matrix);
console.log(matrix);