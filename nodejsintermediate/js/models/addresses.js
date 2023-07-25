export class Address {
}
export class PhoneNumberAddress extends Address {
    phone;
    re = /\+?\d(\d{1,11})/;
    get isValid() { return this.re.test(this.phone); }
    constructor(phone) {
        super();
        this.phone = phone;
    }
}
export class EmailAddress extends Address {
    email;
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    get isValid() { return this.re.test(this.email); }
    constructor(email) {
        super();
        this.email = email;
    }
}
