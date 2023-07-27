import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017"

class City {
    constructor(public id: number, public name: string, public acronym: string) { }
}
class Fruit {
    constructor(public id: number, public fruitName: string) { }
}
try {
    const conn = await MongoClient.connect(url)
    console.log("Connected")

    const db = conn.db("nodejs")
    const collection = db.collection("contacts")

    const contacts = await collection.find().toArray()
    contacts.forEach(c => console.log(c))

    await db.dropCollection('cities')
    const list = await db.listCollections({ name: 'cities' }).toArray()
    const cities = list.pop() ? db.collection('cities') : await db.createCollection("cities",
        { autoIndexId: false })

    await cities.insertOne(new City(1, "Napoli", "NA"))
    let res = await cities.insertMany([new City(4, "Ostia", "RM"), new City(2, "Roma", "RM"), new City(3, "Milano", "MI")])
    console.log(res.insertedCount, res.insertedIds)

    let items = await cities.find().toArray()
    items.forEach(i => console.log(i.name))
    console.log("projection {name: true}")
    items = await cities.find({ acronym: "RM" }, { projection: { name: true, } }).toArray()
    items.forEach(i => console.log(i))
    console.log("projection {name: true, _id: false}")
    items = await cities.find({ acronym: "RM" }, { projection: { name: true, _id: false } }).toArray()
    items.forEach(i => console.log(i))
    console.log("query complesse")
    items = await cities.find({ name: /[M-R].+/ }).sort({ acronym: 1, name: -1 }).skip(1).limit(2).toArray()
    items.forEach(i => console.log(i))

    await conn.close()
} catch (err) {
    console.log("Error", err)
}