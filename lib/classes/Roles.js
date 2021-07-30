// import ctable for displaying database tables in terminal
const cTable = require('console.table');
// import connection
const database = require('../../db/connection');

// class for handling actions related to roles
class Roles {
    async getAllRoles() {
        try {
            const sqlCode = `SELECT roles.id, roles.title, roles.salary, department.name
                AS department
                FROM roles
                LEFT JOIN department
                ON roles.department_id`
            const [rows, fields] = await database.promise().query(sqlCode)
            console.table(rows);
        } catch (error) {
            console.log('An error occured while finding roles. It is probably my fault.')
        }
    }

    async getDepartmentID(department) {
        const sqlCode = 'SELECT id FROM department WHERE name = ?'
        const [rows, fields] = await database.promise().query(sqlCode, department)
        return rows[0].id;
    }

    async addRole({name, salary, department}) {
        const sqlCode = 'INSERT INTO roles(title, salary, department_id) VALUES(?,?,?)'
        const parameter = [name, salary, await this.getDepartmentID(department)]
        await database.promise().query(sqlCode, parameter)
        console.log('Your role has been created.')
    }

    async getRoleNames() {
        const sqlCode = 'SELECT roles.title FROM roles'
        const [rows, fields] = await database.promise().query(sqlCode, parameter)
        return rows.map(roles => roles.title);
    }
}

module.exports = Roles;