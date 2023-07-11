function increment(i: number){
    console.log("Ingresso: i = ", i)
    i = i + 1
    console.log("Uscita: i = ", i)
}
function incrementA(i: number[]){
    console.log("Ingresso: i[0] = ", i[0])
    i[0] = i[0] + 1
    console.log("Uscita: i[0] = ", i[0])
}

let n : number = 0
console.log("n = ", n)
increment(n)
console.log("n = ", n)
let a: number[] = [0]
console.log("a[0] = ", a[0])
incrementA(a)
console.log("a[0] = ", a[0])