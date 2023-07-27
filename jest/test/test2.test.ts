import { Calculator } from "../calculator.js";

test('Using calculator - test 2', () => {
    const calculator = new Calculator()
    calculator.add(10) // 10
        .div(2) // 5
        .sub(3) // 2
        .mul(6) // 12
    expect(calculator.accumulator).toBe(22)
})