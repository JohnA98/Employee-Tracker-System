const inquirer = require("inquirer");
const Department = require("./department");
const Employee = require("./employee");
const Role = require("./role");

// Objects of classes
const department = new Department();
const employee = new Employee();
const role = new Role();

// General menu selection
class Menu {
  menu() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Choose a business option.",
          name: "menu",
          choices: [
            "View Department options",
            "View Employee options",
            "View Role options",
          ],
        },
      ])
      .then((selection) => {
        switch (selection.menu) {
          case "View Department options":
            department.departmentMenu();
            break;
          case "View Employee options":
            employee.employeeMenu();
            break;
          case "View Role options":
            role.roleMenu();
            break;
        }
      });
  }
}

module.exports = Menu;
