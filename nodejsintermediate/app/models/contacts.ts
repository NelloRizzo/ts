import { Address } from "./addresses";

export class Contact {
    constructor(
        public firstName: string,
        public lastName: string,
        public friendlyName?: string,
        public id?: number,
        public createdAt?: Date,
        public addresses?: Array<Address>
    ) { }

    get displayName(): string {
        return this.friendlyName || `${this.firstName} ${this.lastName}`
    }
}