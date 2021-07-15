const cTable = require('console.table');
const database = require('../../db/connection');

class Employees {
    async getAllEmployees() {
        try {
            const sqlCode = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, department.name, manager.first_name AS manager_first, manager.last_name AS manager_last
                FROM employees
                LEFT JOIN roles
                ON employees.role_id
                LEFT JOIN department
                ON roles.department_id
                LEFT JOIN employees
                ON employees.manager_id;`
            const [rows, fields] = await database.promise().query(sqlCode)
            console.table(rows)
        } catch (error) {
            console.log('Error attempting to show employees.')
        }
    }

    async getDepartmentID(department) {
        const sqlCode = 'SELECT id FROM department WHERE name = ?'
        const [rows, fields] = await database.promise().query(sqlCode, [department])
        return rows[0].id;
    }

    async getRoleID(roles, department) {
        const sqlCode = 'SELECT id FROM roles WHERE title = ? AND department_id = ?'
        const parameter = [roles, await this.getDepartmentID(department)]
        const [rows, fields] = await database.promise().query(sqlCode, parameter)
        return rows[0].id;
    }

    async addEmployee({first_name, last_name, department, manager_first, manager_last}, roles) {
        const sqlCode = 'INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)'
        const role_id = await this.getRoleId(roles, department);
        const manager_id = await this.getManagerID(manager_first, manager_last);
        const parameter = [first_name, last_name, role_id, manager_id]
        await database.promise().query(sqlCode, parameter)
        console.log('Your employee has been created.')
    }

    async updateRole(roles, name, department) {
        const sqlCode = `UPDATE employees SET role_id = ?
        WHERE first_name = ? AND last_name = ?`
        const parameter = [await this.getRoleID(roles, department), name[0], name[1]]
        await database.promise().query(sqlCode, parameter);
        console.log('Your employee has been updated.');
    }
}

module.exports = Employees;