import fs from 'fs'

import { Contact } from "../../models/contacts.js";
import { IContactService } from "../contactservice.js";
import { Filter, Page } from "../crudservice.js";


export class FileSystemContactService implements IContactService {
    private contacts: Array<Contact> = []

    private nextId(): number {
        const max = Math.max(0, ...this.contacts.map(contact => contact.id!)) + 1
        return max
    }

    constructor(private fileName: string) { }

    private async load(): Promise<Array<Contact>> {
        if (!fs.existsSync(this.fileName)) return []
        this.contacts = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8')) as Array<Contact>
        return this.contacts
    }

    private async save(): Promise<void> {
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.contacts))
    }

    private saveContact(entity: Contact) {
        entity.id = this.nextId()
        entity.createdAt = new Date()
        this.contacts.push(entity)
    }
    async create(entity: Contact | Array<Contact>): Promise<Contact | Array<Contact>> {
        await this.load()
        if (Array.isArray(entity))
            (entity as Array<Contact>).forEach(e => this.saveContact(e))
        else
            this.saveContact(entity)
        await this.save()
        return entity
    }
    async read(id: number): Promise<Contact | undefined> {
        return (await this.load()).filter(c => c.id == id).pop()
    }
    async update(id: number, entity: Contact): Promise<Contact | undefined> {
        await this.load()
        const contact = this.contacts.filter(c => c.id == id).pop()
        if (!contact) return undefined
        contact.firstName = entity.firstName
        contact.lastName = entity.lastName
        contact.friendlyName = entity.friendlyName
        await this.save()
        return contact
    }
    async delete(id: number): Promise<Contact | undefined> {
        await this.load()
        const contact = this.contacts.filter(c => c.id == id).pop()
        if (!contact) return undefined
        this.contacts.splice(this.contacts.indexOf(contact), 1)
        await this.save()
        return contact
    }
    async findList(...params: Filter<Contact>[]): Promise<Contact[]> {
        let contacts = (await this.load())
        params.forEach(p => {
            console.log(p)
            contacts = contacts.filter(c => p.filter(c))
        })
        return contacts;
    }

    async findPage(pageCount: number, pageSize?: number): Promise<Page<Contact>> {
        await this.load()
        const size = pageSize || 50
        const totalPages = this.contacts.length / size
        const start = pageCount * size
        return new Page<Contact>(
            this.contacts.slice(start, start + size),
            this.contacts.length,
            pageSize, pageCount
        )
    }
}