import { Calculator } from "../calculator";

describe('Uso delle 4 operazioni singolarmente', () => {
    const calc = new Calculator()
    beforeAll(() => { console.log('Before all') })
    beforeEach(() => {
        console.log('Before Each')
        calc.clear()
    })
    afterAll(() => console.log('After all'))
    afterEach(() => console.log('After each'))
    it('Addizione', () => {
        //const calc = new Calculator(10)
        calc.add(10)
        expect(calc.accumulator).toEqual(10)
    })
    it('Sottrazione', () => {
        //const calc = new Calculator(10)
        calc.sub(20)
        expect(calc.accumulator).toEqual(-20)
    })
})

describe('Uso delle 4 operazioni contemporaneamente', () => {
    it('Test', () => {
        const calc = new Calculator(5).add(10).sub(20).mul(-2).div(5)
        // risultato atteso = 2
        expect(calc.accumulator).toBe(2)
        expect(calc.accumulator).not.toBe(-2)
        expect(calc.accumulator).toBeGreaterThan(0)
        expect(calc.accumulator).toBeLessThanOrEqual(10)
    })
})