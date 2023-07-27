import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://localhost:27017"

class City {
    constructor(public name: string, public provinceId: ObjectId) { }
}
class Province {
    constructor(public name: string, public acronym: string) { }
}
try {
    const conn = await MongoClient.connect(url)
    console.log("Connected")

    const db = conn.db("nodejs")

    await db.dropCollection('cities')
    await db.dropCollection('provinces')

    const provinces = db.collection('provinces')
    const cities = db.collection('cities')

    const na = await provinces.insertOne(new Province("Napoli", "NA"))
    const mi = await provinces.insertOne(new Province("Milano", "MI"))
    const rm = await provinces.insertOne(new Province("Roma", "RM"))

    const list = await cities.insertMany(
        [new City("Napoli", na.insertedId), new City("Milano", mi.insertedId)
            , new City("Ostia", rm.insertedId), new City("Roma", rm.insertedId)]
    )

    const join = await cities.aggregate([
        {
            $lookup: {
                from: 'provinces',
                localField: 'provinceId',
                foreignField: '_id',
                as: 'province'
            }
        }
    ]).toArray()
    join.forEach(i => console.log(i))
    await conn.close()
} catch (err) {
    console.log("Error", err)
}