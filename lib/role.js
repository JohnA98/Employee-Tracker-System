// npm packages to use for Role class
const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sensei#1",
  database: "company_db",
});

class Role {
  roleMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select an option regarding roles.",
          name: "menu",
          choices: [
            "View All Roles", 
            "Create a new Role",
            "Delete Role"
          ],
        },
      ])
      .then((selection) => {
        switch (selection.menu) {
          case "View All Roles":
            this.viewRoles();
            break;
          case "Create a new Role":
            this.createRole();
            break;          
          case "Delete Role":
            this.deleteRole();
            break;
        }
      });
  }

  //function to look at information regarding company roles.
  viewRoles() {
    db.query(`SELECT title, role.id as roleID, department.name as department, salary
     FROM role
     INNER JOIN department ON role.department_id = department.id`, (error, results) => {
      let roleTable = [];
      const generateTable = () => {
        results.forEach((result) => {
          roleTable.push({
            title: result.title,
            id: result.roleID,
            department: result.department,
            salary: result.salary,
          });
        });
        printTable(roleTable);
      };
      generateTable();
    });
  }

  // function to add roles to the company.
  createRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter name of new role.",
          name: "newRoleName",
        },
        {
          type: "input",
          message: "Enter salary of new role.",
          name: "newRoleSalary",
        },
        {
          type: "input",
          message: "Enter departmentID of new role.",
          name: "newRoleDepartmentID",
        },
      ])
      .then((result) => {
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ('${result.newRoleName}', ${result.newRoleSalary}, ${result.newRoleDepartmentID})`,
          (error, results) => {
            error ? console.log(error) : console.log(results);
          }
        );
      });
  }

  // function to delete a role from a company
  deleteRole() {
    db.query(`SELECT * FROM role`, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        let roleNames = [];
        results.forEach((result) => {
          roleNames.push(result.title);
        });
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose a role to delete",
              choices: roleNames,
              name: "roleList",
            },
          ])
          .then((data) => {
            db.query(
              `DELETE FROM role WHERE title = ?`,
              data.roleList,
              (error, results) => {
                error ? console.log(error) : console.log(results);
              }
            );
          });
      }
    });
  }
}

module.exports = Role;
