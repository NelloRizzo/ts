import { Status } from './shoppingservice.js';
import fs from 'fs';
export class FileShoppingService {
    fileName;
    constructor(fileName) {
        this.fileName = fileName;
    }
    async load() {
        if (!fs.existsSync(this.fileName))
            return [];
        try {
            return JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }
    async save(data) {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(data));
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
                data.push(v);
            });
        }
        else {
            item.id = id + 1;
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
        item.status = Status.Purchased;
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
