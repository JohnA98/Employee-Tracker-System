USE company_db;

INSERT INTO department (name)
  VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
  VALUES
    ('Sales Lead', 420000, 1),
    ('Salesperson', 70000, 1),
    ('Lead Engineer', 200000, 2),
    ('Software Engineer', 140000, 2),
    ('Paper Engineer', 20000, 2),
    ('Account Manager', 125000, 3),
    ('Gator', 100000, 3),
    ('Legal Team Lead', 150000, 4),
    ('Lawyer', 125000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES
		('Billy','Bob',1, NULL),
		('Joe','Shmoe', 2, NULL),
    ('Megan','Markle', 3, NULL),
    ('Silly','Willy', 4, NULL),
    ('John', 'Doe', 5, NULL),
    ('Kelvin', 'Temperature', 6, 1 ),
    ('Marco', 'Polo', 9, 3),
    ('Moses', 'Redsea', 10, 4),
    ('Jesus', 'Christ', 11, 5);