"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.CartItem = void 0;
var Status;
(function (Status) {
    Status[Status["Purchased"] = 0] = "Purchased";
    Status[Status["ToBuy"] = 1] = "ToBuy";
})(Status || (exports.Status = Status = {}));
class CartItem {
    id;
    name;
    quantity;
    measureUnit;
    price;
    date;
    status;
    createdAt;
    constructor(id, name, quantity, measureUnit, price, date, status, createdAt) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.measureUnit = measureUnit;
        this.price = price;
        this.date = date;
        this.status = status;
        this.createdAt = createdAt;
    }
}
exports.CartItem = CartItem;
