function mustChangeForAsc(a: number, b: number): boolean { return a > b }
function mustChangeForDesc(a: number, b: number): boolean { return a < b }
function sortAsc(a: number[]): void {
    for (let i = 0; i < a.length - 1; i = i + 1) {
        for (let j = i + 1; j < a.length; j = j + 1) {
            if (mustChangeForAsc(a[i], a[j])) {
                let t = a[i]
                a[i] = a[j]
                a[j] = t
            }
        }
    }
}
function sortDesc(a: number[]): void {
    for (let i = 0; i < a.length - 1; i = i + 1) {
        for (let j = i + 1; j < a.length; j = j + 1) {
            if (mustChangeForDesc(a[i], a[j])) {
                let t = a[i]
                a[i] = a[j]
                a[j] = t
            }
        }
    }
}
//                                                arrow operator
function sort(a: number[], f: (x: number, y: number) => boolean): void {
    for (let i = 0; i < a.length - 1; i = i + 1) {
        for (let j = i + 1; j < a.length; j = j + 1) {
            if (f(a[i], a[j])) {
                let t = a[i]
                a[i] = a[j]
                a[j] = t
            }
        }
    }
}

let numeri: number[] = [34, 23456, 478, 234, 4689, 345, 7658, 586, 765]
console.log(numeri)
sortAsc(numeri)
console.log(numeri)
sortDesc(numeri)
console.log(numeri)
let fun = mustChangeForAsc
sort(numeri, fun)
console.log(numeri)
sort(numeri, mustChangeForDesc)
console.log(numeri)

let f1 = function (i: number, j: number): boolean {
    return i % 2 == 0 ? i > j : i < j
}
sort(numeri, f1)
console.log(numeri)
//sort(numeri, (a, b) => { return a % 2 == 0 ? a < b : a > b })
sort(numeri, (a, b) => a % 2 == 0 ? a < b : a > b)
console.log(numeri)