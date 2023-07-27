"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
class Calculator {
    _accumulator = 0;
    get accumulator() { return this._accumulator; }
    add(n) {
        this._accumulator += n;
        return this;
    }
    sub(n) {
        this._accumulator -= n;
        return this;
    }
    mul(n) {
        this._accumulator *= n;
        return this;
    }
    div(n) {
        this._accumulator /= n;
        return this;
    }
}
exports.Calculator = Calculator;
