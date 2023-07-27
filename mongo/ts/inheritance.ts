import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017"

enum AddressType {
    Business, Personal
}
class Address {
    constructor(public type: AddressType) { }
}
class Email extends Address {
    constructor(public email: string, type: AddressType) {
        super(type)
    }
}
class Phone extends Address {
    constructor(public phoneNumber: string, type: AddressType, public prefix?: string) {
        super(type)
    }
}
try {
    const conn = await MongoClient.connect(url)
    console.log("Connected")

    const db = conn.db("nodejs")
    const collection = db.collection("addresses")
    await collection.insertOne(new Phone("12345", AddressType.Business, "+39"))
    await collection.insertOne(new Phone("3245234", AddressType.Personal, "+39"))
    await collection.insertOne(new Phone("127657345", AddressType.Business))
    await collection.insertOne(new Email("asdas@email.com", AddressType.Business))
} catch (err) { console.log(err) }