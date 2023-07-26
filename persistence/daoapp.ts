import mysql, { ResultSetHeader } from 'mysql2/promise'
// Data Layer
interface IDao<T, K> {
    create(entity: T): Promise<T>
    read(id: K): Promise<T>
    update(id: K, entity: T): Promise<T>
    delete(id: K): Promise<T>
}
class CustomerDataModel {
    constructor(public id: number, public name: string, public address: string) { }
}
// --- END Data Layer

// Application Layer
class CustomerDto {
    constructor(public id: number, public name: string, public address: string) { }
}
interface IServiceCustomer {
    create(c: CustomerDto): Promise<CustomerDto>
    read(id: number): Promise<CustomerDto>
    update(id: number, c: CustomerDto): Promise<CustomerDto>
    delete(id: number): Promise<CustomerDto>
}
class ServiceCustomer implements IServiceCustomer {
    constructor(private dao: IDao<CustomerDataModel, number>) { }

    create(c: CustomerDto): Promise<CustomerDto> {
        // if c is valid entity!
        // convert c to data model
        return this.dao.create(c)
    }
    read(id: number): Promise<CustomerDto> {
        const data = this.dao.read(id)
        // convert to dto
        return data
    }
    update(id: number, c: CustomerDto): Promise<CustomerDto> {
        // if c is valid entity!
        // convert c to data model
        return this.dao.update(id, c)
    }
    delete(id: number): Promise<CustomerDto> {
        return this.dao.delete(id)
    }

}
// --- END Application Layer

// User/Web Layer
import express from 'express'

class CustomersMySqlDao implements IDao<CustomerDataModel, number> {
    private INSERT_SQL = "INSERT INTO customers(name, address) VALUES(?,?);"
    private SELECT_SQL = "SELECT id, name, address FROM customers WHERE id = ?"
    private DELETE_SQL = ""
    private UPDATE_SQL = ""

    private _connection?: mysql.Connection

    private async connection(): Promise<mysql.Connection> {
        if (!this._connection)
            this._connection = await mysql.createConnection(
                {
                    host: this.host,
                    port: this.port,
                    user: this.user,
                    password: this.password,
                    database: this.schema
                })
        return this._connection
    }
    constructor(private host: string, private port: number, private user: string, private password: string, private schema: string) {
    }

    async create(entity: CustomerDataModel): Promise<CustomerDataModel> {
        const result = await (await this.connection()).query(
            this.INSERT_SQL, [entity.name, entity.address])
        entity.id = (result[0] as ResultSetHeader).insertId
        return entity
    }
    async read(id: number): Promise<CustomerDataModel> {
        const [rows] = await (await this.connection()).query(this.SELECT_SQL, [id])
        const record = (rows as mysql.RowDataPacket[])[0]
        return new CustomerDataModel(record.id, record.name, record.address)
    }
    update(id: number, entity: CustomerDataModel): Promise<CustomerDataModel> {
        throw new Error('Method not implemented.')
    }
    delete(id: number): Promise<CustomerDataModel> {
        throw new Error('Method not implemented.')
    }
}

class CustomersMongoDao implements IDao<CustomerDataModel, number>{
    create(entity: CustomerDataModel): Promise<CustomerDataModel> {
        throw new Error('Method not implemented.')
    }
    read(id: number): Promise<CustomerDataModel> {
        throw new Error('Method not implemented.')
    }
    update(id: number, entity: CustomerDataModel): Promise<CustomerDataModel> {
        throw new Error('Method not implemented.')
    }
    delete(id: number): Promise<CustomerDataModel> {
        throw new Error('Method not implemented.')
    }
}

const _mysql = true
const customers: IServiceCustomer = new ServiceCustomer(
    _mysql ? new CustomersMySqlDao('localhost', 3306, 'root', 'root', 'nodejs') :
        new CustomersMongoDao())

express()
    .get('/customers/:id', async (req, res) => {
        res.send(await customers.read(parseInt(req.params.id)))
    })
    .listen(88, () => console.log("Server listening"))