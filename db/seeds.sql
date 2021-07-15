-- create seeds for department
INSERT INTO department (name)
VALUES
    ('IT'),
    ('QA'),
    ('Legal'),
    ('Production'),
    ('Finance'),
    ('HR'),
    ('Sales');

-- create seeds for roles
INSERT INTO roles (title, salary, department)
VALUES
    ('IT Manager', 60000, 1),
    ('IT Technician', 45000, 1),
    ('QA Manager', 60000, 2),
    ('QA Technician', 50000, 2),
    ('Lawyer', 100000, 3),
    ('Production Supervisor', 70000, 4),
    ('Production Worker', 40000, 4),
    ('Accounting Manager', 80000, 5),
    ('Accounting Associate', 50000, 5),
    ('HR Manager', 70000, 6),
    ('HR Associate', 50000, 6),
    ('Sales Rep', 50000, 7);

-- create seeds for employees
INSERT INTO employees (first_name, last_name, role, manager)
VALUES
    ('Delmar', 'Tate', 'HR Manager', 'Meghan Nielson'),
    ('Meghan', 'Nielson', 'QA Manager', null),
    ('Marybeth', 'Herberts', 'Accounting Manager', null),
    ('Halle', 'Barnet', 'Production Supervisor', 'Meghan Nielson'),
    ('Shawn', 'Irving', 'IT Manager', null),
    ('Neville', 'Judd', 'IT Technician', 'Shawn Irving'),
    ('Corinne', 'Burgess', 'QA Technician', 'Mechan Nielson'),
    ('Terra', 'Coburn', 'Accounting Associate', 'Marybeth Herberts'),
    ('Mahala', 'Palmer', 'Lawyer', null),
    ('Lorainne', 'Long', 'HR Associate', 'Delmar Tate'),
    ('Jaclyn', 'Snyder', 'Production Worker', 'Halle Barnet'),
    ('Jillie', 'Coupe', 'Sales Rep', null);