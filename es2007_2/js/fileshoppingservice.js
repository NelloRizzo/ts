"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileShoppingService = void 0;
const shoppingservice_js_1 = require("./shoppingservice.js");
const fs_1 = __importDefault(require("fs"));
class FileShoppingService {
    fileName;
    constructor(fileName) {
        this.fileName = fileName;
    }
    async load() {
        if (!fs_1.default.existsSync(this.fileName))
            return [];
        try {
            return JSON.parse(await fs_1.default.promises.readFile(this.fileName, 'utf-8'));
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }
    async save(data) {
        try {
            await fs_1.default.promises.writeFile(this.fileName, JSON.stringify(data));
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    async get(date, status) {
        let data = await this.load();
        if (date)
            data = data.filter(i => i.date.getTime() == date.getTime());
        if (status)
            return data.filter(i => status == i.status);
        return data;
    }
    async getById(id) {
        return (await this.get()).filter(i => i.id == id).pop();
    }
    async add(item) {
        const data = await this.load();
        let id = Math.max(0, ...data.map(i => i.id));
        if (Array.isArray(item)) {
            item.forEach(v => {
                v.id = ++id;
                v.createdAt = new Date();
                v.status = shoppingservice_js_1.Status.ToBuy;
                data.push(v);
            });
        }
        else {
            item.id = id + 1;
            item.status = shoppingservice_js_1.Status.ToBuy;
            item.createdAt = new Date();
            data.push(item);
        }
        await this.save(data);
        return item;
    }
    async markAsPurchased(itemId) {
        const data = (await this.load());
        let item = data.filter(i => i.id == itemId).pop();
        if (!item)
            throw "Item not found";
        item.status = shoppingservice_js_1.Status.Purchased;
        await this.save(data);
        return item;
    }
    async remove(itemId) {
        const data = (await this.load());
        let item = data.filter(i => i.id == itemId).pop();
        if (!item)
            throw "Item not found";
        delete data[data.indexOf(item)];
        await this.save(data);
        return item;
    }
}
exports.FileShoppingService = FileShoppingService;
