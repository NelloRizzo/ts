/*
Supponiamo di voler gestire uno zoo in cui ogni animale
possa produrre il proprio verso.

Un animale è un'entità che è in grado di produrre un verso.
*/

interface Rumoreggiante {
    faiIlTuoVerso(): void
}
interface Festivalbar {
    canta(): void
}

abstract class Animale implements Rumoreggiante {

    public constructor(protected specie: string) { }

    public abstract faiIlTuoVerso(): void
}
function spettacolo(c: Festivalbar[]) {
    c.forEach(i => i.canta())
}
function zoo(a: Rumoreggiante[]): void {
    // per ogni animale in a
    a.forEach(animale =>
        // l'animale fa il proprio verso
        animale.faiIlTuoVerso())
}

class Leone extends Animale {
    public constructor() { super("Leone") }
    public override faiIlTuoVerso(): void {
        console.log(`Sono un ${this.specie} e sto ruggendo...`)
    }
}
class Gatto extends Animale {
    public constructor() { super("Gatto") }
    public override faiIlTuoVerso(): void {
        console.log(`Sto miagolando, perché sono un ${this.specie}...`)
    }
}

class Persona {
    public constructor(public nome: string) { }
}
class Cantante extends Persona implements Rumoreggiante, Festivalbar {
    public constructor(nome: string) { super(nome) }
    public faiIlTuoVerso(): void { console.log("Le domeniche d'agosto quanta neve che cadrà...") }
    public canta(): void { this.faiIlTuoVerso() }
}

{
    let leone = new Leone()
    let gatto = new Gatto()
    //let minollo = new Animale()
    let gigi = new Cantante("Gigi D'Alessio")
    let animali = [leone, gatto, gigi]
    zoo(animali)
    spettacolo([gigi])
}