import mysql from 'mysql2/promise'

const params = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'nodejs'
}

const connection = await mysql.createConnection(params)
try {
    await connection.connect()
    console.log(`Connection established with server on ${params.host}:${params.port}...`)
    const createTableDDL = "CREATE TABLE contacts(\
        firstName VARCHAR(20) NOT NULL,\
        lastName VARCHAR(20) NOT NULL,\
        friendlyName VARCHAR(15) NOT NULL,\
        id INT NOT NULL AUTO_INCREMENT,\
        PRIMARY KEY(id));"

    console.log("Tabella creata", await connection.query(createTableDDL))

    const insertDML = "INSERT INTO contacts(firstName, lastName, friendlyName)\
        VALUES(?,?,?)"
    console.log("After insert", await connection.query(insertDML, ["Archimede", "Pitagorico", "archi"]))
    console.log("After insert", await connection.query(insertDML, ["Paperon", "de' Paperoni", "paperone"]))
    console.log("After insert", await connection.query(insertDML, ["Pico", "de' Paperis", "pico"]))

    const selectDML = "SELECT id, firstName, lastName, friendlyName\
        FROM contacts"
    const [sel, def] = await connection.query(selectDML)
    console.log(`After SELECT, rows = `, sel)
    console.log(`After SELECT, table fields = `, def)
    console.log("Results");
    (sel as mysql.RowDataPacket[]).forEach(e => console.log(e.firstName))

}
finally {
    try {
        const deleteTableDDL = "DROP TABLE contacts"
        console.log("Table deleted", await connection.query(deleteTableDDL))
    }
    catch (e) {
        console.log("Error while drop table...", e)
    }
    if (connection) console.log("Connection closed", await connection.end())
}
