/*
Occorre implementare un sistema in grado di 
distribuire un mazzo di carte da gioco
*/
class Exception { }
class DeckEmptyException extends Exception { }
class CardsException extends Exception { }
class InvalidCardValueException extends CardsException {
    constructor(public invalidValue: number) {
        super()
    }
}

abstract class Card {
    public constructor(
        public readonly seed: number,
        public readonly value: number) { }
}
abstract class Deck {
    protected cards: Card[] = []
    private current: number = 0

    public next(): Card {
        if (this.hasMoreCards())
            return this.cards[this.current++];
        throw new DeckEmptyException()
    }
    public hasMoreCards = (): boolean => this.current < this.cards.length
    public reset(): void {
        this.current = 0
    }
    public shuffle(times: number = 1000) {
        for (let i = 0; i < times; i++) {
            let p1 = Math.trunc(Math.random() * this.cards.length)
            let p2 = Math.trunc(Math.random() * this.cards.length)
            let t = this.cards[p1]
            this.cards[p1] = this.cards[p2]
            this.cards[p2] = t
        }
    }
}

function dealer(c: Deck) {
    while (c.hasMoreCards())
        console.log(c.next().toString())
}

enum NeapoleanSeeds { Denari, Coppe, Spade, Bastoni }
class NeapoleanCard extends Card {
    public constructor(seed: NeapoleanSeeds, value: number) {
        if (value < 1 || value > 10)
            throw new InvalidCardValueException(value)
        super(seed, value)
    }

    override toString(): string {
        if (this.seed == NeapoleanSeeds.Denari && this.value == 7)
            return "settebello"
        const seeds = ["denari", "coppe", "spade", "bastoni"]
        const values = ["asso", "2", "3", "4", "5", "6", "7", "donna", "cavallo", "re"]
        return `${values[this.value - 1]} di ${seeds[this.seed]}`
    }
}

class NeapoleanDeck extends Deck {
    public constructor() {
        super()
        for (let s = 0; s < 4; s++)
            for (let v = 1; v < 11; v++)
                this.cards.push(new NeapoleanCard(s, v))
    }
}

{
    dealer(new NeapoleanDeck())

    let d = new NeapoleanDeck()
    d.shuffle()
    dealer(d)
}