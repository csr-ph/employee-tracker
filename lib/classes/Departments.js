const cTable = require('console.table');
const database = require('../../db/connection');

class Departments {
    async getAllDepartments() {
        try {
            const sqlCode = 'SELECT * FROM department'
            const [rows, fields] = await database.promise().query(sqlCode)
            console.table(rows)
        } catch (error) {

        }
    }

    async addDepartments({name}) {
        const sqlCode = 'INSERT INTO department(name) VALUES(?)'
        await database.promise().query(sqlCode, name)
        console.log('Added your new Department.')
    }
}