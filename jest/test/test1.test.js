"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculator_js_1 = require("../calculator.js");
test('Using calculator - test 1', () => {
    const calculator = new calculator_js_1.Calculator();
    calculator.add(10) // 10
        .div(2) // 5
        .sub(3) // 2
        .mul(6); // 12
    expect(calculator.accumulator).toBe(12);
});
