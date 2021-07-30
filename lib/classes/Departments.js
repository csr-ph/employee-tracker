// import ctable for use in displaying database table to console
const cTable = require('console.table');
// import connection
const database = require('../../db/connection');

// create class for actions related to departments
class Departments {
    async getAllDepartments() {
        try {
            const sqlCode = 'SELECT * FROM department'
            const [rows, fields] = await database.promise().query(sqlCode)
            console.table(rows)
        } catch (error) {
            console.log('An error occured while finding departments. It is probably my fault.')
        }
    }

    async getDepartmentNames() {
        const sqlCode = 'SELECT department.name FROM department'
        const [rows, fields] = await database.promise().query(sqlCode)
        return rows.map(department => department.name);
    }

    async addDepartment({name}) {
        const sqlCode = 'INSERT INTO department(name) VALUES(?)'
        await database.promise().query(sqlCode, name)
        console.log('Added your new Department.')
    }
}

module.exports = Departments;