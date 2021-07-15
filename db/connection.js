const mysql = require('mysql2');

// add connection to db
const database = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'csr_sql149',
        database: 'employees_db'
    },
    console.log('Employees connection established')
);

database.connect((err) => {
    if (err) throw err;
});

module.exports = database;