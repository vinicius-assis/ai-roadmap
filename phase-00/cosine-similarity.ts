let a = [1, 2, 2]
let b = [2, 0, 1]

// escalar = 2.1 + 3.2 + 5.4 = 28
// normarA = 4+9+25 = 38
// normarB = 1+4+16 = 21

function generateNorm(x: number[]) {
    const sum = x.reduce((acc, num) => acc + (num*num),0)
    return Math.sqrt(sum)
}

function cosineSimilarity(a: number[], b: number[]): number {
    let escale = 0;
    for(let i = 0; i < a.length; i++) {
        escale += (a[i] * b[i])
    }
    const normarA = generateNorm(a)
    const normarB = generateNorm(b)
    const result = escale / (normarA * normarB)
    return result

}

console.log(cosineSimilarity(a, b))