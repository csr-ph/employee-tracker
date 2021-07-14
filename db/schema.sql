-- create department table
CREATE TABLE 'department' (
    'id' INTEGER NOT NULL AUTO_INCREMENT,
    'name' VARCHAR(30) NOT NULL,
    PRIMARY KEY ('id'),
    UNIQUE KEY 'id' ('id')
);

-- create employees table with foreign keys for managers and roles
CREATE TABLE 'employees' (
    'id' INTEGER NOT NULL AUTO_INCREMENT,
    'first_name' VARCHAR(30) NOT NULL,
    'last_name' VARCHAR(30) NOT NULL,
    'role' INTEGER NOT NULL,
    'manager' INTEGER DEFAULT NULL,
    PRIMARY KEY ('id'),
    UNIQUE KEY 'id' ('id'),
    KEY 'role' ('role'),
    KEY 'manager' ('manager'),
    CONSTRAINT 'role_fk' FOREIGN KEY ('role') REFERENCES 'roles' ('id'),
    CONSTRAINT 'manager_fk' FOREIGN KEY ('manager') REFERENCES 'employees' ('id')
);

-- create roles table to list employee roles and salaries
CREATE TABLE 'roles' (
    'id' INTEGER NOT NULL AUTO_INCREMENT,
    'title' VARCHAR(30) NOT NULL,
    'salary' DECIMAL(10, 2) NOT NULL,
    'department' INTEGER NOT NULL,
    PRIMARY KEY ('id'),
    UNIQUE KEY 'id' ('id'),
    KEY 'department' ('department'),
    CONSTRAINT 'roles_fk' FOREIGN KEY ('department') REFERENCES 'department' ('id')
);