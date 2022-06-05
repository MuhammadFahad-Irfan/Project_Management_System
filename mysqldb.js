const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql-db-1',
    port: 3307
})

con.connect((err) => {
    if (err) {
        console.warn(err)
    }
    else {
        console.warn("connected")
    }
})


module.exports = con;