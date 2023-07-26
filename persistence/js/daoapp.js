import mysql from 'mysql2/promise';
class CustomerDataModel {
    id;
    name;
    address;
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}
// --- END Data Layer
// Application Layer
class CustomerDto {
    id;
    name;
    address;
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}
class ServiceCustomer {
    dao;
    constructor(dao) {
        this.dao = dao;
    }
    create(c) {
        // if c is valid entity!
        // convert c to data model
        return this.dao.create(c);
    }
    read(id) {
        const data = this.dao.read(id);
        // convert to dto
        return data;
    }
    update(id, c) {
        // if c is valid entity!
        // convert c to data model
        return this.dao.update(id, c);
    }
    delete(id) {
        return this.dao.delete(id);
    }
}
// --- END Application Layer
// User/Web Layer
import express from 'express';
class CustomersMySqlDao {
    host;
    port;
    user;
    password;
    schema;
    INSERT_SQL = "INSERT INTO customers(name, address) VALUES(?,?);";
    SELECT_SQL = "SELECT id, name, address FROM customers WHERE id = ?";
    DELETE_SQL = "";
    UPDATE_SQL = "";
    _connection;
    async connection() {
        if (!this._connection)
            this._connection = await mysql.createConnection({
                host: this.host,
                port: this.port,
                user: this.user,
                password: this.password,
                database: this.schema
            });
        return this._connection;
    }
    constructor(host, port, user, password, schema) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.schema = schema;
    }
    async create(entity) {
        const result = await (await this.connection()).query(this.INSERT_SQL, [entity.name, entity.address]);
        entity.id = result[0].insertId;
        return entity;
    }
    async read(id) {
        const [rows] = await (await this.connection()).query(this.SELECT_SQL, [id]);
        const record = rows[0];
        return new CustomerDataModel(record.id, record.name, record.address);
    }
    update(id, entity) {
        throw new Error('Method not implemented.');
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
}
class CustomersMongoDao {
    create(entity) {
        throw new Error('Method not implemented.');
    }
    read(id) {
        throw new Error('Method not implemented.');
    }
    update(id, entity) {
        throw new Error('Method not implemented.');
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
}
const _mysql = true;
const customers = new ServiceCustomer(_mysql ? new CustomersMySqlDao('localhost', 3306, 'root', 'root', 'nodejs') :
    new CustomersMongoDao());
express()
    .get('/customers/:id', async (req, res) => {
    res.send(await customers.read(parseInt(req.params.id)));
})
    .listen(88, () => console.log("Server listening"));
