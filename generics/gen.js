"use strict";
// supponiamo di dover stampare delle stringhe
function printStrings(s) {
    s.forEach(i => console.log(i));
}
// supponiamo di dover stampare dei numeri
function printNumbers(n) {
    n.forEach(i => console.log(i));
}
function printG(n) {
    console.log("Print G");
    n.forEach(i => console.log(i));
}
function printA(n) {
    console.log("Print A");
    n.forEach(i => console.log(i));
}
function print(n) {
    console.log("Print<T>");
    n.forEach(i => console.log(i));
}
class Pair {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
}
function printLen(a) {
    console.log(a.length);
}
{
    let n = ["pippo", "pluto", "paperino"];
    let s = [1, 2, 3, 4, 5];
    printStrings(n);
    printNumbers(s);
    printG(n);
    printG(s);
    let t = [1, "pluto", new Date()];
    printG(t);
    printA(n);
    printA(s);
    //printA(t)
    let d = [new Date(), new Date(), new Date()];
    print(d);
    print(s);
    print(n);
    let pns = new Pair(1, "Uno");
    console.log(pns);
    let psn = new Pair("Due", 2);
    console.log(psn.first);
    //psn.first = 2
    console.log(psn);
    printLen([1, 2]);
    printLen("abc");
    //printLen(1)
    class My {
        constructor(length = 20) {
            this.length = length;
        }
    }
    printLen(new My(35));
    printLen(new My());
    let a = [];
    let b = [1, 2, 3, 4, 5];
    let c = [1, "pippo"];
    console.log(b, c);
    [b[1], b[0]] = [b[0], b[1]];
    console.log(b);
    let x = 1;
    let y = 2;
    [x, y] = [y, x];
    console.log(x, y);
}
