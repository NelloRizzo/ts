let numeri: number[] = [324, 243, 367, 6789, 334, 9708]
console.log(numeri[3]) // 6789
numeri.push(34213) // aggiunge
console.log(numeri)
let n = numeri.pop()
console.log(n)
console.log(numeri)

numeri.sort()
console.log(numeri)

numeri
    .filter((v, i) => i % 2 == 0)
    .map((v, i) => `Elemento: ${v} in posizione ${i}`)
    .forEach((v, i) => console.log(v, i))

console.log(numeri)