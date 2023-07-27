class Calculator {
    private _accumulator: number = 0
    get accumulator(): number { return this._accumulator }

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