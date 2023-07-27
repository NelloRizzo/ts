class Calculator {
    get accumulator(): number { return this._accumulator }

    constructor(private _accumulator: number = 0) { }

    clear() { this._accumulator = 0 }
    add(n: number): Calculator {
        this._accumulator += n
        return this
    }
    sub(n: number): Calculator {
        this._accumulator -= n
        return this
    }
    mul(n: number): Calculator {
        this._accumulator *= n
        return this
    }
    div(n: number): Calculator {
        this._accumulator /= n
        return this
    }
}

export { Calculator }