let nome = "Archimede"
let sesso = "m"
let stato_civile = "celibe"

console.log("Programma iniziato")

// supponiamo di voler salutare l'utente con il nome fornito
// in maniera diversa se il sesso sia 'm' o 'f'

// dobbiamo fare un test sul valore della variabile "sesso"
if (stato_civile == "celibe" && sesso == "m") {
    console.log("Buongiorno, signorino", nome)
} else if (stato_civile == "sposato" && sesso == "m") {
    console.log("Buongiorno, sig.", nome)
}
else if (stato_civile == "nubile") {
    console.log("Buongiorno, sig.na", nome)
} else {
    console.log("Buongiorno, signora", nome)
}

let giorno: number = 4 // 0 = domenica, 1 = lunedi, ..., 6 = sabato
if (giorno == 0) { console.log("domenica") }
else if (giorno == 1) { console.log("lunedì") }
else if (giorno == 2) { console.log("martedì") }
else if (giorno == 3) { console.log("mercoledì") }
else if (giorno == 4) { console.log("giovedì") }
else if (giorno == 5) { console.log("venerdì") }
else { console.log("sabato") }

switch (giorno) {
    case 0: console.log("domenica")
        break;
    case 1: console.log("lunedì")
        break;
    case 2: console.log("martedì")
        break;
    case 3: console.log("mercoledì")
        break;
    case 4: console.log("giovedì")
    //break;
    case 5: console.log("venerdì")
        break;
    default: console.log("sabato")
}

let tabellina: number = 5
let i: number
i = 1
console.log(tabellina, ' per ', i, ' uguale ', tabellina * i)
i = 2
console.log(tabellina, ' per ', i, ' uguale ', tabellina * i)
i = 3
console.log(tabellina, ' per ', i, ' uguale ', tabellina * i)

console.log("While")
i = 11
while (i <= 10) {
    console.log(tabellina, ' per ', i, ' uguale ', tabellina * i)
    i = i + 1
}
console.log("Do/While")
i = 11
do {
    console.log(tabellina, ' per ', i, ' uguale ', tabellina * i)
    i = i + 1
} while (i <= 10)
console.log("For")
for (let v = 1; v <= 10; v = v + 1) {
    console.log(tabellina, ' per ', v, ' uguale ', tabellina * v)
}

for (; ;) {
    console.log("blocco dell'applicazione a causa di un loop infinito...")
}
console.log("Programma terminato")