// import inquirer for prompting user with questions in terminal
const inquirer = require('inquirer');

// import classes
const Departments = require('./lib/classes/Departments');
const Roles = require('./lib/classes/Roles');
const Employees = require('./lib/classes/Employees');

let newEmployee = new Employees();
let newRole = new Roles();
let newDepartment = new Departments();

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

const start = async () => {
    inquirer
    .prompt(startUpQuestions)
    .then(data => userQuestions(data))
    .catch(error => console.log(error))
}

const userQuestions = async (answer) => {
    switch(answer.viewAddOrUpdate) {
        case 'View all departments':
            await showDepartments();
            break;
        case 'View all roles':
            await showRoles();
            break;
        case 'View all employees':
            await showEmployees();
            break;
        case 'Add a department':
            inquire
            .prompt(addDepartmentQuestions)
            .then(data => addNewDepartment(data))
            .catch(error => error);
            break;
        case 'Add a role':
            inquire
            .prompt(addRoleQuestions)
            .then(data => addNewRole(data))
            .catch(error => error);
            break;
        case 'Add an employee':
            inquire
            .prompt(addEmployeeQuestions)
            .then(data => addNewEmployee(data))
            .catch(error => error)
            break;
        case 'Update employee role':
            await updateEmployeeRole();
    }
}

const showDepartments = async () => {
    try {
        await newDepartment.getAllDepartments();
        setTimeout(startApp, 1000)
    } catch (error) {
        console.log(error)
    }
  }
  
  const showRoles = async () => {
    try {
        await newRole.getAllRoles();
        setTimeout(startApp, 1000)
    } catch (error) {
        console.log(error)
    }
  }
  
  const showEmployees = async () => {
    try {
        await newEmployee.getAllEmployees();
        setTimeout(startApp, 1000);
        
    } catch (error) {
        console.log(error)
    }
  }
  
  const addNewDepartment = async (data) => {
    try {
        await newDepartment.addDepartment(data)
  
        setTimeout(startApp, 1000)
       
   } catch (error) {
       console.log('Failed to add a new department.')
    }
  }
  
  const addNewRole = async (data) => {
    try {  
        await newRole.addRole(data);
    
        setTimeout(startApp, 1000)
        
    } catch (error) {
       console.log('Failed to add a new Role.') 
    }
  }
  
  const addNewEmployee = async (data) => {
    try {        
        
        const rolesChoices = await newRole.getRoleNames(data.department)
        
        const {role} = await inquire.prompt([
            {   
                type: 'list',
                name: 'role',
                message: 'Enter the new role of the employee:',
                choices: rolesChoices
            }
        ])
        
        await newEmployee.addEmployee(data, role);
        setTimeout(startApp, 1000)
    } catch (error) {
        console.log('Failed to add a new employee.')
    }
  }
  
  const updateEmployeeRole = async () => {
    try {
        const name = await inquire.prompt(listofEmployees)
  
        let splitName = name.employee.split(' ')
        
        const rolesChoices = await newRole.getRoleNames(name.department)
        
        const {role} = await inquire.prompt([
            {
                type: 'list',
                name: 'role',
                message: "Enter the employee's role:",
                choices: rolesChoices
            }
        ])
  
        
        await newEmployee.updateEmployeeRoleinDB(role, splitName, name.department)
        
        setTimeout(startApp, 1000);
    } catch (error) {
        console.log('Was unable to update employee role.')
    }
  }
  
  start();