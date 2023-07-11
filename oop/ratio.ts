/*
La nostra applicazione deve essere in grado di gestire
le operazioni tra frazioni aritmetiche.

cosa si intende per frazione?
[una frazione] è un elemento caratterizzato da [un 
segno], oltre [un numeratore] e [un denominatore] 
entrambi interi positivi e non multipli l'uno 
dell'altro.
Le operazioni effettuabili sono: <addizionare>, <sottrarre>, 
<moltiplicare>, <dividere>...

frazione
    numeratore
    denominatore
    segno (ad esempio 1 per positivo e -1 per negativo)
*/

class Ratio {
    private numerator: number;
    private denominator: number;
    protected signum: number;

    private gcf(a: number, b: number): number {
        if (b == 0) return a
        if (a < b) { let t = a; a = b; b = t }
        return this.gcf(b, a % b)
    }

    public constructor(
        numerator: number,
        denominator: number
    ) {
        this.signum = Math.sign(numerator * denominator)
        this.denominator = Math.abs(denominator)
        this.numerator = Math.abs(numerator)
        let gcf = this.gcf(this.numerator, this.denominator)
        this.numerator /= gcf
        this.denominator /= gcf
    }

    public asString(): string {
        if (this.numerator == 0) return "0"
        let r = ""
        if (this.signum < 0) r += "-"
        r += this.numerator
        if (this.denominator != 1)
            r += "/" + this.denominator
        return r
    }

    public add(r: Ratio): Ratio {
        return new Ratio(this.signum * this.numerator * r.denominator
            + r.signum * r.numerator * this.denominator,
            this.denominator * r.denominator)
    }
    public mul(r: Ratio): Ratio {
        return new Ratio(this.signum * this.numerator * r.signum * r.numerator,
            r.denominator * this.denominator)
    }
}

class SuperRatio extends Ratio {

    public constructor(n: number) {
        super(Math.trunc(n * 10000), 10000)
        this.signum = -this.signum
    }

    public pow(e: number): Ratio {
        let r = new Ratio(1, 1)
        for (let i = 0; i < e; i++)
            r = r.mul(this)
        return r
    }

    public override mul(r: Ratio): Ratio {
        console.log("Sto moltiplicando in SuperRatio")
        return super.mul(r)
    }
}

function handleRatio(r: Ratio) {
    console.log("handleRatio", r.mul(new Ratio(2, 4)))
}

{
    let f1 = new Ratio(10, 20) // 1/2
    let f2 = new Ratio(1, -2) // -1/2
    let f3 = new SuperRatio(12.53) // 1/2
    console.log(f1.asString(), f2.asString(), f3.asString())
    console.log(f1.add(f3).asString())
    console.log(f3.mul(f1).asString())
    console.log(f3.pow(6))
    handleRatio(f1)
    handleRatio(f3)
    //f1.numerator = -4
    //console.log(f1, f2, f3)
    //console.log(f1.gcf(10,24))
}