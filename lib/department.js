// npm packages to use for Department class
const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sensei#1",
  database: "company_db",
});

class Department {
  departmentMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select an option regarding departments.",
          name: "menu",
          choices: [
            "View all Departments",
            "Create a new Department",
          ],
        },
      ])

      .then((selection) => {
        switch (selection.menu) {
          case "View all Departments":
            this.viewDepartments();
            break;
          case "Create a new Department":
            this.createDepartment();
            break;
        }
      });
  }
  // function to look at all the departments from department table
  viewDepartments() {
    db.query('SELECT id, name FROM department', (error, results) => {
      let depTable = [];
      const generateTable = () => {
        results.forEach((result) => {
          depTable.push({ 
            id: result.id, 
            department_name: result.name 
          });
        });
        printTable(depTable);
      };
      generateTable();
    });
  }
  // function to create department
  createDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Input name of new department.",
          name: "newDepartmentInput",
        },
      ])
      .then((result) => {
        db.query(
          `INSERT INTO department (name) VALUES (?)`,
          result.newDepartmentInput,
          (error, results) => {
            error ? console.log(error) : console.log(results);
          }
        );
      });
  }
}

module.exports = Department;
