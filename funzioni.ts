// nome è PARAMETRO della funzione
function saluto(nome: string = "Mondo", times: number = 1) {

    function test() { // inner function
        console.log("Test")
    }

    let square = function (i?: number): number {
        if (!i) {
            console.log("Il valore del parametro non è definito")
        }
        return (i || 10) * (i || 10)
    }

    //let nome: string = "Paperone"
    for (let i = 0; i < times; i = i + 1)
        console.log("Ciao, ", nome)
    test()
    let r = square()
    console.log("square senza parametri", r)
    for (let i = 0; i < 10; i = i + 1) {
        r = square(i)
        console.log(r)
    }
}

let nome: string = "Archimede"
// nome è ARGOMENTO della funzione associato al parametro nome di saluto!
saluto(nome)
console.log("Ciao, ", nome)
saluto("Paperina", 3)
saluto()

function spreadTest(...args: any[]) {
    args.forEach(element => {
        console.log("spreadTest", element)
    });
}

function spread2(t: any, ...args: any[]) {
    if (!t || t.length == 0) return;
    console.log("spread2", t, args)
    spread2(args.pop(), args)
}

spreadTest(1, "Pippo", new Date())
spread2(1, "Pippo", new Date(), "false")
