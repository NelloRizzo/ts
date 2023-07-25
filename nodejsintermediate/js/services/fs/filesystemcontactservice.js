import fs from 'fs';
import { Page } from "../crudservice.js";
export class FileSystemContactService {
    fileName;
    contacts = [];
    nextId() {
        const max = Math.max(0, ...this.contacts.map(contact => contact.id)) + 1;
        return max;
    }
    constructor(fileName) {
        this.fileName = fileName;
    }
    async load() {
        if (!fs.existsSync(this.fileName))
            return [];
        this.contacts = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
        return this.contacts;
    }
    async save() {
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.contacts));
    }
    saveContact(entity) {
        entity.id = this.nextId();
        entity.createdAt = new Date();
        this.contacts.push(entity);
    }
    async create(entity) {
        await this.load();
        if (Array.isArray(entity))
            entity.forEach(e => this.saveContact(e));
        else
            this.saveContact(entity);
        await this.save();
        return entity;
    }
    async read(id) {
        return (await this.load()).filter(c => c.id == id).pop();
    }
    async update(id, entity) {
        await this.load();
        const contact = this.contacts.filter(c => c.id == id).pop();
        if (!contact)
            return undefined;
        contact.firstName = entity.firstName;
        contact.lastName = entity.lastName;
        contact.friendlyName = entity.friendlyName;
        await this.save();
        return contact;
    }
    async delete(id) {
        await this.load();
        const contact = this.contacts.filter(c => c.id == id).pop();
        if (!contact)
            return undefined;
        this.contacts.splice(this.contacts.indexOf(contact), 1);
        await this.save();
        return contact;
    }
    async findList(...params) {
        let contacts = (await this.load());
        params.forEach(p => {
            console.log(p);
            contacts = contacts.filter(c => p.filter(c));
        });
        return contacts;
    }
    async findPage(pageCount, pageSize) {
        await this.load();
        const size = pageSize || 50;
        const totalPages = this.contacts.length / size;
        const start = pageCount * size;
        return new Page(this.contacts.slice(start, start + size), this.contacts.length, pageSize, pageCount);
    }
}
