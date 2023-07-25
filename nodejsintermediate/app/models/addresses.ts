export abstract class Address {
    abstract get isValid(): boolean;
}
export class PhoneNumberAddress extends Address {
    private re = /\+?\d(\d{1,11})/

    get isValid(): boolean { return this.re.test(this.phone) }
    constructor(public phone: string) { super() }
}
export class EmailAddress extends Address {
    private re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    get isValid(): boolean { return this.re.test(this.email) }
    constructor(public email: string) { super() }
}