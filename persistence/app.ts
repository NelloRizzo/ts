import mysql from 'mysql2'

const params = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'nodejs'
}

const connection = mysql.createConnection(params)
try {
    connection.connect((err) => {
        if (err) throw err

        console.log(`Connection established with server on ${params.host}:${params.port}...`)
    })

    const createTableDDL = "CREATE TABLE contacts(\
        firstName VARCHAR(20) NOT NULL,\
        lastName VARCHAR(20) NOT NULL,\
        friendlyName VARCHAR(15) NOT NULL,\
        id INT NOT NULL AUTO_INCREMENT,\
        PRIMARY KEY(id));"
    //connection.query(createTableDDL)

    const insertDML = "INSERT INTO contacts(firstName, lastName, friendlyName)\
        VALUES(?,?,?)"
    connection.query(insertDML, ["Archimede", "Pitagorico", "archi"])
    connection.query(insertDML, ["Paperon", "de' Paperoni", "paperone"])
    connection.query(insertDML, ["Pico", "de' Paperis", "pico"])

    const selectDML = "SELECT id, firstName, lastName, friendlyName\
        FROM contacts"
    connection.query(selectDML, (err, res) => {
        if (err) throw err
        console.log(res)
    })
}
finally {
    /*    try {
            const deleteTableDDL = "DROP TABLE contacts"
            connection.query(deleteTableDDL)
        }
        catch (e) {
            console.log("Error while drop table...", e)
        }*/
    if (connection) connection.end((err) => {
        if (err) throw err
        console.log("connection closed")
    })
}