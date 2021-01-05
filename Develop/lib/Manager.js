// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
//a "child" class of Employee, so this class will also have the name, id, email functionality that the Employee class has
//we add officeNumber as that is specific to managers
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    //we hard code the role to manager, in this case
    getRole() {
        return "Manager";
    }
}
//to be used in app.js
module.exports = Manager;
