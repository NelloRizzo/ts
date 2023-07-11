console.log("Hello, World!")
// dichiarazione di variabile
let numero = 10
console.log(numero) // stampa sul log di output il valore della vairiabile
numero = 11
console.log(numero)
const NUMERO = 10
console.log(NUMERO)
/*
NUMERO = 11 // non è possibile la modifica di una costante!
*/

let espressione = (10 + 2) * ((3 - 4) / 5)
console.log(espressione)
//  l-value = r-value
let modulo = 14 % 3
console.log(modulo)

let n: number = 1111
let s: string = 'Pippo'
console.log(s)
s = "De' Paperoni"
console.log(s)
s = `Archimede: ${n} - ${s}: ${modulo}`
console.log(s)

let l: boolean = false
l = true
let n1 = 1
let n2 = 2
console.log(n1 > n2)
console.log(n1 >= n2)
console.log(n1 <= n2)
console.log(n1 < n2)
console.log(n1 == n2)
console.log(n1 != n2)
let eta: number = 16
let permesso_genitori: string = 'si'

console.log('età > 18 = ', eta >= 18)
console.log('permesso dei genitori? ', permesso_genitori == 'si')
// || -> OR = true se almeno una dei due operandi è true!
console.log('autorizzato: ', (eta >= 18) || (permesso_genitori == 'si'))
// && -> AND = true se entrambi gli operandi sono true!
console.log('autorizzato: ', (eta >= 18) && (permesso_genitori == 'si'))
// ! -> NOT
console.log(!(eta > 18))
let auth: string = (eta >= 18) || (permesso_genitori == 'si') ? "SI" : "NO" 
console.log("Stato autorizzazione: ", auth )