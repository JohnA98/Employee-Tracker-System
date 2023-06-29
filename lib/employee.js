// npm packages to use for Employee class
const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sensei#1",
  database: "company_db",
});

class Employee {
  employeeMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select an option regarding employees.",
          name: "menu",
          choices: [
            "View all Employees",
            "Create a new Employee",
            "Update an Employee",
          ],
        },
      ])

      .then((selection) => {
        switch (selection.menu) {
          case "View all Employees":
            this.viewEmployees();
            break;
          case "Create a new Employee":
            this.createEmployee();
            break;
          case "Update an Employee":
            this.updateEmployee();
            break;
        }
      });
  }

  // function to look at information about employees
  viewEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, 
    CONCAT(emp.first_name, ' ', emp.last_name) AS manager 
    FROM employee 
    INNER JOIN role on role.id = employee.role_id 
    INNER JOIN department on department.id = role.department_id 
    LEFT JOIN employee emp on employee.manager_id = emp.id`, (error, results) => {
      let empTable = [];
      const generateTable = () => {
        results.forEach((result) => {
          empTable.push({
            id: result.id,
            first_name: result.first_name,
            last_name: result.last_name,
            title: result.title,
            name: result.name,
            salary: result.salary,
            manager: result.manager,
          });
        });
        printTable(empTable);
      };
      generateTable();
    });
  }

  // function to add employees
  createEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter first name.",
          name: "firstName",
        },
        {
          type: "input",
          message: "Enter last name.",
          name: "lastName",
        },
        {
          type: "input",
          message: "Enter the employee's role ID.",
          name: "roleID",
        },
        {
          type: "input",
          message: "Enter the employee's manager ID. (Null if they don't have a manager)",
          name: "managerID",
        },
      ])
      .then((result) => {
        const {
          firstName,
          lastName,
          roleID,
          managerID,
        } = result;
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleID}, ${managerID})`,
          (error, results) => {
            error ? console.log(error) : console.log(results);
          }
        );
      });
  }

  // function to update an employee
  updateEmployee() {
    db.query(
      `SELECT CONCAT(first_name, " ", last_name) AS full_name FROM employee`,
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          let empNames = [];
          results.forEach((result) => {
            empNames.push(result.full_name);
          });

          inquirer
            .prompt([
              {
                type: "list",
                message: "Select Employee.",
                name: "employees",
                choices: empNames,
              },
              {
                type: "input",
                message: "Enter Role ID",
                name: "employeeRoleID",
              },
            ])
            .then((results) => {
              let splitName = results.employees.split(" ");
              db.query(
                `UPDATE employee SET role_id = ${results.employeeRoleID} WHERE first_name = "${splitName[0]}" AND last_name = "${splitName[1]}"`,
                (error, results) =>
                  error ? console.log(error) : console.log(results)
              );
            });
        }
      }
    );
  }

  
}

module.exports = Employee;
