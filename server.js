const inquirer = require('inquirer');

const Departments = require('./lib/classes/Departments');
const Roles = require('./lib/classes/Roles');
const Employees = require('./lib/classes/Employees');

const startUpQuestion = [
    {
        type: 'list',
        name: 'actionDecision',
        message: 'What would you like to do?',
        choices: ['View departments', 'View roles', 'View employees', 'Add Department', 'Add role', 'Add employee', 'Update employee role']
    }
]

const createEmployee = [
    {
        type: 'input',
        name: 'first_name',
        message: 'Please enter a first name for the new employee: ',
        validate: name => {
            if(name) {
                return true;
            } else {
                console.log('Please enter a valid first name.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'Please enter a last name for the new employee: ',
        validate: name => {
            if(name) {
                return true;
            } else {
                console.log('Please enter a valid last name.');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'department',
        message: 'Please enter the department of your new employee: ',
        choices: async () => {
            let department = new Departments();
            return await department.getAllDepartments
        }
    },
    {
        type: 'input',
        name: 'manager_fn',
        message: 'Enter the first name of the manager: '
    },
    {
        type: 'input',
        name: 'manager_ln',
        message: 'Enter the last name of the manager: '
    }
]

const createDepartment = [
    {
        type: 'input',
        name: 'department_name',
        message: 'Please enter the name of your new department: ',
        validate: department_name => {
            if(department_name) {
                return true;
            } else {
                console.log('Please enter a valid department name.');
                return false;
            }
        }
    }
]