// import inquirer for prompting user with questions in terminal
const inquirer = require('inquirer');

// import classes
const Departments = require('./lib/classes/Departments');
const Roles = require('./lib/classes/Roles');
const Employees = require('./lib/classes/Employees');

// options the user can choose from upon startup
const startUpQuestions = [
    {
        type: 'list',
        name: 'actionDecision',
        message: 'What would you like to do?',
        choices: ['View departments', 'View roles', 'View employees', 'Add Department', 'Add role', 'Add employee', 'Update employee role']
    }
]

// run when user chooses to add an employee
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

// run when user chooses to create a new department
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

// run when user chooses to create a new role
const createRole = [
    {
        type: 'input',
        name: 'role_name',
        message: 'Please enter the name of the new role: ',
        validate: role_name => {
            if(name) {
                return true;
            } else {
                console.log('Please enter a valid role name.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please enter the salary for your new role: '
    },
    {
        type: 'list',
        name: 'department',
        message: 'Please enter the department that the role is a part of: ',
        choices: async () => {
            let getDepartments = new Departments();
            return await getDepartments.getDepartmentNames();
        }
    }
]

// run when user chooses to view employees list
const employeeList = [
    {
        type: 'list',
        name: 'employees',
        message: 'Please select which employee you would like to edit: ',
        choices: async () => {
            let getEmployees = new Employees();
            const employeeList = await getEmployees.getAllEmployees();
            return employeeList
        }
    },
    {
        type: 'list',
        name: 'employee_departments',
        message: 'Please enter the department of the employee: ',
        choices: async () => {
            let getDepartments = new Departments();
            return await getDepartments.getDepartmentNames();
        }
    }
]

init = () => {
    console.log(data);
    start();
}

const start = async () => {
    inquirer.prompt(startUpQuestions)
    .then(data => choices(data))
    .catch(error => console.log(error))
}
