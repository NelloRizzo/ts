export class Contact {
    firstName;
    lastName;
    friendlyName;
    id;
    createdAt;
    addresses;
    constructor(firstName, lastName, friendlyName, id, createdAt, addresses) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.friendlyName = friendlyName;
        this.id = id;
        this.createdAt = createdAt;
        this.addresses = addresses;
    }
    get displayName() {
        return this.friendlyName || `${this.firstName} ${this.lastName}`;
    }
}
